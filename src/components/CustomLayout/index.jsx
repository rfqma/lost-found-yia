'use client'

import { FirebaseAuthContextProvider } from "@/lib/providers/firebase-auth-provider"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { Toaster } from "../ui/toaster"

export const CustomLayout = ({ children }) => {
  return (
    <FirebaseAuthContextProvider>
      <Header />
      <div className="min-h-screen">
        {children}
      </div>
      <Toaster />
      <Footer />
    </FirebaseAuthContextProvider>
  )
}