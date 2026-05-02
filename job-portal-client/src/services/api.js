import axios from "axios";

const TOKEN_KEY = "career_tracker_token";
const USER_KEY = "career_tracker_user";
const legacyTokenKey = "jobportal_token";
const legacyUserKey = "jobportal_user";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const normalizedBaseUrl = rawBaseUrl.endsWith("/api")
  ? rawBaseUrl
  : `${rawBaseUrl}/api`;

const api = axios.create({
  baseURL: normalizedBaseUrl,
  timeout: 10000,
});

export function getStoredAuth() {
  const token =
    localStorage.getItem(TOKEN_KEY) || localStorage.getItem(legacyTokenKey);
  const userString =
    localStorage.getItem(USER_KEY) || localStorage.getItem(legacyUserKey);

  if (!token || !userString) {
    return null;
  }

  try {
    return {
      token,
      user: JSON.parse(userString),
    };
  } catch (_error) {
    clearStoredAuth();
    return null;
  }
}

export function persistAuth({ token, user }) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(legacyTokenKey, token);
  localStorage.setItem(legacyUserKey, JSON.stringify(user));
}

export function clearStoredAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(legacyTokenKey);
  localStorage.removeItem(legacyUserKey);
}

api.interceptors.request.use((config) => {
  const storedAuth = getStoredAuth();

  if (storedAuth?.token) {
    config.headers.Authorization = `Bearer ${storedAuth.token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearStoredAuth();
    }

    return Promise.reject(error);
  }
);

export default api;
