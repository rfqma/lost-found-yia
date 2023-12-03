'use client'

import { useAuth } from "@/lib/providers/firebase-auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utilities"
import Link from "next/link"
import Image from "next/image"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MenuIcon,
  Github,
  LifeBuoy,
  LogOut,
  LogIn,
  Settings,
  User,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navigationMenu = [
  {
    label: 'Beranda',
    path: '/beranda'
  },
  {
    label: 'Barang Temuan',
    path: '/barang-temuan'
  },
  {
    label: 'Tentang Kami',
    path: '/tentang-kami'
  },
  {
    label: 'Bantuan',
    path: '/bantuan'
  }
]

export const Header = () => {
  const { user, logOut } = useAuth()
  const router = useRouter()
  const [userCha, setUserCha] = useState('')

  useEffect(() => {
    if (user.email !== null) {
      const string = user.email.toString()
      const firstTwo = string.substring(0, 2)
      setUserCha(firstTwo)
    }
  }, [user])

  const handleLogout = async () => {
    try {
      await logOut()
      router.push('/login')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="shadow-md bg-slate-900">
      <div className={cn(
        'container w-full p-3 sticky top-0 z-20'
      )}>
        <div className="flex items-center justify-between w-full">
          <Link href={'/'}>
            <Image
              src={'/assets/images/angkasa-pura-logo.png'}
              alt="angkasa-pura-logo"
              width={50}
              height={50}
            />
          </Link>

          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem
                  className="flex items-center gap-8 text-xs text-slate-200"
                >
                  {
                    navigationMenu.map((item) => {
                      return (
                        <Link href={item.path} key={item.label} legacyBehavior passHref>
                          <NavigationMenuLink>
                            {item.label}
                          </NavigationMenuLink>
                        </Link>
                      )
                    })
                  }

                  {
                    user.uid ?
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size='sm' variant='secondary'>
                            <User className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 mr-5">
                          <DropdownMenuLabel>Lost and Found YIA</DropdownMenuLabel>
                          <DropdownMenuItem className='flex flex-col items-start gap-2'>
                            <Avatar>
                              <AvatarImage src={user.photoURL} />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="text-xs text-slate-950">{user.displayName}</span>
                              <span className="text-xs">{user.email}</span>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <User className="w-4 h-4 mr-2" />
                              <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="w-4 h-4 mr-2" />
                              <span>Settings</span>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Github className="w-4 h-4 mr-2" />
                            <span>GitHub</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <LifeBuoy className="w-4 h-4 mr-2" />
                            <span>Support</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <div onClick={handleLogout}>
                            <DropdownMenuItem>
                              <LogOut className="w-4 h-4 mr-2 text-red-600" />
                              <span className="text-red-600">Log out</span>
                            </DropdownMenuItem>
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      :
                      <Link href={'/login'}>
                        <Button size='sm' variant='secondary'>
                          Login
                        </Button>
                      </Link>
                  }
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger>
                <MenuIcon className="w-6 h-6 text-white" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className='text-left'>Lost and Found YIA</SheetTitle>
                  <SheetDescription className='text-left'>
                    {
                      user.uid ?
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={user.photoURL} />
                            <AvatarFallback>{userCha.toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-slate-950">{user.displayName}</span>
                            <span>{user.email}</span>
                          </div>
                        </div>
                        :
                        <span className="text-red-600">Not Logged in</span>
                    }
                  </SheetDescription>
                </SheetHeader>
                <Separator className="mt-4" />
                <div className="flex flex-col gap-4 py-5">
                  {
                    navigationMenu.map((item) => {
                      return (
                        <Link href={item.path} key={item.label} legacyBehavior passHref>
                          {item.label}
                        </Link>
                      )
                    })
                  }
                  <Separator className="mt-2" />
                  <Link href={'#'} className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>Profile</span>
                  </Link>
                  <Link href={'#'} className="flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    <span>Settings</span>
                  </Link>
                  <Link href={'#'} className="flex items-center">
                    <Github className="w-4 h-4 mr-2" />
                    <span>GitHub</span>
                  </Link>
                  <Link href={'#'} className="flex items-center">
                    <LifeBuoy className="w-4 h-4 mr-2" />
                    <span>Support</span>
                  </Link>
                  {
                    user.uid ?
                      <div
                        onClick={handleLogout}
                        className="flex items-center text-red-600 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Log out
                      </div>
                      :
                      <a
                        href={'/login'}
                        className="flex items-center text-green-600"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Login
                      </a>
                  }
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </div>
  )
}