'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { Info, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useAuth } from "@/lib/providers/firebase-auth-provider"
import { firebaseStorage } from "@/lib/databases/firebase"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore"
import { firebaseDB } from "@/lib/databases/firebase"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utilities"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ToastAction } from "@/components/ui/toast"
import { DateTime } from "luxon"
import { SelectSingleEventHandler } from "react-day-picker"
import { RouteProtection } from "@/lib/utilities/route-protection"
import axios from "axios"

export const View = () => {
  const [namaBarang, setNamaBarang] = useState('')
  const [jenisBarang, setJenisBarang] = useState('')
  const [lokasiTemuanBarang, setLokasiTemuanBarang] = useState('')
  const [warnaBarang, setWarnaBarang] = useState('')
  const [helperPhoneNumber, setHelperPhoneNumber] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  // const [preview, setPreview] = useState(null)
  const [foundDate, setFoundDate] = useState(new Date())
  const [sending, setSending] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()
  const [selectedDateTime, setSelectedDateTime] = useState(DateTime.fromJSDate(foundDate))

  const handleSelect = (day, selected) => {
    const selectedDay = DateTime.fromJSDate(selected)
    const modifiedDay = selectedDay.set({
      hour: selectedDateTime.hour,
      minute: selectedDateTime.minute,
    })

    setSelectedDateTime(modifiedDay)
    setFoundDate(modifiedDay.toJSDate())
  }

  const handleTimeChange = (e) => {
    const { value } = e.target
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/

    if (!timeRegex.test(value)) {
      console.log('Invalid time format')
      return
    }

    const hours = Number.parseInt(value.split(':')[0] || '00', 10)
    const minutes = Number.parseInt(value.split(':')[1] || '00', 10)
    const modifiedDay = selectedDateTime.set({ hour: hours, minute: minutes })

    setSelectedDateTime(modifiedDay)
    setFoundDate(modifiedDay.toJSDate())
  }

  // useEffect(() => {
  //   if (!selectedFile) {
  //     setPreview(undefined)
  //     return
  //   }

  //   const objectUrl = URL.createObjectURL(selectedFile)
  //   setPreview(objectUrl)

  //   return () => URL.revokeObjectURL(objectUrl)
  // }, [selectedFile])

  const handleUpload = async () => {
    const mountainsRef = ref(firebaseStorage, 'foundItemsImage/' + selectedFile.name)

    try {
      const snapshot = await uploadBytesResumable(mountainsRef, selectedFile)
      const downloadUrl = await getDownloadURL(snapshot.ref)
      return downloadUrl
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const sendData = async (e) => {
    e.preventDefault()

    if (namaBarang === '' ||
      jenisBarang === '' ||
      lokasiTemuanBarang === '' ||
      warnaBarang === '' ||
      foundDate === null ||
      selectedFile === null ||
      helperPhoneNumber === ''
    ) {
      return toast({
        title: "⚠️ Peringatan!",
        description: "Mohon isi semua data yang diperlukan!",
      })
    } else {
      setSending(true)

      const timestamp = new Date().getTime().toString()
      const addedItems = doc(firebaseDB, 'foundItems/' + timestamp)

      try {
        const photoUrl = await handleUpload()

        if (!photoUrl) {
          return toast({
            title: "⚠️ Peringatan!",
            description: "Terjadi kesalahan saat mengunggah foto barang."
          })
        }

        const foundItem = {
          namaBarang,
          jenisBarang,
          lokasiTemuanBarang,
          warnaBarang,
          foundDate,
          fotoBarang: photoUrl,
          isClaimed: false,
          helperPhoneNumber,
          user,
        }

        await setDoc(addedItems, foundItem)
        await sendNotificationLaporBarangTemuan(foundItem)
        setSending(false)
        setNamaBarang('')
        setJenisBarang('')
        setLokasiTemuanBarang('')
        setWarnaBarang('')
        setFoundDate(null)
        setSelectedFile(null)
        setHelperPhoneNumber('')

        // toast({
        //   title: "✅ Berhasil!",
        //   description: "Terima kasih atas kebaikan anda 😁, periksa email anda untuk informasi lebih lanjut!",
        //   action: (
        //     <>
        //       <Link href={'/barang-temuan'}>
        //         <ToastAction altText="Temuan Barang">Temuan Barang</ToastAction>
        //       </Link>
        //     </>
        //   )
        // })
      } catch (error) {
        console.error(error)
        setSending(false)
        return toast({
          title: "⚠️ Peringatan!",
          description: "Terjadi kesalahan saat mengirim data."
        })
      }
    }
  }

  const sendNotificationLaporBarangTemuan = async (foundItem) => {
    try {
      const response = await axios.post('/api/email/lapor-barang-temuan', foundItem)

      if (response.status === 200) {
        toast({
          title: "✅ Berhasil!",
          description: "Laporan anda berhasil dikirim, silahkan cek email anda!",
        })
      } else if (response.status === 500) {
        toast({
          title: "❌ Gagal!",
          description: "Laporan anda gagal terkirim!",
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <RouteProtection>
      <div className="container p-5 py-24">
        <div className="flex flex-col items-center gap-10">

          <div className="flex flex-col max-w-xl m-auto">
            <h1 className="text-2xl font-bold tracking-tight text-center scroll-m-20 lg:text-3xl">
              Form Input Barang Temuan
            </h1>
            {/* <p className="leading-5 text-sm [&:not(:first-child)]:mt-6 text-center">
              Kehilangan barang berharga anda? jangan khawatir, kami siap membantu.
              Kami di sini untuk membantu anda menemukan barang anda yang hilang!
            </p> */}
          </div>

          <Alert className='max-w-2xl bg-blue-200'>
            <Info className="w-4 h-4" />
            <AlertDescription className='font-semibold'>
              Platform ini masih dalam tahap pengembangan, anda mungkin akan menemukan beberapa hal yang tidak diinginkan saat ini.
            </AlertDescription>
          </Alert>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link href={'/barang-temuan'}>
              <Button className='flex w-full gap-2 p-5 shadow-xl'>
                Saya kehilangan barang!
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="w-full">
            <form className="py-4">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="itemName">Nama Barang</Label>
                  <Input
                    id="itemName"
                    placeholder="laptop asus a-bc-d"
                    value={namaBarang}
                    type='text'
                    onChange={(e) => {
                      setNamaBarang(e.target.value)
                    }}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="itemCategory">Jenis Barang</Label>
                  <Input
                    id="itemCategory"
                    placeholder="elektronik"
                    value={jenisBarang}
                    type='text'
                    onChange={(e) => {
                      setJenisBarang(e.target.value)
                    }}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="helperPhoneNumber">Nomor HP atau WhatsApp Pelapor</Label>
                  <Input
                    id="helperPhoneNumber"
                    placeholder="0812********"
                    value={helperPhoneNumber}
                    type='tel'
                    onChange={(e) => {
                      setHelperPhoneNumber(e.target.value)
                    }}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="itemFoundLocation">Lokasi Temuan Barang</Label>
                  <Input
                    id="itemFoundLocation"
                    placeholder="Check-in area"
                    value={lokasiTemuanBarang}
                    type='text'
                    onChange={(e) => {
                      setLokasiTemuanBarang(e.target.value)
                    }}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="itemColor">Warna Barang</Label>
                  <Input
                    id="itemColor"
                    placeholder="hitam"
                    value={warnaBarang}
                    type='text'
                    onChange={(e) => {
                      setWarnaBarang(e.target.value)
                    }}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="idImage">Foto Barang</Label>
                  <Input
                    id="idImage"
                    placeholder="hitam"
                    type='file'
                    accept='image/*'
                    onChange={(e) => {
                      if (!e.target.files || e.target.files.length === 0) {
                        setSelectedFile(null)
                        return
                      }
                      setSelectedFile(e.target.files[0])
                    }}
                    className='cursor-pointer'
                    required
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="foundDate">Tanggal Barang Ditemukan</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal",
                          !foundDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {foundDate ? selectedDateTime.toFormat('DDD HH:mm') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDateTime.toJSDate()}
                        onSelect={handleSelect}
                        initialFocus
                        id='foundDate'
                        required
                      />
                      <div className="px-4 pt-0 pb-4">
                        <Label>Waktu</Label>
                        <Input
                          type='time'
                          onChange={handleTimeChange}
                          value={selectedDateTime.toFormat('HH:mm')}
                        />
                      </div>
                      {!selectedDateTime ? <span>Please pick a day</span> : null}
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex flex-col space-y-2">
                  <Button
                    onClick={sendData}
                    className='flex w-20'
                  >
                    {sending ? 'Mengirim...' : 'Kirim'}
                  </Button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </RouteProtection>
  )
}