import axios from 'axios';

/**
 * Axios instance pre-configured to talk to the Laravel API.
 * Base URL is pulled from .env — set VITE_API_URL in your .env file.
 * Defaults to http://127.0.0.1:8000/api when not set.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept:         'application/json',
  },
  withCredentials: false,
});

// ── Request interceptor (attach token for admin panel) ──────────
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

// ── Response interceptor (handle 401 globally) ─────────────────
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// ── Auth ───────────────────────────────────────────────────────
export const authApi = {
  login:  (data) => api.post('/login', data),
  logout: ()     => api.post('/logout'),
  user:   ()     => api.get('/user'),
};

// ── Profile ────────────────────────────────────────────────────
export const profileApi = {
  get:    ()     => api.get('/profile'),
  update: (data) => api.put('/profile', data),
};

// ── Projects ───────────────────────────────────────────────────
export const projectsApi = {
  getAll:  ()          => api.get('/projects'),
  getOne:  (id)        => api.get(`/projects/${id}`),
  create:  (data)      => api.post('/projects', data),
  update:  (id, data)  => api.put(`/projects/${id}`, data),
  delete:  (id)        => api.delete(`/projects/${id}`),
};

// ── Skills ─────────────────────────────────────────────────────
export const skillsApi = {
  getAll:  ()          => api.get('/skills'),
  create:  (data)      => api.post('/skills', data),
  update:  (id, data)  => api.put(`/skills/${id}`, data),
  delete:  (id)        => api.delete(`/skills/${id}`),
};

// ── Experiences ────────────────────────────────────────────────
export const experiencesApi = {
  getAll:  ()          => api.get('/experiences'),
  create:  (data)      => api.post('/experiences', data),
  update:  (id, data)  => api.put(`/experiences/${id}`, data),
  delete:  (id)        => api.delete(`/experiences/${id}`),
};

// ── Education ──────────────────────────────────────────────────
export const educationApi = {
  getAll:  ()          => api.get('/education'),
  create:  (data)      => api.post('/education', data),
  update:  (id, data)  => api.put(`/education/${id}`, data),
  delete:  (id)        => api.delete(`/education/${id}`),
};

// ── Certifications ─────────────────────────────────────────────
export const certificationsApi = {
  getAll:  ()          => api.get('/certifications'),
  create:  (data)      => api.post('/certifications', data),
  update:  (id, data)  => api.put(`/certifications/${id}`, data),
  delete:  (id)        => api.delete(`/certifications/${id}`),
};

// ── Messages ───────────────────────────────────────────────────
export const messagesApi = {
  send:    (data)       => api.post('/messages', data),
  getAll:  ()           => api.get('/messages'),
  getOne:  (id)         => api.get(`/messages/${id}`),
  update:  (id, data)   => api.put(`/messages/${id}`, data),
  delete:  (id)         => api.delete(`/messages/${id}`),
  reply:   (id, data)   => api.post(`/messages/${id}/reply`, data),
};

// ── Dashboard Stats ────────────────────────────────────────────
export const statsApi = {
  getAll: async () => {
    const [projects, skills, experiences, education, certifications, messages] =
      await Promise.all([
        api.get('/projects'),
        api.get('/skills'),
        api.get('/experiences'),
        api.get('/education'),
        api.get('/certifications'),
        api.get('/messages'),
      ]);
    return {
      projects:       projects.data,
      skills:         skills.data,
      experiences:    experiences.data,
      education:      education.data,
      certifications: certifications.data,
      messages:       messages.data,
    };
  },
};