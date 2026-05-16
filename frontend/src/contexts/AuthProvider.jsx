import { useState } from 'react'
import { AuthContext } from './authContext.js'
import {
  getCurrentAuthSession,
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
} from '../services/authService.js'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => getCurrentAuthSession())

  const login = async (credentials) => {
    const nextSession = await loginRequest(credentials)

    setSession(nextSession)

    return nextSession
  }

  const register = async (payload) => {
    const nextSession = await registerRequest(payload)

    setSession(nextSession)

    return nextSession
  }

  const logout = async () => {
    await logoutRequest()
    setSession(null)
  }

  const value = {
    user: session?.user || null,
    token: session?.token || null,
    isAuthenticated: Boolean(session?.token),
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}