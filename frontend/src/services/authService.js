import api, { clearAuthToken, setAuthToken } from './api.js'

const AUTH_SESSION_KEY = 'quiz-system-auth-session'

function delay(ms = 300) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function createMockSession({ email, name }) {
  const token = `mock-jwt.${btoa(`${email}:${Date.now()}`)}`

  return {
    token,
    user: {
      id: `user-${Date.now()}`,
      name: name?.trim() || email?.split('@')[0] || 'Learner',
      email,
      role: email?.toLowerCase().includes('admin') ? 'admin' : 'student',
    },
  }
}

function getStoredAuthSession() {
  try {
    const storedValue = localStorage.getItem(AUTH_SESSION_KEY)

    return storedValue ? JSON.parse(storedValue) : null
  } catch {
    return null
  }
}

function persistAuthSession(session) {
  if (!session) {
    localStorage.removeItem(AUTH_SESSION_KEY)
    clearAuthToken()
    return null
  }

  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session))
  setAuthToken(session.token)

  return session
}

function normalizeAuthSession(data, fallbackInput) {
  const payload = data?.data ?? data?.result ?? data ?? {}
  const token = payload.token || payload.accessToken || payload.jwt || fallbackInput.token
  const user = payload.user || payload.profile || fallbackInput.user

  return { token, user }
}

export async function login(credentials) {
  try {
    const response = await api.post('/auth/login', credentials)
    const session = normalizeAuthSession(response.data, createMockSession(credentials))

    return persistAuthSession(session)
  } catch {
    await delay()

    return persistAuthSession(createMockSession(credentials))
  }
}

export async function register(payload) {
  try {
    const response = await api.post('/auth/register', payload)
    const session = normalizeAuthSession(response.data, createMockSession(payload))

    return persistAuthSession(session)
  } catch {
    await delay()

    return persistAuthSession(createMockSession(payload))
  }
}

export async function logout() {
  try {
    await api.post('/auth/logout')
  } catch {
    // Silent fallback for frontend-only mode.
  } finally {
    persistAuthSession(null)
  }
}

export function getCurrentAuthSession() {
  return getStoredAuthSession()
}