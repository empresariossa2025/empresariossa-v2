'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Auto-login como Thaina para testing
    const thainaUser: User = {
      id: '226',
      email: 'thaina@grollero.com',
      firstName: 'Thaina',
      lastName: 'Adriano de Alcantara',
      role: 'member'
    }
    
    setUser(thainaUser)
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock login - sempre usa Thaina para testing
    const thainaUser: User = {
      id: '226',
      email: 'thaina@grollero.com',
      firstName: 'Thaina',
      lastName: 'Adriano de Alcantara',
      role: 'member'
    }
    
    setUser(thainaUser)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
