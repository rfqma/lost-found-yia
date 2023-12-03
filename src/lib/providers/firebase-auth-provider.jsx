'use client'

import {
  createContext, useContext,
  useState, useEffect
} from 'react'
import {
  createUserWithEmailAndPassword, onAuthStateChanged,
  signInWithEmailAndPassword, signOut
} from 'firebase/auth'
import { firebaseAuth } from '@/lib/databases/firebase'

export const FirebaseAuthContext = createContext({})
export const useAuth = () => useContext(FirebaseAuthContext)


export const FirebaseAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({ email: null, uid: null, photoURL: null, displayName: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser({ email: user.email, uid: user.uid, photoURL: user.photoURL, displayName: user.displayName })
      } else {
        setUser({ email: null, uid: null, photoURL: null, displayName: null })
      }
    })
    setLoading(false)

    return () => unsubscribe()
  }, [])

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
  }

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
  }

  const logOut = async () => {
    setUser({ email: null, uid: null, photoURL: null, displayName: null })
    await signOut(firebaseAuth)
  }

  return (
    <FirebaseAuthContext.Provider value={{ user, signUp, signIn, logOut }}>
      {loading ? null : children}
    </FirebaseAuthContext.Provider>
  )
}