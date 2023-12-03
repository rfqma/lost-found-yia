import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { firebaseConfig } from './config'

const firebaseApp = initializeApp(firebaseConfig)
const firebaseDB = getFirestore(firebaseApp)
const firebaseAuth = getAuth(firebaseApp)
export { firebaseDB, firebaseAuth }
export const firebaseStorage = getStorage(firebaseApp)