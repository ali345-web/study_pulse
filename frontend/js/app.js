/**
 * StudyPulse - Smart Study & Govt Exam Prep App
 * Includes:
 * 1. Multi-Language (Hindi, English, Urdu, Marathi, Tamil, Gujarati)
 * 2. RS Aggarwal Mathematics Solved Notes & Shortcut Tricks
 * 3. Competitive Exam Mock Tests (SSC, Banking, Railway, Police)
 * 4. Government Exam & Job Updates (1.5 Lakh+ Vacancies)
 * 5. 100% No-Email Authentication & LocalStorage State
 */

// ==========================================
// 1. MULTI-LANGUAGE TRANSLATION DICTIONARY
// ==========================================

const TRANSLATIONS = {
  hi: {
    appTitle: "StudyPulse",
    appSubtitle: "सरकारी परीक्षा तैयारी",
    noEmailBadge: "त्वरित प्रवेश",
    login: "लॉगिन",
    signup: "साइन अप",
    usernameLabel: "यूज़रनेम",
    passwordLabel: "पासवर्ड",
    rememberMe: "याद रखें",
    noEmailNotice: "ईमेल जरूरी नहीं",
    loginBtn: "लॉगिन करें",
    demoLoginBtn: "डेमो लॉगिन",
    fullNameLabel: "पूरा नाम",
    chooseUsernameLabel: "यूज़रनेम",
    usernameHint: "लॉगिन के लिए इस यूज़रनेम का उपयोग करें।",
    chooseAvatar: "अवतार चुनें",
    signupBtn: "साइन अप करें",
    sidebarSubtitle: "अध्ययन केंद्र",
    navDashboard: "डैशबोर्ड",
    navSyllabus: "सिलेबस",
    navTests: "मॉक टेस्ट",
    navExams: "परीक्षाएं",
    navNotes: "गणित नोट्स",
    navJobs: "सरकारी नौकरियां",
    navMaterials: "PDF सामग्री",
    navAi: "✨ StudyPulse AI & Google",
    navShare: "शेयर करें",
    theme: "थीम",
    logout: "लॉगआउट",
    account: "खाता",
    dailyQuoteTitle: "आज का विचार",
    startCompTestBtn: "मॉक टेस्ट दें",
    viewJobsBtn: "नौकरियां देखें",
    viewRSAggarwalBtn: "गणित नोट्स",
    statSyllabusTitle: "कुल सिलेबस",
    statSyllabusSub: "प्रगति",
    statTestsTitle: "दिए गए टेस्ट",
    statAvgScore: "औसत स्कोर",
    statPerformanceGood: "उत्कृष्ट!",
    statExamTitle: "आगामी परीक्षा",
    statKeepPracticing: "अभ्यास जारी रखें",
    statStreakTitle: "स्टडी स्ट्रीक",
    statKeepStudying: "नियमित रहें",
    pomodoroTitle: "फोकस टाइमर",
    todayTargetsTitle: "आज के लक्ष्य",
    syllabusTitle: "सिलेबस ट्रैकर",
    testsTitle: "मॉक टेस्ट",
    examsTitle: "परीक्षा अनुसूची",
    notesTitle: "गणित एवं अध्ययन नोट्स",
    jobsBadge: "ताजा भर्तियां 2026",
    jobsHeroTitle: "सरकारी नौकरी अपडेट्स",
    jobsHeroDesc: "SSC, रेलवे, बैंक व पुलिस भर्तियों की जानकारी।",
    selectLanguageTitle: "भाषा चुनें",
    selectLanguageSubtitle: "अपनी पसंदीदा भाषा चुनें"
  },
  en: {
    appTitle: "StudyPulse",
    appSubtitle: "Govt Exam Prep",
    noEmailBadge: "Quick Access",
    login: "Log In",
    signup: "Sign Up",
    usernameLabel: "Username",
    passwordLabel: "Password",
    rememberMe: "Remember Me",
    noEmailNotice: "No Email Needed",
    loginBtn: "Log In",
    demoLoginBtn: "Demo Login",
    fullNameLabel: "Full Name",
    chooseUsernameLabel: "Username",
    usernameHint: "Use this username to log in.",
    chooseAvatar: "Choose Avatar",
    signupBtn: "Sign Up",
    sidebarSubtitle: "Study Hub",
    navDashboard: "Dashboard",
    navSyllabus: "Syllabus",
    navTests: "Mock Tests",
    navExams: "Exams",
    navNotes: "Math Notes",
    navJobs: "Govt Jobs",
    navMaterials: "PDF Materials",
    navAi: "✨ StudyPulse AI & Google",
    navShare: "Share",
    theme: "Theme",
    logout: "Log Out",
    account: "Account",
    dailyQuoteTitle: "Daily Quote",
    startCompTestBtn: "Take Mock Test",
    viewJobsBtn: "View Jobs",
    viewRSAggarwalBtn: "Math Notes",
    statSyllabusTitle: "Syllabus",
    statSyllabusSub: "Progress",
    statTestsTitle: "Tests Taken",
    statAvgScore: "Avg Score",
    statPerformanceGood: "Excellent!",
    statExamTitle: "Next Exam",
    statKeepPracticing: "Keep Practicing",
    statStreakTitle: "Study Streak",
    statKeepStudying: "Stay Consistent",
    pomodoroTitle: "Focus Timer",
    todayTargetsTitle: "Today's Targets",
    syllabusTitle: "Syllabus Tracker",
    testsTitle: "Mock Tests",
    examsTitle: "Exam Schedule",
    notesTitle: "Math Notes",
    jobsBadge: "Live Jobs 2026",
    jobsHeroTitle: "Job Updates",
    jobsHeroDesc: "Latest updates for SSC, Railway, Banking & Police.",
    selectLanguageTitle: "Select Language",
    selectLanguageSubtitle: "Choose your preferred language"
  },
  ur: {
    appTitle: "StudyPulse",
    appSubtitle: "امتحانات کی تیاری",
    noEmailBadge: "فوری رسائی",
    login: "لاگ ان",
    signup: "سائن اپ",
    usernameLabel: "صارف نام",
    passwordLabel: "پاس ورڈ",
    rememberMe: "یاد رکھیں",
    noEmailNotice: "ای میل کی ضرورت نہیں",
    loginBtn: "لاگ ان",
    demoLoginBtn: "ڈیمو لاگ ان",
    fullNameLabel: "پورا نام",
    chooseUsernameLabel: "صارف نام",
    usernameHint: "لاگ ان کے لیے یہ صارف نام استعمال کریں۔",
    chooseAvatar: "اواتار منتخب کریں",
    signupBtn: "سائن اپ کریں",
    sidebarSubtitle: "مطالعہ مرکز",
    navDashboard: "ڈیش بورڈ",
    navSyllabus: "نصاب",
    navTests: "موک ٹیسٹ",
    navExams: "امتحانات",
    navNotes: "ریاضی نوٹس",
    navJobs: "سرکاری نوکریاں",
    navMaterials: "پی ڈی ایف مواد",
    navAi: "✨ StudyPulse AI & Google",
    navShare: "شیئر کریں",
    theme: "تھیم",
    logout: "لاگ آؤٹ",
    account: "کھاتہ",
    dailyQuoteTitle: "آج کا قول",
    startCompTestBtn: "ٹیسٹ دیں",
    viewJobsBtn: "نوکریاں دیکھیں",
    viewRSAggarwalBtn: "ریاضی نوٹس",
    statSyllabusTitle: "کل نصاب",
    statSyllabusSub: "پیش رفت",
    statTestsTitle: "دیے گئے ٹیسٹ",
    statAvgScore: "اوسط اسکور",
    statPerformanceGood: "شاندار!",
    statExamTitle: "اگلا امتحان",
    statKeepPracticing: "تیاری جاری رکھیں",
    statStreakTitle: "مطالعہ تسلسل",
    statKeepStudying: "مسلسل محنت کریں",
    pomodoroTitle: "فوکس ٹائمر",
    todayTargetsTitle: "آج کے اہداف",
    syllabusTitle: "نصاب ٹریکر",
    testsTitle: "موک ٹیسٹ",
    examsTitle: "امتحانات کا شیڈول",
    notesTitle: "ریاضی نوٹس",
    jobsBadge: "تازہ نوکریاں 2026",
    jobsHeroTitle: "سرکاری نوکریاں",
    jobsHeroDesc: "ایس ایس سی، ریلوے اور پولیس کی نوکریاں۔",
    selectLanguageTitle: "زبان منتخب کریں",
    selectLanguageSubtitle: "اپنی پسندیدہ زبان منتخب کریں"
  },
  mr: {
    appTitle: "StudyPulse",
    appSubtitle: "स्पर्धा परीक्षा तयारी",
    noEmailBadge: "त्वरित प्रवेश",
    login: "लॉगिन",
    signup: "साइन अप",
    usernameLabel: "वापरकर्तानाव",
    passwordLabel: "पासवर्ड",
    rememberMe: "लक्षात ठेवा",
    noEmailNotice: "ईमेल आवश्यक नाही",
    loginBtn: "लॉगिन",
    demoLoginBtn: "डेमो लॉगिन",
    fullNameLabel: "पूर्ण नाव",
    chooseUsernameLabel: "वापरकर्तानाव",
    usernameHint: "लॉगिनसाठी हे युझरनेम वापरा.",
    chooseAvatar: "अवतार निवडा",
    signupBtn: "साइन अप करा",
    sidebarSubtitle: "अभ्यास केंद्र",
    navDashboard: "डॅशबोर्ड",
    navSyllabus: "अभ्यासक्रम",
    navTests: "सराव चाचण्या",
    navExams: "परीक्षा",
    navNotes: "गणित नोट्स",
    navJobs: "सरकारी नोकऱ्या",
    navMaterials: "PDF साहित्य",
    navAi: "✨ StudyPulse AI & Google",
    navShare: "शेअर करा",
    theme: "थीम",
    logout: "लॉगआउट",
    account: "खाते",
    dailyQuoteTitle: "आजचा सुविचार",
    startCompTestBtn: "चाचणी द्या",
    viewJobsBtn: "नोकऱ्या पाहा",
    viewRSAggarwalBtn: "गणित नोट्स",
    statSyllabusTitle: "एकूण अभ्यासक्रम",
    statSyllabusSub: "प्रगती",
    statTestsTitle: "दिलेल्या चाचण्या",
    statAvgScore: "सरासरी गुण",
    statPerformanceGood: "उत्कृष्ट!",
    statExamTitle: "पुढील परीक्षा",
    statKeepPracticing: "सराव चालू ठेवा",
    statStreakTitle: "अभ्यास सातत्य",
    statKeepStudying: "नियमित अभ्यास करा",
    pomodoroTitle: "फोकस टाइमर",
    todayTargetsTitle: "आजची उद्दिष्टे",
    syllabusTitle: "अभ्यासक्रम ट्रॅकर",
    testsTitle: "सराव चाचण्या",
    examsTitle: "परीक्षा वेळापत्रक",
    notesTitle: "गणित नोट्स",
    jobsBadge: "सरकारी भरती 2026",
    jobsHeroTitle: "सरकारी नोकरी अपडेट्स",
    jobsHeroDesc: "SSC, रेल्वे, पोलीस भरती माहिती.",
    selectLanguageTitle: "भाषा निवडा",
    selectLanguageSubtitle: "तुमची आवडती भाषा निवडा"
  },
  ta: {
    appTitle: "StudyPulse",
    appSubtitle: "போட்டித் தேர்வு தயாரிப்பு",
    noEmailBadge: "விரைவு நுழைவு",
    login: "உள்நுழைவு",
    signup: "பதிவு செய்க",
    usernameLabel: "பயனர்பெயர்",
    passwordLabel: "கடவுச்சொல்",
    rememberMe: "நினைவில் கொள்க",
    noEmailNotice: "மின்னஞ்சல் தேவையில்லை",
    loginBtn: "உள்நுழைவு",
    demoLoginBtn: "டெமோ நுழைவு",
    fullNameLabel: "முழு பெயர்",
    chooseUsernameLabel: "பயனர்பெயர்",
    usernameHint: "உள்நுழைய இந்த பெயரைப் பயன்படுத்தவும்.",
    chooseAvatar: "அவதார் தேர்வு",
    signupBtn: "பதிவு செய்க",
    sidebarSubtitle: "படிப்பு மையம்",
    navDashboard: "முகப்பு",
    navSyllabus: "பாடத்திட்டம்",
    navTests: "மாதிரி தேர்வுகள்",
    navExams: "தேர்வுகள்",
    navNotes: "கணித குறிப்புகள்",
    navJobs: "அரசு வேலைகள்",
    navMaterials: "PDF நூல்கள்",
    navAi: "✨ StudyPulse AI & Google",
    navShare: "பகிரவும்",
    theme: "தீம்",
    logout: "வெளியேறு",
    account: "கணக்கு",
    dailyQuoteTitle: "இன்றைய பொன்மொழி",
    startCompTestBtn: "தேர்வு எழுதுக",
    viewJobsBtn: "வேலைகள் காண்க",
    viewRSAggarwalBtn: "கணித குறிப்புகள்",
    statSyllabusTitle: "பாடத்திட்டம்",
    statSyllabusSub: "முன்னேற்றம்",
    statTestsTitle: "எழுதிய தேர்வுகள்",
    statAvgScore: "சராசரி மதிப்பெண்",
    statPerformanceGood: "அருமை!",
    statExamTitle: "அடுத்த தேர்வு",
    statKeepPracticing: "பயிற்சி செய்க",
    statStreakTitle: "படிப்பு தொடர்ச்சி",
    statKeepStudying: "தொடர்ந்து படியுங்கள்",
    pomodoroTitle: "டைமர்",
    todayTargetsTitle: "இன்றைய இலக்குகள்",
    syllabusTitle: "பாடத்திட்ட கண்காணிப்பான்",
    testsTitle: "மாதிரி தேர்வுகள்",
    examsTitle: "தேர்வு அட்டவணை",
    notesTitle: "கணித குறிப்புகள்",
    jobsBadge: "அரசு வேலைகள் 2026",
    jobsHeroTitle: "அரசு வேலை செய்திகள்",
    jobsHeroDesc: "SSC, ரயில்வே மற்றும் காவல்துறை வேலைகள்.",
    selectLanguageTitle: "மொழியைத் தேர்வு செய்க",
    selectLanguageSubtitle: "உங்கள் மொழியைத் தேர்வு செய்க"
  },
  gu: {
    appTitle: "StudyPulse",
    appSubtitle: "સ્પર્ધાત્મક પરીક્ષા તૈયારી",
    noEmailBadge: "ઝડપી પ્રવેશ",
    login: "લૉગિન",
    signup: "સાઇન અપ",
    usernameLabel: "યુઝરનેમ",
    passwordLabel: "પાસવર્ડ",
    rememberMe: "યાદ રાખો",
    noEmailNotice: "ઈમેલ જરૂરી નથી",
    loginBtn: "લૉગિન",
    demoLoginBtn: "ડેમો લૉગિન",
    fullNameLabel: "પૂરું નામ",
    chooseUsernameLabel: "યુઝરનેમ",
    usernameHint: "આ યુઝરનેમથી લૉગિન કરો.",
    chooseAvatar: "અવતાર પસંદ કરો",
    signupBtn: "સાઇન અપ કરો",
    sidebarSubtitle: "અભ્યાસ કેન્દ્ર",
    navDashboard: "ડેશબોર્ડ",
    navSyllabus: "અભ્યાસક્રમ",
    navTests: "મોક ટેસ્ટ",
    navExams: "પરીક્ષાઓ",
    navNotes: "ગણિત નોટ્સ",
    navJobs: "સરકારી નોકરીઓ",
    navMaterials: "PDF સામગ્રી",
    navAi: "✨ StudyPulse AI & Google",
    navShare: "શેર કરો",
    theme: "થીમ",
    logout: "લૉગઆઉટ",
    account: "ખાતું",
    dailyQuoteTitle: "આજનો સુવિચાર",
    startCompTestBtn: "ટેસ્ટ આપો",
    viewJobsBtn: "નોકરીઓ જુઓ",
    viewRSAggarwalBtn: "ગણિત નોટ્સ",
    statSyllabusTitle: "કુલ સિલેબસ",
    statSyllabusSub: "પ્રગતિ",
    statTestsTitle: "આપેલી ટેસ્ટ",
    statAvgScore: "સરેરાશ સ્કોર",
    statPerformanceGood: "શાનદાર!",
    statExamTitle: "આગામી પરીક્ષા",
    statKeepPracticing: "તૈયારી ચાલુ રાખો",
    statStreakTitle: "અભ્યાસ સાતત્ય",
    statKeepStudying: "નિયમિત રહો",
    pomodoroTitle: "ફોકસ ટાઈમર",
    todayTargetsTitle: "આજના લક્ષ્યો",
    syllabusTitle: "અભ્યાસક્રમ ટ્રેકર",
    testsTitle: "મોક ટેસ્ટ",
    examsTitle: "પરીક્ષા સમયપત્રક",
    notesTitle: "ગણિત નોટ્સ",
    jobsBadge: "સરકારી ભરતી 2026",
    jobsHeroTitle: "સરકારી નોકરી અપડેટ્સ",
    jobsHeroDesc: "SSC, રેલવે અને પોલીસ ભરતી અપડેટ્સ.",
    selectLanguageTitle: "ભાષા પસંદ કરો",
    selectLanguageSubtitle: "તમારી પસંદગીની ભાષા પસંદ કરો"
  }
};

const AVAILABLE_LANGUAGES = [
  { code: 'hi', flag: '🇮🇳', nativeName: 'हिन्दी', englishName: 'Hindi' },
  { code: 'en', flag: '🇬🇧', nativeName: 'English', englishName: 'English' },
  { code: 'ur', flag: '🇵🇰', nativeName: 'اردو', englishName: 'Urdu' },
  { code: 'mr', flag: '🇮🇳', nativeName: 'मराठी', englishName: 'Marathi' },
  { code: 'ta', flag: '🇮🇳', nativeName: 'தமிழ்', englishName: 'Tamil' },
  { code: 'gu', flag: '🇮🇳', nativeName: 'ગુજરાતી', englishName: 'Gujarati' },
];

let currentLang = 'hi';

function openLanguageModal() {
  renderLanguageOptions();
  const modal = document.getElementById('modal-language-picker');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeLanguageModal() {
  const modal = document.getElementById('modal-language-picker');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function renderLanguageOptions() {
  const container = document.getElementById('language-options-container');
  if (!container) return;
  container.innerHTML = AVAILABLE_LANGUAGES.map(lang => {
    const isSelected = (currentLang === lang.code);
    return `
      <button type="button" onclick="selectLanguage('${lang.code}')" class="lang-option-card w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition transform active:scale-95 cursor-pointer ${
        isSelected 
          ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-500 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/30 shadow-sm' 
          : 'bg-slate-50 hover:bg-slate-100/90 dark:bg-slate-700/40 dark:hover:bg-slate-700/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
      }">
        <div class="flex items-center gap-3">
          <span class="text-2xl select-none leading-none">${lang.flag}</span>
          <div>
            <div class="text-sm font-bold leading-snug">${lang.nativeName}</div>
            <div class="text-[11px] text-slate-400 font-medium">${lang.englishName}</div>
          </div>
        </div>
        ${isSelected ? '<i class="fa-solid fa-circle-check text-brand-600 dark:text-brand-400 text-lg"></i>' : '<span class="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600"></span>'}
      </button>
    `;
  }).join('');
}

function selectLanguage(code) {
  changeAppLanguage(code);
  closeLanguageModal();
}

function updateLanguageDisplay() {
  const langObj = AVAILABLE_LANGUAGES.find(l => l.code === currentLang) || AVAILABLE_LANGUAGES[0];
  const authBtnText = document.getElementById('auth-lang-btn-text');
  const headerBtnText = document.getElementById('header-lang-btn-text');
  if (authBtnText) authBtnText.textContent = `${langObj.flag} ${langObj.nativeName}`;
  if (headerBtnText) headerBtnText.textContent = `${langObj.flag} ${langObj.nativeName}`;
}

function changeAppLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  localStorage.setItem('studypulse_lang', lang);

  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ur' ? 'rtl' : 'ltr');

  // Sync button labels
  updateLanguageDisplay();

  // Apply translations to all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      el.textContent = TRANSLATIONS[lang][key];
    }
  });

  // Update topbar title for active view
  const activeView = ['dashboard', 'syllabus', 'tests', 'exams', 'notes', 'jobs', 'materials', 'ai'].find(v => {
    const sec = document.getElementById(`section-${v}`);
    return sec && !sec.classList.contains('hidden') && sec.style.display !== 'none';
  }) || 'dashboard';
  const topbar = document.getElementById('topbar-title');
  if (topbar && typeof getViewTitle === 'function') {
    topbar.innerHTML = `<span>${getViewTitle(activeView)}</span>`;
  }

  // Re-render views to update dynamic language content
  if (typeof renderDashboardStats === 'function') renderDashboardStats();
  if (typeof renderJobs === 'function') renderJobs();
  if (typeof renderNotes === 'function') renderNotes();
}

function t(key, defaultVal = '') {
  if (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) {
    return TRANSLATIONS[currentLang][key];
  }
  return defaultVal || key;
}

// ==========================================
// 2. RS AGGARWAL MATHEMATICS COMPLETE NOTES
// ==========================================

const RS_AGGARWAL_NOTES = [
  {
    id: 'rsa_1',
    title: 'RS अग्रवाल: अध्याय 1 - संख्या पद्धति (Number System)',
    subject: 'RS अग्रवाल अंकगणित (R.S. Aggarwal Math)',
    content: `★ मुख्य नियम एवं शॉर्टकट ट्रिक्स (Number System Shortcuts):
1. इकाई का अंक (Unit Digit Trick):
   घात को 4 से भाग दें। जो शेषफल बचे, वही अंतिम घात होगी।
   उदा: 7^95 में घात 95 ÷ 4 = शेषफल 3. अतः 7^3 = 343 (इकाई अंक = 3)

2. विभाज्यता के नियम (Divisibility Rules):
   • 3 व 9: अंकों का योग 3 या 9 से कटना चाहिए।
   • 4: अंतिम 2 अंक 4 से कटने चाहिए।
   • 8: अंतिम 3 अंक 8 से कटने चाहिए।
   • 11: (विषम स्थानों के अंकों का योग) - (सम स्थानों के अंकों का योग) = 0 या 11 का गुणज।

★ RS अग्रवाल हल किया गया मॉडल प्रश्न:
प्रश्न: संख्या 432567 में 5 का स्थानीय मान (Place Value) और जातीय मान (Face Value) का अंतर क्या है?
हल: 
5 का स्थानीय मान = 5,000
5 का जातीय मान = 5
अंतर = 5000 - 5 = 4,995.`,
    pinned: true,
    createdAt: 'RS Aggarwal Master'
  },
  {
    id: 'rsa_2',
    title: 'RS अग्रवाल: अध्याय 8 - प्रतिशतता (Percentage Shortcuts)',
    subject: 'RS अग्रवाल अंकगणित (R.S. Aggarwal Math)',
    content: `★ भिन्न से प्रतिशत तालिका (Fraction to Percentage Table):
1/2 = 50%  | 1/3 = 33.33% | 1/4 = 25%   | 1/5 = 20%
1/6 = 16.66% | 1/7 = 14.28% | 1/8 = 12.5% | 1/9 = 11.11%
1/10 = 10% | 1/11 = 9.09% | 1/12 = 8.33% | 1/15 = 6.66%

★ रामबाण सूत्र (Net Percentage Change Formula):
कुल प्रतिशत बदलाव = a + b + (ab / 100)%
(वृद्धि के लिए + लें, कमी के लिए - लें)

★ RS अग्रवाल हल किया गया मॉडल प्रश्न:
प्रश्न: यदि किसी आयत की लंबाई में 20% की वृद्धि और चौड़ाई में 10% की कमी की जाए, तो क्षेत्रफल पर क्या प्रभाव पड़ेगा?
हल: 
a = +20, b = -10
प्रभाव = 20 - 10 + (20 × -10)/100 = 10 - 2 = +8% वृद्धि।`,
    pinned: true,
    createdAt: 'RS Aggarwal Master'
  },
  {
    id: 'rsa_3',
    title: 'RS अग्रवाल: अध्याय 9 - लाभ, हानि एवं बट्टा (Profit, Loss & Discount)',
    subject: 'RS अग्रवाल अंकगणित (R.S. Aggarwal Math)',
    content: `★ महत्वपूर्ण सूत्र:
1. लाभ% = (लाभ / CP) × 100
2. हानि% = (हानि / CP) × 100
3. विक्रय मूल्य (SP) = CP × (100 ± लाभ या हानि)%
4. अंकित मूल्य (MP) पर छूट: SP = MP × (100 - छूट)%

★ बेईमान दुकानदार ट्रिक (Dishonest Dealer Shortcut):
लाभ% = [त्रुटि / (सत्य मान - त्रुटि)] × 100%

★ RS अग्रवाल हल किया गया मॉडल प्रश्न:
प्रश्न: एक बेईमान दुकानदार 1 किग्रा के स्थान पर 900 ग्राम के बांट का उपयोग करता है। उसका लाभ प्रतिशत क्या है?
हल:
त्रुटि = 1000 - 900 = 100 ग्राम।
लाभ% = (100 / 900) × 100 = 100/9 = 11.11% (11 सही 1/9%) लाभ।`,
    pinned: true,
    createdAt: 'RS Aggarwal Master'
  },
  {
    id: 'rsa_4',
    title: 'RS अग्रवाल: अध्याय 18 & 19 - साधारण एवं चक्रवृद्धि ब्याज (SI & CI)',
    subject: 'RS अग्रवाल अंकगणित (R.S. Aggarwal Math)',
    content: `★ साधारण ब्याज (SI):
SI = (P × R × T) / 100
यदि कोई धन T वर्ष में n गुना हो जाता है:
दर R = [(n - 1) / T] × 100%

★ 2 और 3 वर्ष के CI और SI के अंतर का महा-सूत्र:
1. 2 वर्ष का अंतर:
   Diff = P × (R / 100)²
2. 3 वर्ष का अंतर:
   Diff = P × (R / 100)² × [(300 + R) / 100]

★ RS अग्रवाल हल किया गया मॉडल प्रश्न:
प्रश्न: ₹5000 की राशि पर 10% वार्षिक दर से 2 वर्ष के CI और SI का अंतर ज्ञात करें।
हल:
Diff = 5000 × (10/100)² = 5000 × (1/100) = ₹50.`,
    pinned: true,
    createdAt: 'RS Aggarwal Master'
  },
  {
    id: 'rsa_5',
    title: 'RS अग्रवाल: अध्याय 13 - समय और कार्य (Time & Work - LCM Method)',
    subject: 'RS अग्रवाल अंकगणित (R.S. Aggarwal Math)',
    content: `★ LCM कार्य क्षमता विधि (Efficiency Method):
कुल कार्य = दिनों का ल.स.प. (LCM)
एक दिन का कार्य (Efficiency) = कुल कार्य / कुल दिन

★ कार्य और मजदूरी (M1 D1 H1 सूत्र):
(M1 × D1 × H1) / W1 = (M2 × D2 × H2) / W2

★ RS अग्रवाल हल किया गया मॉडल प्रश्न:
प्रश्न: A किसी कार्य को 10 दिन में तथा B 15 दिन में करता है। दोनों मिलकर उस कार्य को कितने दिन में पूरा करेंगे?
हल:
10 और 15 का LCM = 30 (कुल कार्य)
A की क्षमता = 30 ÷ 10 = 3 कार्य/दिन
B की क्षमता = 30 ÷ 15 = 2 कार्य/दिन
दोनों की कुल क्षमता = 3 + 2 = 5 कार्य/दिन
कुल समय = 30 ÷ 5 = 6 दिन में कार्य पूर्ण।`,
    pinned: false,
    createdAt: 'RS Aggarwal Master'
  },
  {
    id: 'rsa_6',
    title: 'RS अग्रवाल: अध्याय 15 & 16 - चाल, समय, दूरी एवं रेलगाड़ी (Trains)',
    subject: 'RS अग्रवाल अंकगणित (R.S. Aggarwal Math)',
    content: `★ इकाई रूपांतरण (Unit Conversion):
• km/h को m/s में बदलना: चाल × 5/18
• m/s को km/h में बदलना: चाल × 18/5

★ औसत चाल (Average Speed - जब दूरी समान हो):
औसत चाल = (2 × x × y) / (x + y)

★ सापेक्ष चाल (Relative Speed for Trains):
• विपरीत दिशा (Opposite Direction) = चालों का योग (S1 + S2)
• समान दिशा (Same Direction) = चालों का अंतर (S1 - S2)
• खम्भे/व्यक्ति को पार करने में तय दूरी = केवल ट्रेन की लंबाई

★ RS अग्रवाल हल किया गया मॉडल प्रश्न:
प्रश्न: 150 मीटर लंबी रेलगाड़ी 54 किमी/घंटा की चाल से चलते हुए एक खंभे को कितने समय में पार करेगी?
हल:
ट्रेन की चाल = 54 × (5/18) = 15 मीटर/सेकंड
समय = दूरी / चाल = 150 / 15 = 10 सेकंड।`,
    pinned: false,
    createdAt: 'RS Aggarwal Master'
  }
];

// ==========================================
// 3. COMPETITIVE EXAM TEST QUESTIONS
// ==========================================

const COMPETITIVE_TESTS = [
  {
    id: 'comp_test_1',
    title: 'SSC CGL & CHSL 2026: RS अग्रवाल क्वांटिटेटिव एप्टीट्यूड मॉक टेस्ट',
    subject: 'गणित (Mathematics)',
    durationMinutes: 15,
    difficulty: 'कठिन (Competitive Exam Level)',
    difficultyColor: 'rose',
    icon: 'fa-graduation-cap',
    description: 'SSC CGL/CHSL टियर-1 के पैटर्न पर आधारित RS अग्रवाल अंकगणित के 10 चयनित प्रश्न।',
    questions: [
      {
        q: 'यदि A:B = 3:4 तथा B:C = 8:9 है, तो A:C का मान क्या होगा?',
        options: ['1:2', '2:3', '3:2', '1:3'],
        correctIndex: 1,
        explanation: 'A/C = (A/B) × (B/C) = (3/4) × (8/9) = 2/3. अतः A:C = 2:3.'
      },
      {
        q: 'एक व्यापारी किसी वस्तु के अंकित मूल्य पर 10% की छूट देकर भी 20% का लाभ कमाता है। यदि वस्तु का क्रय मूल्य ₹450 है, तो अंकित मूल्य क्या है?',
        options: ['₹550', '₹600', '₹650', '₹700'],
        correctIndex: 1,
        explanation: 'MP × (100 - D) = CP × (100 + P) => MP × 90 = 450 × 120 => MP = (450 × 120) / 90 = ₹600.'
      },
      {
        q: 'यदि (x + 1/x) = 5 है, तो (x² + 1/x²) का मान क्या होगा?',
        options: ['23', '25', '27', '21'],
        correctIndex: 0,
        explanation: 'सूत्र: x² + 1/x² = k² - 2. यहाँ k = 5, अतः 5² - 2 = 25 - 2 = 23.'
      },
      {
        q: '12 व्यक्ति किसी कार्य को 8 दिन में पूरा कर सकते हैं। उसी कार्य को 6 दिन में पूरा करने के लिए कितने व्यक्तियों की आवश्यकता होगी?',
        options: ['14', '16', '18', '20'],
        correctIndex: 1,
        explanation: 'M1 × D1 = M2 × D2 => 12 × 8 = M2 × 6 => M2 = 96 / 6 = 16 व्यक्ति।'
      },
      {
        q: '₹8,000 की राशि पर 5% वार्षिक दर से 3 वर्ष का साधारण ब्याज कितना होगा?',
        options: ['₹1000', '₹1200', '₹1500', '₹1600'],
        correctIndex: 1,
        explanation: 'SI = (P × R × T) / 100 = (8000 × 5 × 3) / 100 = ₹1,200.'
      },
      {
        q: 'दो संख्याओं का म.स. (HCF) 11 और ल.स. (LCM) 693 है। यदि एक संख्या 77 है, तो दूसरी संख्या क्या होगी?',
        options: ['88', '99', '110', '121'],
        correctIndex: 1,
        explanation: 'पहली संख्या × दूसरी संख्या = HCF × LCM => 77 × N2 = 11 × 693 => N2 = 693 / 7 = 99.'
      },
      {
        q: 'एक नाव की शांत जल में चाल 10 किमी/घं है तथा धारा की चाल 2 किमी/घं है। धारा की दिशा में 36 किमी जाने में कितना समय लगेगा?',
        options: ['2 घंटे', '3 घंटे', '4 घंटे', '5 घंटे'],
        correctIndex: 1,
        explanation: 'धारा की दिशा में चाल = 10 + 2 = 12 किमी/घंटा। समय = दूरी / चाल = 36 / 12 = 3 घंटे।'
      },
      {
        q: 'प्रथम 50 प्राकृतिक संख्याओं का औसत क्या होगा?',
        options: ['25', '25.5', '26', '50.5'],
        correctIndex: 1,
        explanation: 'प्रथम n प्राकृतिक संख्याओं का औसत = (n + 1) / 2 = (50 + 1) / 2 = 25.5.'
      },
      {
        q: 'एक वृत्त की त्रिज्या में 20% की वृद्धि होने पर उसके क्षेत्रफल में कितने प्रतिशत की वृद्धि होगी?',
        options: ['40%', '44%', '48%', '20%'],
        correctIndex: 1,
        explanation: 'क्षेत्रफल r² पर निर्भर करता है: a + b + (ab/100) = 20 + 20 + (400/100) = 44% वृद्धि।'
      },
      {
        q: '250 मीटर लंबी रेलगाड़ी 72 किमी/घं की चाल से 150 मीटर लंबे प्लेटफॉर्म को कितने समय में पार करेगी?',
        options: ['15 सेकंड', '20 सेकंड', '25 सेकंड', '30 सेकंड'],
        correctIndex: 1,
        explanation: 'कुल दूरी = 250 + 150 = 400 मी. चाल = 72 × (5/18) = 20 मी/सेकंड. समय = 400 / 20 = 20 सेकंड।'
      }
    ]
  },
  {
    id: 'comp_test_2',
    title: 'रेलवे RRB NTPC & Group D: सामान्य विज्ञान एवं रीजनिंग टेस्ट',
    subject: 'विज्ञान एवं रीजनिंग (Science & Reasoning)',
    durationMinutes: 12,
    difficulty: 'मध्यम (Railway Level)',
    difficultyColor: 'amber',
    icon: 'fa-train',
    description: 'RRB NTPC सीबीटी-1 के पिछले वर्षों के प्रश्नों पर आधारित विज्ञान एवं तार्किक अभिक्षमता।',
    questions: [
      {
        q: 'मानव शरीर में रक्त का थक्का बनने (Blood Clotting) में कौन सा विटामिन सहायक होता है?',
        options: ['विटामिन A', 'विटामिन C', 'विटामिन D', 'विटामिन K'],
        correctIndex: 3,
        explanation: 'विटामिन K (Phylloquinone) यकृत में प्रोथ्रोम्बिन का निर्माण कर रक्त स्कंदन में मदद करता है।'
      },
      {
        q: 'प्रकाश वर्ष (Light Year) निम्नलिखित में से किसका मात्रक है?',
        options: ['समय (Time)', 'दूरी (Distance)', 'प्रकाश की तीव्रता', 'द्रव्यमान'],
        correctIndex: 1,
        explanation: 'प्रकाश वर्ष खगोलीय दूरी (Distance) का मात्रक है। 1 प्रकाश वर्ष = 9.46 × 10¹⁵ मीटर।'
      },
      {
        q: 'यदि जल का क्वथनांक 100°C है, तो केल्विन (Kelvin) पैमाने पर इसका मान क्या होगा?',
        options: ['273 K', '373 K', '212 K', '100 K'],
        correctIndex: 1,
        explanation: 'K = °C + 273.15 => 100 + 273 = 373 K.'
      },
      {
        q: 'आवर्त सारणी (Periodic Table) के किस समूह को "उत्कृष्ट गैसें" (Noble Gases) कहा जाता है?',
        options: ['समूह 1', 'समूह 17', 'समूह 18', 'समूह 2'],
        correctIndex: 2,
        explanation: 'समूह 18 (हीलियम, नियॉन, ऑर्गन, क्रिप्टॉन, ज़ीनॉन, रेडॉन) को उत्कृष्ट या अक्रिय गैसें कहा जाता है।'
      },
      {
        q: 'रीजनिंग: यदि TEACHER को VGCEJGT लिखा जाता है, तो CHILDREN को क्या लिखा जाएगा?',
        options: ['EJKNFTGP', 'EJKNFPGT', 'EKJNFTGP', 'FKLNFTGP'],
        correctIndex: 0,
        explanation: 'प्रत्येक अक्षर में +2 किया गया है: C+2=E, H+2=J, I+2=K, L+2=N, D+2=F, R+2=T, E+2=G, N+2=P -> EJKNFTGP.'
      }
    ]
  },
  {
    id: 'comp_test_3',
    title: 'सामान्य अध्ययन (GS) & समसामयिकी: SSC, Police व State PSC विशेष',
    subject: 'सामान्य ज्ञान (GK & GS)',
    durationMinutes: 10,
    difficulty: 'मध्यम (Govt Exam General Studies)',
    difficultyColor: 'emerald',
    icon: 'fa-landmark',
    description: 'भारतीय संविधान, इतिहास, भूगोल और अर्थव्यवस्था के बार-बार पूछे जाने वाले प्रश्न।',
    questions: [
      {
        q: 'भारतीय संविधान के किस अनुच्छेद को डॉ. बी. आर. आंबेडकर ने "संविधान का हृदय और आत्मा" कहा था?',
        options: ['अनुच्छेद 14', 'अनुच्छेद 19', 'अनुच्छेद 21', 'अनुच्छेद 32'],
        correctIndex: 3,
        explanation: 'अनुच्छेद 32 (संवैधानिक उपचारों का अधिकार) को डॉ. आंबेडकर ने संविधान की आत्मा कहा था।'
      },
      {
        q: 'भारत में नीति आयोग (NITI Aayog) की स्थापना किस वर्ष की गई थी?',
        options: ['2014', '2015', '2016', '2017'],
        correctIndex: 1,
        explanation: '1 जनवरी 2015 को योजना आयोग के स्थान पर नीति आयोग (National Institution for Transforming India) का गठन हुआ।'
      },
      {
        q: 'कर्क रेखा (Tropic of Cancer) भारत के कितने राज्यों से होकर गुजरती है?',
        options: ['6', '7', '8', '9'],
        correctIndex: 2,
        explanation: 'कर्क रेखा भारत के 8 राज्यों से गुजरती है: गुजरात, राजस्थान, म.प्र., छत्तीसगढ़, झारखंड, प. बंगाल, त्रिपुरा, मिजोरम।'
      },
      {
        q: 'भारतीय रिजर्व बैंक (RBI) की स्थापना किस वर्ष हुई थी?',
        options: ['1930', '1935', '1947', '1950'],
        correctIndex: 1,
        explanation: 'RBI की स्थापना 1 अप्रैल 1935 को भारतीय रिजर्व बैंक अधिनियम 1934 के तहत कोलकाता में हुई थी।'
      },
      {
        q: '1857 की क्रांति का नेतृत्व लखनऊ में किसने किया था?',
        options: ['रानी लक्ष्मीबाई', 'बेगम हज़रत महल', 'कुंवर सिंह', 'नाना साहेब'],
        correctIndex: 1,
        explanation: 'लखनऊ में 1857 के विद्रोह का नेतृत्व बेगम हज़रत महल ने अपने अल्पवयस्क पुत्र बिरजिस क़ाद्र के साथ किया था।'
      }
    ]
  }
];

// ==========================================
// 4. LIVE GOVERNMENT EXAM & JOB UPDATES
// ==========================================

const DEFAULT_JOBS = [
  {
    id: 'job_1',
    category: 'SSC',
    title: 'SSC CGL 2026 संयुक्त स्नातक स्तरीय भर्ती',
    department: 'Staff Selection Commission (SSC)',
    vacancies: '14,500+ पद',
    qualification: 'किसी भी विषय में स्नातक (Bachelor\'s Degree)',
    ageLimit: '18 से 32 वर्ष (पदानुसार नियमानुसार छूट)',
    lastDate: '30/10/2026',
    examDate: 'दिसंबर 2026',
    status: 'Live',
    badgeColor: 'emerald',
    description: 'भारत सरकार के मंत्रालयों और विभागों में सहायक अनुभाग अधिकारी (ASO), आयकर निरीक्षक (Income Tax Inspector), केंद्रीय उत्पाद शुल्क निरीक्षक (GST Inspector), सब इंस्पेक्टर (CBI), ऑडिटर और टैक्स असिस्टेंट पदों पर सीधी भर्ती।',
    pattern: 'टियर-1 (सीबीटी): क्वांट (25), रीजनिंग (25), सामान्य अध्ययन (25), अंग्रेजी (25) - कुल 100 प्रश्न 200 अंक।\nटियर-2: विस्तृत गणित व अंग्रेजी दक्षता।'
  },
  {
    id: 'job_2',
    category: 'Railway',
    title: 'रेलवे RRB NTPC 2026 महा-भर्ती (Non-Technical)',
    department: 'Railway Recruitment Boards (RRB)',
    vacancies: '11,558 पद',
    qualification: '12वीं पास / स्नातक (Undergraduate & Graduate)',
    ageLimit: '18 से 36 वर्ष',
    lastDate: '15/11/2026',
    examDate: 'जनवरी - फरवरी 2027',
    status: 'New',
    badgeColor: 'rose',
    description: 'भारतीय रेल में स्टेशन मास्टर, गुड्स ट्रेन मैनेजर, मुख्य वाणिज्यिक सह टिकट पर्यवेक्षक, वरिष्ठ क्लर्क कम टाइपिस्ट, और कनिष्ठ लेखा सहायक पदों हेतु केंद्रीयकृत अधिसूचना।',
    pattern: 'सीबीटी-1: गणित (30 प्रश्न), सामान्य बुद्धिमत्ता (30 प्रश्न), सामान्य जागरूकता (40 प्रश्न) - समय 90 मिनट।\nनेगेटिव मार्किंग: 1/3 अंक।'
  },
  {
    id: 'job_3',
    category: 'Banking',
    title: 'SBI PO एवं क्लर्क (Junior Associates) भर्ती 2026',
    department: 'State Bank of India (SBI)',
    vacancies: '8,283 पद',
    qualification: 'स्नातक (Graduation in Any Stream)',
    ageLimit: '20 से 28 वर्ष (क्लर्क) / 21 से 30 वर्ष (PO)',
    lastDate: '25/10/2026',
    examDate: 'नवंबर 2026 (Prelims)',
    status: 'Expiring Soon',
    badgeColor: 'amber',
    description: 'देश के सबसे बड़े सरकारी बैंक एसबीआई में प्रोबेशनरी ऑफिसर (PO) और कस्टमर सपोर्ट व सेल्स जूनियर एसोसिएट्स पदों पर भर्ती। आकर्षक वेतन व भत्ते।',
    pattern: 'प्रीलिम्स परीक्षा (100 अंक 1 घंटा): अंग्रेजी (30 प्रश्न), क्वांटिटेटिव एप्टीट्यूड (35 प्रश्न), रीजनिंग (35 प्रश्न)।'
  },
  {
    id: 'job_4',
    category: 'Police',
    title: 'उत्तर प्रदेश एवं राज्य पुलिस कांस्टेबल व SI भर्ती',
    department: 'Police Recruitment & Promotion Board',
    vacancies: '60,244 पद',
    qualification: '12वीं पास (कांस्टेबल) / स्नातक (सब-इंस्पेक्टर)',
    ageLimit: '18 से 25 वर्ष (आरक्षित वर्गों को आयु सीमा में छूट)',
    lastDate: '20/11/2026',
    examDate: 'दिसंबर 2026',
    status: 'Live',
    badgeColor: 'emerald',
    description: 'राज्य पुलिस बल एवं पीएसी (PAC) में नागरिक पुलिस आरक्षी और उप-निरीक्षक पदों पर बंपर भर्ती। चयन लिखित परीक्षा, शारीरिक दक्षता (PET) एवं मेडिकल से होगा।',
    pattern: 'लिखित परीक्षा (150 प्रश्न 300 अंक): सामान्य ज्ञान (38 प्रश्न), सामान्य हिंदी (37 प्रश्न), संख्यात्मक व मानसिक क्षमता (38 प्रश्न), मानसिक अभिरुचि व रीजनिंग (37 प्रश्न)।'
  },
  {
    id: 'job_5',
    category: 'UPSC',
    title: 'UPSC सिविल सेवा परीक्षा (IAS, IPS, IFS) 2026',
    department: 'Union Public Service Commission',
    vacancies: '1,056 पद',
    qualification: 'किसी भी मान्यता प्राप्त विश्वविद्यालय से स्नातक',
    ageLimit: '21 से 32 वर्ष (ओबीसी 3 वर्ष, एससी/एसटी 5 वर्ष छूट)',
    lastDate: '05/03/2027',
    examDate: '24 मई 2027 (Prelims)',
    status: 'Upcoming',
    badgeColor: 'indigo',
    description: 'देश की सर्वोच्च प्रशासनिक सेवा (IAS), भारतीय पुलिस सेवा (IPS), भारतीय विदेश सेवा (IFS) एवं केंद्रीय ग्रुप-A सेवाओं में भर्ती हेतु प्रतिष्ठित परीक्षा।',
    pattern: 'प्रारंभिक परीक्षा: पेपर-1 सामान्य अध्ययन (GS-1) 200 अंक + पेपर-2 CSAT (क्वालीफाइंग 33%) 200 अंक।'
  },
  {
    id: 'job_6',
    category: 'Teaching',
    title: 'CTET केंद्रीय शिक्षक पात्रता परीक्षा 2026',
    department: 'Central Board of Secondary Education (CBSE)',
    vacancies: 'केंद्रीय / नवोदय / KVS शिक्षक पात्रता',
    qualification: 'D.El.Ed / B.Ed / 50% अंकों के साथ स्नातक',
    ageLimit: 'न्यूनतम 18 वर्ष (कोई अधिकतम आयु सीमा नहीं)',
    lastDate: '28/11/2026',
    examDate: 'दिसंबर 2026',
    status: 'Live',
    badgeColor: 'emerald',
    description: 'KVS, NVS, DSSSB और अन्य केंद्रीय विद्यालयों में कक्षा 1 से 8 तक शिक्षक बनने के लिए अनिवार्य केंद्रीय शिक्षक पात्रता परीक्षा (CTET)। प्रमाण पत्र आजीवन वैध।',
    pattern: 'पेपर-1 (कक्षा 1-5): बाल विकास, भाषा-1, भाषा-2, गणित, पर्यावरण (150 प्रश्न 150 अंक)।\nपेपर-2 (कक्षा 6-8): बाल विकास, भाषाएं, गणित व विज्ञान या सामाजिक अध्ययन।'
  }
];

// ==========================================
// 5. APPLICATION STATE & DATA STORES
// ==========================================

const DEFAULT_DEMO_USER = {
  id: 'usr_demo_1',
  name: 'राहुल शर्मा',
  username: 'student',
  password: '123',
  avatar: '👨‍🎓',
  customPhoto: null,
  referralCode: 'SP-849201',
  referralCount: 3,
  referralCoins: 300,
  targetExam: 'SSC CGL / CHSL 2026',
  streak: 5,
  joinedAt: new Date().toISOString()
};

const DEFAULT_SYLLABUS = [
  {
    id: 'syl_rsa_1',
    subject: 'गणित (Mathematics)',
    chapter: 'आर एस अग्रवाल: संख्या पद्धति एवं सरलीकरण (Number System)',
    topics: [
      { id: 't_rsa_1', name: 'इकाई का अंक (Unit Digit) एवं शेषफल प्रमेय', completed: true },
      { id: 't_rsa_2', name: 'विभाज्यता के नियम (2, 3, 7, 11, 13)', completed: true },
      { id: 't_rsa_3', name: 'BODMAS एवं दशमलव भिन्न सरलीकरण', completed: true },
      { id: 't_rsa_4', name: 'घात, घातांक एवं करणी के नियम', completed: false }
    ]
  },
  {
    id: 'syl_rsa_2',
    subject: 'गणित (Mathematics)',
    chapter: 'आर एस अग्रवाल: व्यावसायिक अंकगणित (Arithmetic)',
    topics: [
      { id: 't_rsa_5', name: 'प्रतिशतता (Percentage) - भिन्न रूपांतरण व शॉर्ट ट्रिक्स', completed: true },
      { id: 't_rsa_6', name: 'लाभ, हानि एवं बट्टा (Profit, Loss & Discount)', completed: true },
      { id: 't_rsa_7', name: 'साधारण ब्याज (SI) एवं चक्रवृद्धि ब्याज (CI)', completed: false },
      { id: 't_rsa_8', name: 'अनुपात, समानुपात एवं मिश्रण (Ratio & Alligation)', completed: false }
    ]
  },
  {
    id: 'syl_rsa_3',
    subject: 'गणित (Mathematics)',
    chapter: 'आर एस अग्रवाल: गति, समय व कार्य (Speed & Work)',
    topics: [
      { id: 't_rsa_9', name: 'समय और कार्य (Time & Work - LCM विधि)', completed: true },
      { id: 't_rsa_10', name: 'पाइप तथा टंकी (Pipes & Cisterns)', completed: false },
      { id: 't_rsa_11', name: 'चाल, समय और दूरी तथा रेलगाड़ी (Trains)', completed: false }
    ]
  },
  {
    id: 'syl_science',
    subject: 'विज्ञान (Science)',
    chapter: 'सामान्य विज्ञान: भौतिकी एवं रसायन विज्ञान (General Science)',
    topics: [
      { id: 'ts_1', name: 'मात्रक, गति और न्यूटन के नियम', completed: true },
      { id: 'ts_2', name: 'प्रकाश: दर्पण और लेंस के सूत्र', completed: true },
      { id: 'ts_3', name: 'विद्युत धारा, ओम का नियम एवं शक्ति', completed: false },
      { id: 'ts_4', name: 'रासायनिक अभिक्रियाएं, अम्ल, क्षार व लवण', completed: false }
    ]
  },
  {
    id: 'syl_gk',
    subject: 'सामान्य ज्ञान (GK & GS)',
    chapter: 'भारतीय संविधान, राजव्यवस्था एवं इतिहास (Polity & History)',
    topics: [
      { id: 'tg_1', name: 'संविधान सभा, प्रस्तावना और मौलिक अधिकार (12-35)', completed: true },
      { id: 'tg_2', name: 'राष्ट्रपति, संसद एवं सर्वोच्च न्यायालय', completed: true },
      { id: 'tg_3', name: '1857 की क्रांति और भारतीय राष्ट्रीय आंदोलन', completed: false },
      { id: 'tg_4', name: 'भारत का भूगोल एवं नदियां', completed: false }
    ]
  }
];

function getFutureDate(daysAhead) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
}

const DEFAULT_EXAMS = [
  {
    id: 'exam_1',
    title: 'SSC CGL 2026 टियर-1 संयुक्त स्नातक स्तरीय परीक्षा',
    subject: 'गणित, रीजनिंग, GS, English',
    date: getFutureDate(28),
    time: '09:30',
    mode: 'ऑनलाइन (Computer Based CBT)',
    notes: 'क्वांट, रीजनिंग और सामान्य अध्ययन का संपूर्ण सिलेबस। ओरिजिनल आईडी व एडमिट कार्ड साथ ले जाएं।',
    status: 'upcoming'
  },
  {
    id: 'exam_2',
    title: 'रेलवे RRB NTPC सीबीटी-1 स्टेज परीक्षा',
    subject: 'गणित एवं सामान्य जागरूकता',
    date: getFutureDate(45),
    time: '14:00',
    mode: 'ऑनलाइन (Computer Based CBT)',
    notes: 'RS अग्रवाल अंकगणित और पिछले 10 वर्षों के सामान्य विज्ञान के प्रश्न दोहराएं।',
    status: 'upcoming'
  }
];

const DEFAULT_TASKS = [
  { id: 'task_1', title: 'RS अग्रवाल: प्रतिशतता अध्याय के 20 प्रश्न हल करना', completed: true },
  { id: 'task_2', title: 'संविधान के मौलिक अधिकारों के अनुच्छेद 14 से 32 दोहराना', completed: true },
  { id: 'task_3', title: 'SSC CGL क्वांटिटेटिव एप्टीट्यूड का 15 मिनट का मॉक टेस्ट देना', completed: false },
  { id: 'task_4', title: 'रेलवे RRB NTPC की अधिसूचना व योग्यता जांचना', completed: false }
];

const DEFAULT_TEST_HISTORY = [
  {
    testTitle: 'SSC CGL 2026: RS अग्रवाल क्वांटिटेटिव एप्टीट्यूड',
    subject: 'गणित (Mathematics)',
    date: '29/09/2026',
    score: '9 / 10',
    percentage: 90,
    status: 'उत्कृष्ट (Passed)'
  }
];

// Global State (Directly populated from MongoDB Atlas)
let currentUser = null;
let currentSyllabus = [];
let currentExams = [];
let currentNotes = [];
let currentTasks = [];
let currentTestHistory = [];
let currentJobs = [];
let activeJobCategory = 'all';

// Pomodoro State
let pomoInterval = null;
let pomoSecondsLeft = 25 * 60;
let pomoIsRunning = false;
let pomoMode = 'work';

// Live Test State
let activeRunningTest = null;
let activeTestIndex = 0;
let activeUserAnswers = {};
let testTimerInterval = null;
let testSecondsLeft = 0;
let testStartTime = 0;

// Selected Job for Modal
let selectedJobForModal = null;

// ==========================================
// 6. INITIALIZATION & STORAGE (MONGODB ATLAS)
// ==========================================

async function initStorage() {
  // Load saved language
  const savedLang = localStorage.getItem('studypulse_lang') || 'hi';
  currentLang = savedLang;

  // Load Dark Mode
  const isDark = localStorage.getItem('studypulse_theme') === 'dark';
  if (isDark) {
    document.documentElement.classList.add('dark');
    updateThemeIcon(true);
  } else {
    document.documentElement.classList.remove('dark');
    updateThemeIcon(false);
  }

  // Apply Language
  changeAppLanguage(savedLang);

  // Fetch Mobile & Remote Network Info
  fetchNetworkInfo();

  // Check MongoDB Atlas Server Health
  try {
    if (window.StudyPulseAPI) {
      const health = await StudyPulseAPI.checkHealth();
      console.log('[StudyPulse] MongoDB Atlas Server Health:', health);
      const badge = document.getElementById('mongo-status-badge');
      if (badge && health && health.database && health.database.connected) {
        badge.classList.remove('hidden');
        badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span class="hidden md:inline">MongoDB</span><span class="text-[10px] uppercase font-mono tracking-wider bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 px-1.5 py-0.5 rounded-md">Atlas</span>`;
      }
    }
  } catch (err) {
    console.warn('[StudyPulse] MongoDB Atlas server connection check deferred:', err.message);
  }

  // Auto-Connect StudyPulse AI / Gemini Engine (100% Zero-Config)
  if (typeof autoConnectAiEngine === 'function') {
    autoConnectAiEngine();
  }

  // Check URL query parameters for referral code
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get('ref');
    if (refParam) {
      const signupRefInput = document.getElementById('signup-referral');
      if (signupRefInput) {
        signupRefInput.value = refParam.toUpperCase();
        switchAuthTab('signup');
      }
    }
  } catch (err) {
    console.error('URL param parsing error', err);
  }

  // Verify Active Session (Fail-safe: Never wipe session on network or connection errors!)
  const sessionUser = JSON.parse(localStorage.getItem('studypulse_session') || sessionStorage.getItem('studypulse_session') || 'null');
  if (sessionUser && (sessionUser.id || sessionUser._id)) {
    currentUser = sessionUser;

    // Background profile refresh from live database without blocking or kicking out the user
    if (window.StudyPulseAPI) {
      StudyPulseAPI.auth.getProfile(sessionUser.id || sessionUser._id)
        .then(async (profRes) => {
          if (profRes && profRes.success && profRes.user) {
            await loadUserData(profRes.user);
          } else if (profRes && profRes.success === false && (profRes.status === 401 || profRes.status === 403)) {
            // Only wipe session if server explicitly revoked or blocked the account
            localStorage.removeItem('studypulse_session');
            sessionStorage.removeItem('studypulse_session');
            currentUser = null;
            showAuthView();
          }
        })
        .catch((e) => {
          console.warn('[StudyPulse] Offline / background session sync notice:', e.message);
        });
    }

    await loadUserData(sessionUser);
    showAppView();
    if (typeof syncPendingSignups === 'function') {
      syncPendingSignups();
    }
    return;
  } else {
    showAuthView();
  }
}

async function loadUserData(user) {
  if (!user) return;
  // Normalize user ID
  user.id = user.id || user._id;
  if (!user.referralCode) {
    user.referralCode = 'SP-' + Math.floor(100000 + Math.random() * 900000);
  }
  if (typeof user.referralCount !== 'number') user.referralCount = 0;
  if (typeof user.referralCoins !== 'number') user.referralCoins = 100;
  if (user.customPhoto === undefined) user.customPhoto = null;
  if (!user.targetExam) user.targetExam = 'SSC CGL / CHSL 2026';

  currentUser = user;
  localStorage.setItem('studypulse_session', JSON.stringify(user));
  updateUserHeaderProfile();

  // Load LIVE data directly and exclusively from MongoDB Atlas via StudyPulseAPI
  const userPrefix = `studypulse_${user.id}_`;
  if (window.StudyPulseAPI) {
    try {
      // 1. Fetch user notes from MongoDB Atlas
      const notesRes = await StudyPulseAPI.notes.getAll(user.id);
      currentNotes = (notesRes && Array.isArray(notesRes.data)) ? notesRes.data : [];
    } catch (e) {
      console.warn('Notes load error (using local cache):', e.message);
      try { currentNotes = JSON.parse(localStorage.getItem(userPrefix + 'notes') || '[]'); } catch (_) { currentNotes = []; }
    }

    try {
      // 2. Fetch competitive mock tests from MongoDB Atlas
      const testsRes = await StudyPulseAPI.tests.getAll();
      window.COMPETITIVE_TESTS_DATA = (testsRes && Array.isArray(testsRes.data)) ? testsRes.data : [];
    } catch (e) {
      console.warn('Tests load error (using local cache):', e.message);
      try { window.COMPETITIVE_TESTS_DATA = JSON.parse(localStorage.getItem('studypulse_cached_tests') || '[]'); } catch (_) { window.COMPETITIVE_TESTS_DATA = []; }
    }

    try {
      // 3. Fetch test history from MongoDB Atlas
      const histRes = await StudyPulseAPI.tests.getHistory(user.id);
      currentTestHistory = (histRes && Array.isArray(histRes.data)) ? histRes.data : [];
    } catch (e) {
      console.warn('History load error (using local cache):', e.message);
      try { currentTestHistory = JSON.parse(localStorage.getItem(userPrefix + 'test_history') || '[]'); } catch (_) { currentTestHistory = []; }
    }

    try {
      // 4. Fetch govt jobs from MongoDB Atlas
      const jobsRes = await StudyPulseAPI.jobs.getAll();
      currentJobs = (jobsRes && Array.isArray(jobsRes.data)) ? jobsRes.data : [];
    } catch (e) {
      console.warn('Jobs load error (using local cache):', e.message);
      try { currentJobs = JSON.parse(localStorage.getItem('studypulse_cached_jobs') || '[]'); } catch (_) { currentJobs = []; }
    }

    try {
      // 5. Fetch syllabus chapters and topics from MongoDB Atlas
      const sylRes = await StudyPulseAPI.syllabus.getAll(user.id);
      currentSyllabus = (sylRes && Array.isArray(sylRes.data)) ? sylRes.data : [];
    } catch (e) {
      console.warn('Syllabus load error (using local cache):', e.message);
      try { currentSyllabus = JSON.parse(localStorage.getItem(userPrefix + 'syllabus') || '[]'); } catch (_) { currentSyllabus = []; }
    }

    try {
      // 6. Fetch upcoming exams from MongoDB Atlas
      const examsRes = await StudyPulseAPI.exams.getAll(user.id);
      currentExams = (examsRes && Array.isArray(examsRes.data)) ? examsRes.data : [];
    } catch (e) {
      console.warn('Exams load error (using local cache):', e.message);
      try { currentExams = JSON.parse(localStorage.getItem(userPrefix + 'exams') || '[]'); } catch (_) { currentExams = []; }
    }

    try {
      // 7. Fetch daily targets from MongoDB Atlas
      const tasksRes = await StudyPulseAPI.tasks.getAll(user.id);
      currentTasks = (tasksRes && Array.isArray(tasksRes.data)) ? tasksRes.data : [];
    } catch (e) {
      console.warn('Tasks load error (using local cache):', e.message);
      try { currentTasks = JSON.parse(localStorage.getItem(userPrefix + 'tasks') || '[]'); } catch (_) { currentTasks = []; }
    }

    try {
      // 8. Fetch PDF study materials from MongoDB Atlas
      const matsRes = await StudyPulseAPI.materials.getAll();
      currentMaterials = (matsRes && Array.isArray(matsRes.data)) ? matsRes.data : [];
    } catch (e) {
      console.warn('Materials load error (using local cache):', e.message);
      try { currentMaterials = JSON.parse(localStorage.getItem('studypulse_cached_materials') || '[]'); } catch (_) { currentMaterials = []; }
    }
  } else {
    const userPrefix = `studypulse_${user.id}_`;
    try { currentNotes = JSON.parse(localStorage.getItem(userPrefix + 'notes') || '[]'); } catch (_) { currentNotes = []; }
    try { currentTasks = JSON.parse(localStorage.getItem(userPrefix + 'tasks') || '[]'); } catch (_) { currentTasks = []; }
    try { currentSyllabus = JSON.parse(localStorage.getItem(userPrefix + 'syllabus') || '[]'); } catch (_) { currentSyllabus = []; }
    try { currentExams = JSON.parse(localStorage.getItem(userPrefix + 'exams') || '[]'); } catch (_) { currentExams = []; }
    try { currentTestHistory = JSON.parse(localStorage.getItem(userPrefix + 'test_history') || '[]'); } catch (_) { currentTestHistory = []; }
    window.COMPETITIVE_TESTS_DATA = [];
    currentJobs = [];
    currentMaterials = [];
  }

  updateUserHeaderProfile();
  refreshAllViews();
}

function saveUserData() {
  if (!currentUser) return;
  const userPrefix = `studypulse_${currentUser.id}_`;
  localStorage.setItem(userPrefix + 'syllabus', JSON.stringify(currentSyllabus));
  localStorage.setItem(userPrefix + 'exams', JSON.stringify(currentExams));
  localStorage.setItem(userPrefix + 'notes', JSON.stringify(currentNotes));
  localStorage.setItem(userPrefix + 'tasks', JSON.stringify(currentTasks));
  localStorage.setItem(userPrefix + 'test_history', JSON.stringify(currentTestHistory));
}


// ==========================================
// 7. AUTHENTICATION & FAIL-SAFE DUAL ENGINE
// ==========================================

const STUDYPULSE_DEFAULT_ACCOUNTS = [
  {
    id: "usr_demo_1",
    _id: "usr_demo_1",
    name: "राहुल शर्मा",
    username: "student",
    password: "123",
    plainPassword: "123",
    role: "student",
    status: "active",
    avatar: "👨‍🎓",
    referralCode: "SP-849201",
    referralCount: 3,
    referralCoins: 300,
    targetExam: "SSC CGL / CHSL 2026",
    streak: 1
  },
  {
    id: "usr_admin_1",
    _id: "usr_admin_1",
    name: "Super Admin",
    username: "admin",
    password: "admin123",
    plainPassword: "admin123",
    role: "admin",
    status: "active",
    avatar: "👨‍💼",
    referralCode: "SP-ADMIN",
    referralCount: 0,
    referralCoins: 9999,
    targetExam: "All Competitive Exams",
    streak: 1
  },
  {
    id: "usr_demo_2",
    _id: "usr_demo_2",
    name: "अमित पटेल",
    username: "amit_ias",
    password: "pass123",
    plainPassword: "pass123",
    role: "student",
    status: "active",
    avatar: "👩‍🎓",
    referralCode: "SP-924102",
    referralCount: 1,
    referralCoins: 200,
    targetExam: "UPSC Civil Services (IAS/IPS)",
    streak: 8
  },
  {
    id: "usr_demo_3",
    _id: "usr_demo_3",
    name: "प्रिया वर्मा",
    username: "priya_rrb",
    password: "rrb2026",
    plainPassword: "rrb2026",
    role: "student",
    status: "active",
    avatar: "🚀",
    referralCode: "SP-381904",
    referralCount: 5,
    referralCoins: 500,
    targetExam: "रेलवे RRB NTPC / Group D",
    streak: 12
  },
  {
    id: "usr_1791292744291",
    _id: "usr_1791292744291",
    name: "sumit",
    username: "sumit",
    password: "1234",
    plainPassword: "1234",
    role: "student",
    status: "active",
    avatar: "👨‍🎓",
    referralCode: "SP-894101",
    referralCount: 0,
    referralCoins: 100,
    targetExam: "SSC CGL / CHSL 2026",
    streak: 1
  }
];

function getLocalUsers() {
  try {
    const custom = JSON.parse(localStorage.getItem('studypulse_local_users') || '[]');
    const map = new Map();
    STUDYPULSE_DEFAULT_ACCOUNTS.forEach(u => map.set(u.username.toLowerCase(), { ...u }));
    if (Array.isArray(custom)) {
      custom.forEach(u => {
        if (u && u.username) map.set(u.username.toLowerCase(), { ...u });
      });
    }
    return Array.from(map.values());
  } catch (e) {
    return STUDYPULSE_DEFAULT_ACCOUNTS;
  }
}

function saveLocalUser(user, plainPassword) {
  if (!user || !user.username) return;
  try {
    const list = JSON.parse(localStorage.getItem('studypulse_local_users') || '[]');
    const uname = user.username.toLowerCase();
    const cleanUser = {
      ...user,
      id: user.id || user._id || `usr_${Date.now()}`,
      username: user.username,
      plainPassword: plainPassword || user.plainPassword || user.password
    };
    const idx = list.findIndex(u => u.username && u.username.toLowerCase() === uname);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...cleanUser };
    } else {
      list.push(cleanUser);
    }
    localStorage.setItem('studypulse_local_users', JSON.stringify(list));
  } catch (e) {
    console.warn('[StudyPulse] Error saving local user:', e);
  }
}

function findLocalUser(identifier) {
  if (!identifier) return null;
  const idStr = String(identifier).trim().toLowerCase();
  const allUsers = getLocalUsers();
  return allUsers.find(u => {
    return (
      (u.username && u.username.toLowerCase() === idStr) ||
      (u.name && u.name.toLowerCase() === idStr) ||
      (u.email && u.email.toLowerCase() === idStr) ||
      (u.phone && String(u.phone).trim() === idStr) ||
      (u.id && String(u.id).toLowerCase() === idStr) ||
      (u._id && String(u._id).toLowerCase() === idStr)
    );
  }) || null;
}

function queuePendingSignup(userData) {
  try {
    const queue = JSON.parse(localStorage.getItem('studypulse_pending_signups') || '[]');
    queue.push(userData);
    localStorage.setItem('studypulse_pending_signups', JSON.stringify(queue));
  } catch (e) {}
}

async function syncPendingSignups() {
  if (!window.StudyPulseAPI || !navigator.onLine) return;
  try {
    const queue = JSON.parse(localStorage.getItem('studypulse_pending_signups') || '[]');
    if (!queue.length) return;
    const remaining = [];
    for (const item of queue) {
      try {
        await StudyPulseAPI.auth.signup(item);
      } catch (err) {
        if (!err.isNetworkError && !String(err.message).includes('लिया जा चुका')) {
          remaining.push(item);
        }
      }
    }
    localStorage.setItem('studypulse_pending_signups', JSON.stringify(remaining));
  } catch (e) {}
}
window.addEventListener('online', syncPendingSignups);

function switchAuthTab(mode) {
  const loginTab = document.getElementById('tab-login');
  const signupTab = document.getElementById('tab-signup');
  const formLogin = document.getElementById('form-login');
  const formSignup = document.getElementById('form-signup');
  const alertBox = document.getElementById('auth-alert');
  if (alertBox) alertBox.classList.add('hidden');

  if (mode === 'login') {
    if (loginTab) loginTab.className = "flex-1 py-2 text-sm font-semibold rounded-lg transition-all shadow-sm bg-white text-brand-600 dark:bg-slate-800 dark:text-brand-400";
    if (signupTab) signupTab.className = "flex-1 py-2 text-sm font-semibold rounded-lg transition-all text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white";
    if (formLogin) formLogin.classList.remove('hidden');
    if (formSignup) formSignup.classList.add('hidden');
  } else {
    if (signupTab) signupTab.className = "flex-1 py-2 text-sm font-semibold rounded-lg transition-all shadow-sm bg-white text-brand-600 dark:bg-slate-800 dark:text-brand-400";
    if (loginTab) loginTab.className = "flex-1 py-2 text-sm font-semibold rounded-lg transition-all text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white";
    if (formSignup) formSignup.classList.remove('hidden');
    if (formLogin) formLogin.classList.add('hidden');
  }
}

function togglePasswordVisibility(inputId, eyeId) {
  const input = document.getElementById(inputId);
  const eye = document.getElementById(eyeId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    if (eye) eye.className = 'fa-regular fa-eye-slash text-sm';
  } else {
    input.type = 'password';
    if (eye) eye.className = 'fa-regular fa-eye text-sm';
  }
}

function showAuthAlert(message, type = 'error') {
  const alertBox = document.getElementById('auth-alert');
  if (!alertBox) {
    alert(message);
    return;
  }
  alertBox.classList.remove('hidden');
  alertBox.style.display = 'flex';
  if (type === 'error') {
    alertBox.className = 'mb-4 p-3.5 rounded-xl text-sm flex items-center gap-2 bg-rose-500/20 text-rose-200 border border-rose-400/40 backdrop-blur-md shadow-lg';
    alertBox.innerHTML = `<i class="fa-solid fa-circle-exclamation text-base text-rose-400 shrink-0"></i><span>${message}</span>`;
  } else if (type === 'info') {
    alertBox.className = 'mb-4 p-3.5 rounded-xl text-sm flex items-center gap-2 bg-indigo-500/20 text-indigo-200 border border-indigo-400/40 backdrop-blur-md shadow-lg';
    alertBox.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin text-base text-indigo-400 shrink-0"></i><span>${message}</span>`;
  } else {
    alertBox.className = 'mb-4 p-3.5 rounded-xl text-sm flex items-center gap-2 bg-emerald-500/20 text-emerald-200 border border-emerald-400/40 backdrop-blur-md shadow-lg';
    alertBox.innerHTML = `<i class="fa-solid fa-circle-check text-base text-emerald-400 shrink-0"></i><span>${message}</span>`;
  }
  alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

async function handleLogin(e) {
  if (e) e.preventDefault();
  const usernameInput = document.getElementById('login-username');
  const passwordInput = document.getElementById('login-password');

  const username = usernameInput ? usernameInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value : '';

  if (!username) {
    showAuthAlert('कृपया अपना यूज़रनेम / ईमेल दर्ज करें।', 'error');
    if (usernameInput) usernameInput.focus();
    return;
  }

  if (!password) {
    showAuthAlert('कृपया अपना पासवर्ड दर्ज करें।', 'error');
    if (passwordInput) passwordInput.focus();
    return;
  }

  showAuthAlert('सत्यापन किया जा रहा है...', 'info');

  const rememberElem = document.getElementById('login-remember');
  const remember = rememberElem ? rememberElem.checked : true;

  // 1. Try Live Database Login via StudyPulseAPI
  if (window.StudyPulseAPI) {
    try {
      const res = await StudyPulseAPI.auth.login(username, password);
      if (res && res.success && res.user) {
        const user = res.user;
        saveLocalUser(user, password);
        if (remember) {
          localStorage.setItem('studypulse_session', JSON.stringify(user));
        } else {
          sessionStorage.setItem('studypulse_session', JSON.stringify(user));
        }
        await loadUserData(user);
        showAppView();
        triggerConfetti();
        showToast(`स्वागत है, ${user.name || user.username}! 🎉`, 'success');
        syncPendingSignups();
        return;
      } else if (res && res.success === false && !res.isNetworkError) {
        // Live server explicitly responded with credential mismatch
        showAuthAlert(res.message || 'यूज़रनेम या पासवर्ड गलत है। कृपया पुनः प्रयास करें।', 'error');
        return;
      }
    } catch (err) {
      console.warn('[StudyPulse] Live database login unreached (offline/server starting). Falling back to local offline auth:', err.message);
    }
  }

  // 2. Seamless Offline / Local Auth Fallback (GUARANTEES 100% RELIABILITY)
  const localMatch = findLocalUser(username);
  if (localMatch) {
    const storedPlain = String(localMatch.plainPassword || localMatch.password || '').trim();
    const entered = String(password).trim();
    const isMatch = (storedPlain === entered) || 
                    (localMatch.username === 'student' && entered === '123') ||
                    (localMatch.username === 'admin' && entered === 'admin123') ||
                    (localMatch.username === 'amit_ias' && entered === 'pass123') ||
                    (localMatch.username === 'priya_rrb' && entered === 'rrb2026') ||
                    (localMatch.username === 'sumit' && (entered === '1234' || entered === '123'));

    if (isMatch) {
      const cleanUser = { ...localMatch };
      delete cleanUser.password;
      delete cleanUser.plainPassword;
      if (remember) {
        localStorage.setItem('studypulse_session', JSON.stringify(cleanUser));
      } else {
        sessionStorage.setItem('studypulse_session', JSON.stringify(cleanUser));
      }
      await loadUserData(cleanUser);
      showAppView();
      triggerConfetti();
      showToast(`लॉगिन सफल रहा! (ऑफ़लाइन / लोकल मोड) 🚀`, 'success');
      return;
    } else {
      showAuthAlert('पासवर्ड गलत है। कृपया पुनः प्रयास करें।', 'error');
      if (passwordInput) passwordInput.focus();
      return;
    }
  }

  // If user does not exist locally and live API was offline
  showAuthAlert('डेटाबेस से संपर्क नहीं हो सका और यह यूज़रनेम इस डिवाइस पर नहीं मिला। आप त्वरित प्रवेश के लिए नीचे "डेमो लॉगिन" दबा सकते हैं या नया खाता "साइन अप" कर सकते हैं।', 'error');
}

async function handleSignup(e) {
  if (e) e.preventDefault();
  const nameInput = document.getElementById('signup-name');
  const usernameInput = document.getElementById('signup-username');
  const passwordInput = document.getElementById('signup-password');

  const name = nameInput ? nameInput.value.trim() : '';
  const username = usernameInput ? usernameInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value : '';

  const avatarElem = document.querySelector('input[name="avatar"]:checked');
  const avatar = avatarElem ? avatarElem.value : '👨‍🎓';

  if (!name) {
    showAuthAlert('कृपया अपना पूरा नाम दर्ज करें।', 'error');
    if (nameInput) nameInput.focus();
    return;
  }

  if (username.length < 3) {
    showAuthAlert('यूज़रनेम कम से कम 3 अक्षरों का होना चाहिए।', 'error');
    if (usernameInput) usernameInput.focus();
    return;
  }

  if (password.length < 3) {
    showAuthAlert('पासवर्ड कम से कम 3 अक्षरों का होना चाहिए।', 'error');
    if (passwordInput) passwordInput.focus();
    return;
  }

  const referralInput = document.getElementById('signup-referral');
  const enteredReferral = referralInput ? referralInput.value.trim().toUpperCase() : '';

  showAuthAlert('नया छात्र खाता बनाया जा रहा है...', 'info');

  // 1. Try Live Database Registration
  if (window.StudyPulseAPI) {
    try {
      const res = await StudyPulseAPI.auth.signup({
        name,
        username,
        password,
        avatar,
        referralCode: enteredReferral
      });

      if (res && res.success && res.user) {
        const user = res.user;
        saveLocalUser(user, password);
        localStorage.setItem('studypulse_session', JSON.stringify(user));
        await loadUserData(user);
        showAppView();
        triggerConfetti();
        showToast('बधाई! आपका StudyPulse खाता सफलतापूर्वक बन गया है। 🎓', 'success');
        return;
      } else if (res && res.success === false && !res.isNetworkError) {
        showAuthAlert(res.message || 'यह यूज़रनेम पहले से लिया जा चुका है। कृपया दूसरा चुनें।', 'error');
        return;
      }
    } catch (err) {
      console.warn('[StudyPulse] Live server signup unreached. Creating user in offline/local storage:', err.message);
    }
  }

  // 2. Offline / Local Registration Fallback (GUARANTEES SIGNUP NEVER FAILS)
  const existingLocal = findLocalUser(username);
  if (existingLocal) {
    showAuthAlert('यह यूज़रनेम पहले से किसी अन्य छात्र द्वारा लिया जा चुका है। कृपया दूसरा चुनें।', 'error');
    if (usernameInput) usernameInput.focus();
    return;
  }

  const newRefCode = 'SP-' + Math.floor(100000 + Math.random() * 900000);
  const newLocalUser = {
    id: `usr_${Date.now()}`,
    _id: `usr_${Date.now()}`,
    name: name,
    username: username,
    password: password,
    plainPassword: password,
    role: "student",
    status: "active",
    avatar: avatar,
    customPhoto: null,
    referralCode: newRefCode,
    referralCount: 0,
    referralCoins: enteredReferral ? 150 : 100,
    targetExam: "SSC CGL / CHSL 2026",
    streak: 1,
    joinedAt: new Date().toISOString(),
    lastActiveDate: new Date().toISOString().split('T')[0]
  };

  saveLocalUser(newLocalUser, password);
  queuePendingSignup({ name, username, password, avatar, referralCode: enteredReferral });
  localStorage.setItem('studypulse_session', JSON.stringify(newLocalUser));
  await loadUserData(newLocalUser);
  showAppView();
  triggerConfetti();
  showToast('बधाई! आपका StudyPulse खाता सफलतापूर्वक बन गया है! 🎓', 'success');
}

async function demoLogin() {
  showAuthAlert('1-क्लिक डेमो लॉगिन सक्रिय हो रहा है...', 'info');
  
  // 1. Try Live Database Login
  if (window.StudyPulseAPI) {
    try {
      const res = await StudyPulseAPI.auth.login('student', '123');
      if (res && res.success && res.user) {
        saveLocalUser(res.user, '123');
        localStorage.setItem('studypulse_session', JSON.stringify(res.user));
        await loadUserData(res.user);
        showAppView();
        triggerConfetti();
        showToast('डेमो छात्र (राहुल शर्मा) के रूप में लॉगिन सफल! 🚀', 'success');
        return;
      }
    } catch (e) {
      console.warn('[StudyPulse] Live demo login unreached, switching to instant offline demo user:', e.message);
    }
  }

  // 2. Instant Local Demo Login (GUARANTEED TO NEVER FAIL)
  const defaultStudent = STUDYPULSE_DEFAULT_ACCOUNTS.find(u => u.username === 'student');
  const demoUser = {
    ...(defaultStudent || {
      id: "usr_demo_1",
      _id: "usr_demo_1",
      name: "राहुल शर्मा",
      username: "student",
      role: "student",
      status: "active",
      avatar: "👨‍🎓",
      referralCode: "SP-849201",
      referralCount: 3,
      referralCoins: 300,
      targetExam: "SSC CGL / CHSL 2026",
      streak: 1
    })
  };
  delete demoUser.password;
  localStorage.setItem('studypulse_session', JSON.stringify(demoUser));
  await loadUserData(demoUser);
  showAppView();
  triggerConfetti();
  showToast('डेमो छात्र (राहुल शर्मा) के रूप में लॉगिन सफल! 🚀', 'success');
}

function handleLogout() {
  if (confirm('क्या आप लॉगआउट करना चाहते हैं?')) {
    localStorage.removeItem('studypulse_session');
    sessionStorage.removeItem('studypulse_session');
    localStorage.removeItem('studypulse_admin_session');
    currentUser = null;

    // Immediately hide any admin portal links
    const sidebarAdminLink = document.getElementById('sidebar-admin-link');
    const headerAdminLink = document.getElementById('header-admin-link');
    if (sidebarAdminLink) {
      sidebarAdminLink.classList.add('hidden');
      sidebarAdminLink.style.display = 'none';
    }
    if (headerAdminLink) {
      headerAdminLink.classList.add('hidden');
      headerAdminLink.style.display = 'none';
    }

    showAuthView();
  }
}

function showAuthView() {
  const authView = document.getElementById('auth-view');
  const appView = document.getElementById('app-view');
  if (authView) {
    authView.classList.remove('hidden');
    authView.style.display = 'flex';
  }
  if (appView) {
    appView.classList.add('hidden');
    appView.style.display = 'none';
  }
  const sidebarAdminLink = document.getElementById('sidebar-admin-link');
  const headerAdminLink = document.getElementById('header-admin-link');
  if (sidebarAdminLink) {
    sidebarAdminLink.classList.add('hidden');
    sidebarAdminLink.style.display = 'none';
  }
  if (headerAdminLink) {
    headerAdminLink.classList.add('hidden');
    headerAdminLink.style.display = 'none';
  }
  if (pomoInterval) clearInterval(pomoInterval);
}

function showAppView() {
  const authView = document.getElementById('auth-view');
  const appView = document.getElementById('app-view');
  if (authView) {
    authView.classList.add('hidden');
    authView.style.display = 'none';
  }
  if (appView) {
    appView.classList.remove('hidden');
    appView.style.display = 'flex';
  }
  navigateTo('dashboard');
}

function updateUserHeaderProfile() {
  if (!currentUser) return;
  document.getElementById('user-display-name').textContent = currentUser.name || 'विद्यार्थी';
  document.getElementById('user-username-badge').textContent = '@' + currentUser.username;
  document.getElementById('user-streak-count').textContent = currentUser.streak || 1;
  document.getElementById('header-streak-text').textContent = `${currentUser.streak || 1} दिन`;
  document.getElementById('dashboard-welcome').textContent = `नमस्ते, ${currentUser.name || 'विद्यार्थी'}!`;
  document.getElementById('stat-streak-big').textContent = `🔥 ${currentUser.streak || 1} दिन`;

  const userAvatarBadge = document.getElementById('user-avatar-badge');
  const headerAvatarBadge = document.getElementById('header-avatar-badge');
  const headerName = document.getElementById('header-user-name');
  if (headerName) headerName.textContent = currentUser.name || 'विद्यार्थी';

  if (currentUser.customPhoto) {
    if (userAvatarBadge) {
      userAvatarBadge.innerHTML = `<img src="${currentUser.customPhoto}" class="w-8 h-8 rounded-full object-cover shadow-sm border border-brand-300 dark:border-brand-600 inline-block">`;
    }
    if (headerAvatarBadge) {
      headerAvatarBadge.innerHTML = `<img src="${currentUser.customPhoto}" class="w-6 h-6 rounded-full object-cover shadow-sm border border-brand-300 dark:border-brand-600 inline-block">`;
    }
  } else {
    if (userAvatarBadge) userAvatarBadge.textContent = currentUser.avatar || '👨‍🎓';
    if (headerAvatarBadge) headerAvatarBadge.textContent = currentUser.avatar || '👨‍🎓';
  }

  // Admin Portal Visibility Control: ONLY visible if user has admin role
  const isAdmin = !!(currentUser && (currentUser.role === 'admin' || currentUser.username === 'admin'));
  const sidebarAdminLink = document.getElementById('sidebar-admin-link');
  const headerAdminLink = document.getElementById('header-admin-link');
  if (sidebarAdminLink) {
    if (isAdmin) {
      sidebarAdminLink.classList.remove('hidden');
      sidebarAdminLink.style.display = 'flex';
    } else {
      sidebarAdminLink.classList.add('hidden');
      sidebarAdminLink.style.display = 'none';
    }
  }
  if (headerAdminLink) {
    if (isAdmin) {
      headerAdminLink.classList.remove('hidden');
      headerAdminLink.style.display = 'flex';
    } else {
      headerAdminLink.classList.add('hidden');
      headerAdminLink.style.display = 'none';
    }
  }

  if (isAdmin) {
    localStorage.setItem('studypulse_admin_session', JSON.stringify(currentUser));
  } else {
    localStorage.removeItem('studypulse_admin_session');
  }
}

// ==========================================
// 8. NAVIGATION & VIEWS
// ==========================================

function getViewTitle(viewId) {
  const map = {
    dashboard: t('navDashboard', 'डैशबोर्ड'),
    syllabus: t('navSyllabus', 'सिलेबस'),
    tests: t('navTests', 'मॉक टेस्ट'),
    exams: t('navExams', 'परीक्षाएं'),
    notes: t('navNotes', 'गणित नोट्स'),
    jobs: t('navJobs', 'सरकारी नौकरियां'),
    materials: t('navMaterials', 'PDF सामग्री'),
    ai: t('navAi', '✨ StudyPulse AI & Google')
  };
  return map[viewId] || viewId;
}

function navigateTo(viewId) {
  ['dashboard', 'syllabus', 'tests', 'exams', 'notes', 'jobs', 'materials', 'ai'].forEach(v => {
    const sec = document.getElementById(`section-${v}`);
    const navBtn = document.getElementById(`nav-${v}`);
    if (sec) {
      sec.classList.add('hidden');
      sec.style.display = 'none';
    }
    if (navBtn) {
      navBtn.className = "nav-item w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50";
    }
  });

  const targetSec = document.getElementById(`section-${viewId}`);
  const targetNav = document.getElementById(`nav-${viewId}`);
  if (targetSec) {
    targetSec.classList.remove('hidden');
    targetSec.style.display = 'block';
  }
  if (targetNav) {
    targetNav.className = "nav-item w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition text-brand-600 bg-brand-50 dark:bg-brand-950/40 dark:text-brand-400";
  }

  const topbar = document.getElementById('topbar-title');
  if (topbar) topbar.innerHTML = `<span>${getViewTitle(viewId)}</span>`;
  
  // Synchronize Mobile Bottom Navigation active states
  ['dashboard', 'tests', 'ai', 'jobs'].forEach(v => {
    const mobBtn = document.getElementById(`mobile-nav-${v}`);
    if (mobBtn) {
      if (v === viewId) {
        mobBtn.classList.add('active');
      } else {
        mobBtn.classList.remove('active');
      }
    }
  });

  closeMobileSidebar();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (viewId === 'ai' && typeof initSemiAi === 'function') {
    initSemiAi();
  }
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  sidebar.classList.toggle('-translate-x-full');
  backdrop.classList.toggle('hidden');
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (sidebar) sidebar.classList.add('-translate-x-full');
  if (backdrop) backdrop.classList.add('hidden');
}

function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('studypulse_theme', isDark ? 'dark' : 'light');
  updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.className = isDark ? 'fa-solid fa-sun text-amber-400' : 'fa-solid fa-moon text-slate-600';
  }
}

// ==========================================
// 9. REFRESH & RENDER
// ==========================================

function refreshAllViews() {
  renderDashboardStats();
  renderTasks();
  renderSyllabus();
  renderTests();
  renderExams();
  renderNotes();
  renderJobs();
  renderMaterials();
}

// ==========================================
// 10. DASHBOARD & POMODORO LOGIC
// ==========================================

function calculateSyllabusProgress() {
  let totalTopics = 0;
  let completedTopics = 0;
  currentSyllabus.forEach(ch => {
    ch.topics.forEach(t => {
      totalTopics++;
      if (t.completed) completedTopics++;
    });
  });
  const pct = totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);
  return { totalTopics, completedTopics, pct };
}

function renderDashboardStats() {
  const { totalTopics, completedTopics, pct } = calculateSyllabusProgress();

  const statSylPct = document.getElementById('stat-syllabus-pct');
  const statSylBar = document.getElementById('stat-syllabus-bar');
  if (statSylPct) statSylPct.textContent = `${pct}%`;
  if (statSylBar) statSylBar.style.width = `${pct}%`;

  const statTestCount = document.getElementById('stat-tests-count');
  const statTestAvg = document.getElementById('stat-tests-avg');
  if (statTestCount) statTestCount.textContent = currentTestHistory.length;

  if (currentTestHistory.length > 0) {
    const sum = currentTestHistory.reduce((acc, curr) => acc + (curr.percentage || 0), 0);
    const avg = Math.round(sum / currentTestHistory.length);
    if (statTestAvg) statTestAvg.textContent = `${avg}%`;
  } else {
    if (statTestAvg) statTestAvg.textContent = '0%';
  }

  const sortedExams = [...currentExams].sort((a, b) => new Date(a.date) - new Date(b.date));
  const now = new Date();
  const upcoming = sortedExams.find(e => new Date(e.date) >= now.setHours(0,0,0,0));

  const countdownElem = document.getElementById('stat-exam-countdown');
  const nextExamNameElem = document.getElementById('stat-next-exam-name');

  if (upcoming) {
    const diffTime = new Date(upcoming.date) - new Date();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (countdownElem) countdownElem.textContent = diffDays <= 0 ? 'आज परीक्षा है!' : `${diffDays} दिन शेष`;
    if (nextExamNameElem) nextExamNameElem.textContent = upcoming.title;
  } else {
    if (countdownElem) countdownElem.textContent = 'कोई नहीं';
    if (nextExamNameElem) nextExamNameElem.textContent = 'सभी परीक्षाएं समाप्त';
  }
}

// Pomodoro Focus Timer
function togglePomodoro() {
  if (pomoIsRunning) {
    clearInterval(pomoInterval);
    pomoIsRunning = false;
    document.getElementById('pomo-play-icon').className = 'fa-solid fa-play';
    document.getElementById('pomo-play-text').textContent = 'शुरू करें (Resume)';
  } else {
    pomoIsRunning = true;
    document.getElementById('pomo-play-icon').className = 'fa-solid fa-pause';
    document.getElementById('pomo-play-text').textContent = 'रोकें (Pause)';
    pomoInterval = setInterval(updatePomodoro, 1000);
  }
}

function setPomodoroMode(mode) {
  clearInterval(pomoInterval);
  pomoIsRunning = false;
  pomoMode = mode;
  pomoSecondsLeft = mode === 'work' ? 25 * 60 : 5 * 60;
  
  const badge = document.getElementById('pomo-mode-badge');
  const label = document.getElementById('pomo-status-label');
  if (mode === 'work') {
    badge.className = 'px-2 py-0.5 rounded-full text-xs font-semibold bg-brand-100 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300';
    badge.textContent = 'स्टडी मोड (25m)';
    label.textContent = 'गहरे ध्यान से पढ़ाई करें (Deep Work)';
  } else {
    badge.className = 'px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300';
    badge.textContent = 'रिफ्रेश ब्रेक (5m)';
    label.textContent = 'थोड़ा पानी पिएं या टहल लें ☕';
  }

  document.getElementById('pomo-play-icon').className = 'fa-solid fa-play';
  document.getElementById('pomo-play-text').textContent = 'शुरू करें (Start)';
  renderPomoDisplay();
}

function resetPomodoro() {
  setPomodoroMode(pomoMode);
}

function updatePomodoro() {
  if (pomoSecondsLeft > 0) {
    pomoSecondsLeft--;
    renderPomoDisplay();
  } else {
    clearInterval(pomoInterval);
    pomoIsRunning = false;
    playChime();
    alert(pomoMode === 'work' ? '🎉 बधाई! 25 मिनट का स्टडी सेशन पूरा हुआ! अब 5 मिनट का ब्रेक लें।' : '⏰ ब्रेक समाप्त हुआ! फिर से ध्यान केंद्रित करने का समय है।');
    setPomodoroMode(pomoMode === 'work' ? 'break' : 'work');
  }
}

function renderPomoDisplay() {
  const m = Math.floor(pomoSecondsLeft / 60).toString().padStart(2, '0');
  const s = (pomoSecondsLeft % 60).toString().padStart(2, '0');
  const text = `${m}:${s}`;
  document.getElementById('pomo-timer-display').textContent = text;
  document.getElementById('header-pomodoro-text').textContent = `पोमोडोरो: ${text}`;
}

function playChime() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
    osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.6);
  } catch (err) {
    console.log('Audio not supported', err);
  }
}

// Tasks / Checklist
function renderTasks() {
  const list = document.getElementById('dashboard-task-list');
  if (!list) return;

  const doneCount = currentTasks.filter(t => t.completed).length;
  document.getElementById('tasks-done-badge').textContent = `${doneCount}/${currentTasks.length} पूरा`;

  if (currentTasks.length === 0) {
    list.innerHTML = `<p class="text-xs text-slate-400 py-3 text-center">आज कोई लक्ष्य निर्धारित नहीं है। ऊपर से नया लक्ष्य जोड़ें!</p>`;
    return;
  }

  list.innerHTML = currentTasks.map(t => `
    <div class="flex items-center justify-between p-2.5 rounded-xl border ${t.completed ? 'bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/40 text-slate-400 line-through' : 'bg-white dark:bg-slate-700/50 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100'} transition">
      <label class="flex items-center gap-2.5 cursor-pointer flex-1 overflow-hidden">
        <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="toggleTask('${t.id}')" class="w-4 h-4 rounded text-brand-600 focus:ring-brand-500">
        <span class="text-xs font-medium truncate">${escapeHtml(t.title)}</span>
      </label>
      <button onclick="deleteTask('${t.id}')" class="text-slate-400 hover:text-rose-500 p-1 rounded transition text-xs" title="Delete">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `).join('');
}

async function handleAddTask(e) {
  e.preventDefault();
  const input = document.getElementById('new-task-input');
  const val = input.value.trim();
  if (!val) return;

  const localItem = {
    id: 'task_' + Date.now(),
    _id: 'task_' + Date.now(),
    title: val,
    completed: false,
    userId: currentUser ? currentUser.id : null
  };

  currentTasks.unshift(localItem);
  input.value = '';
  renderTasks();

  if (window.StudyPulseAPI && currentUser) {
    try {
      const res = await StudyPulseAPI.tasks.add({
        title: val,
        userId: currentUser.id
      });
      if (res && res.data) {
        localItem._id = res.data._id || res.data.id;
        localItem.id = localItem._id;
      }
    } catch (err) {
      console.warn('Tasks API fallback:', err);
    }
  }
}

async function toggleTask(id) {
  const t = currentTasks.find(x => x.id === id || x._id === id);
  if (t) {
    t.completed = !t.completed;
    renderTasks();
    if (window.StudyPulseAPI) {
      try {
        await StudyPulseAPI.tasks.toggle(id, t.completed);
      } catch (err) {
        console.warn('Toggle task API fallback:', err);
      }
    }
  }
}

async function deleteTask(id) {
  currentTasks = currentTasks.filter(x => x.id !== id && x._id !== id);
  renderTasks();
  if (window.StudyPulseAPI) {
    try {
      await StudyPulseAPI.tasks.delete(id);
    } catch (err) {
      console.warn('Delete task API fallback:', err);
    }
  }
}

// ==========================================
// 11. SYLLABUS SECTION LOGIC
// ==========================================

let activeSyllabusFilter = 'all';

function filterSyllabus(subject) {
  activeSyllabusFilter = subject;
  document.querySelectorAll('#syllabus-filter-tabs .s-tab').forEach(btn => {
    if (btn.getAttribute('data-filter') === subject) {
      btn.className = "s-tab px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap bg-brand-600 text-white shadow-sm";
    } else {
      btn.className = "s-tab px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700";
    }
  });
  renderSyllabus();
}

function renderSyllabus() {
  const container = document.getElementById('syllabus-container');
  if (!container) return;

  const { totalTopics, completedTopics, pct } = calculateSyllabusProgress();

  document.getElementById('syllabus-total-pct').textContent = `${pct}%`;
  document.getElementById('syllabus-progress-bar').style.width = `${pct}%`;
  document.getElementById('syllabus-counts-text').textContent = `${totalTopics} में से ${completedTopics} टॉपिक्स पूर्ण हैं।`;

  const filtered = activeSyllabusFilter === 'all'
    ? currentSyllabus
    : currentSyllabus.filter(s => s.subject === activeSyllabusFilter);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="glass-panel p-8 text-center rounded-2xl border border-slate-200 dark:border-slate-700">
        <i class="fa-solid fa-folder-open text-4xl text-slate-300 dark:text-slate-600 mb-2"></i>
        <p class="text-sm font-semibold text-slate-500">इस विषय में अभी कोई अध्याय दर्ज नहीं है।</p>
        <p class="text-xs text-slate-400 mt-1">एडमिन द्वारा नया सिलेबस जोड़े जाने पर यहाँ अपने आप दिखाई देगा।</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(ch => {
    const chTotal = ch.topics.length;
    const chDone = ch.topics.filter(t => t.completed).length;
    const chPct = chTotal === 0 ? 0 : Math.round((chDone / chTotal) * 100);

    return `
      <div class="glass-panel rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition">
        <!-- Chapter Header -->
        <div class="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/50 dark:bg-slate-800/50">
          <div>
            <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-brand-600 dark:text-brand-300 border border-indigo-200 dark:border-indigo-800/50">
              ${escapeHtml(ch.subject)}
            </span>
            <h4 class="text-base font-bold text-slate-900 dark:text-white mt-1.5">${escapeHtml(ch.chapter)}</h4>
          </div>

          <div class="flex items-center gap-4">
            <div class="w-32 text-right">
              <span class="text-xs font-bold text-slate-700 dark:text-slate-300">${chPct}% पूरा (${chDone}/${chTotal})</span>
              <div class="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mt-1 overflow-hidden">
                <div class="h-full rounded-full ${chPct === 100 ? 'bg-emerald-500' : 'bg-brand-600'} transition-all" style="width: ${chPct}%"></div>
              </div>
            </div>

            ${currentUser && currentUser.role === 'admin' ? `
            <button onclick="deleteChapter('${ch.id}')" class="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg transition" title="Delete Chapter">
              <i class="fa-solid fa-trash-can text-sm"></i>
            </button>
            ` : ''}
          </div>
        </div>

        <!-- Topics Checklist -->
        <div class="p-4 sm:p-5 pt-2 grid grid-cols-1 md:grid-cols-2 gap-2.5 border-t border-slate-100 dark:border-slate-700/60 bg-slate-50/40 dark:bg-slate-900/20">
          ${ch.topics.map(t => `
            <label class="flex items-center gap-3 p-2.5 rounded-xl border ${t.completed ? 'bg-emerald-50/60 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/40 text-slate-500 dark:text-slate-400' : 'bg-white dark:bg-slate-700/50 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100'} cursor-pointer hover:border-brand-300 transition">
              <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="toggleTopic('${ch.id}', '${t.id}')" class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500">
              <span class="text-xs font-medium leading-tight ${t.completed ? 'line-through text-slate-400' : ''}">${escapeHtml(t.name)}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

async function toggleTopic(chId, topicId) {
  const ch = currentSyllabus.find(c => c.id === chId || c._id === chId);
  if (ch) {
    const t = ch.topics.find(x => x.id === topicId);
    if (t) {
      t.completed = !t.completed;
      renderSyllabus();
      renderDashboardStats();
      if (window.StudyPulseAPI) {
        try {
          await StudyPulseAPI.syllabus.toggleTopic(chId, topicId, t.completed);
        } catch (err) {
          console.warn('Syllabus toggle API fallback:', err);
        }
      }
    }
  }
}

async function deleteChapter(chId) {
  if (currentUser && currentUser.role !== 'admin') {
    alert('केवल एडमिन ही सिलेबस और अध्याय हटा सकते हैं। इसके लिए Admin Panel का उपयोग करें।');
    return;
  }
  if (confirm('क्या आप इस पूरे अध्याय को सिलेबस से हटाना चाहते हैं?')) {
    currentSyllabus = currentSyllabus.filter(c => c.id !== chId && c._id !== chId);
    renderSyllabus();
    renderDashboardStats();
    if (window.StudyPulseAPI) {
      try {
        await StudyPulseAPI.syllabus.deleteChapter(chId);
      } catch (err) {
        console.warn('Delete chapter API fallback:', err);
      }
    }
  }
}

function openAddTopicModal() {
  if (currentUser && currentUser.role !== 'admin') {
    alert('केवल एडमिन ही नया अध्याय और सिलेबस जोड़ सकते हैं। कृपया Admin Panel (/admin) का उपयोग करें।');
    return;
  }
  document.getElementById('modal-add-topic').classList.remove('hidden');
}

async function handleSaveTopic(e) {
  e.preventDefault();
  const subject = document.getElementById('topic-input-subject').value;
  const chapterName = document.getElementById('topic-input-chapter').value.trim();
  const topicsRaw = document.getElementById('topic-input-topics').value.trim();

  if (!chapterName || !topicsRaw) return;

  const topicsList = topicsRaw.split(',')
    .map(t => t.trim())
    .filter(t => t.length > 0)
    .map((t, idx) => ({
      id: `top_${Date.now()}_${idx}`,
      name: t,
      completed: false
    }));

  const localChapter = {
    id: 'syl_' + Date.now(),
    _id: 'syl_' + Date.now(),
    subject: subject,
    chapter: chapterName,
    topics: topicsList,
    userId: currentUser ? currentUser.id : null
  };

  currentSyllabus.push(localChapter);
  closeModal('modal-add-topic');
  document.getElementById('topic-input-chapter').value = '';
  document.getElementById('topic-input-topics').value = '';
  renderSyllabus();
  renderDashboardStats();

  if (window.StudyPulseAPI) {
    try {
      const res = await StudyPulseAPI.syllabus.addChapter({
        subject,
        chapter: chapterName,
        topics: topicsList,
        userId: currentUser ? currentUser.id : null
      });
      if (res && res.data) {
        localChapter._id = res.data._id || res.data.id;
        localChapter.id = localChapter._id;
      }
    } catch (err) {
      console.warn('Add chapter API fallback:', err);
    }
  }
}

// ==========================================
// 12. TESTS SECTION (COMPETITIVE EXAM LEVEL)
// ==========================================

function renderTests() {
  const grid = document.getElementById('tests-grid');
  if (!grid) return;

  const testsList = window.COMPETITIVE_TESTS_DATA || COMPETITIVE_TESTS;
  document.getElementById('test-total-available').textContent = testsList.length;

  grid.innerHTML = testsList.map(t => `
    <div class="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between card-hover">
      <div>
        <div class="flex items-center justify-between">
          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-brand-600 dark:text-brand-300">
            ${escapeHtml(t.subject)}
          </span>
          <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
            ${t.difficulty}
          </span>
        </div>

        <h4 class="text-base font-bold text-slate-900 dark:text-white mt-3">${escapeHtml(t.title)}</h4>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">${escapeHtml(t.description)}</p>

        <div class="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400">
          <span class="flex items-center gap-1.5">
            <i class="fa-regular fa-clock text-brand-600"></i> ${t.durationMinutes} मिनट
          </span>
          <span class="flex items-center gap-1.5">
            <i class="fa-regular fa-circle-question text-emerald-600"></i> ${t.questions.length} प्रश्न
          </span>
        </div>
      </div>

      <button onclick="startTest('${t.id}')" class="mt-5 w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-500/25 transition flex items-center justify-center gap-2">
        <i class="fa-solid fa-play text-xs"></i>
        <span>टेस्ट शुरू करें (Start Test)</span>
      </button>
    </div>
  `).join('');

  renderTestHistory();
}

function renderTestHistory() {
  const tbody = document.getElementById('test-history-tbody');
  if (!tbody) return;

  if (currentTestHistory.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="py-4 text-center text-slate-400">अभी तक कोई टेस्ट नहीं दिया गया है। ऊपर से कोई भी टेस्ट शुरू करें!</td></tr>`;
    return;
  }

  tbody.innerHTML = currentTestHistory.map(h => `
    <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
      <td class="py-3 font-semibold text-slate-900 dark:text-white">${escapeHtml(h.testTitle)}</td>
      <td class="py-3 text-slate-500 dark:text-slate-400">${escapeHtml(h.subject)}</td>
      <td class="py-3 text-slate-500 dark:text-slate-400">${h.date}</td>
      <td class="py-3 font-bold text-slate-800 dark:text-slate-200">${h.score}</td>
      <td class="py-3 font-bold ${h.percentage >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}">${h.percentage}%</td>
      <td class="py-3">
        <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold ${h.percentage >= 60 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'}">
          ${escapeHtml(h.status || 'पूर्ण')}
        </span>
      </td>
    </tr>
  `).join('');
}

// Live Test Engine
function startTest(testId) {
  const testsList = window.COMPETITIVE_TESTS_DATA || COMPETITIVE_TESTS;
  const foundTest = testsList.find(t => (t.id === testId || t._id === testId));
  if (!foundTest) return;

  activeRunningTest = foundTest;
  activeTestIndex = 0;
  activeUserAnswers = {};
  testSecondsLeft = foundTest.durationMinutes * 60;
  testStartTime = Date.now();

  document.getElementById('active-test-title').textContent = foundTest.title;
  document.getElementById('active-test-subject').textContent = foundTest.subject;

  document.getElementById('modal-test-runner').classList.remove('hidden');

  if (testTimerInterval) clearInterval(testTimerInterval);
  updateTestTimerClock();
  testTimerInterval = setInterval(() => {
    if (testSecondsLeft > 0) {
      testSecondsLeft--;
      updateTestTimerClock();
    } else {
      clearInterval(testTimerInterval);
      alert('समय समाप्त हो गया है! आपका टेस्ट स्वतः सबमिट किया जा रहा है।');
      submitTest();
    }
  }, 1000);

  renderActiveQuestion();
}

function updateTestTimerClock() {
  const m = Math.floor(testSecondsLeft / 60).toString().padStart(2, '0');
  const s = (testSecondsLeft % 60).toString().padStart(2, '0');
  const clock = document.getElementById('test-timer-clock');
  clock.textContent = `${m}:${s}`;
  if (testSecondsLeft <= 60) {
    clock.classList.add('timer-urgent');
  } else {
    clock.classList.remove('timer-urgent');
  }
}

function renderActiveQuestion() {
  if (!activeRunningTest) return;
  const qObj = activeRunningTest.questions[activeTestIndex];
  const total = activeRunningTest.questions.length;

  document.getElementById('test-question-counter').textContent = `प्रश्न ${activeTestIndex + 1} / ${total}`;
  const answeredCount = Object.keys(activeUserAnswers).length;
  document.getElementById('test-answered-counter').textContent = `उत्तर दिए गए: ${answeredCount} / ${total}`;

  document.getElementById('active-question-text').textContent = `Q${activeTestIndex + 1}. ${qObj.q}`;

  const container = document.getElementById('active-options-container');
  const selectedOpt = activeUserAnswers[activeTestIndex];

  container.innerHTML = qObj.options.map((opt, idx) => {
    const isSelected = selectedOpt === idx;
    const optLetter = String.fromCharCode(65 + idx);
    return `
      <div onclick="selectTestOption(${idx})" class="p-3.5 rounded-xl border-2 cursor-pointer transition flex items-center gap-3 ${isSelected ? 'border-brand-600 bg-brand-50/70 dark:bg-brand-950/40 text-brand-900 dark:text-brand-100 font-semibold shadow-sm' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'}">
        <span class="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300'}">
          ${optLetter}
        </span>
        <span class="text-sm flex-1">${escapeHtml(opt)}</span>
      </div>
    `;
  }).join('');

  document.getElementById('test-btn-prev').disabled = activeTestIndex === 0;
  document.getElementById('test-btn-next').disabled = activeTestIndex === total - 1;
}

function selectTestOption(optIdx) {
  activeUserAnswers[activeTestIndex] = optIdx;
  renderActiveQuestion();
}

function testNav(dir) {
  const newIdx = activeTestIndex + dir;
  if (newIdx >= 0 && newIdx < activeRunningTest.questions.length) {
    activeTestIndex = newIdx;
    renderActiveQuestion();
  }
}

function closeTestRunnerConfirm() {
  if (confirm('क्या आप टेस्ट छोड़ना चाहते हैं? आपकी प्रगति सुरक्षित नहीं होगी।')) {
    if (testTimerInterval) clearInterval(testTimerInterval);
    document.getElementById('modal-test-runner').classList.add('hidden');
    activeRunningTest = null;
  }
}

function submitTest() {
  if (testTimerInterval) clearInterval(testTimerInterval);
  const test = activeRunningTest;
  document.getElementById('modal-test-runner').classList.add('hidden');

  let correctCount = 0;
  test.questions.forEach((q, idx) => {
    if (activeUserAnswers[idx] === q.correctIndex) {
      correctCount++;
    }
  });

  const total = test.questions.length;
  const pct = Math.round((correctCount / total) * 100);
  const timeTakenSeconds = Math.max(1, Math.round((Date.now() - testStartTime) / 1000));
  const timeMin = Math.floor(timeTakenSeconds / 60);
  const timeSec = timeTakenSeconds % 60;

  const newHistItem = {
    userId: currentUser ? currentUser.id : 'usr_anonymous',
    testId: test.id || test._id,
    testTitle: test.title,
    subject: test.subject,
    date: new Date().toLocaleDateString('hi-IN'),
    score: `${correctCount} / ${total}`,
    percentage: pct,
    status: pct >= 60 ? 'सफल (Passed)' : 'पुनः अभ्यास करें',
    timeTaken: `${timeMin}m ${timeSec}s`
  };

  currentTestHistory.unshift(newHistItem);
  if (currentUser) {
    currentUser.referralCoins = (currentUser.referralCoins || 100) + 50;
    updateUserHeaderProfile();
  }
  renderDashboardStats();
  renderTestHistory();

  if (window.StudyPulseAPI) {
    StudyPulseAPI.tests.saveResult(newHistItem).catch(e => console.warn('Test result save API fallback:', e));
  }

  document.getElementById('result-headline').textContent = pct >= 80 ? 'शानदार प्रदर्शन! 🌟' : pct >= 60 ? 'अच्छा प्रयास! 👍' : 'और अभ्यास की आवश्यकता है! 📚';
  document.getElementById('result-score-text').textContent = `${correctCount} / ${total}`;
  document.getElementById('result-percentage-text').textContent = `${pct}%`;
  document.getElementById('result-time-taken').textContent = `${timeMin}m ${timeSec}s`;

  const solList = document.getElementById('result-solutions-list');
  solList.innerHTML = test.questions.map((q, idx) => {
    const userChoice = activeUserAnswers[idx];
    const isCorrect = userChoice === q.correctIndex;
    const isUnanswered = userChoice === undefined;

    return `
      <div class="p-3.5 rounded-xl border ${isCorrect ? 'border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-900/50' : 'border-rose-200 bg-rose-50/50 dark:bg-rose-950/20 dark:border-rose-900/50'}">
        <p class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Q${idx + 1}. ${escapeHtml(q.q)}</p>
        <div class="mt-2 text-xs space-y-1">
          <p class="text-slate-600 dark:text-slate-300">
            आपका उत्तर: <span class="font-bold ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}">${isUnanswered ? 'अनुत्तरित (Skipped)' : escapeHtml(q.options[userChoice])}</span>
          </p>
          <p class="text-emerald-700 dark:text-emerald-400">
            सही उत्तर: <span class="font-bold">${escapeHtml(q.options[q.correctIndex])}</span>
          </p>
          <p class="text-slate-500 dark:text-slate-400 mt-1.5 italic bg-white/70 dark:bg-slate-800/70 p-2 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
            💡 <strong>हल एवं शॉर्टकट व्याख्या:</strong> ${escapeHtml(q.explanation)}
          </p>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('modal-test-result').classList.remove('hidden');

  if (pct >= 60) {
    triggerConfetti();
  }
}

function closeResultModal() {
  document.getElementById('modal-test-result').classList.add('hidden');
  navigateTo('tests');
}

// ==========================================
// 13. EXAMS SECTION LOGIC
// ==========================================

function renderExams() {
  const container = document.getElementById('exams-list-container');
  const heroCard = document.getElementById('highlight-exam-card');
  if (!container) return;

  const sorted = [...currentExams].sort((a, b) => new Date(a.date) - new Date(b.date));
  const now = new Date().setHours(0,0,0,0);
  const upcoming = sorted.filter(e => new Date(e.date) >= now);

  if (upcoming.length > 0) {
    const next = upcoming[0];
    const diffDays = Math.ceil((new Date(next.date) - new Date()) / (1000 * 60 * 60 * 24));

    heroCard.innerHTML = `
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
            <i class="fa-solid fa-bell animate-bounce text-xs"></i> सबसे नजदीकी आगामी परीक्षा (Next Exam)
          </span>
          <h3 class="text-2xl font-black text-slate-900 dark:text-white mt-2">${escapeHtml(next.title)}</h3>
          <div class="flex flex-wrap items-center gap-4 mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
            <span><i class="fa-solid fa-book-open text-amber-600 mr-1.5"></i>${escapeHtml(next.subject)}</span>
            <span><i class="fa-regular fa-calendar text-amber-600 mr-1.5"></i>${formatDateHi(next.date)}</span>
            <span><i class="fa-regular fa-clock text-amber-600 mr-1.5"></i>${next.time} बजे</span>
            <span><i class="fa-solid fa-location-dot text-amber-600 mr-1.5"></i>${escapeHtml(next.mode)}</span>
          </div>
          ${next.notes ? `<p class="mt-3 text-xs text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">${escapeHtml(next.notes)}</p>` : ''}
        </div>

        <div class="text-center md:text-right shrink-0 bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/60 shadow-sm">
          <p class="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">परीक्षा में शेष दिन</p>
          <p class="text-4xl font-black text-slate-900 dark:text-white mt-1">${diffDays <= 0 ? 'आज है!' : diffDays}</p>
          <p class="text-xs text-slate-400 mt-1 font-semibold">${diffDays <= 0 ? 'शुभकामनाएं!' : 'Days Remaining'}</p>
        </div>
      </div>
    `;
  } else {
    heroCard.innerHTML = `
      <div class="text-center py-4">
        <i class="fa-solid fa-circle-check text-4xl text-emerald-500 mb-2"></i>
        <h4 class="text-lg font-bold text-slate-900 dark:text-white">कोई आगामी परीक्षा निर्धारित नहीं है!</h4>
        <p class="text-xs text-slate-400 mt-1">नई परीक्षा जोड़ने के लिए ऊपर '+ नई परीक्षा जोड़ें' बटन दबाएं।</p>
      </div>
    `;
  }

  if (sorted.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 col-span-2 text-center py-4">कोई परीक्षा उपलब्ध नहीं है।</p>`;
    return;
  }

  container.innerHTML = sorted.map(e => {
    const isPast = new Date(e.date) < now;
    const diffDays = Math.ceil((new Date(e.date) - new Date()) / (1000 * 60 * 60 * 24));

    return `
      <div class="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between card-hover">
        <div>
          <div class="flex items-center justify-between">
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              ${escapeHtml(e.subject)}
            </span>
            <span class="text-xs font-bold ${isPast ? 'text-slate-400' : 'text-brand-600 dark:text-brand-400'}">
              ${isPast ? 'समाप्त' : `${diffDays} दिन बाकी`}
            </span>
          </div>

          <h4 class="text-base font-bold text-slate-900 dark:text-white mt-3">${escapeHtml(e.title)}</h4>

          <div class="mt-3 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
            <p><i class="fa-regular fa-calendar w-4 text-brand-600"></i> ${formatDateHi(e.date)} (समय: ${e.time})</p>
            <p><i class="fa-solid fa-building-columns w-4 text-brand-600"></i> ${escapeHtml(e.mode)}</p>
            ${e.notes ? `<p class="italic mt-1 text-[11px] bg-slate-100/60 dark:bg-slate-700/40 p-2 rounded-lg"><i class="fa-solid fa-circle-info mr-1 text-slate-400"></i>${escapeHtml(e.notes)}</p>` : ''}
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-end">
          <button onclick="deleteExam('${e.id}')" class="text-xs font-semibold text-rose-500 hover:text-rose-700 flex items-center gap-1 transition">
            <i class="fa-solid fa-trash-can text-xs"></i>
            <span>हटाएं</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function openAddExamModal() {
  document.getElementById('modal-add-exam').classList.remove('hidden');
}

async function handleSaveExam(e) {
  e.preventDefault();
  const title = document.getElementById('exam-input-title').value.trim();
  const subject = document.getElementById('exam-input-subject').value.trim();
  const mode = document.getElementById('exam-input-mode').value;
  const date = document.getElementById('exam-input-date').value;
  const time = document.getElementById('exam-input-time').value;
  const notes = document.getElementById('exam-input-notes').value.trim();

  if (!title || !subject || !date) return;

  const localExam = {
    id: 'exam_' + Date.now(),
    _id: 'exam_' + Date.now(),
    title,
    subject,
    mode,
    date,
    time,
    notes,
    status: 'upcoming',
    userId: currentUser ? currentUser.id : null
  };

  currentExams.push(localExam);
  closeModal('modal-add-exam');
  e.target.reset();
  renderExams();
  renderDashboardStats();

  if (window.StudyPulseAPI) {
    try {
      const res = await StudyPulseAPI.exams.add({
        title,
        subject,
        mode,
        date,
        time,
        notes,
        userId: currentUser ? currentUser.id : null
      });
      if (res && res.data) {
        localExam._id = res.data._id || res.data.id;
        localExam.id = localExam._id;
      }
    } catch (err) {
      console.warn('Exam add API fallback:', err);
    }
  }
}

async function deleteExam(id) {
  if (confirm('क्या आप इस परीक्षा को हटाना चाहते हैं?')) {
    currentExams = currentExams.filter(x => x.id !== id && x._id !== id);
    renderExams();
    renderDashboardStats();
    if (window.StudyPulseAPI) {
      try {
        await StudyPulseAPI.exams.delete(id);
      } catch (err) {
        console.warn('Exam delete API fallback:', err);
      }
    }
  }
}

// ==========================================
// 14. RS AGGARWAL & STUDY NOTES SECTION
// ==========================================

function renderNotes() {
  const grid = document.getElementById('notes-grid');
  if (!grid) return;

  const search = (document.getElementById('notes-search-input')?.value || '').toLowerCase();
  const filterSubj = document.getElementById('notes-subject-filter')?.value || 'all';

  let filtered = currentNotes.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(search) || n.content.toLowerCase().includes(search);
    const matchSubj = filterSubj === 'all' || n.subject === filterSubj;
    return matchSearch && matchSubj;
  });

  filtered.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-8">
        <i class="fa-solid fa-note-sticky text-4xl text-slate-300 dark:text-slate-600 mb-2"></i>
        <p class="text-sm font-semibold text-slate-500">कोई नोट नहीं मिला।</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(n => `
    <div class="glass-panel p-5 rounded-2xl border ${n.pinned ? 'border-brand-400 dark:border-brand-600 shadow-brand-500/10' : 'border-slate-200 dark:border-slate-700'} flex flex-col justify-between card-hover relative">
      <div>
        <div class="flex items-center justify-between">
          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${n.subject.includes('RS') ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300' : 'bg-indigo-50 dark:bg-indigo-950/60 text-brand-600 dark:text-brand-300'}">
            ${escapeHtml(n.subject)}
          </span>
          <button onclick="togglePinNote('${n.id}')" class="text-sm transition ${n.pinned ? 'text-amber-500 hover:text-slate-400' : 'text-slate-300 dark:text-slate-600 hover:text-amber-500'}" title="Pin Note">
            <i class="fa-solid fa-thumbtack"></i>
          </button>
        </div>

        <h4 class="text-base font-bold text-slate-900 dark:text-white mt-3">${escapeHtml(n.title)}</h4>
        <pre class="mt-2 text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-100/70 dark:bg-slate-900/50 p-3 rounded-xl whitespace-pre-wrap overflow-x-auto max-h-56 leading-relaxed">${escapeHtml(n.content)}</pre>
      </div>

      <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
        <span>${n.createdAt || 'आज'}</span>
        <button onclick="deleteNote('${n.id}')" class="text-rose-500 hover:text-rose-700 transition" title="Delete Note">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function openAddNoteModal() {
  document.getElementById('modal-add-note').classList.remove('hidden');
}

async function handleSaveNote(e) {
  e.preventDefault();
  const title = document.getElementById('note-input-title').value.trim();
  const subject = document.getElementById('note-input-subject').value;
  const content = document.getElementById('note-input-content').value.trim();
  const pinned = document.getElementById('note-input-pin').checked;

  if (!title || !content) return;

  const localNote = {
    id: 'note_' + Date.now(),
    _id: 'note_' + Date.now(),
    title,
    subject,
    content,
    pinned,
    userId: currentUser ? currentUser.id : null,
    createdAt: new Date().toLocaleDateString('hi-IN')
  };

  currentNotes.unshift(localNote);
  closeModal('modal-add-note');
  e.target.reset();
  renderNotes();

  if (window.StudyPulseAPI) {
    try {
      const res = await StudyPulseAPI.notes.create({
        title,
        subject,
        content,
        pinned,
        userId: currentUser ? currentUser.id : null
      });
      if (res && res.data) {
        localNote._id = res.data._id || res.data.id;
        localNote.id = localNote._id;
      }
    } catch (err) {
      console.warn('Note creation API fallback:', err);
    }
  }
}

async function togglePinNote(id) {
  const n = currentNotes.find(x => x.id === id || x._id === id);
  if (n) {
    n.pinned = !n.pinned;
    renderNotes();
    if (window.StudyPulseAPI) {
      try {
        await StudyPulseAPI.notes.togglePin(id, n.pinned);
      } catch (err) {
        console.warn('Note pin API fallback:', err);
      }
    }
  }
}

async function deleteNote(id) {
  if (confirm('क्या आप इस नोट को हटाना चाहते हैं?')) {
    currentNotes = currentNotes.filter(x => x.id !== id && x._id !== id);
    renderNotes();
    if (window.StudyPulseAPI) {
      try {
        await StudyPulseAPI.notes.delete(id);
      } catch (err) {
        console.warn('Note delete API fallback:', err);
      }
    }
  }
}

// ==========================================
// 15. GOVT EXAM & JOB UPDATES SECTION
// ==========================================

function filterJobs(category) {
  activeJobCategory = category;
  document.querySelectorAll('#jobs-category-tabs .j-tab').forEach(btn => {
    if (btn.getAttribute('data-category') === category) {
      btn.className = "j-tab px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap bg-rose-600 text-white shadow-sm";
    } else {
      btn.className = "j-tab px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700";
    }
  });
  renderJobs();
}

function renderJobs() {
  const grid = document.getElementById('jobs-grid');
  if (!grid) return;

  const filtered = activeJobCategory === 'all'
    ? currentJobs
    : currentJobs.filter(j => j.category === activeJobCategory);

  grid.innerHTML = filtered.map(job => `
    <div class="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between card-hover relative overflow-hidden">
      
      <!-- Top Badges -->
      <div>
        <div class="flex items-center justify-between gap-2">
          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40">
            ${escapeHtml(job.category)}
          </span>
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${job.status === 'New' ? 'badge-live' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'}">
            ${job.status}
          </span>
        </div>

        <h4 class="text-base font-extrabold text-slate-900 dark:text-white mt-3 leading-snug">${escapeHtml(job.title)}</h4>
        <p class="text-xs text-brand-600 dark:text-brand-400 font-semibold mt-1"><i class="fa-solid fa-building-columns mr-1"></i>${escapeHtml(job.department)}</p>

        <!-- Quick Info Pills -->
        <div class="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
            <span class="text-[10px] text-slate-400 block font-semibold">रिक्तियां (Vacancies)</span>
            <span class="font-bold text-slate-800 dark:text-slate-100">${escapeHtml(job.vacancies)}</span>
          </div>
          <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
            <span class="text-[10px] text-slate-400 block font-semibold">अंतिम तिथि (Last Date)</span>
            <span class="font-bold text-amber-600 dark:text-amber-400">${escapeHtml(job.lastDate)}</span>
          </div>
        </div>

        <p class="text-xs text-slate-500 dark:text-slate-400 mt-3 line-clamp-2 leading-relaxed">
          ${escapeHtml(job.description)}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2">
        <button onclick="viewJobDetails('${job.id}')" class="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-black dark:bg-brand-600 dark:hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5">
          <i class="fa-solid fa-eye text-xs"></i>
          <span>पूरी जानकारी देखें</span>
        </button>
        <button onclick="quickAddJobExam('${job.id}')" class="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300 hover:bg-amber-100 border border-amber-200 dark:border-amber-800 transition" title="Add to Exam Schedule">
          <i class="fa-solid fa-calendar-plus text-sm"></i>
        </button>
      </div>

    </div>
  `).join('');
}

function viewJobDetails(jobId) {
  const job = currentJobs.find(j => j.id === jobId);
  if (!job) return;

  selectedJobForModal = job;

  document.getElementById('job-modal-title').textContent = job.title;
  document.getElementById('job-modal-dept').textContent = job.department;
  document.getElementById('job-modal-vacancies').textContent = job.vacancies;
  document.getElementById('job-modal-eligibility').textContent = job.qualification;
  document.getElementById('job-modal-lastdate').textContent = job.lastDate;
  document.getElementById('job-modal-examdate').textContent = job.examDate;
  document.getElementById('job-modal-description').textContent = job.description;
  document.getElementById('job-modal-pattern').textContent = job.pattern || 'पैटर्न आधिकारिक अधिसूचना के अनुसार।';

  document.getElementById('modal-job-details').classList.remove('hidden');
}

function quickAddJobExam(jobId) {
  const job = currentJobs.find(j => j.id === jobId);
  if (!job) return;

  const already = currentExams.some(e => e.title === job.title);
  if (already) {
    alert('यह परीक्षा पहले से ही आपकी परीक्षा अनुसूची (Exam Schedule) में मौजूद है!');
    return;
  }

  currentExams.push({
    id: 'exam_' + Date.now(),
    title: job.title,
    subject: job.department,
    mode: 'ऑनलाइन (Computer Based CBT)',
    date: getFutureDate(40),
    time: '10:00',
    notes: `योग्यता: ${job.qualification} | अंतिम तिथि: ${job.lastDate} | रिक्तियां: ${job.vacancies}`,
    status: 'upcoming'
  });

  saveUserData();
  renderExams();
  renderDashboardStats();
  triggerConfetti();
  alert(`🎉 '${job.title}' को आपकी आगामी परीक्षा अनुसूची में जोड़ दिया गया है!`);
}

function addJobToStudyPlan() {
  if (selectedJobForModal) {
    quickAddJobExam(selectedJobForModal.id);
    closeModal('modal-job-details');
  }
}

// ==========================================
// 16. HELPERS & GENERAL
// ==========================================

function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.add('hidden');
}

function formatDateHi(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

// ==========================================
// 17. UNIVERSAL SEARCH ENGINE (SEARCH EVERYTHING)
// ==========================================

function handleGlobalSearch(query) {
  const dropdown = document.getElementById('global-search-results');
  const clearBtn = document.getElementById('clear-search-btn');
  if (!dropdown) return;

  const q = (query || '').trim().toLowerCase();

  if (!q) {
    dropdown.classList.add('hidden');
    if (clearBtn) clearBtn.classList.add('hidden');
    return;
  }

  if (clearBtn) clearBtn.classList.remove('hidden');

  let results = [];

  // 1. Search Notes (RS Aggarwal & General)
  currentNotes.forEach(n => {
    if (n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q) || n.subject.toLowerCase().includes(q)) {
      results.push({
        type: 'note',
        badge: n.subject.includes('RS') ? 'RS अग्रवाल' : 'नोट्स',
        badgeColor: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300',
        title: n.title,
        subtitle: n.content.slice(0, 70) + '...',
        action: () => {
          navigateTo('notes');
          const filter = document.getElementById('notes-subject-filter');
          if (filter) {
            filter.value = 'all';
            renderNotes();
          }
          const searchInp = document.getElementById('notes-search-input');
          if (searchInp) {
            searchInp.value = n.title;
            renderNotes();
          }
        }
      });
    }
  });

  // 2. Search Tests
  COMPETITIVE_TESTS.forEach(t => {
    if (t.title.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)) {
      results.push({
        type: 'test',
        badge: 'मॉक टेस्ट',
        badgeColor: 'bg-indigo-100 text-brand-900 dark:bg-indigo-950 dark:text-brand-300',
        title: t.title,
        subtitle: `${t.durationMinutes} मिनट | ${t.questions.length} प्रश्न | ${t.difficulty}`,
        action: () => {
          startTest(t.id);
        }
      });
    }
  });

  // 3. Search Govt Jobs
  currentJobs.forEach(j => {
    if (j.title.toLowerCase().includes(q) || j.department.toLowerCase().includes(q) || j.category.toLowerCase().includes(q) || j.qualification.toLowerCase().includes(q)) {
      results.push({
        type: 'job',
        badge: j.category + ' भर्ती',
        badgeColor: 'bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-300',
        title: j.title,
        subtitle: `${j.vacancies} | अंतिम तिथि: ${j.lastDate}`,
        action: () => {
          navigateTo('jobs');
          viewJobDetails(j.id);
        }
      });
    }
  });

  // 4. Search Syllabus Chapters & Topics
  currentSyllabus.forEach(ch => {
    const matchCh = ch.chapter.toLowerCase().includes(q);
    const matchedTopic = ch.topics.find(top => top.name.toLowerCase().includes(q));
    if (matchCh || matchedTopic) {
      results.push({
        type: 'syllabus',
        badge: 'सिलेबस',
        badgeColor: 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300',
        title: ch.chapter,
        subtitle: matchedTopic ? `टॉपिक: ${matchedTopic.name}` : `${ch.topics.length} टॉपिक्स`,
        action: () => {
          navigateTo('syllabus');
        }
      });
    }
  });

  // 5. Search Exams
  currentExams.forEach(e => {
    if (e.title.toLowerCase().includes(q) || e.subject.toLowerCase().includes(q)) {
      results.push({
        type: 'exam',
        badge: 'एग्जाम',
        badgeColor: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300',
        title: e.title,
        subtitle: `तारीख: ${formatDateHi(e.date)} (समय: ${e.time})`,
        action: () => {
          navigateTo('exams');
        }
      });
    }
  });

  dropdown.classList.remove('hidden');

  if (results.length === 0) {
    dropdown.innerHTML = `
      <div class="p-4 text-center text-xs text-slate-400">
        <i class="fa-solid fa-face-meh text-xl mb-1.5 block"></i>
        <span>'${escapeHtml(q)}' के लिए कोई परिणाम नहीं मिला।</span>
      </div>
    `;
    return;
  }

  dropdown.innerHTML = `
    <div class="px-2 py-1 text-[11px] font-bold text-slate-400 border-b border-slate-100 dark:border-slate-700/60 flex justify-between">
      <span>खोज परिणाम (${results.length})</span>
      <span class="text-[10px]">क्लिक करके खोलें</span>
    </div>
    <div class="divide-y divide-slate-100 dark:divide-slate-700/50 mt-1">
      ${results.slice(0, 8).map((r, i) => `
        <div onclick="executeSearchResult(${i})" class="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/60 cursor-pointer transition flex items-start gap-2.5">
          <span class="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase shrink-0 mt-0.5 ${r.badgeColor}">
            ${r.badge}
          </span>
          <div class="flex-1 overflow-hidden">
            <h5 class="text-xs font-bold text-slate-900 dark:text-white truncate">${escapeHtml(r.title)}</h5>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">${escapeHtml(r.subtitle)}</p>
          </div>
          <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-400 mt-1"></i>
        </div>
      `).join('')}
    </div>
  `;

  window._currentSearchResults = results;
}

function executeSearchResult(index) {
  if (window._currentSearchResults && window._currentSearchResults[index]) {
    window._currentSearchResults[index].action();
    clearGlobalSearch();
  }
}

function clearGlobalSearch() {
  const inp = document.getElementById('global-search-input');
  const dropdown = document.getElementById('global-search-results');
  const clearBtn = document.getElementById('clear-search-btn');
  if (inp) inp.value = '';
  if (dropdown) dropdown.classList.add('hidden');
  if (clearBtn) clearBtn.classList.add('hidden');
}

document.addEventListener('click', (e) => {
  const searchBox = document.getElementById('global-search-input');
  const dropdown = document.getElementById('global-search-results');
  if (dropdown && !dropdown.contains(e.target) && e.target !== searchBox) {
    dropdown.classList.add('hidden');
  }
});

// ==========================================
// 18. CLICKABLE ACCOUNT INFO MODAL (HOME/PROFILE)
// ==========================================

function toggleAccountModal() {
  const modal = document.getElementById('modal-account-info');
  if (!modal) return;

  const isHidden = modal.classList.contains('hidden');
  if (isHidden) {
    if (currentUser) {
      document.getElementById('acc-name-display').textContent = currentUser.name || 'विद्यार्थी';
      document.getElementById('acc-username-display').textContent = '@' + currentUser.username;
      document.getElementById('acc-streak-display').textContent = currentUser.streak || 1;
      document.getElementById('acc-tests-count').textContent = currentTestHistory.length;

      const coinsDisplay = document.getElementById('acc-coins-display');
      if (coinsDisplay) coinsDisplay.textContent = currentUser.referralCoins || 100;

      const refDisplay = document.getElementById('acc-referral-display');
      if (refDisplay) refDisplay.textContent = currentUser.referralCode || 'SP-849201';

      updateAccountModalAvatar();

      const { pct } = calculateSyllabusProgress();
      document.getElementById('acc-syllabus-pct').textContent = `${pct}%`;

      const targetExamSelect = document.getElementById('acc-target-exam');
      if (targetExamSelect) {
        targetExamSelect.value = currentUser.targetExam || 'SSC CGL / CHSL 2026';
      }
    }
    modal.classList.remove('hidden');
  } else {
    modal.classList.add('hidden');
  }
}

function handleProfilePhotoUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('कृपया केवल एक मान्य फोटो/इमेज फ़ाइल चुनें।');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      // Resize & compress to max 256x256 square to fit comfortably in localStorage
      const canvas = document.createElement('canvas');
      const targetSize = 256;
      canvas.width = targetSize;
      canvas.height = targetSize;
      const ctx = canvas.getContext('2d');

      // Center crop square
      let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;
      if (img.width > img.height) {
        sWidth = img.height;
        sx = (img.width - img.height) / 2;
      } else if (img.height > img.width) {
        sHeight = img.width;
        sy = (img.height - img.width) / 2;
      }

      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetSize, targetSize);
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);

      if (!currentUser) return;
      currentUser.customPhoto = compressedDataUrl;
      localStorage.setItem('studypulse_session', JSON.stringify(currentUser));

      updateUserHeaderProfile();
      updateAccountModalAvatar();
      triggerConfetti();

      if (window.StudyPulseAPI) {
        StudyPulseAPI.auth.updateProfile(currentUser.id, { customPhoto: compressedDataUrl }).catch(err => console.warn('Photo upload API fallback:', err));
      }

      // Clear input values
      const gal = document.getElementById('profile-gallery-input');
      const cam = document.getElementById('profile-camera-input');
      if (gal) gal.value = '';
      if (cam) cam.value = '';
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function removeCustomProfilePhoto() {
  if (!currentUser) return;
  currentUser.customPhoto = null;
  localStorage.setItem('studypulse_session', JSON.stringify(currentUser));

  updateUserHeaderProfile();
  updateAccountModalAvatar();

  if (window.StudyPulseAPI) {
    StudyPulseAPI.auth.updateProfile(currentUser.id, { customPhoto: null }).catch(err => console.warn('Remove photo API fallback:', err));
  }
}

function updateAccountModalAvatar() {
  const accAvatar = document.getElementById('acc-avatar-display');
  const removeBtn = document.getElementById('acc-remove-photo-btn');
  if (!accAvatar) return;

  if (currentUser && currentUser.customPhoto) {
    accAvatar.innerHTML = `<img src="${currentUser.customPhoto}" class="w-full h-full object-cover rounded-full shadow-inner">`;
    if (removeBtn) removeBtn.classList.remove('hidden');
  } else {
    accAvatar.textContent = (currentUser && currentUser.avatar) ? currentUser.avatar : '👨‍🎓';
    if (removeBtn) removeBtn.classList.add('hidden');
  }
}

function updateUserAvatar(newAvatar) {
  if (!currentUser) return;
  currentUser.avatar = newAvatar;
  currentUser.customPhoto = null; // revert to emoji avatar
  localStorage.setItem('studypulse_session', JSON.stringify(currentUser));

  updateUserHeaderProfile();
  updateAccountModalAvatar();
  triggerConfetti();

  if (window.StudyPulseAPI) {
    StudyPulseAPI.auth.updateProfile(currentUser.id, { avatar: newAvatar, customPhoto: null }).catch(err => console.warn('Avatar update API fallback:', err));
  }
}

async function saveTargetExam(examName) {
  if (!currentUser) return;
  currentUser.targetExam = examName;
  localStorage.setItem('studypulse_session', JSON.stringify(currentUser));
  updateUserHeaderProfile();

  if (window.StudyPulseAPI) {
    try {
      await StudyPulseAPI.auth.updateProfile(currentUser.id, { targetExam: examName });
    } catch (err) {
      console.warn('Update target exam API fallback:', err);
    }
  }
}

// ==========================================
// 19. ADVERTISEMENT / SPONSORED BANNER LOGIC
// ==========================================

function dismissAdBanner() {
  const ad = document.getElementById('dashboard-ad-banner');
  if (ad) {
    ad.style.transition = 'all 0.3s ease';
    ad.style.opacity = '0';
    ad.style.transform = 'scale(0.95)';
    setTimeout(() => { ad.classList.add('hidden'); }, 300);
  }
}

function handleAdClick() {
  triggerConfetti();
  alert('🎉 बधाई! कूपन कोड "STUDY50" सक्रिय हो गया है। आपको RS अग्रवाल व मॉक टेस्ट पर 50% छूट मिलेगी!');
  navigateTo('tests');
}

// ==========================================
// ==========================================
// 20. SHAREABLE APPLICATION URL, QR CODE & MOBILE ACCESS
// ==========================================

let currentMobileTab = 'online'; // 'online' or 'wifi'
let currentNetworkInfo = {
  local_ip: '127.0.0.1',
  mobile_wifi_url: 'http://localhost:5000',
  localhost_url: 'http://localhost:5000',
  public_url: null,
  tunnel_status: 'starting',
  tunnel_message: 'सुरंग तैयार हो रही है...'
};
let qrCodeInstance = null;
let networkInfoPollTimer = null;

async function fetchNetworkInfo(forceRender = false) {
  try {
    const res = await fetch('/api/network-info');
    if (res.ok) {
      const data = await res.json();
      if (data && data.success) {
        currentNetworkInfo = data;
        if (forceRender || document.getElementById('modal-mobile-link')?.classList.contains('hidden') === false) {
          renderActiveMobileView();
        }
        // If tunnel is active, throttle polling to slow background check
        if (data.public_url && data.tunnel_status === 'online') {
          if (networkInfoPollTimer) {
            clearInterval(networkInfoPollTimer);
            networkInfoPollTimer = setInterval(() => {
              fetchNetworkInfo(false);
            }, 30000); // 30 sec slow heartbeat
          }
        }
      }
    }
  } catch (e) {
    console.log('[StudyPulse] Network info fetch deferred:', e);
  }
}

function startNetworkInfoPolling() {
  fetchNetworkInfo(true);
  if (!networkInfoPollTimer) {
    networkInfoPollTimer = setInterval(() => {
      fetchNetworkInfo(true);
    }, 3000);
  }
}

function getActiveMobileUrl() {
  if (currentMobileTab === 'online') {
    return currentNetworkInfo.public_url || currentNetworkInfo.mobile_wifi_url || window.location.href;
  } else {
    return currentNetworkInfo.mobile_wifi_url || `http://${window.location.hostname}:5000`;
  }
}

function renderQRCode(targetUrl) {
  const container = document.getElementById('mobile-qrcode-box');
  if (!container) return;
  container.innerHTML = '';

  if (typeof QRCode !== 'undefined') {
    try {
      qrCodeInstance = new QRCode(container, {
        text: targetUrl,
        width: 124,
        height: 124,
        colorDark: '#0f172a',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
      });
      return;
    } catch (e) {
      console.warn('[QR] Local QRCode rendering exception, using fallback:', e);
    }
  }

  // Fallback if QRCode lib is missing
  const fallbackImg = document.createElement('img');
  fallbackImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=124x124&data=${encodeURIComponent(targetUrl)}`;
  fallbackImg.alt = 'QR Code';
  fallbackImg.className = 'w-32 h-32 rounded-xl object-contain';
  container.appendChild(fallbackImg);
}

function renderActiveMobileView() {
  const urlInput = document.getElementById('active-mobile-url-input');
  const modeTitle = document.getElementById('mobile-mode-title');
  const statusPill = document.getElementById('mobile-status-pill');
  const statusText = document.getElementById('mobile-status-text');
  const modeHint = document.getElementById('mobile-mode-hint');
  const tunnelBadge = document.getElementById('mobile-tunnel-badge');

  const tabBtnOnline = document.getElementById('tab-btn-online');
  const tabBtnWifi = document.getElementById('tab-btn-wifi');

  const activeUrl = getActiveMobileUrl();

  if (urlInput) {
    urlInput.value = activeUrl;
  }

  if (currentMobileTab === 'online') {
    if (tabBtnOnline) {
      tabBtnOnline.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 bg-indigo-600 text-white shadow-sm';
    }
    if (tabBtnWifi) {
      tabBtnWifi.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700';
    }

    if (modeTitle) {
      modeTitle.innerHTML = '<i class="fa-solid fa-bolt text-amber-500 mr-1.5"></i>दुनिया भर में किसी भी मोबाइल / नेटवर्क पर:';
    }

    const isOnline = Boolean(currentNetworkInfo.public_url);
    if (tunnelBadge) {
      tunnelBadge.textContent = isOnline ? 'लाइव 24/7' : 'कनेक्टिंग...';
      tunnelBadge.className = isOnline
        ? 'text-[10px] bg-emerald-400 text-slate-900 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider'
        : 'text-[10px] bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse';
    }

    if (statusPill && statusText) {
      if (isOnline) {
        statusPill.className = 'text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 px-2.5 py-0.5 rounded-full flex items-center gap-1';
        statusText.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping mr-1"></span>सक्रिय एवं कनेक्टेड (Online)';
      } else {
        statusPill.className = 'text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/70 px-2.5 py-0.5 rounded-full flex items-center gap-1';
        statusText.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse mr-1"></span>कनेक्ट हो रहा है...';
      }
    }

    if (modeHint) {
      modeHint.textContent = '✓ यह सुरक्षित StudyPulse ऑनलाइन लिंक 24/7 ऑटो-कनेक्टेड रहेगी और बिना किसी एरर के काम करेगी।';
    }
  } else {
    // Wi-Fi Tab
    if (tabBtnOnline) {
      tabBtnOnline.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700';
    }
    if (tabBtnWifi) {
      tabBtnWifi.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 bg-indigo-600 text-white shadow-sm';
    }

    if (modeTitle) {
      modeTitle.innerHTML = '<i class="fa-solid fa-wifi text-emerald-500 mr-1.5"></i>सेम वाई-फ़ाई / हॉटस्पॉट (LAN Direct):';
    }

    if (statusPill && statusText) {
      statusPill.className = 'text-[10px] font-bold text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/70 px-2.5 py-0.5 rounded-full flex items-center gap-1';
      statusText.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-sky-500 mr-1"></span>LAN डायरेक्ट (बिना इंटरनेट)';
    }

    if (modeHint) {
      modeHint.textContent = '⚡ अगर मोबाइल और यह कंप्यूटर एक ही Wi-Fi या फोन हॉटस्पॉट से जुड़े हैं, तो यह लिंक सुपरफ़ास्ट लोड होगी।';
    }
  }

  // Generate QR Code
  renderQRCode(activeUrl);
}

function switchMobileTab(tab) {
  currentMobileTab = tab;
  renderActiveMobileView();
}

function updateMobileLinkModalData() {
  renderActiveMobileView();
}

function openMobileLinkModal() {
  startNetworkInfoPolling();
  renderActiveMobileView();
  const modal = document.getElementById('modal-mobile-link');
  if (modal) modal.classList.remove('hidden');
}

function closeMobileLinkModal() {
  const modal = document.getElementById('modal-mobile-link');
  if (modal) modal.classList.add('hidden');
}

function copyActiveMobileUrl() {
  const url = getActiveMobileUrl();
  const btnText = document.getElementById('copy-active-btn-text');

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      if (btnText) {
        const orig = btnText.textContent;
        btnText.textContent = '✓ हुआ!';
        setTimeout(() => { btnText.textContent = orig; }, 2000);
      }
      showToast('लिंक क्लिपबोर्ड में कॉपी हो गई! 📋', 'success');
    }).catch(() => {
      copyViaFallback(url, btnText);
    });
  } else {
    copyViaFallback(url, btnText);
  }
}

function copyViaFallback(url, btnText) {
  const inp = document.getElementById('active-mobile-url-input');
  if (inp) {
    inp.select();
    document.execCommand('copy');
    if (btnText) {
      const orig = btnText.textContent;
      btnText.textContent = '✓ हुआ!';
      setTimeout(() => { btnText.textContent = orig; }, 2000);
    }
    showToast('लिंक क्लिपबोर्ड में कॉपी हो गई! 📋', 'success');
  }
}

function shareViaWhatsAppActive() {
  const url = getActiveMobileUrl();
  const text = encodeURIComponent(`StudyPulse - सरकारी एग्जाम व RS अग्रवाल स्टडी ऐप अपने मोबाइल पर खोलें:\n👉 ${url}`);
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}

async function refreshMobileLinkData(showUserFeedback = false) {
  const icon = document.getElementById('refresh-link-icon');
  if (icon) icon.classList.add('fa-spin');

  await fetchNetworkInfo(true);

  setTimeout(() => {
    if (icon) icon.classList.remove('fa-spin');
    if (showUserFeedback) {
      showToast('लिंक और QR कोड रीफ्रेश हो गए! ✨', 'success');
    }
  }, 400);
}

async function restartCloudflareTunnel() {
  try {
    showToast('StudyPulse सुरक्षित ऑनलाइन नेटवर्क रीस्टार्ट हो रहा है...', 'info');
    await fetch('/api/tunnel/restart', { method: 'POST' });
    startNetworkInfoPolling();
    setTimeout(() => {
      fetchNetworkInfo(true);
    }, 2500);
  } catch (e) {
    showToast('टनल रीस्टार्ट त्रुटि', 'error');
  }
}

function getShareableAppUrl() {
  const code = (currentUser && currentUser.referralCode) ? currentUser.referralCode : 'STUDY';
  if (currentNetworkInfo && currentNetworkInfo.public_url) {
    return `${currentNetworkInfo.public_url}?ref=${code}`;
  }
  if (currentNetworkInfo && currentNetworkInfo.mobile_wifi_url && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return `${currentNetworkInfo.mobile_wifi_url}?ref=${code}`;
  }
  if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
    return `${window.location.origin}${window.location.pathname}?ref=${code}`;
  }
  return `https://studypulse.app/join?ref=${code}`;
}

function openShareModal() {
  if (!currentUser) return;
  if (!currentUser.referralCode) {
    currentUser.referralCode = 'SP-' + Math.floor(100000 + Math.random() * 900000);
    if (typeof currentUser.referralCount !== 'number') currentUser.referralCount = 0;
    if (typeof currentUser.referralCoins !== 'number') currentUser.referralCoins = 100;
    
    const users = JSON.parse(localStorage.getItem('studypulse_users') || '[]');
    const uIdx = users.findIndex(u => u.id === currentUser.id);
    if (uIdx !== -1) {
      users[uIdx].referralCode = currentUser.referralCode;
      users[uIdx].referralCount = currentUser.referralCount;
      users[uIdx].referralCoins = currentUser.referralCoins;
      localStorage.setItem('studypulse_users', JSON.stringify(users));
    }
    localStorage.setItem('studypulse_session', JSON.stringify(currentUser));
  }

  const codeDisplay = document.getElementById('share-referral-code-display');
  const urlInput = document.getElementById('share-app-url-input');
  const refCount = document.getElementById('share-referrals-count');
  const coinsCount = document.getElementById('share-coins-count');

  if (codeDisplay) codeDisplay.textContent = currentUser.referralCode;
  if (urlInput) urlInput.value = getShareableAppUrl();
  if (refCount) refCount.textContent = currentUser.referralCount || 0;
  if (coinsCount) coinsCount.textContent = currentUser.referralCoins || 100;

  const modal = document.getElementById('modal-share-referral');
  if (modal) modal.classList.remove('hidden');
}

function closeShareModal() {
  const modal = document.getElementById('modal-share-referral');
  if (modal) modal.classList.add('hidden');
}

function copyReferralCode() {
  if (!currentUser) return;
  const code = currentUser.referralCode || 'SP-849201';
  navigator.clipboard.writeText(code).then(() => {
    const btnText = document.getElementById('copy-code-btn-text');
    if (btnText) {
      const orig = btnText.textContent;
      btnText.textContent = 'कॉपी हुआ! ✅';
      setTimeout(() => { btnText.textContent = orig; }, 2000);
    }
    triggerConfetti();
  }).catch(() => {
    prompt('रेफरल कोड कॉपी करें:', code);
  });
}

function copyShareUrl() {
  const url = getShareableAppUrl();
  navigator.clipboard.writeText(url).then(() => {
    const btnText = document.getElementById('copy-url-btn-text');
    if (btnText) {
      const orig = btnText.textContent;
      btnText.textContent = 'कॉपी हुआ! ✅';
      setTimeout(() => { btnText.textContent = orig; }, 2000);
    }
    triggerConfetti();
  }).catch(() => {
    prompt('ऐप शेयर लिंक कॉपी करें:', url);
  });
}

function getShareInvitationText() {
  const code = (currentUser && currentUser.referralCode) ? currentUser.referralCode : 'STUDY';
  const url = getShareableAppUrl();
  return `📚 *StudyPulse - स्मार्ट स्टडी & सरकारी नौकरी तैयारी ऐप*\n\n🔥 RS अग्रवाल गणित के सम्पूर्ण नोट्स व ट्रिक्स\n🎯 150+ प्रतियोगी लाइव मॉक टेस्ट (SSC, Railway, Banking, Police)\n📢 ताजा सरकारी भर्ती अलर्ट्स\n\n👉 *तुरंत ऐप खोलें:* ${url}\n🎁 *मेरा रेफरल कोड:* \`${code}\` लगाएं और तुरंत 100 बोनस स्टडी कॉइन्स पाएं!`;
}

function shareViaWhatsApp() {
  const text = encodeURIComponent(getShareInvitationText());
  const whatsappUrl = `https://api.whatsapp.com/send?text=${text}`;
  window.open(whatsappUrl, '_blank');
}

function shareViaTelegram() {
  const text = encodeURIComponent(getShareInvitationText());
  const url = encodeURIComponent(getShareableAppUrl());
  const tgUrl = `https://t.me/share/url?url=${url}&text=${text}`;
  window.open(tgUrl, '_blank');
}

function shareNativeOrEmail() {
  const title = 'StudyPulse - सरकारी एग्जाम व RS अग्रवाल स्टडी ऐप';
  const text = getShareInvitationText();
  const url = getShareableAppUrl();

  if (navigator.share) {
    navigator.share({
      title: title,
      text: text,
      url: url
    }).catch(err => console.log('Share dismissed', err));
  } else {
    copyShareUrl();
    alert('ऐप शेयर लिंक कॉपी कर लिया गया है! इसे आप किसी भी ऐप पर शेयर कर सकते हैं।');
  }
}

// Window load trigger

// ==========================================
// STUDYPULSE ANIMATED INTRO SPLASH SCREEN
// ==========================================
let splashDismissed = false;

function initSplashScreen() {
  const splash = document.getElementById('studypulse-splash-screen');
  const bar = document.getElementById('splash-progress-bar');
  const status = document.getElementById('splash-status-text');
  if (!splash) return;

  // Animate progress smoothly
  setTimeout(() => {
    if (bar) bar.style.width = '35%';
    if (status) status.textContent = 'StudyPulse सिस्टम लोड हो रहा है...';
  }, 250);

  setTimeout(() => {
    if (bar) bar.style.width = '70%';
    if (status) status.textContent = 'सरकारी परीक्षा डेटा व स्टडी मटेरियल तैयार...';
  }, 750);

  setTimeout(() => {
    if (bar) bar.style.width = '100%';
    if (status) status.textContent = 'StudyPulse ऐप तैयार है! ✨';
  }, 1300);

  setTimeout(() => {
    dismissSplashScreen();
  }, 1800);
}

function dismissSplashScreen() {
  if (splashDismissed) return;
  splashDismissed = true;
  const splash = document.getElementById('studypulse-splash-screen');
  if (!splash) return;
  
  splash.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  splash.style.opacity = '0';
  splash.style.transform = 'scale(1.05)';
  splash.style.pointerEvents = 'none';

  setTimeout(() => {
    splash.style.display = 'none';
  }, 650);
}

// ==========================================
// PWA INSTALLATION & SERVICE WORKER CONTROLLER
// ==========================================
let deferredPwaPrompt = null;

function initPwa() {
  // Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        console.log('[StudyPulse PWA] ServiceWorker registered:', reg.scope);
      }).catch((err) => {
        console.warn('[StudyPulse PWA] ServiceWorker registration notice:', err);
      });
    });
  }

  // Intercept beforeinstallprompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPwaPrompt = e;
    const pwaBtn = document.getElementById('pwa-install-btn');
    if (pwaBtn) {
      pwaBtn.classList.remove('hidden');
      pwaBtn.classList.add('flex');
    }
  });

  window.addEventListener('appinstalled', () => {
    deferredPwaPrompt = null;
    const pwaBtn = document.getElementById('pwa-install-btn');
    if (pwaBtn) pwaBtn.classList.add('hidden');
    showToast('🎉 StudyPulse ऐप आपके डिवाइस पर इंस्टॉल हो गया है!', 'success');
  });
}

async function triggerPwaInstall() {
  if (deferredPwaPrompt) {
    try {
      deferredPwaPrompt.prompt();
      const choice = await deferredPwaPrompt.userChoice;
      if (choice && choice.outcome === 'accepted') {
        showToast('StudyPulse ऐप इंस्टॉल किया जा रहा है... 🚀', 'success');
      }
    } catch (e) {
      console.warn('PWA install prompt error:', e);
    }
    deferredPwaPrompt = null;
    const pwaBtn = document.getElementById('pwa-install-btn');
    if (pwaBtn) pwaBtn.classList.add('hidden');
  } else {
    showPwaInstructionsModal();
  }
}

function showPwaInstructionsModal() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isAndroid = /Android/.test(navigator.userAgent);
  
  let instructions = 'अपने ब्राउज़र मेन्यू (⋮) में जाकर "Install App" या "Add to Home screen" चुनें।';
  if (isIOS) {
    instructions = 'iPhone / iPad: नीचे शेयर बटन (⎙) दबाएं और फिर "Add to Home Screen" (+ आइकन) चुनें।';
  } else if (isAndroid) {
    instructions = 'Android: ऊपर कोने में तीन डॉट्स (⋮) दबाएं और "Install app" या "होम स्क्रीन में जोड़ें" चुनें।';
  }

  alert(`📲 StudyPulse को ऐप की तरह इंस्टॉल करें:\n\n${instructions}\n\nइसके बाद ऐप आपकी होम स्क्रीन से सीधे एक क्लिक में खुलेगा!`);
}

window.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  initPwa();
  initStorage();
  fetchNetworkInfo(false);
});


// ==========================================
// PDF & STUDY MATERIALS LOGIC (STUDENT VIEW)
// ==========================================
let currentMaterials = [];
let activeMaterialCategory = 'all';

function filterMaterials(cat) {
  activeMaterialCategory = cat;
  const tabs = document.querySelectorAll('#materials-category-tabs .mat-tab');
  tabs.forEach(t => {
    if (t.getAttribute('data-cat') === cat) {
      t.className = 'mat-tab px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap bg-rose-600 text-white shadow-sm';
    } else {
      t.className = 'mat-tab px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700';
    }
  });
  renderMaterials();
}

function renderMaterials() {
  const grid = document.getElementById('materials-grid');
  if (!grid) return;

  let list = currentMaterials;
  if (activeMaterialCategory !== 'all') {
    list = currentMaterials.filter(m => m.category && m.category.toLowerCase() === activeMaterialCategory.toLowerCase());
  }

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full p-12 text-center text-slate-400 glass-panel rounded-2xl border border-slate-200 dark:border-slate-800">
        <i class="fa-solid fa-file-pdf text-4xl mb-3 text-rose-400/60"></i>
        <h4 class="text-sm font-bold text-slate-700 dark:text-slate-300">इस श्रेणी में कोई PDF मटेरियल नहीं मिला</h4>
        <p class="text-xs text-slate-400 mt-1">एडमिन द्वारा नई अध्ययन सामग्री जोड़े जाने पर यहाँ दिखाई देगी।</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = list.map(m => `
    <div class="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between card-hover">
      <div>
        <div class="flex items-center justify-between">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300">
            <i class="fa-solid fa-file-pdf"></i> ${escapeHtml(m.type || 'PDF')}
          </span>
          <span class="text-[11px] font-semibold text-slate-400">
            ${m.pages || ''} ${m.fileSize ? `• ${m.fileSize}` : ''}
          </span>
        </div>

        <h4 class="text-base font-bold text-slate-900 dark:text-white mt-3 leading-snug">${escapeHtml(m.title)}</h4>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">${escapeHtml(m.description || '')}</p>

        ${m.chapter ? `
          <div class="mt-3 text-[11px] text-brand-600 dark:text-brand-400 font-semibold bg-brand-50 dark:bg-brand-950/40 px-2.5 py-1 rounded-lg">
            📖 संबंधित अध्याय: ${escapeHtml(m.chapter)}
          </div>
        ` : ''}
      </div>

      <div class="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-3">
        <a href="${m.fileUrl}" target="_blank" class="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs shadow-md shadow-rose-500/25 transition flex items-center justify-center gap-2">
          <i class="fa-solid fa-file-arrow-down"></i>
          <span>PDF देखें एवं डाउनलोड करें</span>
        </a>
      </div>
    </div>
  `).join('');
}

// ==========================================
// 19. SEMI AI STUDY ASSISTANT CONTROLLER
// ==========================================

let semiAiCurrentProvider = 'gemini';
let semiAiHistory = [];
let semiAiSpeechRecognition = null;
let isSemiAiVoiceActive = false;
let isSemiAiInitialized = false;

async function autoConnectAiEngine() {
  try {
    if (!localStorage.getItem('studypulse_ai_provider')) {
      localStorage.setItem('studypulse_ai_provider', 'gemini');
    }
    semiAiCurrentProvider = 'gemini';
    updateSemiAiBadge('gemini', { directConnect: true });

    if (window.StudyPulseAPI && StudyPulseAPI.ai) {
      const res = await StudyPulseAPI.ai.getStatus();
      if (res && res.success) {
        console.log('[StudyPulse AI] Engine Auto-Connected Live:', res.mode);
        updateSemiAiBadge('gemini', res);
      }
    }
  } catch (err) {
    console.log('[StudyPulse AI] Direct Auto-Connect active');
  }
}

async function initSemiAi() {
  if (isSemiAiInitialized) {
    const inp = document.getElementById('semi-ai-input-field');
    if (inp) inp.focus();
    return;
  }
  isSemiAiInitialized = true;

  const savedProvider = localStorage.getItem('studypulse_ai_provider');

  // Load server settings
  try {
    const res = await StudyPulseAPI.ai.getSettings();
    if (res && res.success) {
      semiAiCurrentProvider = savedProvider || res.provider || 'gemini';
      updateSemiAiBadge(semiAiCurrentProvider, res);
    }
  } catch (e) {
    console.warn('[Semi AI] Server settings fetch warning:', e);
    semiAiCurrentProvider = savedProvider || 'gemini';
    updateSemiAiBadge(semiAiCurrentProvider, null);
  }

  // Load suggestion prompt cards
  loadSemiAiSuggestions();

  // Restore chat messages from localStorage
  restoreSemiAiChatHistory();

  // Auto-resize textarea handler
  setupSemiAiInputAutoResize();

  // Focus input
  setTimeout(() => {
    const inp = document.getElementById('semi-ai-input-field');
    if (inp) inp.focus();
  }, 150);
}

function updateSemiAiBadge(provider, serverCfg) {
  const badgeText = document.getElementById('semi-ai-provider-text');
  if (!badgeText) return;
  if (provider === 'gemini') {
    badgeText.textContent = 'Google Connected • StudyPulse AI Active';
  } else if (provider === 'openai') {
    badgeText.textContent = 'OpenAI ChatGPT Active';
  } else {
    badgeText.textContent = 'StudyPulse AI Engine Active';
  }
}

async function loadSemiAiSuggestions() {
  const grid = document.getElementById('semi-ai-quick-prompts-grid');
  if (!grid) return;

  try {
    const res = await StudyPulseAPI.ai.getSuggestions();
    const suggestions = (res && res.success && res.suggestions) || [
      { icon: "fa-brands fa-google", title: "Google सर्च व रिसर्च", prompt: "Google सर्च https://www.google.com/ पर जाएं या किसी भी विषय पर रिसर्च करें" },
      { icon: "fa-calculator", title: "RS अग्रवाल गणित ट्रिक", prompt: "RS अग्रवाल: प्रतिशत और लाभ-हानि निकालने की सबसे तेज़ शॉर्टकट ट्रिक्स बताओ।" },
      { icon: "fa-flask", title: "विज्ञान: प्रकाश संश्लेषण", prompt: "प्रकाश संश्लेषण (Photosynthesis) की पूरी प्रक्रिया सरल हिंदी में समझाओ।" },
      { icon: "fa-landmark", title: "संविधान: मौलिक अधिकार", prompt: "भारतीय संविधान के सभी 6 मौलिक अधिकार (Articles 12-35) विस्तार से बताओ।" }
    ];

    grid.innerHTML = suggestions.map(item => `
      <div onclick="askSemiAiPrompt('${escapeHtml(item.prompt).replace(/'/g, "\\'")}')" class="prompt-pill-card p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/50 hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700/70 hover:border-indigo-400 dark:hover:border-indigo-500/50 cursor-pointer flex items-center gap-3 transition group">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform shrink-0 border border-indigo-200/40 dark:border-indigo-700/40">
          <i class="${escapeHtml(item.icon)} text-sm"></i>
        </div>
        <div class="overflow-hidden">
          <div class="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors truncate">${escapeHtml(item.title)}</div>
          <div class="text-[10px] text-slate-400 dark:text-slate-400 truncate mt-0.5">${escapeHtml(item.prompt)}</div>
        </div>
        <i class="fa-solid fa-arrow-right text-[10px] text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all ml-auto shrink-0"></i>
      </div>
    `).join('');
  } catch (e) {
    console.error('Failed to load Semi AI suggestions:', e);
  }
}

// ==================================================
// IN-APP GOOGLE SEARCH & DUAL MODE CONTROLLER
// ==================================================

let semiCurrentMode = 'ai'; // 'ai' or 'google'
let googleSearchSpeechRecognition = null;
let isGoogleVoiceActive = false;

function switchSemiMode(mode) {
  semiCurrentMode = mode || 'ai';
  const tabAi = document.getElementById('tab-semi-ai-mode');
  const tabGoogle = document.getElementById('tab-semi-google-mode');
  const viewAi = document.getElementById('semi-ai-chat-view');
  const viewGoogle = document.getElementById('semi-google-search-view');

  if (semiCurrentMode === 'ai') {
    if (tabAi) {
      tabAi.className = "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm cursor-pointer";
    }
    if (tabGoogle) {
      tabGoogle.className = "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer";
    }
    if (viewAi) viewAi.classList.remove('hidden');
    if (viewGoogle) viewGoogle.classList.add('hidden');
    setTimeout(() => {
      const inp = document.getElementById('semi-ai-input-field');
      if (inp) inp.focus();
    }, 100);
  } else {
    if (tabGoogle) {
      tabGoogle.className = "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm cursor-pointer";
    }
    if (tabAi) {
      tabAi.className = "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer";
    }
    if (viewAi) viewAi.classList.add('hidden');
    if (viewGoogle) viewGoogle.classList.remove('hidden');
    setTimeout(() => {
      const gInp = document.getElementById('google-inapp-search-input');
      if (gInp) gInp.focus();
    }, 100);
  }
}

function performGoogleInAppSearch(query) {
  const q = (query || '').trim();
  const searchInput = document.getElementById('google-inapp-search-input');
  if (searchInput && q) {
    searchInput.value = q;
  }
  
  // Switch to Google view
  switchSemiMode('google');

  const iframe = document.getElementById('semi-google-iframe');
  const urlBar = document.getElementById('google-inapp-url-bar');
  const loader = document.getElementById('google-iframe-loader');

  const targetQuery = q || (searchInput && searchInput.value ? searchInput.value.trim() : 'StudyPulse Exam Preparation');
  const targetUrl = targetQuery 
    ? `https://www.google.com/search?igu=1&q=${encodeURIComponent(targetQuery)}`
    : 'https://www.google.com/webhp?igu=1';
  const displayUrl = targetQuery 
    ? `https://www.google.com/search?q=${encodeURIComponent(targetQuery)}`
    : 'https://www.google.com/';

  if (urlBar) {
    urlBar.textContent = displayUrl;
    urlBar.title = displayUrl;
  }

  if (loader) {
    loader.classList.remove('opacity-0');
    loader.classList.add('opacity-100');
  }

  if (iframe) {
    iframe.src = targetUrl;
    iframe.onload = () => {
      if (loader) {
        loader.classList.remove('opacity-100');
        loader.classList.add('opacity-0');
      }
    };
    setTimeout(() => {
      if (loader) {
        loader.classList.remove('opacity-100');
        loader.classList.add('opacity-0');
      }
    }, 1200);
  }

  showToast(`Google पर खोजा जा रहा है: "${targetQuery}" 🌐`, 'info');
}

function handleGoogleInAppForm(e) {
  if (e) e.preventDefault();
  const inp = document.getElementById('google-inapp-search-input');
  const q = inp && inp.value ? inp.value.trim() : '';
  if (!q) {
    showToast('कृपया Google पर खोजने के लिए कुछ लिखें!', 'info');
    if (inp) inp.focus();
    return;
  }
  performGoogleInAppSearch(q);
}

function clearGoogleInAppInput() {
  const inp = document.getElementById('google-inapp-search-input');
  if (inp) {
    inp.value = '';
    inp.focus();
  }
}

function searchGoogleFromSemiInput() {
  const inp = document.getElementById('semi-ai-input-field');
  const q = inp && inp.value ? inp.value.trim() : '';
  if (!q) {
    switchSemiMode('google');
    showToast('डायरेक्ट Google सर्च मोड सक्रिय! 🌐', 'info');
    return;
  }
  performGoogleInAppSearch(q);
}

function searchGoogleInApp(query) {
  if (!query) return;
  performGoogleInAppSearch(query);
}

function openGoogleSearchDirect(query) {
  const inp = document.getElementById('semi-ai-input-field');
  const q = query || (inp && inp.value ? inp.value.trim() : '');
  if (q) {
    performGoogleInAppSearch(q);
  } else {
    switchSemiMode('google');
  }
}

function goGoogleBack() {
  const iframe = document.getElementById('semi-google-iframe');
  if (iframe && iframe.contentWindow) {
    try {
      iframe.contentWindow.history.back();
      showToast('पीछे जा रहे हैं...', 'info');
      return;
    } catch (e) {}
  }
  loadGoogleHome();
}

function goGoogleForward() {
  const iframe = document.getElementById('semi-google-iframe');
  if (iframe && iframe.contentWindow) {
    try {
      iframe.contentWindow.history.forward();
      showToast('आगे जा रहे हैं...', 'info');
      return;
    } catch (e) {}
  }
}

function refreshGoogleFrame() {
  const iframe = document.getElementById('semi-google-iframe');
  if (iframe) {
    const cur = iframe.src;
    iframe.src = 'about:blank';
    setTimeout(() => {
      iframe.src = cur;
    }, 50);
    showToast('Google रिफ्रेश किया गया 🔄', 'info');
  }
}

function loadGoogleHome() {
  const searchInput = document.getElementById('google-inapp-search-input');
  if (searchInput) searchInput.value = '';
  const iframe = document.getElementById('semi-google-iframe');
  const urlBar = document.getElementById('google-inapp-url-bar');
  if (urlBar) urlBar.textContent = 'https://www.google.com/';
  if (iframe) iframe.src = 'https://www.google.com/webhp?igu=1';
  showToast('Google होम पेज लोड किया गया 🌐', 'info');
}

function openGoogleInNewTab() {
  const searchInput = document.getElementById('google-inapp-search-input');
  const q = (searchInput && searchInput.value ? searchInput.value.trim() : '');
  const url = q ? `https://www.google.com/search?q=${encodeURIComponent(q)}` : 'https://www.google.com/';
  window.open(url, '_blank', 'noopener,noreferrer');
  showToast('Google.com नए टैब में खोला गया! 🌐', 'info');
}

function copyGoogleUrl() {
  const urlBar = document.getElementById('google-inapp-url-bar');
  const url = (urlBar && urlBar.textContent ? urlBar.textContent.trim() : 'https://www.google.com/');
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      showToast('Google लिंक कॉपी हो गया! 📋', 'success');
    }).catch(() => {
      showToast('लिंक कॉपी नहीं हो सका', 'error');
    });
  }
}

function toggleGoogleVoiceSearch() {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    showToast('आपके ब्राउज़र में वॉइस सर्च समर्थित नहीं है। कृपया लिखकर खोजें।', 'error');
    return;
  }

  const voiceBtn = document.getElementById('google-inapp-voice-btn');
  const voiceIcon = document.getElementById('google-voice-icon');
  const searchInput = document.getElementById('google-inapp-search-input');

  if (isGoogleVoiceActive && googleSearchSpeechRecognition) {
    try {
      googleSearchSpeechRecognition.stop();
    } catch (e) {}
    isGoogleVoiceActive = false;
    if (voiceBtn) voiceBtn.classList.remove('text-rose-500', 'animate-pulse');
    if (voiceIcon) voiceIcon.className = 'fa-solid fa-microphone text-sm sm:text-base';
    return;
  }

  try {
    googleSearchSpeechRecognition = new SpeechRec();
    googleSearchSpeechRecognition.lang = 'hi-IN';
    googleSearchSpeechRecognition.continuous = false;
    googleSearchSpeechRecognition.interimResults = false;

    googleSearchSpeechRecognition.onstart = () => {
      isGoogleVoiceActive = true;
      if (voiceBtn) voiceBtn.classList.add('text-rose-500', 'animate-pulse');
      if (voiceIcon) voiceIcon.className = 'fa-solid fa-microphone-lines text-sm sm:text-base text-rose-500';
      showToast('बोलिए! Google सुन रहा है... 🎙️', 'info');
    };

    googleSearchSpeechRecognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      if (transcript && searchInput) {
        searchInput.value = transcript;
        showToast(`सुना: "${transcript}"`, 'success');
        performGoogleInAppSearch(transcript);
      }
    };

    googleSearchSpeechRecognition.onerror = (e) => {
      console.warn('[Google Voice]', e);
      showToast('आवाज़ साफ़ सुनाई नहीं दी, कृपया पुनः प्रयास करें।', 'error');
    };

    googleSearchSpeechRecognition.onend = () => {
      isGoogleVoiceActive = false;
      if (voiceBtn) voiceBtn.classList.remove('text-rose-500', 'animate-pulse');
      if (voiceIcon) voiceIcon.className = 'fa-solid fa-microphone text-sm sm:text-base';
    };

    googleSearchSpeechRecognition.start();
  } catch (err) {
    console.error('[Google Voice Init]', err);
    showToast('माइक शुरू करने में समस्या हुई।', 'error');
  }
}

function askSemiAiPrompt(promptText) {
  if (promptText && (promptText.includes('https://www.google.com/') || promptText.includes('Google'))) {
    performGoogleInAppSearch(promptText.replace(/https:\/\/[^\s]+/g, '').replace('Google', '').trim() || 'RS Aggarwal Mathematics');
    return;
  }
  const inp = document.getElementById('semi-ai-input-field');
  if (inp) {
    inp.value = promptText;
  }
  sendSemiAiMessage(promptText);
}

function setupSemiAiInputAutoResize() {
  const inp = document.getElementById('semi-ai-input-field');
  if (!inp) return;
  inp.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
  });
}

function handleSemiAiKeyDown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    const form = document.getElementById('semi-ai-chat-form');
    if (form) form.requestSubmit();
  }
}

function handleSemiAiSubmit(e) {
  if (e) e.preventDefault();
  const inp = document.getElementById('semi-ai-input-field');
  if (!inp) return;
  const msg = inp.value.trim();
  if (!msg) return;

  inp.value = '';
  inp.style.height = 'auto';
  sendSemiAiMessage(msg);
}

async function sendSemiAiMessage(userText) {
  if (!userText || !userText.trim()) return;
  const trimmed = userText.trim();

  // Hide welcome screen, show chat
  const welcome = document.getElementById('semi-ai-welcome-box');
  if (welcome) welcome.classList.add('hidden');

  // Append user message
  appendSemiAiMessage('user', trimmed);

  // Show typing indicator
  const typing = document.getElementById('semi-ai-typing-indicator');
  if (typing) {
    typing.classList.remove('hidden');
    typing.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  // Disable send button while awaiting reply
  const sendBtn = document.getElementById('semi-ai-send-btn');
  if (sendBtn) sendBtn.disabled = true;

  // Prepare payload
  const activeProvider = localStorage.getItem('studypulse_ai_provider') || semiAiCurrentProvider || null;
  const activeKey = (activeProvider === 'gemini' ? localStorage.getItem('studypulse_gemini_key') : (activeProvider === 'openai' ? localStorage.getItem('studypulse_openai_key') : null)) || null;

  const historyPayload = semiAiHistory.slice(-8).map(h => ({
    sender: h.sender === 'user' ? 'user' : 'model',
    text: h.text
  }));

  try {
    const res = await StudyPulseAPI.ai.chat(trimmed, historyPayload, activeProvider, activeKey);
    if (typing) typing.classList.add('hidden');

    if (res && res.success && res.reply) {
      appendSemiAiMessage('bot', res.reply, {
        model: res.model || res.provider || 'Semi AI Smart Engine',
        watermark: res.watermark || 'StudyPulse • Semi AI'
      });
      // Save history
      saveSemiAiHistory();
    } else {
      throw new Error((res && res.message) || 'उत्तर प्राप्त नहीं हो सका। कृपया पुनः प्रयास करें।');
    }
  } catch (err) {
    if (typing) typing.classList.add('hidden');
    appendSemiAiMessage('bot', `⚠️ **क्षमा करें, त्रुटि हुई:** ${err.message || 'सर्वर से संपर्क नहीं हो पाया।'}\n\nआप ऑफ़लाइन **StudyPulse AI Built-in Engine** का उपयोग कर सकते हैं।`, {
      isError: true,
      model: 'StudyPulse AI Fallback'
    });
  } finally {
    if (sendBtn) sendBtn.disabled = false;
    const inp = document.getElementById('semi-ai-input-field');
    if (inp) inp.focus();
  }
}

function appendSemiAiMessage(sender, text, meta = {}) {
  const thread = document.getElementById('semi-ai-chat-thread');
  if (!thread) return;

  const isUser = (sender === 'user');
  const msgObj = {
    sender,
    text,
    meta,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  semiAiHistory.push(msgObj);

  const bubble = document.createElement('div');
  bubble.className = `flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`;

  const parsedHtml = isUser ? escapeHtml(text).replace(/\n/g, '<br>') : formatSemiAiMarkdown(text);

  if (isUser) {
    bubble.innerHTML = `
      <div class="max-w-[85%] sm:max-w-[75%] flex flex-col items-end">
        <div class="p-3.5 sm:p-4 rounded-3xl rounded-tr-md bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs sm:text-sm shadow-md shadow-indigo-500/20 leading-relaxed font-medium select-text break-words">
          ${parsedHtml}
        </div>
        <div class="flex items-center gap-1.5 mt-1 mr-2 text-[10px] text-slate-400">
          <span>${msgObj.timestamp}</span>
          <i class="fa-solid fa-check-double text-indigo-500 text-[9px]"></i>
        </div>
      </div>
      <div class="w-8 h-8 rounded-2xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs text-slate-700 dark:text-slate-200 font-bold shrink-0 mt-1 shadow-sm">
        ${escapeHtml((typeof currentUser !== 'undefined' && currentUser && currentUser.username ? currentUser.username[0] : 'U').toUpperCase())}
      </div>
    `;
  } else {
    const rawEscapedForCopy = encodeURIComponent(text);
    const modelTag = meta.model || 'StudyPulse AI Smart Engine';

    bubble.innerHTML = `
      <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-sm shrink-0 mt-1 shadow-md shadow-purple-500/30 border border-white/20">
        <i class="fa-solid fa-wand-magic-sparkles text-xs"></i>
      </div>
      <div class="max-w-[88%] sm:max-w-[82%] flex flex-col">
        <!-- Message Card -->
        <div class="p-4 sm:p-5 rounded-3xl rounded-tl-md bg-white dark:bg-slate-800/95 border border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-100 shadow-md shadow-slate-200/50 dark:shadow-none leading-relaxed text-xs sm:text-sm semi-ai-prose break-words">
          
          <!-- Top meta strip -->
          <div class="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-100 dark:border-slate-700/60 text-[10px]">
            <div class="flex items-center gap-1.5">
              <span class="font-extrabold gemini-gradient-text tracking-wide">StudyPulse AI</span>
              <span class="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200/60 dark:border-indigo-800/40">
                ${escapeHtml(modelTag)}
              </span>
            </div>
            <span class="text-slate-400 font-mono">${msgObj.timestamp}</span>
          </div>

          <!-- Content Body -->
          <div class="space-y-2 select-text">${parsedHtml}</div>

          <!-- Action bar -->
          <div class="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-700/60 text-[11px] text-slate-500">
            <div class="flex items-center gap-1">
              <!-- Copy button -->
              <button type="button" onclick="copySemiAiText(this, decodeURIComponent('${rawEscapedForCopy}'))" class="px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/70 text-slate-600 dark:text-slate-300 transition flex items-center gap-1 cursor-pointer" title="उत्तर कॉपी करें">
                <i class="fa-regular fa-copy text-xs"></i>
                <span>कॉपी</span>
              </button>

              <!-- Text to speech button -->
              <button type="button" onclick="speakSemiAiText(this, decodeURIComponent('${rawEscapedForCopy}'))" class="px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/70 text-slate-600 dark:text-slate-300 transition flex items-center gap-1 cursor-pointer" title="सुनें (Read Aloud)">
                <i class="fa-solid fa-volume-high text-xs"></i>
                <span>सुनें</span>
              </button>

              <!-- Helpful feedback -->
              <button type="button" onclick="likeSemiAiReply(this)" class="px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/70 text-slate-400 hover:text-emerald-500 transition cursor-pointer" title="मददगार रहा">
                <i class="fa-regular fa-thumbs-up text-xs"></i>
              </button>

              <!-- In-App Google Search button -->
              <button type="button" onclick="searchGoogleInApp(decodeURIComponent('${encodeURIComponent(text.replace(/[*#`_]/g, '').slice(0, 100))}'))" class="px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-600 dark:text-blue-300 transition flex items-center gap-1 cursor-pointer font-bold" title="ऐप में Google पर खोजें">
                <i class="fa-brands fa-google text-xs text-amber-500"></i>
                <span class="text-[10px]">Google सर्च</span>
              </button>

              <!-- Google.com external tab button -->
              <a href="https://www.google.com/search?q=${encodeURIComponent(text.replace(/[*#`_]/g, '').slice(0, 100))}" target="_blank" rel="noopener noreferrer" class="px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/70 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition flex items-center gap-1 cursor-pointer" title="Google.com नए टैब में खोलें">
                <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
              </a>
            </div>

            <div class="text-[10px] font-bold text-slate-400 flex items-center gap-1">
              <i class="fa-solid fa-shield-halved text-[9px] text-indigo-500"></i>
              <span>StudyPulse AI</span>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  thread.appendChild(bubble);

  // Scroll to bottom
  const container = document.getElementById('semi-ai-messages-container');
  if (container) {
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }
}

function formatSemiAiMarkdown(src) {
  if (!src) return '';
  let str = src;

  // Code blocks: ```lang ... ```
  str = str.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const rawEncoded = encodeURIComponent(code.trim());
    const displayLang = lang ? lang.toUpperCase() : 'CODE';
    return `
      <div class="my-3 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-lg text-left">
        <div class="bg-slate-800/90 px-3.5 py-1.5 flex items-center justify-between text-[11px] font-mono text-slate-300 border-b border-slate-700">
          <span class="font-bold flex items-center gap-1.5">
            <i class="fa-solid fa-code text-indigo-400"></i>
            ${displayLang}
          </span>
          <button type="button" onclick="copySemiAiCodeBlock(this, decodeURIComponent('${rawEncoded}'))" class="px-2 py-0.5 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1 cursor-pointer">
            <i class="fa-regular fa-copy text-[10px]"></i>
            <span>कॉपी करें</span>
          </button>
        </div>
        <pre class="p-3.5 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed custom-scrollbar"><code>${escapeHtml(code.trim())}</code></pre>
      </div>
    `;
  });

  // Inline code: `code`
  str = str.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 font-mono text-[11px] border border-indigo-200/50 dark:border-indigo-800/40">$1</code>');

  // Headers: ### Head
  str = str.replace(/^### (.*$)/gim, '<h5 class="text-sm font-black text-slate-900 dark:text-white mt-2.5 mb-1">$1</h5>');
  str = str.replace(/^## (.*$)/gim, '<h4 class="text-base font-black text-slate-900 dark:text-white mt-3 mb-1.5">$1</h4>');
  str = str.replace(/^# (.*$)/gim, '<h3 class="text-lg font-black text-slate-900 dark:text-white mt-3.5 mb-2">$1</h3>');

  // Bold & Italic
  str = str.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  str = str.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>');
  str = str.replace(/\*(.*?)\*/g, '<em class="italic text-slate-600 dark:text-slate-300">$1</em>');

  // Blockquotes
  str = str.replace(/^> (.*$)/gim, '<blockquote class="pl-3 py-1 my-2 border-l-4 border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/20 text-xs italic text-slate-700 dark:text-slate-300 rounded-r-lg">$1</blockquote>');

  // Unordered list items: • or -
  str = str.replace(/^[•\-\*]\s+(.*$)/gim, '<li class="flex items-start gap-2 mb-1"><span class="text-indigo-500 font-bold shrink-0 mt-0.5">•</span><span>$1</span></li>');

  // Numbered list items
  str = str.replace(/^(\d+)\.\s+(.*$)/gim, '<li class="flex items-start gap-2 mb-1"><span class="font-bold text-indigo-600 dark:text-indigo-400 shrink-0">$1.</span><span>$2</span></li>');

  // Horizontal rules
  str = str.replace(/^---$/gim, '<hr class="my-3 border-slate-200 dark:border-slate-700">');

  // Line breaks
  str = str.replace(/\n\n/g, '<div class="h-2"></div>');
  str = str.replace(/\n/g, '<br>');

  return str;
}

function copySemiAiCodeBlock(btn, code) {
  navigator.clipboard.writeText(code).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check text-emerald-400"></i> <span>कॉपी हो गया!</span>';
    setTimeout(() => { btn.innerHTML = orig; }, 1800);
  });
}

function copySemiAiText(btn, text) {
  const clean = text.replace(/[*#`_~]/g, '');
  navigator.clipboard.writeText(clean).then(() => {
    showToast('Semi AI उत्तर कॉपी किया गया! 📋', 'success');
  });
}

function likeSemiAiReply(btn) {
  btn.classList.add('text-emerald-500');
  btn.innerHTML = '<i class="fa-solid fa-thumbs-up text-xs"></i>';
  showToast('फीडबैक के लिए धन्यवाद! 👍', 'success');
}

let activeSpeechUtterance = null;
function speakSemiAiText(btn, text) {
  if (!('speechSynthesis' in window)) {
    showToast('आपके ब्राउज़र में वॉइस स्पीच उपलब्ध नहीं है।', 'info');
    return;
  }

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    btn.innerHTML = '<i class="fa-solid fa-volume-high text-xs"></i> <span>सुनें</span>';
    return;
  }

  const clean = text.replace(/[*#`_~•\-]/g, '').replace(/```[\s\S]*?```/g, 'कोडिंग भाग।').substring(0, 1500);
  const utter = new SpeechSynthesisUtterance(clean);
  
  const voices = window.speechSynthesis.getVoices();
  const hiVoice = voices.find(v => v.lang.startsWith('hi') || v.lang.includes('IN'));
  if (hiVoice) utter.voice = hiVoice;
  utter.rate = 1.0;
  utter.pitch = 1.0;

  btn.innerHTML = '<i class="fa-solid fa-volume-xmark text-rose-500 animate-pulse text-xs"></i> <span class="text-rose-500 font-bold">रोकें</span>';

  utter.onend = () => {
    btn.innerHTML = '<i class="fa-solid fa-volume-high text-xs"></i> <span>सुनें</span>';
  };
  utter.onerror = () => {
    btn.innerHTML = '<i class="fa-solid fa-volume-high text-xs"></i> <span>सुनें</span>';
  };

  activeSpeechUtterance = utter;
  window.speechSynthesis.speak(utter);
}

function toggleSemiAiVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast('आपके ब्राउज़र में वॉइस इनपुट समर्थित नहीं है। (Chrome / Edge अनुशंसित)', 'info');
    return;
  }

  const voiceBtn = document.getElementById('semi-ai-voice-btn');
  const voiceIcon = document.getElementById('semi-ai-voice-icon');
  const inp = document.getElementById('semi-ai-input-field');

  if (isSemiAiVoiceActive && semiAiSpeechRecognition) {
    semiAiSpeechRecognition.stop();
    return;
  }

  try {
    semiAiSpeechRecognition = new SpeechRecognition();
    semiAiSpeechRecognition.lang = 'hi-IN';
    semiAiSpeechRecognition.continuous = false;
    semiAiSpeechRecognition.interimResults = false;

    semiAiSpeechRecognition.onstart = () => {
      isSemiAiVoiceActive = true;
      if (voiceBtn) voiceBtn.classList.add('bg-rose-50', 'dark:bg-rose-950/60', 'text-rose-600', 'ring-2', 'ring-rose-500/30');
      if (voiceIcon) voiceIcon.className = 'fa-solid fa-microphone-lines text-rose-600 animate-pulse';
      showToast('माइक सक्रिय: अपना सवाल बोलें... 🎙️', 'info');
    };

    semiAiSpeechRecognition.onresult = (evt) => {
      const transcript = evt.results[0][0].transcript;
      if (transcript && inp) {
        inp.value = transcript;
        inp.style.height = 'auto';
        inp.style.height = Math.min(inp.scrollHeight, 120) + 'px';
        inp.focus();
        showToast(`सुना: "${transcript}"`, 'success');
      }
    };

    semiAiSpeechRecognition.onerror = (evt) => {
      console.warn('Speech recognition error:', evt.error);
      showToast('वॉइस पहचान में समस्या: ' + evt.error, 'error');
    };

    semiAiSpeechRecognition.onend = () => {
      isSemiAiVoiceActive = false;
      if (voiceBtn) voiceBtn.classList.remove('bg-rose-50', 'dark:bg-rose-950/60', 'text-rose-600', 'ring-2', 'ring-rose-500/30');
      if (voiceIcon) voiceIcon.className = 'fa-solid fa-microphone text-sm sm:text-base';
    };

    semiAiSpeechRecognition.start();
  } catch (err) {
    console.error('Error starting speech recognition:', err);
    showToast('माइक शुरू करने में विफल।', 'error');
  }
}

function clearSemiAiChat() {
  if (semiAiHistory.length === 0) return;
  if (!confirm('क्या आप बातचीत साफ़ करके नया चैट शुरू करना चाहते हैं?')) return;

  semiAiHistory = [];
  localStorage.removeItem('studypulse_semi_ai_history');

  const thread = document.getElementById('semi-ai-chat-thread');
  if (thread) thread.innerHTML = '';

  const welcome = document.getElementById('semi-ai-welcome-box');
  if (welcome) welcome.classList.remove('hidden');

  showToast('Semi AI चैट साफ़ कर दी गई!', 'success');
}

function saveSemiAiHistory() {
  try {
    localStorage.setItem('studypulse_semi_ai_history', JSON.stringify(semiAiHistory.slice(-20)));
  } catch (e) {
    console.warn('Failed to save Semi AI history:', e);
  }
}

function restoreSemiAiChatHistory() {
  try {
    const raw = localStorage.getItem('studypulse_semi_ai_history');
    if (!raw) return;
    const list = JSON.parse(raw);
    if (!Array.isArray(list) || list.length === 0) return;

    const welcome = document.getElementById('semi-ai-welcome-box');
    if (welcome) welcome.classList.add('hidden');

    semiAiHistory = [];
    list.forEach(m => {
      appendSemiAiMessage(m.sender, m.text, m.meta || {});
    });
  } catch (e) {
    console.warn('Failed to restore chat history:', e);
  }
}

// --------------------------------------------------
// GLOBAL TOAST NOTIFICATION UTILITY
// --------------------------------------------------

function showToast(message, type = 'success') {
  let toast = document.getElementById('studypulse-global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'studypulse-global-toast';
    document.body.appendChild(toast);
  }

  const bgClasses = {
    success: 'bg-emerald-600 text-white border-emerald-400/50 shadow-emerald-500/30',
    error: 'bg-rose-600 text-white border-rose-400/50 shadow-rose-500/30',
    info: 'bg-slate-900 text-white border-slate-700 shadow-slate-900/40 dark:bg-slate-800'
  };

  const icons = {
    success: 'fa-solid fa-circle-check',
    error: 'fa-solid fa-triangle-exclamation',
    info: 'fa-solid fa-circle-info'
  };

  toast.className = `fixed bottom-6 right-6 z-[9999] px-5 py-3.5 rounded-2xl shadow-2xl border text-xs font-bold flex items-center gap-2.5 transition-all transform duration-300 pointer-events-auto ${bgClasses[type] || bgClasses.success}`;
  toast.innerHTML = `<i class="${icons[type] || icons.success} text-sm shrink-0"></i><span>${escapeHtml(message)}</span>`;
  toast.style.display = 'flex';
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  clearTimeout(window.__studypulseToastTimeout);
  window.__studypulseToastTimeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 300);
  }, 3500);
}

// --------------------------------------------------
// SEMI AI SETTINGS MODAL HANDLERS (100% DIRECT CONNECT)
// --------------------------------------------------

function openGoogleConnectModal() {
  // 1-Click Direct Google Connect: Zero Key Required!
  localStorage.setItem('studypulse_ai_provider', 'gemini');
  localStorage.removeItem('studypulse_gemini_key');
  semiAiCurrentProvider = 'gemini';
  updateSemiAiBadge('gemini', { geminiModel: 'gemini-2.0-flash' });

  StudyPulseAPI.ai.saveSettings({
    provider: 'gemini',
    gemini_key: '',
    gemini_model: 'gemini-2.0-flash'
  }).catch(() => {});

  showToast('⚡ Google Gemini Direct Mode सक्रिय है! किसी Key की ज़रूरत नहीं।', 'success');
}

function openSemiAiSettingsModal() {
  const modal = document.getElementById('modal-semi-ai-settings');
  if (!modal) return;

  const savedProvider = localStorage.getItem('studypulse_ai_provider') || semiAiCurrentProvider || 'gemini';
  const savedGeminiModel = localStorage.getItem('studypulse_gemini_model') || 'gemini-2.0-flash';
  const savedOpenAiModel = localStorage.getItem('studypulse_openai_model') || 'gpt-4o-mini';

  const provRadio = document.querySelector(`input[name="semi_provider"][value="${savedProvider}"]`);
  if (provRadio) provRadio.checked = true;

  const gemModelSel = document.getElementById('semi-gemini-model-select');
  if (gemModelSel) gemModelSel.value = savedGeminiModel;

  const openModelSel = document.getElementById('semi-openai-model-select');
  if (openModelSel) openModelSel.value = savedOpenAiModel;

  toggleSemiProviderFields();

  const statusBox = document.getElementById('semi-ai-settings-status');
  if (statusBox) statusBox.classList.add('hidden');

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeSemiAiSettingsModal() {
  const modal = document.getElementById('modal-semi-ai-settings');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function toggleSemiProviderFields() {
  const selected = document.querySelector('input[name="semi_provider"]:checked')?.value || 'gemini';
  const gemBox = document.getElementById('semi-gemini-box');
  const openBox = document.getElementById('semi-openai-box');

  if (gemBox) {
    if (selected === 'gemini') gemBox.classList.remove('hidden');
    else gemBox.classList.add('hidden');
  }
  if (openBox) {
    if (selected === 'openai') openBox.classList.remove('hidden');
    else openBox.classList.add('hidden');
  }
}

async function testSemiAiConnection() {
  const statusBox = document.getElementById('semi-ai-settings-status');
  if (!statusBox) return;

  statusBox.className = 'p-3 rounded-2xl text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 block border border-indigo-200 dark:border-indigo-800';
  statusBox.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>डायरेक्ट कनेक्शन टेस्ट हो रहा है...';
  statusBox.classList.remove('hidden');

  const selectedProvider = document.querySelector('input[name="semi_provider"]:checked')?.value || 'gemini';

  try {
    const res = await StudyPulseAPI.ai.chat('नमस्ते Semi AI, कनेक्शन टेस्ट करें।', [], selectedProvider, null);
    if (!res || !res.success) throw new Error((res && res.message) || 'कनेक्शन विफल रहा');

    statusBox.className = 'p-3 rounded-2xl text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 block border border-emerald-200 dark:border-emerald-800';
    statusBox.innerHTML = `
      <div class="flex items-center gap-2">
        <i class="fa-solid fa-circle-check text-emerald-600 text-sm"></i>
        <div>
          <strong>✓ डायरेक्ट कनेक्शन सफल रहा!</strong><br>
          <span class="text-[11px] font-normal">सक्रिय मोड: Direct Connect (बिना किसी Key के पूर्णतः सक्रिय)</span>
        </div>
      </div>
    `;
    showToast('AI डायरेक्ट कनेक्शन टेस्ट सफल रहा! ✨', 'success');
  } catch (err) {
    statusBox.className = 'p-3 rounded-2xl text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 block border border-rose-200 dark:border-rose-800';
    statusBox.innerHTML = `<i class="fa-solid fa-triangle-exclamation mr-1.5"></i>कनेक्शन त्रुटि: ${escapeHtml(err.message)}`;
  }
}

async function saveSemiAiSettings(e) {
  if (e) {
    try { e.preventDefault(); } catch (_) {}
    try { e.stopPropagation(); } catch (_) {}
  }

  const saveBtn = document.getElementById('semi-ai-save-btn');
  const saveBtnText = document.getElementById('semi-ai-save-btn-text');
  if (saveBtn) {
    saveBtn.disabled = true;
    if (saveBtnText) saveBtnText.textContent = 'सहेजा जा रहा है...';
  }

  const selectedProvider = document.querySelector('input[name="semi_provider"]:checked')?.value || 'gemini';
  const gemModel = document.getElementById('semi-gemini-model-select')?.value || 'gemini-2.0-flash';
  const openModel = document.getElementById('semi-openai-model-select')?.value || 'gpt-4o-mini';

  // Direct Mode: Remove any old dummy keys
  localStorage.setItem('studypulse_ai_provider', selectedProvider);
  localStorage.removeItem('studypulse_gemini_key');
  localStorage.removeItem('studypulse_openai_key');
  localStorage.setItem('studypulse_gemini_model', gemModel);
  localStorage.setItem('studypulse_openai_model', openModel);

  semiAiCurrentProvider = selectedProvider;
  updateSemiAiBadge(selectedProvider, { geminiModel: gemModel });

  // Instant notification
  showToast('Semi AI सेटिंग्स सफलतापूर्वक सहेजी गईं! ✨', 'success');

  // Asynchronously sync with backend
  StudyPulseAPI.ai.saveSettings({
    provider: selectedProvider,
    gemini_key: '',
    openai_key: '',
    gemini_model: gemModel,
    openai_model: openModel
  }).catch(err => {
    console.warn('Backend settings sync failed (client settings still applied):', err);
  });

  if (saveBtn) {
    saveBtn.disabled = false;
    if (saveBtnText) saveBtnText.textContent = 'सेटिंग्स सहेजें';
  }

  closeSemiAiSettingsModal();
}

// ==========================================
// 21. IN-APP CAMERA QR SCANNER
// ==========================================
let cameraScannerStream = null;
let cameraScannerScanTimer = null;
let lastScannedUrl = '';

async function openCameraScannerModal() {
  const modal = document.getElementById('modal-camera-qr-scanner');
  const video = document.getElementById('camera-scanner-video');
  const status = document.getElementById('camera-scanner-status');
  const resultBox = document.getElementById('camera-scan-result-box');

  if (resultBox) resultBox.classList.add('hidden');
  if (modal) modal.classList.remove('hidden');

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (status) status.textContent = 'इस डिवाइस में कैमरा समर्थित नहीं है';
    return;
  }

  try {
    if (status) status.textContent = 'कैमरा शुरू हो रहा है...';
    cameraScannerStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 640 } }
    });
    if (video) {
      video.srcObject = cameraScannerStream;
      await video.play();
    }
    if (status) status.textContent = '🔍 QR कोड कैमरे के सामने लाएं...';
    startCameraQrDetection();
  } catch (err) {
    console.warn('[CAMERA SCANNER ERROR]', err);
    if (status) status.textContent = 'कैमरा अनुमति अस्वीकार या अनुपलब्ध';
  }
}

function closeCameraScannerModal() {
  if (cameraScannerScanTimer) {
    clearInterval(cameraScannerScanTimer);
    cameraScannerScanTimer = null;
  }
  if (cameraScannerStream) {
    try {
      cameraScannerStream.getTracks().forEach(track => track.stop());
    } catch (_) {}
    cameraScannerStream = null;
  }
  const modal = document.getElementById('modal-camera-qr-scanner');
  if (modal) modal.classList.add('hidden');
}

function startCameraQrDetection() {
  if (cameraScannerScanTimer) clearInterval(cameraScannerScanTimer);

  const video = document.getElementById('camera-scanner-video');
  const status = document.getElementById('camera-scanner-status');
  const resultBox = document.getElementById('camera-scan-result-box');
  const resultLink = document.getElementById('camera-scan-result-link');

  // Check if native BarcodeDetector API is available
  if ('BarcodeDetector' in window) {
    const detector = new BarcodeDetector({ formats: ['qr_code'] });
    cameraScannerScanTimer = setInterval(async () => {
      if (!video || video.readyState < 2) return;
      try {
        const barcodes = await detector.detect(video);
        if (barcodes && barcodes.length > 0) {
          const rawValue = barcodes[0].rawValue;
          if (rawValue) {
            onQrCodeDetected(rawValue);
          }
        }
      } catch (_) {}
    }, 350);
  } else {
    if (status) status.textContent = 'कैमरा चालू है (QR कोड केंद्र में रखें)';
  }
}

function onQrCodeDetected(url) {
  lastScannedUrl = url;
  if (cameraScannerScanTimer) {
    clearInterval(cameraScannerScanTimer);
    cameraScannerScanTimer = null;
  }

  const status = document.getElementById('camera-scanner-status');
  const resultBox = document.getElementById('camera-scan-result-box');
  const resultLink = document.getElementById('camera-scan-result-link');

  if (status) status.textContent = '✓ QR कोड सफलतापूर्वक स्कैन हुआ!';
  if (resultLink) {
    resultLink.textContent = url;
    resultLink.href = url;
  }
  if (resultBox) resultBox.classList.remove('hidden');

  triggerConfetti();
  showToast('QR कोड पहचाना गया! 🎉', 'success');
}

function handleScannedQrAction() {
  if (!lastScannedUrl) return;
  if (lastScannedUrl.startsWith('http://') || lastScannedUrl.startsWith('https://')) {
    window.open(lastScannedUrl, '_blank');
  } else {
    alert('स्कैन की गई सामग्री:\n' + lastScannedUrl);
  }
}

