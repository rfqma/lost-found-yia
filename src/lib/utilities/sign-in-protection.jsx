'use client'

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/providers/firebase-auth-provider"
import { useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import Link from "next/link"

export const SignInProtection = ({ children }) => {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (user.uid) {
      router.push('/')
      toast({
        title: "✅ Berhasil!",
        description: "Anda telah berhasil login!",
        action: (
          <>
            <Link href={'/'}>
              <ToastAction altText="Beranda">Beranda</ToastAction>
            </Link>
          </>
        )
      })
    }
  }, [user, router, toast])

  return <>{user ? children : null}</>
}