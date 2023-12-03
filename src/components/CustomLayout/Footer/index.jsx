'use client'

import { cn } from "@/lib/utilities"
import Link from "next/link"
import {
  LucideYoutube,
  LucideInstagram
} from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const Footer = () => {
  return (
    <div className="shadow-md bg-slate-900">
      <div className={cn(
        'container w-full pt-8 pb-5 sticky bottom-0 z-20'
      )}>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-5 sm:justify-between">
          <div className="flex flex-col">
            <h4 className="text-xl font-semibold tracking-tight text-white scroll-m-20">
              Media Sosial
            </h4>
            <div className="flex items-center gap-5 mt-4">
              <Link
                href={'https://www.instagram.com/bandarayogyakarta/'}
                target="_blank"
                rel="noreferrer"
                className="transition duration-300 ease-in-out transform hover:scale-110"
              >
                <LucideInstagram className="w-5 h-5 text-white" />
              </Link>
              <Link
                href={'https://www.youtube.com/user/angkasapuraairports'}
                target="_blank"
                rel="noreferrer"
                className="transition duration-300 ease-in-out transform hover:scale-110"
              >
                <LucideYoutube className="w-6 h-6 text-white" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="text-xl font-semibold tracking-tight text-white scroll-m-20">
              Guide
            </h4>
            <div className="flex flex-col gap-2 mt-4">
              <Link
                href={'#'}
                className="text-xs text-white"
              >
                Lapor Temuan Barang
              </Link>
              <Link
                href={'#'}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white"
              >
                Cari Barang
              </Link>
              <Link
                href={'#'}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white"
              >
                Klaim Barang
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="text-xl font-semibold tracking-tight text-white scroll-m-20">
              Resources
            </h4>
            <div className="flex flex-col gap-2 mt-4">
              <Link
                href={'/bantuan'}
                className="text-xs text-white"
              >
                Bantuan
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="text-xl font-semibold tracking-tight text-white scroll-m-20">
              Company
            </h4>
            <div className="flex flex-col gap-2 mt-4">
              <Link
                href={'#'}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white"
              >
                Profil
              </Link>
              <Link
                href={'#'}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white"
              >
                Visi & Misi
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center h-5 mt-10 space-x-4 text-sm">
          <div className="text-xs text-white">
            <AlertDialog>
              <AlertDialogTrigger>Cookie Policy</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cookie Policy</AlertDialogTitle>
                  <AlertDialogDescription>
                    Kami menggunakan cookies sebagai personalisasi konten untuk disediakan dan dianalisis oleh traffic kami
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction>Lanjutkan</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <Separator orientation="vertical" className='bg-slate-700' />
          <div className="text-xs text-white">
            <AlertDialog>
              <AlertDialogTrigger>Privacy Policy</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Privacy Policy</AlertDialogTitle>
                  <AlertDialogDescription>
                    We take your privacy very serious, so we try our very best not to let your personal data enter the wrong hands
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction>Lanjutkan</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <Separator orientation="vertical" className='bg-slate-700' />
          <div className="text-xs text-white">
            <AlertDialog>
              <AlertDialogTrigger>Terms & Conditions</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Terms & Conditions of use</AlertDialogTitle>
                  <AlertDialogDescription>
                    By continuing to use our services, you automatically agree to the terms and condition listed here
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction>Lanjutkan</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <Separator className='mt-2 mb-3 bg-slate-700' />
        <div className="flex flex-col justify-center">
          <span className="text-xs text-slate-500">&#x00A9; 2023 Copyright, Rifqi Maulana</span>
        </div>

      </div>
    </div>
  )
}