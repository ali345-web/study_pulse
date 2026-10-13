/**
 * StudyPulse MongoDB REST API Client
 * Provides centralized async communication between the Frontend UI
 * and MongoDB Atlas Backend Server.
 */

const StudyPulseAPI = (function () {
  // Determine API base URL dynamically
  // If loaded via HTTP or HTTPS (e.g. localhost, local WiFi IP, or Cloudflare tunnel),
  // use relative '/api' on the same origin so mobile browsers and remote clients work seamlessly.
  const BASE_URL = window.location.protocol.startsWith('http')
    ? `${window.location.origin}/api`
    : 'http://127.0.0.1:5000/api';

  console.log(`[StudyPulseAPI] Initialized. Base URL: ${BASE_URL}`);

  async function request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers || {})
    };

    // Attach active user ID if available
    try {
      const sessionUser = JSON.parse(localStorage.getItem('studypulse_session') || 'null');
      if (sessionUser && sessionUser.id) {
        headers['x-user-id'] = sessionUser.id;
      }
    } catch (e) {}

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      const contentType = response.headers.get('content-type') || '';
      let data = {};
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { message: text };
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      if (error instanceof TypeError || (error.message && (error.message.includes('fetch') || error.message.includes('Network') || error.message.includes('Failed')))) {
        error.isNetworkError = true;
      }
      console.warn(`[StudyPulseAPI] Request to ${endpoint} failed:`, error.message);
      throw error;
    }
  }

  return {
    BASE_URL,

    // Server Health Check
    async checkHealth() {
      return request('/health');
    },

    // Authentication & Profile APIs
    auth: {
      async login(username, password) {
        return request('/users/login', {
          method: 'POST',
          body: JSON.stringify({ username, password })
        });
      },
      async signup(userData) {
        return request('/users/signup', {
          method: 'POST',
          body: JSON.stringify(userData)
        });
      },
      async getProfile(userId) {
        return request(`/users/profile?userId=${encodeURIComponent(userId)}`);
      },
      async updateProfile(userId, updateFields) {
        return request('/users/profile', {
          method: 'PUT',
          body: JSON.stringify({ userId, ...updateFields })
        });
      },
      async getLeaderboard() {
        return request('/users/leaderboard');
      }
    },

    // RS Aggarwal & Study Notes APIs
    notes: {
      async getAll(userId, category) {
        let qs = [];
        if (userId) qs.push(`userId=${encodeURIComponent(userId)}`);
        if (category && category !== 'all') qs.push(`category=${encodeURIComponent(category)}`);
        const query = qs.length > 0 ? `?${qs.join('&')}` : '';
        return request(`/notes${query}`);
      },
      async create(noteData) {
        return request('/notes', {
          method: 'POST',
          body: JSON.stringify(noteData)
        });
      },
      async togglePin(noteId, pinned) {
        return request(`/notes/${encodeURIComponent(noteId)}/pin`, {
          method: 'PUT',
          body: JSON.stringify({ pinned })
        });
      },
      async delete(noteId) {
        return request(`/notes/${encodeURIComponent(noteId)}`, {
          method: 'DELETE'
        });
      }
    },

    // Mock Tests & Test Results APIs
    tests: {
      async getAll() {
        return request('/tests');
      },
      async getById(testId) {
        return request(`/tests/${encodeURIComponent(testId)}`);
      },
      async getHistory(userId) {
        const query = userId ? `?userId=${encodeURIComponent(userId)}` : '';
        return request(`/tests/history${query}`);
      },
      async saveResult(resultData) {
        return request('/tests/history', {
          method: 'POST',
          body: JSON.stringify(resultData)
        });
      }
    },

    // Government Jobs APIs
    jobs: {
      async getAll(category) {
        const query = (category && category !== 'all') ? `?category=${encodeURIComponent(category)}` : '';
        return request(`/jobs${query}`);
      },
      async getById(jobId) {
        return request(`/jobs/${encodeURIComponent(jobId)}`);
      }
    },

    // Study Materials & PDF APIs
    materials: {
      async getAll(category) {
        const query = (category && category !== 'all') ? `?category=${encodeURIComponent(category)}` : '';
        return request(`/materials${query}`);
      },
      async getById(materialId) {
        return request(`/materials/${encodeURIComponent(materialId)}`);
      }
    },

    // Syllabus Tracker APIs
    syllabus: {
      async getAll(userId) {
        const query = userId ? `?userId=${encodeURIComponent(userId)}` : '';
        return request(`/syllabus${query}`);
      },
      async toggleTopic(chapterId, topicId, completed) {
        return request(`/syllabus/${encodeURIComponent(chapterId)}/topics/${encodeURIComponent(topicId)}`, {
          method: 'PUT',
          body: JSON.stringify({ completed })
        });
      },
      async addChapter(chapterData) {
        return request('/syllabus', {
          method: 'POST',
          body: JSON.stringify(chapterData)
        });
      },
      async deleteChapter(chapterId) {
        return request(`/syllabus/${encodeURIComponent(chapterId)}`, {
          method: 'DELETE'
        });
      }
    },

    // Exam Schedules APIs
    exams: {
      async getAll(userId) {
        const query = userId ? `?userId=${encodeURIComponent(userId)}` : '';
        return request(`/exams${query}`);
      },
      async add(examData) {
        return request('/exams', {
          method: 'POST',
          body: JSON.stringify(examData)
        });
      },
      async delete(examId) {
        return request(`/exams/${encodeURIComponent(examId)}`, {
          method: 'DELETE'
        });
      }
    },

    // Daily Tasks APIs
    tasks: {
      async getAll(userId) {
        const query = userId ? `?userId=${encodeURIComponent(userId)}` : '';
        return request(`/tasks${query}`);
      },
      async add(taskData) {
        return request('/tasks', {
          method: 'POST',
          body: JSON.stringify(taskData)
        });
      },
      async toggle(taskId, completed) {
        return request(`/tasks/${encodeURIComponent(taskId)}`, {
          method: 'PUT',
          body: JSON.stringify({ completed })
        });
      },
      async delete(taskId) {
        return request(`/tasks/${encodeURIComponent(taskId)}`, {
          method: 'DELETE'
        });
      }
    },

    // Dashboard Analytics API
    dashboard: {
      async getStats(userId) {
        const query = userId ? `?userId=${encodeURIComponent(userId)}` : '';
        return request(`/dashboard/stats${query}`);
      }
    },

    // StudyPulse AI Study Assistant API
    ai: {
      async chat(message, history = [], provider = null, apiKey = null) {
        return request('/ai/chat', {
          method: 'POST',
          body: JSON.stringify({ message, history, provider, apiKey })
        });
      },
      async getSettings() {
        return request('/ai/settings');
      },
      async saveSettings(settings) {
        return request('/ai/settings', {
          method: 'POST',
          body: JSON.stringify(settings)
        });
      },
      async getSuggestions() {
        return request('/ai/suggestions');
      },
      async getStatus() {
        return request('/ai/status');
      },
      async autoConnect() {
        return request('/ai/connect', { method: 'POST' });
      }
    }
  };
})();

// Export globally for browser window
window.StudyPulseAPI = StudyPulseAPI;
