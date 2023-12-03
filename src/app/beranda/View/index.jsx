'use client'

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Image from "next/image"
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
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/providers/firebase-auth-provider"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const View = ({ data }) => {
  const { results } = data
  const sortedResults = results.slice().sort((a, b) => b.id - a.id)
  const limitedResults = sortedResults.slice(0, 2)
  const [foundItems, setFoundItems] = useState([])
  const [currentItem, setCurrentItem] = useState(null)
  const [claimersPhoneNumber, setClaimersPhoneNumber] = useState('')
  const [claimersItemColor, setClaimersItemColor] = useState("")
  const [claimersItemDescription, setClaimersItemDescription] = useState("")
  const [sending, setSending] = useState(false)
  const { toast } = useToast()
  const [reporterPhoneNumber, setReporterPhoneNumber] = useState('')
  const [reporterName, setReporterName] = useState('')
  const [reporterMessage, setReporterMessage] = useState('')
  const { user } = useAuth()

  const handleUI = async () => {
    if (limitedResults.length <= 0) {
      setFoundItems(["Sorry, there are no items found..."])
    } else if (limitedResults.length != 0) {
      setFoundItems(limitedResults)
    } else {
      setFoundItems(["Sorry, there are no items found..."])
    }
  }

  useEffect(() => {
    // assign the new array to the foundItems
    handleUI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loading = foundItems.length === 0
  const empty = foundItems.includes("Sorry, there are no items found...")

  return (
    <div className="container p-5 py-24">
      <div className="flex flex-col items-center gap-10">

        <div className="flex flex-col max-w-xl m-auto">
          <h1 className="text-2xl font-bold tracking-tight text-center scroll-m-20 lg:text-3xl">
            Selamat datang di Lost and Found Bandara Internasional Yogyakarta
          </h1>
          <p className="leading-5 text-sm [&:not(:first-child)]:mt-6 text-center">
            Kehilangan barang berharga anda? jangan khawatir, kami siap membantu.
            Kami di sini untuk membantu anda menemukan barang anda yang hilang!
          </p>
        </div>

        <Alert className='max-w-2xl bg-blue-200'>
          <Info className="w-4 h-4" />
          <AlertDescription className='font-semibold'>
            Platform ini masih dalam tahap pengembangan, anda mungkin akan menemukan beberapa hal yang tidak diinginkan saat ini.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href={'/input-barang-temuan'}>
            <Button className='flex w-full gap-2 p-5 shadow-xl'>
              Saya menemukan barang!
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href={'/barang-temuan'}>
            <Button className='flex w-full gap-2 p-5 shadow-xl'>
              Saya kehilangan barang!
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-medium tracking-tight scroll-m-20">
            Barang temuan terbaru
          </h4>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {
              loading ?
                <>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[180px]" />
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[180px]" />
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </>
                :
                empty ?
                  foundItems.map((message) => {
                    return (
                      <Alert key={message}>
                        <AlertTitle className='font-semibold'>
                          {message}
                        </AlertTitle>
                      </Alert>
                    )
                  })
                  :
                  foundItems.map((item) => {
                    return (
                      <Card className="w-[350px]" key={item}>
                        <CardHeader>
                          <div className="relative w-full h-[250px]">
                            <Image
                              src={item.fotoBarang}
                              alt={item.namaBarang}
                              width={250}
                              height={250}
                              className="object-cover w-full h-full rounded-xl filter grayscale"
                            />
                            <div
                              className="absolute inset-0 backdrop-filter backdrop-blur-sm rounded-xl"
                              style={{ content: '""' }}
                            ></div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid items-center w-full gap-4">
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="name">Nama Barang</Label>
                              <Input id="name" value={item.namaBarang} className='bg-slate-200' />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="name">Jenis Barang</Label>
                              <Input id="name" value={item.jenisBarang} className='bg-slate-200' />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="name">Lokasi Penemuan Barang</Label>
                              <Input id="name" value={item.lokasiTemuanBarang} className='bg-slate-200' />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="name">Status</Label>
                              {
                                !item.isClaimed ?
                                  <Badge className={'bg-red-600 w-[110px] justify-center'}>Belum Diklaim</Badge>
                                  :
                                  <Badge className={'bg-green-600'}>Sudah Diklaim</Badge>
                              }
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="name">Pelapor</Label>
                              <div className="flex items-center gap-2">
                                <Avatar className='w-7 h-7'>
                                  <AvatarImage src={item.user.photoURL} />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <span className="text-xs">{item.user.email}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          {/* <Button variant="outline">Cancel</Button> */}
                          <AlertDialog>
                            <AlertDialogTrigger>
                              {
                                !item.isClaimed ?
                                  <Button
                                    onClick={() => {
                                      setCurrentItem(item)
                                    }}
                                  >
                                    Klaim
                                  </Button>
                                  :
                                  null
                              }
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Klaim Barang</AlertDialogTitle>
                                <AlertDialogDescription>
                                  We will contact you as soon as possible if the data that you gave matches with data in our databases!
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <form>
                                <div className="grid items-center w-full gap-4">
                                  <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="phoneNumber">Nomor Telepon atau WhatsApp</Label>
                                    <Input
                                      id="phoneNumber"
                                      placeholder="0812******67"
                                      value={claimersPhoneNumber}
                                      type='tel'
                                      onChange={(e) => {
                                        setClaimersPhoneNumber(e.target.value)
                                      }}
                                    />
                                  </div>
                                  <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="itemColor">Warna Barang</Label>
                                    <Input
                                      id="itemColor"
                                      placeholder="hitam"
                                      value={claimersItemColor}
                                      type='text'
                                      onChange={(e) => {
                                        setClaimersItemColor(e.target.value)
                                      }}
                                    />
                                  </div>
                                  <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="itemDescription">Deskripsi Barang</Label>
                                    <Input
                                      id="itemDescription"
                                      placeholder="warna hitam, ada stiker kucing di bagian belakang"
                                      value={claimersItemDescription}
                                      type='text'
                                      onChange={(e) => {
                                        setClaimersItemDescription(e.target.value)
                                      }}
                                    />
                                  </div>
                                </div>
                              </form>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={(e) => {
                                    e.preventDefault()

                                    const data = {
                                      claimersPhoneNumber,
                                      claimersItemColor,
                                      claimersItemDescription,
                                      id: currentItem
                                    }

                                    if (claimersPhoneNumber === "" || claimersPhoneNumber === null &&
                                      claimersItemColor === "" || claimersItemColor === null &&
                                      claimersItemDescription === "" || claimersItemDescription === null) {
                                      toast({
                                        title: "⚠️ Peringatan!",
                                        description: "Mohon isi semua data yang diperlukan!",
                                      })
                                    } else {
                                      setSending(true)
                                      // sendNotification(e, data)
                                    }
                                  }}
                                >
                                  {sending ? 'Mengirim...' : 'Kirim'}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </CardFooter>
                      </Card>
                    )
                  })
            }
          </div>
          <Link href={'/barang-temuan'} className="flex justify-end mt-2">
            <Button>
              Lihat Selengkapnya
            </Button>
          </Link>
          <div className="mt-10">
            {
              empty ?
                null
                :
                <div className="flex flex-col gap-10">
                  <h4 className="text-base font-medium tracking-tight scroll-m-20">
                    Lapor kepada kami tentang barang yang hilang!
                  </h4>
                  <form>
                    <div className="flex flex-col max-w-sm gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="reporterPhoneNumber">Nomor Telepon atau WhatsApp</Label>
                        <Input
                          id="reporterPhoneNumber"
                          placeholder="0812********"
                          value={reporterPhoneNumber}
                          type='tel'
                          onChange={(e) => {
                            setReporterPhoneNumber(e.target.value)
                          }}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="reporterName">Nama Pelapor</Label>
                        <Input
                          id="reporterName"
                          placeholder="John Doe"
                          value={reporterName}
                          type='text'
                          onChange={(e) => {
                            setReporterName(e.target.value)
                          }}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="reporterMessage">Pesan</Label>
                        <Input
                          id="reporterMessage"
                          placeholder="aku kehilangan iPhone 7 dengan warna Jet Black, tolong bantu aku mencarinya"
                          value={reporterMessage}
                          type='text'
                          onChange={(e) => {
                            setReporterMessage(e.target.value)
                          }}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Button
                          onClick={(e) => {
                            e.preventDefault()

                            const data = {
                              reporterPhoneNumber,
                              reporterName,
                              reporterMessage,
                              email: user.email
                            }

                            if (reporterPhoneNumber === "" || reporterPhoneNumber === null &&
                              reporterName === "" || reporterName === null &&
                              reporterMessage === "" || reporterMessage === null) {
                              toast({
                                title: "⚠️ Peringatan!",
                                description: "Mohon isi semua data yang diperlukan!",
                              })
                            } else {
                              setSending(true)
                              // sendNotification(e, data)
                            }
                          }}
                          className='flex w-20'
                        >
                          {sending ? 'Mengirim...' : 'Kirim'}
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}