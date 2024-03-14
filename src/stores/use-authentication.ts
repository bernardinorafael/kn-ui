import { destroyCookie, setCookie } from 'nookies'
import { create } from 'zustand'

import { api } from '../lib/axios'
import { User } from '../types/user'

type RegisterProps = Pick<User, 'name' | 'email' | 'document'> & {
  password: string
}

type LoginProps = {
  email: string
  password: string
}

type StoreProps = {
  user: User | null
  isAuthenticated: boolean
  register(credentials: RegisterProps): void
  login(credentials: LoginProps): void
  signOut(): void
}

export const useAuthentication = create<StoreProps>((set) => ({
  isAuthenticated: false,
  user: null,

  signOut() {
    destroyCookie(null, 'kn-token', { path: '/' })
    set({ isAuthenticated: false })

    window.location.href = '/login'
  },

  async login(credentials) {
    const response = await api.post('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    })

    const token = response.data.access_token

    setCookie(null, 'kn-token', token, {
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })

    api.defaults.headers.token = token

    set({
      isAuthenticated: true,
    })
  },

  async register(credentials) {
    const response = await api.post('/auth/register', {
      name: credentials.name,
      email: credentials.email,
      document: credentials.document,
      password: credentials.password,
    })

    const token = response.data.access_token

    setCookie(null, 'kn-token', token, {
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })

    api.defaults.headers.token = token

    set({
      isAuthenticated: true,
    })
  },
}))
