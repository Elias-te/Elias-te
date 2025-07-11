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
  storeName?: string
  businessType?: string
  createdAt: Date
}

interface AuthContextType {
  currentUser: User | null
  userProfile: UserProfile | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => Promise<void>
  loginWithGoogle: () => Promise<void>
  loading: boolean
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

  const register = async (userData: RegisterData) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
      
      const profile: UserProfile = {
        uid: user.uid,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        userType: userData.userType,
        storeName: userData.storeName,
        businessType: userData.businessType,
        createdAt: new Date()
      }

      await setDoc(doc(db, 'users', user.uid), profile)
      setUserProfile(profile)
      toast.success('Account created successfully!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  const login = async (email: string, password: string) => {
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
    try {
      await signOut(auth)
      setUserProfile(null)
      toast.success('Logged out successfully!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  useEffect(() => {
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
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}