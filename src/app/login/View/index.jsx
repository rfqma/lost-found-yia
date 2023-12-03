'use client'

import { useState } from "react"
import { useAuth } from "@/lib/providers/firebase-auth-provider"
import { useRouter } from "next/navigation"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { firebaseAuth } from "@/lib/databases/firebase"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOff } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import { Separator } from "@/components/ui/separator"
import { SignInProtection } from "@/lib/utilities/sign-in-protection"

export const View = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPassVisible, setPassVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmMessage, setConfirmMessage] = useState('')
  const isMatched = confirmPassword === password

  const { signIn } = useAuth()
  const { signUp } = useAuth()
  const router = useRouter()
  const form = useForm({ mode: 'onBlur' })

  const provider = new GoogleAuthProvider()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = form

  const handleLogin = async (data) => {
    try {
      await signIn(data.email, data.password)
      router.push('/')
    } catch (error) {
      setErrorMessage(error.message)
      console.log(error.message)
    }
  }

  const handleRegister = async (data) => {
    try {
      await signUp(data.email, data.password)
      router.push('/')
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const signInWithGoogle = () => {
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        const user = result.user
        console.log({ credential, token, user })
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.email
        const credential = GoogleAuthProvider.credentialFromError(error)
        alert(`${errorCode}, ${errorMessage}, ${email}, ${credential}`)
      })
  }

  return (
    <SignInProtection>
      <div className="container p-5">
        <div className="flex flex-col items-center m-auto">

          <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>
                    Selamat datang di Lost and Found Yogyakarta International Airport
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Form {...form}>
                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-8">

                      <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <>
                                <Input
                                  {...register('email', { required: 'Email is required' })}
                                  placeholder="lorem.ipsum@mail.com"
                                  {...field}
                                  onChange={(e) => {
                                    setEmail(e.target.value)
                                    field.onChange(e)
                                  }}
                                  value={email}
                                  required
                                  type="email"
                                />
                                {
                                  errors.email ?
                                    errors.email.message
                                    :
                                    null
                                }
                              </>
                            </FormControl>
                            <FormDescription>
                              This is description
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <>
                                <div className="relative flex items-center">
                                  <Input
                                    {...register('password', { required: 'Password is required' })}
                                    placeholder="********"
                                    {...field}
                                    onChange={(e) => {
                                      setPassword(e.target.value)
                                      field.onChange(e)
                                    }}
                                    value={password}
                                    required
                                    type={isPassVisible ? 'text' : 'password'}
                                  />
                                  <div
                                    onClick={() => {
                                      isPassVisible ? setPassVisible(false) : setPassVisible(true)
                                    }}
                                    className="absolute cursor-pointer right-3"
                                  >
                                    {
                                      isPassVisible ?
                                        <EyeOff className="w-6 h-6 text-gray-400" />
                                        :
                                        <EyeIcon className="w-6 h-6 text-gray-400" />
                                    }
                                  </div>
                                </div>
                                {
                                  errors.password ?
                                    errors.password.message
                                    :
                                    null
                                }
                              </>
                            </FormControl>
                            <FormDescription>
                              This is description
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit">Login</Button>
                    </form>
                  </Form>
                  {
                    errorMessage === '' ?
                      null
                      :
                      <div className="flex flex-col">
                        <span className="text-xs text-red-600">Login failed!</span>
                        <span className="text-xs text-red-600">({errorMessage})</span>
                      </div>
                  }
                  <Separator />
                  <Button
                    onClick={signInWithGoogle}
                    className="flex items-center justify-center w-full gap-2 mt-2"
                  >
                    <FcGoogle className="w-5 h-5" />
                    Google
                  </Button>

                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Register</CardTitle>
                  <CardDescription>
                    Selamat datang di Lost and Found Yogyakarta International Airport
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Form {...form}>
                    <form onSubmit={handleSubmit(handleRegister)} className="space-y-8">

                      <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <>
                                <Input
                                  {...register('email', { required: 'Email is required' })}
                                  placeholder="lorem.ipsum@mail.com"
                                  {...field}
                                  onChange={(e) => {
                                    setEmail(e.target.value)
                                    field.onChange(e)
                                  }}
                                  value={email}
                                  required
                                  type="email"
                                />
                                {
                                  errors.email ?
                                    errors.email.message
                                    :
                                    null
                                }
                              </>
                            </FormControl>
                            <FormDescription>
                              This is description
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <>
                                <div className="relative flex items-center">
                                  <Input
                                    {...register('password', { required: 'Password is required' })}
                                    placeholder="********"
                                    {...field}
                                    onChange={(e) => {
                                      setPassword(e.target.value)
                                      field.onChange(e)
                                    }}
                                    value={password}
                                    required
                                    type={isPassVisible ? 'text' : 'password'}
                                  />
                                  <div
                                    onClick={() => {
                                      isPassVisible ? setPassVisible(false) : setPassVisible(true)
                                    }}
                                    className="absolute cursor-pointer right-3"
                                  >
                                    {
                                      isPassVisible ?
                                        <EyeOff className="w-6 h-6 text-gray-400" />
                                        :
                                        <EyeIcon className="w-6 h-6 text-gray-400" />
                                    }
                                  </div>
                                </div>
                                {
                                  errors.password ?
                                    errors.password.message
                                    :
                                    null
                                }
                              </>
                            </FormControl>
                            <FormDescription>
                              This is description
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <>
                                <div className="relative flex items-center">
                                  <Input
                                    {...register('confirmPassword', { required: 'Verify your password' })}
                                    placeholder="********"
                                    {...field}
                                    onChange={(e) => {
                                      setConfirmPassword(e.target.value)
                                      field.onChange(e)
                                      if (confirmPassword !== password) {
                                        setConfirmMessage('Password not match!')
                                      }
                                    }}
                                    value={confirmPassword}
                                    required
                                    type={isPassVisible ? 'text' : 'password'}
                                  />
                                  <div
                                    onClick={() => {
                                      isPassVisible ? setPassVisible(false) : setPassVisible(true)
                                    }}
                                    className="absolute cursor-pointer right-3"
                                  >
                                    {
                                      isPassVisible ?
                                        <EyeOff className="w-6 h-6 text-gray-400" />
                                        :
                                        <EyeIcon className="w-6 h-6 text-gray-400" />
                                    }
                                  </div>
                                </div>
                                {
                                  errors.confirmPassword ?
                                    errors.confirmPassword.message
                                    :
                                    null
                                }
                                {
                                  isMatched ?
                                    null
                                    :
                                    <span className="text-xs text-red-600">{confirmMessage}</span>
                                }
                              </>
                            </FormControl>
                            <FormDescription>
                              This is description
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit">Register</Button>
                    </form>
                  </Form>
                  {
                    errorMessage === '' ?
                      null
                      :
                      <div className="flex flex-col">
                        <span className="text-xs text-red-600">Login failed!</span>
                        <span className="text-xs text-red-600">({errorMessage})</span>
                      </div>
                  }
                  <Separator />
                  <Button
                    onClick={signInWithGoogle}
                    className="flex items-center justify-center w-full gap-2 mt-2"
                  >
                    <FcGoogle className="w-5 h-5" />
                    Google
                  </Button>

                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </SignInProtection>
  )
}