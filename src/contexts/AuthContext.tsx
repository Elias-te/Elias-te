import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import toast from 'react-hot-toast'

interface UserProfile {
  uid: string
  email: string
  firstName: string
  lastName: string
  userType: 'buyer' | 'seller'
  isAdmin?: boolean
  storeName?: string
  businessType?: string
}

interface AuthContextType {
  currentUser: User | null
  userProfile: UserProfile | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => Promise<void>
  loginWithGoogle: () => Promise<void>
  loading: boolean
  isFirebaseConfigured: boolean
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  userType: 'buyer' | 'seller'
  storeName?: string
  businessType?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFirebaseConfigured, setIsFirebaseConfigured] = useState(false)

  // Check if Firebase is properly configured
  useEffect(() => {
    try {
      // Test Firebase configuration
      const config = auth.app.options
      const isValid = config.apiKey && 
                     config.apiKey !== 'demo-api-key' && 
                     config.projectId && 
                     config.projectId !== 'demo-project'
      setIsFirebaseConfigured(isValid)
    } catch (error) {
      console.warn('Firebase configuration check failed:', error)
      setIsFirebaseConfigured(false)
    }
  }, [])

  const register = async (userData: RegisterData) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
      
      const profile: UserProfile = {
        uid: user.uid,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        userType: userData.userType,
        isAdmin: userData.email === 'admin@soleconnect.com',
        isAdmin: userData.email === 'admin@soleconnect.com', // Make admin@soleconnect.com the admin
        storeName: userData.storeName,
        businessType: userData.businessType,
        isAdmin: email === 'admin@soleconnect.com',
        createdAt: new Date()
      }

      await setDoc(doc(db, 'users', user.uid), profile)
      setUserProfile(profile)
      toast.success('Account created successfully!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
    if (!isFirebaseConfigured) {
      throw new Error('Firebase is not configured. Please set up your Firebase project configuration.')
    }
  }

  const login = async (email: string, password: string) => {
    if (!isFirebaseConfigured) {
      throw new Error('Firebase is not configured. Please set up your Firebase project configuration.')
    }
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Logged in successfully!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const { user } = await signInWithPopup(auth, provider)
      
      // Check if user profile exists
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (!userDoc.exists()) {
        // Create basic profile for Google users
        const profile: UserProfile = {
          uid: user.uid,
          email: user.email!,
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ')[1] || '',
          userType: 'buyer',
          isAdmin: user.email === 'admin@soleconnect.com',
          createdAt: new Date()
        }
        await setDoc(doc(db, 'users', user.uid), profile)
        setUserProfile(profile)
      }
      toast.success('Logged in with Google!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  const logout = async () => {
    if (!isFirebaseConfigured) {
      return
    }
    try {
      await signOut(auth)
      setUserProfile(null)
      toast.success('Logged out successfully!')
    } catch (error: any) {
      toast.error(error.message)
      if (!isFirebaseConfigured) {
        throw new Error('Firebase is not configured. Please set up your Firebase project configuration.')
      }
      throw error
    }
  }

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      
      if (user) {
        // Fetch user profile
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          setUserProfile(userDoc.data() as UserProfile)
        }
      } else {
        setUserProfile(null)
      }
      
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value: AuthContextType = {
    currentUser,
    userProfile,
    login,
    register,
    logout,
    loginWithGoogle,
    loading,
    isFirebaseConfigured
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}