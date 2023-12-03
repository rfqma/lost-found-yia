'use client'

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
  TableFooter
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ToastAction } from "@/components/ui/toast"
import { parseDate } from "@/lib/utilities/parse-date"

export const View = ({ data }) => {
  const { results } = data
  const sortedResults = results.slice().sort((a, b) => b.id - a.id)
  const [foundItems, setFoundItems] = useState([])
  const [currentItem, setCurrentItem] = useState(null)
  const [claimersPhoneNumber, setClaimersPhoneNumber] = useState('')
  const [claimersItemColor, setClaimersItemColor] = useState("")
  const [claimersItemDescription, setClaimersItemDescription] = useState("")
  const [sending, setSending] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()
  const [openDialog, setOpenDialog] = useState(false)

  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})

  const columns = [
    {
      accessorKey: "namaBarang",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama Barang
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("namaBarang")}</div>,
    },
    {
      accessorKey: "jenisBarang",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Jenis Barang
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("jenisBarang")}</div>,
    },
    {
      accessorKey: "lokasiTemuanBarang",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Lokasi Temuan
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("lokasiTemuanBarang")}</div>,
    },
    {
      accessorKey: "foundDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tanggal Ditemukan
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{parseDate(row.getValue("foundDate").seconds, row.getValue("foundDate").nanoseconds)}</div>,
    },
    {
      accessorKey: "isClaimed",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">
          {
            !row.getValue("isClaimed") ?
              <Badge className={'bg-red-600 text-xs'}>Belum Diklaim</Badge>
              :
              <Badge className={'bg-green-600 text-xs'}>Sudah Diklaim</Badge>
          }
        </div>
      ),
    },
    // {
    //   id: "actions",
    //   enableHiding: false,
    //   header: 'Aksi',
    //   cell: ({ row }) => {
    //     const item = row.original

    //     return (

    //     )
    //   },
    // },
  ]

  const table = useReactTable({
    data: foundItems,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const handleUI = async () => {
    if (sortedResults.length <= 0) {
      setFoundItems(["Sorry, there are no items found..."])
    } else if (sortedResults.length != 0) {
      setFoundItems(sortedResults)
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
            Daftar Temuan Barang
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

        {
          user.uid ?
            <Alert className='max-w-2xl bg-green-300'>
              <Info className="w-4 h-4" />
              <AlertTitle>🎉</AlertTitle>
              <AlertDescription className='font-semibold'>
                Anda sudah melakukan login, silahkan klaim barang anda!
              </AlertDescription>
            </Alert>
            :
            <Alert className='max-w-2xl bg-yellow-200'>
              <Info className="w-4 h-4" />
              <AlertTitle>⚠️</AlertTitle>
              <AlertDescription className='font-semibold'>
                Anda belum melakukan login, silahkan login terlebih dahulu untuk melakukan klaim barang!
              </AlertDescription>
            </Alert>
        }

        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href={'/input-barang-temuan'}>
            <Button className='flex w-full gap-2 p-5 shadow-xl'>
              Saya menemukan barang!
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="w-full">
          <div className="flex items-center py-4">
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
                  <div className="w-full">
                    <div className="flex items-center py-4">
                      <div className="gap-2 sm:flex">
                        <Input
                          placeholder="Filter nama barang..."
                          value={(table.getColumn("namaBarang")?.getFilterValue()) ?? ""}
                          onChange={(event) =>
                            table.getColumn("namaBarang")?.setFilterValue(event.target.value)
                          }
                          className="max-w-sm"
                        />
                        <Input
                          placeholder="Filter lokasi temuan..."
                          value={(table.getColumn("lokasiTemuanBarang")?.getFilterValue()) ?? ""}
                          onChange={(event) =>
                            table.getColumn("lokasiTemuanBarang")?.setFilterValue(event.target.value)
                          }
                          className="max-w-sm"
                        />
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="ml-auto">
                            Pilih Kolom <ChevronDown className="w-4 h-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                              return (
                                <DropdownMenuCheckboxItem
                                  key={column.id}
                                  className="capitalize"
                                  checked={column.getIsVisible()}
                                  onCheckedChange={(value) =>
                                    column.toggleVisibility(!!value)
                                  }
                                >
                                  {
                                    column.id === 'namaBarang' ?
                                      'Nama Barang'
                                      :
                                      column.id === 'jenisBarang' ?
                                        'Jenis Barang'
                                        :
                                        column.id === 'lokasiTemuanBarang' ?
                                          'Lokasi Temuan'
                                          :
                                          column.id === 'foundDate' ?
                                            'Tanggal Ditemukan'
                                            :
                                            column.id === 'isClaimed' ?
                                              'Status'
                                              :
                                              column.id
                                  }
                                </DropdownMenuCheckboxItem>
                              )
                            })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                              {headerGroup.headers.map((header) => {
                                return (
                                  <TableHead key={header.id}>
                                    {header.isPlaceholder
                                      ? null
                                      : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                      )}
                                  </TableHead>
                                )
                              })}
                              <TableHead>
                                Pelapor
                              </TableHead>
                              <TableHead>
                                Aksi
                              </TableHead>
                            </TableRow>
                          ))}
                        </TableHeader>
                        <TableBody>
                          {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                              <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                              >
                                {row.getVisibleCells().map((cell) => (
                                  <TableCell key={cell.id}>
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                    )}
                                  </TableCell>
                                ))}
                                <TableCell className='flex items-center gap-2'>
                                  <Avatar className='w-7 h-7'>
                                    <AvatarImage src={row.original.user.photoURL} />
                                    <AvatarFallback>CN</AvatarFallback>
                                  </Avatar>
                                  <div className="flex flex-col">
                                    <span className="text-xs text-slate-500">{row.original.user.email}</span>
                                    <span className="text-xs text-slate-500">{row.original.helperPhoneNumber}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" className="w-8 h-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="w-4 h-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                      <DropdownMenuItem>
                                        {
                                          !row.original.isClaimed ?
                                            <Button
                                              size='sm'
                                              onClick={() => {
                                                if (user.uid) {
                                                  setCurrentItem(row.original)
                                                  setOpenDialog(true)
                                                } else {
                                                  toast({
                                                    title: "⚠️ Peringatan!",
                                                    description: "Anda harus login terlebih dahulu!",
                                                    action: (
                                                      <>
                                                        <Link href={'/login'}>
                                                          <ToastAction altText="Login">Login</ToastAction>
                                                        </Link>
                                                      </>
                                                    )
                                                  })
                                                }
                                              }}
                                            >
                                              Klaim
                                            </Button>
                                            :
                                            null
                                        }
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem>
                                        <a
                                          href={row.original.fotoBarang}
                                          target="_blank"
                                        >
                                          <Button size='sm'>
                                            Lihat Foto
                                          </Button>
                                        </a>
                                      </DropdownMenuItem>
                                      {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                              >
                                No results.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex items-center justify-end py-4 space-x-2">
                      {/* <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                      </div> */}
                      <div className="space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => table.previousPage()}
                          disabled={!table.getCanPreviousPage()}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => table.nextPage()}
                          disabled={!table.getCanNextPage()}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </div>
            }
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
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
                  <AlertDialogCancel
                    onClick={() => {
                      setCurrentItem(null)
                    }}
                  >
                    Batal
                  </AlertDialogCancel>
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
          </div>
        </div>
      </div>
    </div>
  )
}