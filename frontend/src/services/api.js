import axios from 'axios'

const AUTH_TOKEN_KEY = 'quiz-system-jwt-token'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

function getStoredToken() {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  } catch {
    return null
  }
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
    return
  }

  localStorage.removeItem(AUTH_TOKEN_KEY)
}

export function clearAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY)
}

api.interceptors.request.use((config) => {
  const token = getStoredToken()

  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = new Error(
      error?.response?.data?.message || error?.message || 'Request failed',
    )

    normalizedError.status = error?.response?.status
    throw normalizedError
  },
)

export default api