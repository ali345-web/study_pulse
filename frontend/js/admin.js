/**
 * StudyPulse Production-Ready Secure Admin Portal Controller
 * Secured with:
 * - Server-side verified Bearer JWT tokens
 * - Automated role verification
 * - Full CRUD for all 10 Modules (Overview, Users, Courses, Subjects, Materials, Quizzes, Results, Announcements, Notifications, Settings)
 * - Realtime Toast notifications, modals, and responsive layout
 */

const API_BASE = window.location.protocol.startsWith('http')
  ? `${window.location.origin}/api`
  : 'http://127.0.0.1:5000/api';

let currentAdmin = null;
let currentAdminToken = null;
let activeTab = 'overview';
let cachedCourses = [];
let allUsersCache = [];
let deleteActionCallback = null;

// ==========================================
// 1. INITIALIZATION & AUTHENTICATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  checkAdminSession();
  setupHashRouting();
});

function initTheme() {
  const isDark = localStorage.getItem('studypulse_theme') === 'dark';
  if (isDark) {
    document.documentElement.classList.add('dark');
    updateThemeIcon(true);
  } else {
    document.documentElement.classList.remove('dark');
    updateThemeIcon(false);
  }
}

function toggleAdminDarkMode() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('studypulse_theme', isDark ? 'dark' : 'light');
  updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
  const icon = document.getElementById('admin-theme-icon');
  if (icon) {
    icon.className = isDark ? 'fa-solid fa-sun text-amber-400' : 'fa-solid fa-moon text-slate-500';
  }
}

function toggleAdminSidebar() {
  const sidebar = document.getElementById('admin-sidebar');
  const backdrop = document.getElementById('admin-sidebar-backdrop');
  if (sidebar) sidebar.classList.toggle('-translate-x-full');
  if (backdrop) backdrop.classList.toggle('hidden');
}

// Authenticated API request helper
async function adminFetch(endpoint, options = {}) {
  const token = localStorage.getItem('studypulse_admin_token') || currentAdminToken;
  const headers = {
    'Accept': 'application/json',
    ...(options.headers || {})
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    headers['x-admin-token'] = token;
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });

    if (res.status === 401 || res.status === 403) {
      const errData = await res.json().catch(() => ({}));
      if (res.status === 401) {
        showAdminToast('सत्र समाप्त हो गया है। कृपया पुनः लॉगिन करें।', 'error');
        handleAdminLogout();
      } else {
        showAdminToast(errData.message || 'पहुंच अस्वीकृत: एडमिन अधिकार आवश्यक हैं।', 'error');
      }
      throw new Error(errData.message || 'Unauthorized');
    }

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || data.error || `HTTP ${res.status}`);
    }
    return data;
  } catch (err) {
    console.error(`[AdminAPI] ${endpoint} error:`, err);
    throw err;
  }
}

async function checkAdminSession() {
  const token = localStorage.getItem('studypulse_admin_token');
  const alertBox = document.getElementById('admin-login-alert');

  // Check if currently logged in as a normal student
  try {
    const studentSession = JSON.parse(localStorage.getItem('studypulse_session') || 'null');
    if (studentSession && studentSession.role !== 'admin' && !token) {
      showLoginView();
      if (alertBox) {
        alertBox.className = 'mb-4 p-3.5 rounded-2xl text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 block border border-rose-200 dark:border-rose-800/40';
        alertBox.innerHTML = `⚠️ <strong>पहुंच अस्वीकृत:</strong> आप विद्यार्थी खाता (<strong>${escapeHtml(studentSession.name || studentSession.username)}</strong>) से लॉगिन हैं। एडमिन पोर्टल केवल अधिकृत व्यवस्थापक के लिए है।`;
      }
      return;
    }
  } catch (e) {}

  if (!token) {
    showLoginView();
    return;
  }

  // Verify token with backend
  try {
    currentAdminToken = token;
    const res = await adminFetch('/admin/me');
    if (res && res.success && res.user && res.user.role === 'admin') {
      currentAdmin = res.user;
      const nameEl = document.getElementById('admin-profile-name');
      if (nameEl) nameEl.textContent = res.user.name || res.user.username;
      showAppView();
      switchAdminTab(getInitialTab());
    } else {
      handleAdminLogout();
    }
  } catch (e) {
    showLoginView();
  }
}

function showLoginView() {
  document.getElementById('admin-login-view').classList.remove('hidden');
  document.getElementById('admin-app-view').classList.add('hidden');
}

function showAppView() {
  document.getElementById('admin-login-view').classList.add('hidden');
  document.getElementById('admin-app-view').classList.remove('hidden');
}

async function handleAdminLogin(e) {
  if (e) e.preventDefault();
  const userInput = document.getElementById('admin-user-input');
  const passInput = document.getElementById('admin-pass-input');
  const alertBox = document.getElementById('admin-login-alert');
  const btn = document.getElementById('admin-login-btn');

  const username = userInput.value.trim();
  const password = passInput.value;

  if (!username || !password) {
    showLoginAlert('कृपया यूज़रनेम और पासवर्ड दोनों दर्ज करें।', 'error');
    return;
  }

  try {
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> <span>सत्यापन हो रहा है...</span>`;
    }

    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'लॉगिन असफल रहा।');
    }

    // Save token
    localStorage.setItem('studypulse_admin_token', data.token);
    currentAdminToken = data.token;
    currentAdmin = data.user;

    const nameEl = document.getElementById('admin-profile-name');
    if (nameEl) nameEl.textContent = data.user.name || data.user.username;

    showAdminToast(data.message || 'एडमिन लॉगिन सफल रहा! 🛡️', 'success');
    showAppView();
    switchAdminTab('overview');
  } catch (err) {
    showLoginAlert(err.message, 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i class="fa-solid fa-arrow-right-to-bracket"></i> <span>कंट्रोल पैनल में सुरक्षित लॉगिन</span>`;
    }
  }
}

function showLoginAlert(msg, type) {
  const alertBox = document.getElementById('admin-login-alert');
  if (!alertBox) return;
  alertBox.className = type === 'error'
    ? 'mb-4 p-3.5 rounded-2xl text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 block border border-rose-200 dark:border-rose-800/40'
    : 'mb-4 p-3.5 rounded-2xl text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 block border border-emerald-200 dark:border-emerald-800/40';
  alertBox.textContent = msg;
}

function handleAdminLogout() {
  localStorage.removeItem('studypulse_admin_token');
  currentAdminToken = null;
  currentAdmin = null;
  showAdminToast('एडमिन सत्र समाप्त कर दिया गया।', 'info');
  showLoginView();
}

// ==========================================
// 2. TAB SWITCHING & ROUTING
// ==========================================
const TAB_TITLES = {
  overview: '📊 ओवरव्यू (Dashboard Overview)',
  users: '👥 उपयोगकर्ता प्रबंधन (User Management)',
  courses: '🎓 कोर्स प्रबंधन (Course Management)',
  subjects: '📖 विषय प्रबंधन (Subject Management)',
  materials: '📁 स्टडी सामग्री व PDF (Materials)',
  quizzes: '📝 क्विज व मॉक टेस्ट प्रबंधन (Quiz Builder)',
  results: '📈 रिजल्ट्स व प्रोग्रेस (Results & Analytics)',
  announcements: '📢 घोषणाएं (Announcements Broadcast)',
  notifications: '🔔 सूचनाएं (Push Notifications)',
  settings: '⚙️ ऐप व प्लेटफॉर्म सेटिंग्स (App Settings)'
};

function getInitialTab() {
  const hash = window.location.hash.replace('#', '').trim();
  if (hash && TAB_TITLES[hash]) return hash;
  return 'overview';
}

function setupHashRouting() {
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '').trim();
    if (hash && TAB_TITLES[hash] && hash !== activeTab) {
      switchAdminTab(hash, false);
    }
  });
}

function switchAdminTab(tabName, updateHash = true) {
  if (!TAB_TITLES[tabName]) tabName = 'overview';
  activeTab = tabName;

  if (updateHash) {
    window.location.hash = tabName;
  }

  // Update topbar title
  const titleEl = document.getElementById('admin-topbar-title');
  if (titleEl) titleEl.textContent = TAB_TITLES[tabName];

  // Update sidebar active buttons
  Object.keys(TAB_TITLES).forEach(t => {
    const btn = document.getElementById(`nav-tab-${t}`);
    const sec = document.getElementById(`tab-${t}`);
    if (btn) {
      if (t === tabName) {
        btn.className = 'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 shadow-sm';
      } else {
        btn.className = 'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800';
      }
    }
    if (sec) {
      if (t === tabName) {
        sec.classList.remove('hidden');
      } else {
        sec.classList.add('hidden');
      }
    }
  });

  // Close mobile sidebar on tab change
  const sidebar = document.getElementById('admin-sidebar');
  if (sidebar && !sidebar.classList.contains('-translate-x-full')) {
    toggleAdminSidebar();
  }

  // Load data for active tab
  loadTabData(tabName);
}

function loadTabData(tabName) {
  switch (tabName) {
    case 'overview': loadOverview(); break;
    case 'users': loadUsers(); break;
    case 'courses': loadCourses(); break;
    case 'subjects': loadSubjects(); break;
    case 'materials': loadMaterials(); break;
    case 'quizzes': loadQuizzes(); break;
    case 'results': loadResults(); break;
    case 'announcements': loadAnnouncements(); break;
    case 'notifications': loadNotifications(); break;
    case 'settings': loadSettings(); break;
  }
}

// ==========================================
// MODULE A: OVERVIEW
// ==========================================
async function loadOverview() {
  try {
    const res = await adminFetch('/admin/overview');
    if (!res || !res.success) return;
    const o = res.overview || {};
    const r = res.recent_activity || {};

    const kpiGrid = document.getElementById('overview-kpi-grid');
    if (kpiGrid) {
      kpiGrid.innerHTML = `
        <div class="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 admin-card">
          <div class="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl shrink-0">
            <i class="fa-solid fa-users"></i>
          </div>
          <div>
            <div class="text-[11px] font-bold text-slate-400 uppercase">कुल विद्यार्थी (Users)</div>
            <div class="text-2xl font-black text-slate-900 dark:text-white mt-0.5">${o.total_users || 0}</div>
            <div class="text-[10px] text-emerald-600 font-bold mt-1">● ${o.active_users || 0} सक्रिय छात्र</div>
          </div>
        </div>

        <div class="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 admin-card">
          <div class="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl shrink-0">
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
          <div>
            <div class="text-[11px] font-bold text-slate-400 uppercase">कुल कोर्सेज (Courses)</div>
            <div class="text-2xl font-black text-slate-900 dark:text-white mt-0.5">${o.total_courses || 0}</div>
            <div class="text-[10px] text-blue-600 font-bold mt-1">${o.total_subjects || 0} विषय शामिल</div>
          </div>
        </div>

        <div class="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 admin-card">
          <div class="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl shrink-0">
            <i class="fa-solid fa-list-check"></i>
          </div>
          <div>
            <div class="text-[11px] font-bold text-slate-400 uppercase">मॉक टेस्ट्स (Quizzes)</div>
            <div class="text-2xl font-black text-slate-900 dark:text-white mt-0.5">${o.total_quizzes || 0}</div>
            <div class="text-[10px] text-emerald-600 font-bold mt-1">${o.quiz_attempts || 0} बार हल किए गए</div>
          </div>
        </div>

        <div class="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 admin-card">
          <div class="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xl shrink-0">
            <i class="fa-solid fa-file-pdf"></i>
          </div>
          <div>
            <div class="text-[11px] font-bold text-slate-400 uppercase">स्टडी मटेरियल व नोट्स</div>
            <div class="text-2xl font-black text-slate-900 dark:text-white mt-0.5">${o.total_notes || 0}</div>
            <div class="text-[10px] text-indigo-600 font-bold mt-1">औसत स्कोर: ${o.avg_score || 0}%</div>
          </div>
        </div>
      `;
    }

    // Recent test attempts
    const recentTestsEl = document.getElementById('overview-recent-tests');
    if (recentTestsEl) {
      const tests = r.recent_tests || [];
      if (tests.length === 0) {
        recentTestsEl.innerHTML = `<p class="text-slate-400 text-xs py-3 text-center">अभी कोई टेस्ट सबमिशन नहीं हुआ है।</p>`;
      } else {
        recentTestsEl.innerHTML = tests.map(t => `
          <div class="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs">
            <div class="flex items-center gap-2.5 overflow-hidden">
              <span class="w-8 h-8 rounded-xl ${t.percentage >= 40 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'} flex items-center justify-center font-bold text-xs shrink-0">
                ${t.percentage || 0}%
              </span>
              <div class="overflow-hidden">
                <div class="font-bold text-slate-800 dark:text-slate-200 truncate">${escapeHtml(t.userName || 'विद्यार्थी')}</div>
                <div class="text-[10px] text-slate-400 truncate">${escapeHtml(t.testTitle || 'मॉक टेस्ट')}</div>
              </div>
            </div>
            <span class="text-[10px] text-slate-400 font-mono shrink-0">${t.submittedAt ? t.submittedAt.split('T')[0] : ''}</span>
          </div>
        `).join('');
      }
    }

    // Recent students
    const recentStudentsEl = document.getElementById('overview-recent-students');
    if (recentStudentsEl) {
      const students = r.recent_students || [];
      if (students.length === 0) {
        recentStudentsEl.innerHTML = `<p class="text-slate-400 text-xs py-3 text-center">कोई छात्र पंजीकृत नहीं है।</p>`;
      } else {
        recentStudentsEl.innerHTML = students.map(s => `
          <div class="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs">
            <div class="flex items-center gap-2.5">
              <span class="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 flex items-center justify-center text-sm shrink-0">
                ${escapeHtml(s.avatar || '👨‍🎓')}
              </span>
              <div>
                <div class="font-bold text-slate-800 dark:text-slate-200">${escapeHtml(s.name || s.username)}</div>
                <div class="text-[10px] text-slate-400">@${escapeHtml(s.username)}</div>
              </div>
            </div>
            <span class="text-[10px] px-2 py-0.5 rounded-full ${s.status === 'blocked' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700 font-bold'}">
              ${s.status === 'blocked' ? 'ब्लॉक' : 'सक्रिय'}
            </span>
          </div>
        `).join('');
      }
    }
  } catch (err) {
    showAdminToast('ओवरव्यू डेटा लोड नहीं हो सका।', 'error');
  }
}

// ==========================================
// MODULE B: USER MANAGEMENT
// ==========================================
async function loadUsers() {
  try {
    const res = await adminFetch('/admin/users');
    if (res && res.success) {
      allUsersCache = res.users || [];
      renderUsersTable(allUsersCache);
    }
  } catch (e) {
    showAdminToast('उपयोगकर्ता लोड करने में त्रुटि।', 'error');
  }
}

function handleUserSearch() {
  const search = (document.getElementById('user-search-input')?.value || '').toLowerCase().trim();
  const roleFilter = document.getElementById('user-role-filter')?.value || 'all';
  const statusFilter = document.getElementById('user-status-filter')?.value || 'all';

  const filtered = allUsersCache.filter(u => {
    const matchesSearch = !search ||
      (u.name && u.name.toLowerCase().includes(search)) ||
      (u.username && u.username.toLowerCase().includes(search)) ||
      (u.email && u.email.toLowerCase().includes(search)) ||
      (u.referralCode && u.referralCode.toLowerCase().includes(search));

    const matchesRole = (roleFilter === 'all') || (u.role === roleFilter);
    const matchesStatus = (statusFilter === 'all') || ((u.status || 'active') === statusFilter);

    return matchesSearch && matchesRole && matchesStatus;
  });

  renderUsersTable(filtered);
}

function renderUsersTable(users) {
  const tbody = document.getElementById('users-table-body');
  if (!tbody) return;

  if (users.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-slate-400 font-semibold">कोई उपयोगकर्ता नहीं मिला।</td></tr>`;
    return;
  }

  tbody.innerHTML = users.map(u => {
    const isSelf = currentAdmin && (currentAdmin._id === u._id || currentAdmin.id === u.id);
    const isBlocked = (u.status === 'blocked');
    const isAdmin = (u.role === 'admin');

    return `
      <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
        <td class="p-3.5 pl-5">
          <div class="flex items-center gap-2.5">
            <span class="text-base">${escapeHtml(u.avatar || '👨‍🎓')}</span>
            <div>
              <div class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>${escapeHtml(u.name || u.username)}</span>
                ${isSelf ? '<span class="text-[9px] bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 px-1.5 py-0.2 rounded font-extrabold">आप (You)</span>' : ''}
              </div>
              <div class="text-[10px] text-slate-400">@${escapeHtml(u.username)} ${u.email ? `• ${escapeHtml(u.email)}` : ''}</div>
            </div>
          </div>
        </td>
        <td class="p-3.5">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-black ${isAdmin ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}">
            ${isAdmin ? '👑 Admin' : '🎓 Student'}
          </span>
        </td>
        <td class="p-3.5">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 w-fit ${isBlocked ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'}">
            <span class="w-1.5 h-1.5 rounded-full ${isBlocked ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse'}"></span>
            <span>${isBlocked ? 'ब्लॉक (Blocked)' : 'सक्रिय (Active)'}</span>
          </span>
        </td>
        <td class="p-3.5 font-mono text-[11px] font-semibold text-slate-500">${escapeHtml(u.referralCode || '-')}</td>
        <td class="p-3.5 text-slate-400 font-mono text-[11px]">${u.joinedAt ? u.joinedAt.split('T')[0] : '-'}</td>
        <td class="p-3.5 pr-5 text-right">
          <div class="flex items-center justify-end gap-1.5">
            <button onclick="viewUserDetails('${u._id || u.id}')" class="p-1.5 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold transition text-[11px]" title="विवरण देखें">
              <i class="fa-solid fa-eye"></i> विवरण
            </button>
            <button onclick="toggleUserStatus('${u._id || u.id}', '${isBlocked ? 'active' : 'blocked'}')" ${isSelf ? 'disabled' : ''} class="p-1.5 px-2.5 rounded-lg font-bold text-[11px] transition ${isSelf ? 'opacity-30 cursor-not-allowed' : (isBlocked ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700' : 'bg-amber-50 hover:bg-amber-100 text-amber-700')}" title="स्थिति बदलें">
              ${isBlocked ? '<i class="fa-solid fa-unlock"></i> अनब्लॉक' : '<i class="fa-solid fa-ban"></i> ब्लॉक'}
            </button>
            <button onclick="toggleUserRole('${u._id || u.id}', '${isAdmin ? 'student' : 'admin'}')" ${isSelf ? 'disabled' : ''} class="p-1.5 px-2.5 rounded-lg font-bold text-[11px] transition ${isSelf ? 'opacity-30 cursor-not-allowed' : 'bg-purple-50 hover:bg-purple-100 text-purple-700 dark:bg-purple-950/40'}" title="रोल बदलें">
              <i class="fa-solid fa-user-shield"></i> ${isAdmin ? 'छात्र बनाएं' : 'एडमिन बनाएं'}
            </button>
            <button onclick="confirmDeleteUser('${u._id || u.id}', '${escapeHtml(u.username)}')" ${isSelf ? 'disabled' : ''} class="p-1.5 px-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition ${isSelf ? 'opacity-30 cursor-not-allowed' : ''}" title="उपयोगकर्ता हटाएं">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

async function viewUserDetails(userId) {
  try {
    const res = await adminFetch(`/admin/users/${userId}`);
    if (!res || !res.success || !res.user) return;
    const u = res.user;

    const body = document.getElementById('user-details-body');
    if (!body) return;

    body.innerHTML = `
      <div class="flex items-center gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div class="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300 flex items-center justify-center text-3xl">
          ${escapeHtml(u.avatar || '👨‍🎓')}
        </div>
        <div>
          <h4 class="text-base font-extrabold text-slate-900 dark:text-white">${escapeHtml(u.name || u.username)}</h4>
          <p class="text-xs text-slate-400">@${escapeHtml(u.username)} • ${u.role === 'admin' ? 'व्यवस्थापक (Admin)' : 'विद्यार्थी (Student)'}</p>
          <span class="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${u.status === 'blocked' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}">
            ${u.status === 'blocked' ? 'ब्लॉक (Blocked)' : 'सक्रिय खाता (Active)'}
          </span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
          <div class="text-slate-400 text-[10px]">रेफरल कोड</div>
          <div class="font-mono font-bold text-sm text-slate-800 dark:text-white mt-0.5">${escapeHtml(u.referralCode || '-')}</div>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
          <div class="text-slate-400 text-[10px]">स्टडी स्ट्रीक</div>
          <div class="font-bold text-sm text-amber-500 mt-0.5">🔥 ${u.streak || 1} दिन</div>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
          <div class="text-slate-400 text-[10px]">सिक्के (Coins)</div>
          <div class="font-bold text-sm text-yellow-500 mt-0.5">🪙 ${u.referralCoins || 0}</div>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
          <div class="text-slate-400 text-[10px]">रेफरल संख्या</div>
          <div class="font-bold text-sm text-brand-500 mt-0.5">🎁 ${u.referralCount || 0} छात्र</div>
        </div>
      </div>

      <div>
        <h5 class="font-bold text-xs text-slate-900 dark:text-white mb-2">छात्र द्वारा दिए गए मॉक टेस्ट्स (${(u.testHistory || []).length}):</h5>
        <div class="space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar">
          ${(u.testHistory || []).length === 0 ? '<p class="text-slate-400 text-[11px]">अभी कोई टेस्ट नहीं दिया गया है।</p>' : (u.testHistory || []).map(h => `
            <div class="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-[11px]">
              <span class="font-bold truncate max-w-[200px]">${escapeHtml(h.testTitle || 'मॉक टेस्ट')}</span>
              <span class="font-mono font-extrabold ${h.percentage >= 40 ? 'text-emerald-600' : 'text-rose-600'}">${h.score || 0}/${h.totalQuestions || 0} (${h.percentage || 0}%)</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    openModal('modal-user-details');
  } catch (e) {
    showAdminToast('विवरण लोड नहीं हो सका।', 'error');
  }
}

async function toggleUserStatus(userId, newStatus) {
  try {
    const res = await adminFetch(`/admin/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ status: newStatus })
    });
    if (res && res.success) {
      showAdminToast(res.message || 'स्थिति अपडेट हो गई!', 'success');
      loadUsers();
    }
  } catch (err) {
    showAdminToast(err.message || 'अपडेट त्रुटि।', 'error');
  }
}

async function toggleUserRole(userId, newRole) {
  if (!confirm(`क्या आप इस उपयोगकर्ता का रोल '${newRole.toUpperCase()}' में बदलना चाहते हैं?`)) return;
  try {
    const res = await adminFetch(`/admin/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ role: newRole })
    });
    if (res && res.success) {
      showAdminToast(res.message || 'रोल अपडेट हो गया!', 'success');
      loadUsers();
    }
  } catch (err) {
    showAdminToast(err.message || 'रोल अपडेट त्रुटि।', 'error');
  }
}

function confirmDeleteUser(userId, username) {
  showDeleteConfirmModal(
    `क्या आप उपयोगकर्ता '${username}' को हटाना चाहते हैं? यह क्रिया वापस नहीं ली जा सकती।`,
    async () => {
      try {
        const res = await adminFetch(`/admin/users/${userId}`, { method: 'DELETE' });
        if (res && res.success) {
          showAdminToast(res.message || 'उपयोगकर्ता हटा दिया गया।', 'success');
          loadUsers();
        }
      } catch (err) {
        showAdminToast(err.message || 'डिलीट त्रुटि।', 'error');
      }
    }
  );
}

// ==========================================
// MODULE C: COURSE MANAGEMENT
// ==========================================
async function loadCourses() {
  try {
    const res = await adminFetch('/admin/courses');
    if (res && res.success) {
      cachedCourses = res.courses || [];
      renderCoursesGrid(cachedCourses);
    }
  } catch (e) {
    showAdminToast('कोर्सेज लोड करने में त्रुटि।', 'error');
  }
}

function renderCoursesGrid(courses) {
  const grid = document.getElementById('courses-grid');
  if (!grid) return;

  if (courses.length === 0) {
    grid.innerHTML = `<div class="col-span-full p-12 text-center text-slate-400 font-semibold glass-panel rounded-3xl">कोई कोर्स नहीं मिला। 'नया कोर्स जोड़ें' पर क्लिक करें।</div>`;
    return;
  }

  grid.innerHTML = courses.map(c => `
    <div class="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col justify-between admin-card">
      <div>
        <div class="relative h-40 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
          <img src="${escapeHtml(c.image || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600')}" alt="${escapeHtml(c.title)}" class="w-full h-full object-cover">
          <span class="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-950/70 text-white backdrop-blur-md">
            ${escapeHtml(c.category || 'General')}
          </span>
          <button onclick="toggleCoursePublish('${c._id || c.id}')" class="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${c.published !== false ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'} shadow cursor-pointer">
            ${c.published !== false ? '✓ प्रकाशित' : '✗ अप्रकाशित'}
          </button>
        </div>

        <div class="p-5 space-y-2">
          <div class="flex items-center justify-between text-[11px] text-slate-400">
            <span class="font-mono font-bold">${escapeHtml(c.code || '')}</span>
            <span>📖 ${c.subjectCount || 0} विषय • 👥 ${c.enrolledCount || 0} छात्र</span>
          </div>
          <h3 class="font-extrabold text-sm text-slate-900 dark:text-white leading-snug line-clamp-2">${escapeHtml(c.title)}</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">${escapeHtml(c.description || '')}</p>
        </div>
      </div>

      <div class="p-4 pt-0 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 mt-2">
        <button onclick="openCourseModal('${c._id || c.id}')" class="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition flex items-center justify-center gap-1.5 cursor-pointer">
          <i class="fa-solid fa-pen-to-square"></i> संपादित करें
        </button>
        <button onclick="confirmDeleteCourse('${c._id || c.id}', '${escapeHtml(c.title)}')" class="p-2 px-3 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer" title="कोर्स हटाएं">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function openCourseModal(courseId = null) {
  const form = document.getElementById('course-form');
  if (form) form.reset();
  const idInput = document.getElementById('course-id-input');
  const titleHeader = document.getElementById('modal-course-title');

  if (courseId) {
    const course = cachedCourses.find(c => (c._id === courseId || c.id === courseId));
    if (course) {
      if (idInput) idInput.value = course._id || course.id;
      if (titleHeader) titleHeader.textContent = 'कोर्स संपादित करें (Edit Course)';
      document.getElementById('course-title-input').value = course.title || '';
      document.getElementById('course-code-input').value = course.code || '';
      document.getElementById('course-category-input').value = course.category || 'General';
      document.getElementById('course-image-input').value = course.image || '';
      document.getElementById('course-desc-input').value = course.description || '';
      document.getElementById('course-published-input').checked = course.published !== false;
    }
  } else {
    if (idInput) idInput.value = '';
    if (titleHeader) titleHeader.textContent = 'नया कोर्स जोड़ें (Add Course)';
    document.getElementById('course-published-input').checked = true;
  }

  openModal('modal-course');
}

async function handleCourseSubmit(e) {
  if (e) e.preventDefault();
  const courseId = document.getElementById('course-id-input')?.value;
  const payload = {
    title: document.getElementById('course-title-input')?.value.trim(),
    code: document.getElementById('course-code-input')?.value.trim(),
    category: document.getElementById('course-category-input')?.value,
    image: document.getElementById('course-image-input')?.value.trim(),
    description: document.getElementById('course-desc-input')?.value.trim(),
    published: document.getElementById('course-published-input')?.checked
  };

  try {
    const url = courseId ? `/admin/courses/${courseId}` : '/admin/courses';
    const method = courseId ? 'PUT' : 'POST';
    const res = await adminFetch(url, { method, body: JSON.stringify(payload) });
    if (res && res.success) {
      showAdminToast(res.message || 'कोर्स सफलतापूर्वक सुरक्षित हो गया!', 'success');
      closeModal('modal-course');
      loadCourses();
    }
  } catch (err) {
    showAdminToast(err.message || 'कोर्स सुरक्षित करने में त्रुटि।', 'error');
  }
}

async function toggleCoursePublish(courseId) {
  try {
    const res = await adminFetch(`/admin/courses/${courseId}/publish`, { method: 'PATCH' });
    if (res && res.success) {
      showAdminToast(res.message || 'स्थिति अपडेट हो गई!', 'info');
      loadCourses();
    }
  } catch (e) {
    showAdminToast('त्रुटि हुई।', 'error');
  }
}

function confirmDeleteCourse(courseId, title) {
  showDeleteConfirmModal(`क्या आप कोर्स '${title}' को हटाना चाहते हैं?`, async () => {
    try {
      const res = await adminFetch(`/admin/courses/${courseId}`, { method: 'DELETE' });
      if (res && res.success) {
        showAdminToast(res.message || 'कोर्स हटा दिया गया।', 'success');
        loadCourses();
      }
    } catch (err) {
      showAdminToast(err.message || 'त्रुटि हुई।', 'error');
    }
  });
}

// ==========================================
// MODULE D: SUBJECT MANAGEMENT
// ==========================================
let cachedSubjects = [];

async function loadSubjects() {
  try {
    // Ensure courses are cached for dropdown
    if (cachedCourses.length === 0) {
      const cRes = await adminFetch('/admin/courses');
      if (cRes && cRes.success) cachedCourses = cRes.courses || [];
    }

    const res = await adminFetch('/admin/subjects');
    if (res && res.success) {
      cachedSubjects = res.subjects || [];
      renderSubjectsGrid(cachedSubjects);
    }
  } catch (e) {
    showAdminToast('विषय लोड करने में त्रुटि।', 'error');
  }
}

function renderSubjectsGrid(subjects) {
  const grid = document.getElementById('subjects-grid');
  if (!grid) return;

  if (subjects.length === 0) {
    grid.innerHTML = `<div class="col-span-full p-12 text-center text-slate-400 font-semibold glass-panel rounded-3xl">कोई विषय नहीं मिला। '+ नया विषय जोड़ें' पर क्लिक करें।</div>`;
    return;
  }

  grid.innerHTML = subjects.map(s => `
    <div class="glass-panel p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between admin-card">
      <div>
        <div class="flex items-center justify-between mb-3">
          <div class="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 flex items-center justify-center text-lg">
            <i class="fa-solid ${escapeHtml(s.icon || 'fa-book')}"></i>
          </div>
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            ${escapeHtml(s.code || '')}
          </span>
        </div>

        <h3 class="font-extrabold text-sm text-slate-900 dark:text-white">${escapeHtml(s.title)}</h3>
        <p class="text-xs text-brand-600 dark:text-brand-400 font-semibold mt-1">📚 कोर्स: ${escapeHtml(s.courseName || 'सामान्य')}</p>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">${escapeHtml(s.description || '')}</p>
      </div>

      <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <span class="text-[11px] text-slate-400 font-bold">📑 ${s.chaptersCount || 0} अध्याय</span>
        <div class="flex items-center gap-1">
          <button onclick="openSubjectModal('${s._id || s.id}')" class="p-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-bold transition">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button onclick="confirmDeleteSubject('${s._id || s.id}', '${escapeHtml(s.title)}')" class="p-2 px-3 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function openSubjectModal(subjectId = null) {
  const form = document.getElementById('subject-form');
  if (form) form.reset();
  const idInput = document.getElementById('subject-id-input');
  const titleHeader = document.getElementById('modal-subject-title');

  // Populate course dropdown
  const courseSelect = document.getElementById('subject-course-select');
  if (courseSelect) {
    courseSelect.innerHTML = `<option value="">-- कोर्स चुनें (Choose Course) --</option>` +
      cachedCourses.map(c => `<option value="${c._id || c.id}" data-name="${escapeHtml(c.title)}">${escapeHtml(c.title)} (${escapeHtml(c.code || '')})</option>`).join('');
  }

  if (subjectId) {
    const sub = cachedSubjects.find(s => (s._id === subjectId || s.id === subjectId));
    if (sub) {
      if (idInput) idInput.value = sub._id || sub.id;
      if (titleHeader) titleHeader.textContent = 'विषय संपादित करें';
      document.getElementById('subject-title-input').value = sub.title || '';
      document.getElementById('subject-code-input').value = sub.code || '';
      if (courseSelect) courseSelect.value = sub.courseId || '';
      document.getElementById('subject-icon-input').value = sub.icon || 'fa-book';
      document.getElementById('subject-desc-input').value = sub.description || '';
    }
  } else {
    if (idInput) idInput.value = '';
    if (titleHeader) titleHeader.textContent = 'नया विषय जोड़ें';
  }

  openModal('modal-subject');
}

async function handleSubjectSubmit(e) {
  if (e) e.preventDefault();
  const subjectId = document.getElementById('subject-id-input')?.value;
  const courseSelect = document.getElementById('subject-course-select');
  const selectedCourseName = courseSelect?.options[courseSelect.selectedIndex]?.getAttribute('data-name') || '';

  const payload = {
    title: document.getElementById('subject-title-input')?.value.trim(),
    code: document.getElementById('subject-code-input')?.value.trim(),
    courseId: courseSelect?.value || '',
    courseName: selectedCourseName,
    icon: document.getElementById('subject-icon-input')?.value.trim() || 'fa-book',
    description: document.getElementById('subject-desc-input')?.value.trim()
  };

  try {
    const url = subjectId ? `/admin/subjects/${subjectId}` : '/admin/subjects';
    const method = subjectId ? 'PUT' : 'POST';
    const res = await adminFetch(url, { method, body: JSON.stringify(payload) });
    if (res && res.success) {
      showAdminToast(res.message || 'विषय सहेज लिया गया!', 'success');
      closeModal('modal-subject');
      loadSubjects();
    }
  } catch (err) {
    showAdminToast(err.message || 'विषय सहेजने में त्रुटि।', 'error');
  }
}

function confirmDeleteSubject(subjectId, title) {
  showDeleteConfirmModal(`क्या आप विषय '${title}' को हटाना चाहते हैं?`, async () => {
    try {
      const res = await adminFetch(`/admin/subjects/${subjectId}`, { method: 'DELETE' });
      if (res && res.success) {
        showAdminToast(res.message || 'विषय हटा दिया गया।', 'success');
        loadSubjects();
      }
    } catch (err) {
      showAdminToast(err.message || 'त्रुटि हुई।', 'error');
    }
  });
}

// ==========================================
// MODULE E: STUDY MATERIALS & FILE UPLOAD
// ==========================================
let cachedMaterials = [];

async function loadMaterials() {
  try {
    const res = await adminFetch('/admin/materials');
    if (res && res.success) {
      cachedMaterials = res.materials || [];
      renderMaterialsGrid(cachedMaterials);
    }
  } catch (e) {
    showAdminToast('मटेरियल्स लोड करने में त्रुटि।', 'error');
  }
}

function renderMaterialsGrid(materials) {
  const grid = document.getElementById('materials-grid');
  if (!grid) return;

  if (materials.length === 0) {
    grid.innerHTML = `<div class="col-span-full p-12 text-center text-slate-400 font-semibold glass-panel rounded-3xl">कोई स्टडी मटेरियल नहीं मिला। 'नई सामग्री जोड़ें' पर क्लिक करें।</div>`;
    return;
  }

  grid.innerHTML = materials.map(m => `
    <div class="glass-panel p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between admin-card">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-300">
            <i class="fa-solid fa-file-pdf"></i> ${escapeHtml(m.type || 'PDF')}
          </span>
          <span class="text-[11px] font-mono text-slate-400">${escapeHtml(m.fileSize || '')} • ${escapeHtml(m.pages || '')}</span>
        </div>

        <h3 class="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">${escapeHtml(m.title)}</h3>
        <div class="text-xs text-brand-600 dark:text-brand-400 font-semibold mt-1">📖 विषय: ${escapeHtml(m.subject || 'सामान्य')}</div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">${escapeHtml(m.description || '')}</p>
      </div>

      <div class="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <a href="${escapeHtml(m.fileUrl || '#')}" target="_blank" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition flex items-center gap-1">
          <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> देखें
        </a>
        <div class="flex items-center gap-1">
          <button onclick="openMaterialModal('${m._id || m.id}')" class="p-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-bold transition">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button onclick="confirmDeleteMaterial('${m._id || m.id}', '${escapeHtml(m.title)}')" class="p-2 px-3 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

async function uploadMaterialFile(input) {
  if (!input.files || input.files.length === 0) return;
  const file = input.files[0];
  const statusEl = document.getElementById('upload-status-text');

  const formData = new FormData();
  formData.append('file', file);

  try {
    if (statusEl) statusEl.innerHTML = `<span class="text-indigo-600"><i class="fa-solid fa-spinner animate-spin"></i> फ़ाइल अपलोड हो रही है (${file.name})...</span>`;
    const res = await adminFetch('/admin/upload', {
      method: 'POST',
      body: formData
    });

    if (res && res.success) {
      document.getElementById('material-url-input').value = res.fileUrl;
      document.getElementById('material-size-input').value = res.fileSize;
      if (statusEl) statusEl.innerHTML = `<span class="text-emerald-600 font-bold">✓ सुरक्षित अपलोड सफल: ${res.fileName} (${res.fileSize})</span>`;
      showAdminToast('फ़ाइल सफलतापूर्वक अपलोड हो गई!', 'success');
    }
  } catch (err) {
    if (statusEl) statusEl.innerHTML = `<span class="text-rose-600 font-bold">❌ अपलोड विफल: ${err.message}</span>`;
    showAdminToast(err.message || 'फ़ाइल अपलोड त्रुटि।', 'error');
  }
}

function openMaterialModal(materialId = null) {
  const form = document.getElementById('material-form');
  if (form) form.reset();
  const idInput = document.getElementById('material-id-input');
  const titleHeader = document.getElementById('modal-material-title');
  const statusEl = document.getElementById('upload-status-text');
  if (statusEl) statusEl.textContent = '';

  if (materialId) {
    const mat = cachedMaterials.find(m => (m._id === materialId || m.id === materialId));
    if (mat) {
      if (idInput) idInput.value = mat._id || mat.id;
      if (titleHeader) titleHeader.textContent = 'स्टडी मटेरियल संपादित करें';
      document.getElementById('material-title-input').value = mat.title || '';
      document.getElementById('material-subject-input').value = mat.subject || '';
      document.getElementById('material-type-input').value = mat.type || 'PDF';
      document.getElementById('material-url-input').value = mat.fileUrl || '';
      document.getElementById('material-pages-input').value = mat.pages || '';
      document.getElementById('material-size-input').value = mat.fileSize || '';
      document.getElementById('material-desc-input').value = mat.description || '';
    }
  } else {
    if (idInput) idInput.value = '';
    if (titleHeader) titleHeader.textContent = 'स्टडी मटेरियल / PDF जोड़ें';
  }

  openModal('modal-material');
}

async function handleMaterialSubmit(e) {
  if (e) e.preventDefault();
  const matId = document.getElementById('material-id-input')?.value;
  const payload = {
    title: document.getElementById('material-title-input')?.value.trim(),
    subject: document.getElementById('material-subject-input')?.value.trim() || 'General',
    type: document.getElementById('material-type-input')?.value || 'PDF',
    fileUrl: document.getElementById('material-url-input')?.value.trim() || '#',
    pages: document.getElementById('material-pages-input')?.value.trim() || '15 पृष्ठ',
    fileSize: document.getElementById('material-size-input')?.value.trim() || '1.5 MB',
    description: document.getElementById('material-desc-input')?.value.trim()
  };

  try {
    const url = matId ? `/admin/materials/${matId}` : '/admin/materials';
    const method = matId ? 'PUT' : 'POST';
    const res = await adminFetch(url, { method, body: JSON.stringify(payload) });
    if (res && res.success) {
      showAdminToast(res.message || 'मटेरियल सहेज लिया गया!', 'success');
      closeModal('modal-material');
      loadMaterials();
    }
  } catch (err) {
    showAdminToast(err.message || 'त्रुटि हुई।', 'error');
  }
}

function confirmDeleteMaterial(matId, title) {
  showDeleteConfirmModal(`क्या आप मटेरियल '${title}' को हटाना चाहते हैं?`, async () => {
    try {
      const res = await adminFetch(`/admin/materials/${matId}`, { method: 'DELETE' });
      if (res && res.success) {
        showAdminToast(res.message || 'मटेरियल हटा दिया गया।', 'success');
        loadMaterials();
      }
    } catch (err) {
      showAdminToast(err.message || 'त्रुटि हुई।', 'error');
    }
  });
}

// ==========================================
// MODULE F: MCQ / QUIZ BUILDER MANAGEMENT
// ==========================================
let cachedQuizzes = [];

async function loadQuizzes() {
  try {
    const res = await adminFetch('/admin/quizzes');
    if (res && res.success) {
      cachedQuizzes = res.quizzes || [];
      renderQuizzesGrid(cachedQuizzes);
    }
  } catch (e) {
    showAdminToast('क्विज लोड करने में त्रुटि।', 'error');
  }
}

function renderQuizzesGrid(quizzes) {
  const grid = document.getElementById('quizzes-grid');
  if (!grid) return;

  if (quizzes.length === 0) {
    grid.innerHTML = `<div class="col-span-full p-12 text-center text-slate-400 font-semibold glass-panel rounded-3xl">कोई क्विज नहीं मिला। '+ नया टेस्ट बनाएं' पर क्लिक करें।</div>`;
    return;
  }

  grid.innerHTML = quizzes.map(q => `
    <div class="glass-panel p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between admin-card">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            ${escapeHtml(q.subject || 'सामान्य')}
          </span>
          <button onclick="toggleQuizPublish('${q._id || q.id}')" class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${q.published !== false ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'} shadow cursor-pointer">
            ${q.published !== false ? '✓ प्रकाशित' : '✗ ड्राफ्ट'}
          </button>
        </div>

        <h3 class="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">${escapeHtml(q.title)}</h3>
        <div class="text-[11px] text-slate-400 mt-2 flex items-center gap-3">
          <span>⏱️ ${q.duration || 25} मिनट</span>
          <span>📝 ${q.questionCount || (q.questions || []).length} प्रश्न</span>
          <span>🎯 ${q.totalMarks || 50} अंक</span>
        </div>
      </div>

      <div class="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <button onclick="openQuizModal('${q._id || q.id}')" class="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition flex items-center justify-center gap-1 cursor-pointer">
          <i class="fa-solid fa-pen-to-square"></i> प्रश्न व टेस्ट संपादित करें
        </button>
        <button onclick="confirmDeleteQuiz('${q._id || q.id}', '${escapeHtml(q.title)}')" class="p-2 px-3 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  `).join('');
}

let activeQuizQuestions = [];

function openQuizModal(quizId = null) {
  const form = document.getElementById('quiz-form');
  if (form) form.reset();
  const idInput = document.getElementById('quiz-id-input');
  const titleHeader = document.getElementById('modal-quiz-title');
  activeQuizQuestions = [];

  if (quizId) {
    const q = cachedQuizzes.find(item => (item._id === quizId || item.id === quizId));
    if (q) {
      if (idInput) idInput.value = q._id || q.id;
      if (titleHeader) titleHeader.textContent = 'मॉक टेस्ट संपादित करें (Edit Quiz)';
      document.getElementById('quiz-title-input').value = q.title || '';
      document.getElementById('quiz-subject-input').value = q.subject || 'गणित';
      document.getElementById('quiz-duration-input').value = q.duration || 25;
      document.getElementById('quiz-marks-input').value = q.totalMarks || 50;
      document.getElementById('quiz-pass-input').value = q.passingMarks || 20;
      activeQuizQuestions = JSON.parse(JSON.stringify(q.questions || []));
    }
  } else {
    if (idInput) idInput.value = '';
    if (titleHeader) titleHeader.textContent = 'नया मॉक टेस्ट व MCQ क्विज बनाएं';
    // Add default sample question
    activeQuizQuestions = [{
      id: 1,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    }];
  }

  renderQuizQuestionsBuilder();
  openModal('modal-quiz');
}

function addQuizQuestionField() {
  activeQuizQuestions.push({
    id: activeQuizQuestions.length + 1,
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: ''
  });
  renderQuizQuestionsBuilder();
}

function removeQuizQuestionField(index) {
  activeQuizQuestions.splice(index, 1);
  renderQuizQuestionsBuilder();
}

function renderQuizQuestionsBuilder() {
  const container = document.getElementById('quiz-questions-container');
  const counter = document.getElementById('quiz-questions-counter');
  if (counter) counter.textContent = `${activeQuizQuestions.length} प्रश्न`;
  if (!container) return;

  if (activeQuizQuestions.length === 0) {
    container.innerHTML = `<p class="text-center text-slate-400 py-4">कोई प्रश्न नहीं है। '+ प्रश्न जोड़ें' दबाएं।</p>`;
    return;
  }

  container.innerHTML = activeQuizQuestions.map((q, idx) => `
    <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
      <div class="flex items-center justify-between">
        <span class="font-extrabold text-xs text-brand-600 dark:text-brand-400">प्रश्न #${idx + 1}</span>
        <button type="button" onclick="removeQuizQuestionField(${idx})" class="text-rose-500 hover:text-rose-700 font-bold text-xs">
          <i class="fa-solid fa-trash-can"></i> हटाएं
        </button>
      </div>

      <div>
        <input type="text" value="${escapeHtml(q.question || '')}" oninput="activeQuizQuestions[${idx}].question = this.value" placeholder="प्रश्न यहाँ लिखें..." class="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold text-xs" required>
      </div>

      <div class="space-y-2">
        <label class="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">4 विकल्प (सही उत्तर वाले रेडियो बटन को चुनें):</label>
        ${[0, 1, 2, 3].map(optIdx => `
          <div class="flex items-center gap-2">
            <input type="radio" name="correct_opt_${idx}" value="${optIdx}" ${q.correctAnswer === optIdx ? 'checked' : ''} onchange="activeQuizQuestions[${idx}].correctAnswer = ${optIdx}" class="w-4 h-4 text-emerald-600 cursor-pointer">
            <span class="w-5 text-center font-bold text-xs text-slate-400">${String.fromCharCode(65 + optIdx)}</span>
            <input type="text" value="${escapeHtml(q.options && q.options[optIdx] ? q.options[optIdx] : '')}" oninput="activeQuizQuestions[${idx}].options[${optIdx}] = this.value" placeholder="विकल्प ${String.fromCharCode(65 + optIdx)}" class="flex-1 p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs" required>
          </div>
        `).join('')}
      </div>

      <div>
        <input type="text" value="${escapeHtml(q.explanation || '')}" oninput="activeQuizQuestions[${idx}].explanation = this.value" placeholder="उत्तर की व्याख्या / शॉर्टकट ट्रिक (वैकल्पिक)..." class="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[11px] text-slate-500">
      </div>
    </div>
  `).join('');
}

async function handleQuizSubmit(e) {
  if (e) e.preventDefault();
  const quizId = document.getElementById('quiz-id-input')?.value;

  if (activeQuizQuestions.length === 0) {
    showAdminToast('कृपया टेस्ट में कम से कम 1 प्रश्न जोड़ें।', 'error');
    return;
  }

  const payload = {
    title: document.getElementById('quiz-title-input')?.value.trim(),
    subject: document.getElementById('quiz-subject-input')?.value.trim() || 'गणित',
    duration: parseInt(document.getElementById('quiz-duration-input')?.value || 25),
    totalMarks: parseInt(document.getElementById('quiz-marks-input')?.value || 50),
    passingMarks: parseInt(document.getElementById('quiz-pass-input')?.value || 20),
    questions: activeQuizQuestions
  };

  try {
    const url = quizId ? `/admin/quizzes/${quizId}` : '/admin/quizzes';
    const method = quizId ? 'PUT' : 'POST';
    const res = await adminFetch(url, { method, body: JSON.stringify(payload) });
    if (res && res.success) {
      showAdminToast(res.message || 'क्विज सुरक्षित हो गया!', 'success');
      closeModal('modal-quiz');
      loadQuizzes();
    }
  } catch (err) {
    showAdminToast(err.message || 'क्विज सहेजने में त्रुटि।', 'error');
  }
}

async function toggleQuizPublish(quizId) {
  try {
    const res = await adminFetch(`/admin/quizzes/${quizId}/publish`, { method: 'PATCH' });
    if (res && res.success) {
      showAdminToast(res.published ? 'टेस्ट लाइव कर दिया गया!' : 'टेस्ट ड्राफ्ट में रखा गया।', 'info');
      loadQuizzes();
    }
  } catch (e) {
    showAdminToast('त्रुटि हुई।', 'error');
  }
}

function confirmDeleteQuiz(quizId, title) {
  showDeleteConfirmModal(`क्या आप टेस्ट '${title}' को हटाना चाहते हैं?`, async () => {
    try {
      const res = await adminFetch(`/admin/quizzes/${quizId}`, { method: 'DELETE' });
      if (res && res.success) {
        showAdminToast(res.message || 'क्विज हटा दिया गया।', 'success');
        loadQuizzes();
      }
    } catch (err) {
      showAdminToast(err.message || 'त्रुटि हुई।', 'error');
    }
  });
}

// ==========================================
// MODULE G: RESULTS & PROGRESS ANALYTICS
// ==========================================
async function loadResults() {
  try {
    const [resList, resStats] = await Promise.all([
      adminFetch('/admin/results'),
      adminFetch('/admin/results/analytics')
    ]);

    if (resStats && resStats.success) {
      const a = resStats.analytics || {};
      const strip = document.getElementById('results-kpi-strip');
      if (strip) {
        strip.innerHTML = `
          <div class="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div class="text-[10px] text-slate-400 uppercase font-bold">कुल टेस्ट प्रयास</div>
            <div class="text-xl font-black mt-0.5">${a.totalAttempts || 0}</div>
          </div>
          <div class="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div class="text-[10px] text-slate-400 uppercase font-bold">औसत प्रतिशत</div>
            <div class="text-xl font-black text-brand-600 mt-0.5">${a.avgPercentage || 0}%</div>
          </div>
          <div class="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div class="text-[10px] text-slate-400 uppercase font-bold">उत्तीर्ण दर (Pass Rate)</div>
            <div class="text-xl font-black text-emerald-600 mt-0.5">${a.passRate || 0}%</div>
          </div>
          <div class="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div class="text-[10px] text-slate-400 uppercase font-bold">सर्वोच्च स्कोर</div>
            <div class="text-xl font-black text-purple-600 mt-0.5">${a.topScore || 0}%</div>
          </div>
        `;
      }
    }

    if (resList && resList.success) {
      renderResultsTable(resList.results || []);
    }
  } catch (e) {
    showAdminToast('रिजल्ट्स लोड करने में त्रुटि।', 'error');
  }
}

function renderResultsTable(results) {
  const tbody = document.getElementById('results-table-body');
  if (!tbody) return;

  if (results.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-slate-400 font-semibold">अभी कोई टेस्ट परिणाम दर्ज नहीं है।</td></tr>`;
    return;
  }

  tbody.innerHTML = results.map(r => `
    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
      <td class="p-3.5 pl-5 font-bold text-slate-900 dark:text-white">${escapeHtml(r.userName || r.userId || 'विद्यार्थी')}</td>
      <td class="p-3.5">${escapeHtml(r.testTitle || 'मॉक टेस्ट')}</td>
      <td class="p-3.5 font-mono font-bold">${r.score || 0} / ${r.totalQuestions || 0}</td>
      <td class="p-3.5 font-mono font-extrabold ${r.percentage >= 40 ? 'text-emerald-600' : 'text-rose-600'}">${r.percentage || 0}%</td>
      <td class="p-3.5">
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${r.percentage >= 40 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'}">
          ${r.percentage >= 40 ? 'उत्तीर्ण (PASS)' : 'अनुत्तीर्ण (FAIL)'}
        </span>
      </td>
      <td class="p-3.5 pr-5 text-right font-mono text-slate-400">${r.submittedAt ? r.submittedAt.replace('T', ' ').substring(0, 16) : '-'}</td>
    </tr>
  `).join('');
}

// ==========================================
// MODULE H: ANNOUNCEMENTS
// ==========================================
let cachedAnnouncements = [];

async function loadAnnouncements() {
  try {
    const res = await adminFetch('/admin/announcements');
    if (res && res.success) {
      cachedAnnouncements = res.announcements || [];
      renderAnnouncementsList(cachedAnnouncements);
    }
  } catch (e) {
    showAdminToast('घोषणाएं लोड करने में त्रुटि।', 'error');
  }
}

function renderAnnouncementsList(items) {
  const container = document.getElementById('announcements-list');
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `<div class="p-12 text-center text-slate-400 font-semibold glass-panel rounded-3xl">कोई घोषणा नहीं है। नई घोषणा बनाएं।</div>`;
    return;
  }

  container.innerHTML = items.map(a => `
    <div class="glass-panel p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 admin-card">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold ${a.type === 'exam' ? 'bg-rose-100 text-rose-700' : (a.type === 'update' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-800')}">
            ${escapeHtml(a.type || 'Alert')}
          </span>
          <span class="text-[11px] text-slate-400 font-mono">${a.createdAt ? a.createdAt.split('T')[0] : ''}</span>
        </div>
        <h3 class="font-extrabold text-sm text-slate-900 dark:text-white">${escapeHtml(a.title)}</h3>
        <p class="text-xs text-slate-500 dark:text-slate-400">${escapeHtml(a.content)}</p>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <button onclick="deleteAnnouncement('${a._id || a.id}')" class="p-2 px-3 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition">
          <i class="fa-solid fa-trash-can"></i> हटाएं
        </button>
      </div>
    </div>
  `).join('');
}

function openAnnouncementModal() {
  const form = document.getElementById('announcement-form');
  if (form) form.reset();
  openModal('modal-announcement');
}

async function handleAnnouncementSubmit(e) {
  if (e) e.preventDefault();
  const payload = {
    title: document.getElementById('ann-title-input')?.value.trim(),
    type: document.getElementById('ann-type-input')?.value,
    content: document.getElementById('ann-content-input')?.value.trim()
  };

  try {
    const res = await adminFetch('/admin/announcements', { method: 'POST', body: JSON.stringify(payload) });
    if (res && res.success) {
      showAdminToast('घोषणा लाइव कर दी गई!', 'success');
      closeModal('modal-announcement');
      loadAnnouncements();
    }
  } catch (err) {
    showAdminToast(err.message || 'त्रुटि हुई।', 'error');
  }
}

async function deleteAnnouncement(annId) {
  if (!confirm('क्या आप यह घोषणा हटाना चाहते हैं?')) return;
  try {
    const res = await adminFetch(`/admin/announcements/${annId}`, { method: 'DELETE' });
    if (res && res.success) {
      showAdminToast('घोषणा हटा दी गई।', 'success');
      loadAnnouncements();
    }
  } catch (e) {
    showAdminToast('त्रुटि हुई।', 'error');
  }
}

// ==========================================
// MODULE I: NOTIFICATIONS
// ==========================================
let cachedNotifications = [];

async function loadNotifications() {
  try {
    const res = await adminFetch('/admin/notifications');
    if (res && res.success) {
      cachedNotifications = res.notifications || [];
      renderNotificationsList(cachedNotifications);
    }
  } catch (e) {
    showAdminToast('सूचनाएं लोड करने में त्रुटि।', 'error');
  }
}

function renderNotificationsList(items) {
  const container = document.getElementById('notifications-list');
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `<div class="p-12 text-center text-slate-400 font-semibold glass-panel rounded-3xl">कोई सूचना इतिहास नहीं है। 'सूचना भेजें' पर क्लिक करें।</div>`;
    return;
  }

  container.innerHTML = items.map(n => `
    <div class="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400 flex items-center justify-center text-base shrink-0">
          <i class="fa-solid fa-bell"></i>
        </div>
        <div>
          <div class="font-extrabold text-xs text-slate-900 dark:text-white">${escapeHtml(n.title)}</div>
          <div class="text-[11px] text-slate-500 line-clamp-1">${escapeHtml(n.message)}</div>
          <div class="text-[10px] text-slate-400 mt-0.5">लक्ष्य: ${n.targetUserId === 'all' ? 'सभी विद्यार्थी (All)' : n.targetUserId} • ${n.createdAt ? n.createdAt.split('T')[0] : ''}</div>
        </div>
      </div>
      <button onclick="deleteNotification('${n._id || n.id}')" class="text-rose-500 hover:text-rose-700 p-2 text-xs">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `).join('');
}

function openNotificationModal() {
  const form = document.getElementById('notification-form');
  if (form) form.reset();
  openModal('modal-notification');
}

async function handleNotificationSubmit(e) {
  if (e) e.preventDefault();
  const payload = {
    title: document.getElementById('notif-title-input')?.value.trim(),
    targetUserId: document.getElementById('notif-target-input')?.value,
    message: document.getElementById('notif-message-input')?.value.trim()
  };

  try {
    const res = await adminFetch('/admin/notifications', { method: 'POST', body: JSON.stringify(payload) });
    if (res && res.success) {
      showAdminToast('सूचना सफलतापूर्वक भेज दी गई! 🔔', 'success');
      closeModal('modal-notification');
      loadNotifications();
    }
  } catch (err) {
    showAdminToast(err.message || 'त्रुटि हुई।', 'error');
  }
}

async function deleteNotification(notifId) {
  try {
    const res = await adminFetch(`/admin/notifications/${notifId}`, { method: 'DELETE' });
    if (res && res.success) {
      showAdminToast('सूचना हटा दी गई।', 'success');
      loadNotifications();
    }
  } catch (e) {
    showAdminToast('त्रुटि हुई।', 'error');
  }
}

// ==========================================
// MODULE J: APP & PLATFORM SETTINGS
// ==========================================
async function loadSettings() {
  try {
    const res = await adminFetch('/admin/settings');
    if (!res || !res.success || !res.settings) return;
    const s = res.settings;

    const nameInput = document.getElementById('setting-app-name');
    const logoInput = document.getElementById('setting-logo-url');
    const subInput = document.getElementById('setting-app-subtitle');
    const emailInput = document.getElementById('setting-contact-email');
    const phoneInput = document.getElementById('setting-contact-phone');
    const maintInput = document.getElementById('setting-maintenance-mode');
    const signupInput = document.getElementById('setting-allow-signups');
    const aiProvInput = document.getElementById('setting-ai-provider');
    const gemKeyInput = document.getElementById('setting-gemini-key');

    if (nameInput) nameInput.value = s.appName || 'StudyPulse';
    if (logoInput) logoInput.value = s.logoUrl || '/icons/icon.svg';
    if (subInput) subInput.value = s.appSubtitle || '';
    if (emailInput) emailInput.value = s.contactEmail || '';
    if (phoneInput) phoneInput.value = s.contactPhone || '';
    if (maintInput) maintInput.checked = boolVal(s.maintenanceMode);
    if (signupInput) signupInput.checked = s.allowSignups !== false;
    if (aiProvInput) aiProvInput.value = s.aiProvider || 'gemini';
    if (gemKeyInput && s.geminiKeyMasked) gemKeyInput.placeholder = `वर्तमान: ${s.geminiKeyMasked}`;
  } catch (e) {
    showAdminToast('सेटिंग्स लोड करने में त्रुटि।', 'error');
  }
}

async function saveAppSettings(e) {
  if (e) e.preventDefault();
  const payload = {
    appName: document.getElementById('setting-app-name')?.value.trim(),
    logoUrl: document.getElementById('setting-logo-url')?.value.trim(),
    appSubtitle: document.getElementById('setting-app-subtitle')?.value.trim(),
    contactEmail: document.getElementById('setting-contact-email')?.value.trim(),
    contactPhone: document.getElementById('setting-contact-phone')?.value.trim(),
    maintenanceMode: document.getElementById('setting-maintenance-mode')?.checked,
    allowSignups: document.getElementById('setting-allow-signups')?.checked,
    aiProvider: document.getElementById('setting-ai-provider')?.value || 'gemini',
    geminiKey: document.getElementById('setting-gemini-key')?.value.trim() || ''
  };

  try {
    const res = await adminFetch('/admin/settings', { method: 'PUT', body: JSON.stringify(payload) });
    if (res && res.success) {
      showAdminToast('ऐप व AI सेटिंग्स सफलतापूर्वक सुरक्षित कर दी गईं!', 'success');
      loadSettings();
    }
  } catch (err) {
    showAdminToast(err.message || 'सेटिंग्स सहेजने में त्रुटि।', 'error');
  }
}

async function testAdminAiConnection() {
  const resultBox = document.getElementById('admin-ai-test-result');
  if (!resultBox) return;

  resultBox.className = 'text-xs p-3 rounded-xl font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 block border border-indigo-200 dark:border-indigo-800';
  resultBox.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>StudyPulse AI इंजन कनेक्शन टेस्ट हो रहा है...';
  resultBox.classList.remove('hidden');

  try {
    const res = await fetch('/api/ai/connect', { method: 'POST' });
    const data = await res.json();
    if (data && data.success) {
      resultBox.className = 'text-xs p-3 rounded-xl font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 block border border-emerald-200 dark:border-emerald-800';
      resultBox.innerHTML = `
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-circle-check text-emerald-600 text-base"></i>
          <div>
            <strong>✓ AI ऑटो-कनेक्ट पूर्णतः सक्रिय है! (Active & Connected)</strong><br>
            <span class="text-[11px] font-normal text-emerald-600 dark:text-emerald-400">मोड: ${data.mode || 'Direct Connect'} • Google Gemini + Multi-Domain Engine लाइव तैयार है।</span>
          </div>
        </div>
      `;
      showAdminToast('⚡ StudyPulse AI ऑटो-कनेक्ट सफल रहा!', 'success');
    } else {
      throw new Error((data && data.message) || 'कनेक्शन विफल रहा');
    }
  } catch (err) {
    resultBox.className = 'text-xs p-3 rounded-xl font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 block border border-rose-200 dark:border-rose-800';
    resultBox.innerHTML = `<i class="fa-solid fa-triangle-exclamation mr-1.5"></i>त्रुटि: ${err.message || 'सर्वर से संपर्क नहीं हो सका'}`;
    showAdminToast('AI टेस्ट में त्रुटि हुई।', 'error');
  }
}

// ==========================================
// TOAST & MODAL HELPERS
// ==========================================
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}

function showDeleteConfirmModal(msg, onConfirm) {
  const msgEl = document.getElementById('confirm-delete-message');
  if (msgEl) msgEl.textContent = msg;

  deleteActionCallback = onConfirm;
  const btn = document.getElementById('confirm-delete-btn');
  if (btn) {
    btn.onclick = () => {
      closeModal('modal-confirm-delete');
      if (deleteActionCallback) deleteActionCallback();
    };
  }

  openModal('modal-confirm-delete');
}

function showAdminToast(msg, type = 'info') {
  const container = document.getElementById('admin-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const bg = type === 'success' ? 'bg-emerald-600' : (type === 'error' ? 'bg-rose-600' : 'bg-slate-900');
  const icon = type === 'success' ? 'fa-circle-check' : (type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-info');

  toast.className = `${bg} text-white px-4 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2.5 transition-all duration-300 transform translate-y-3 opacity-0 pointer-events-auto`;
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${escapeHtml(msg)}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('translate-y-3', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function boolVal(v) {
  return v === true || v === 'true' || v === 1;
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
