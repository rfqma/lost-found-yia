import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'
import { userMailHTML, authorityMailHTML } from '@/lib/email/lapor-barang-temuan'

export async function POST(req) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_GMAIL,
        pass: process.env.NEXT_PUBLIC_GMAIL_KEY
      }
    })

    const requestBody = await req.json()
    const {
      namaBarang,
      jenisBarang,
      lokasiTemuanBarang,
      warnaBarang,
      foundDate,
      fotoBarang,
      isClaimed,
      helperPhoneNumber,
      user,
    } = requestBody

    const userMailOptions = {
      from: process.env.NEXT_PUBLIC_GMAIL,
      to: user.email,
      subject: 'Laporan temuan barang sudah kami terima!',
      html: userMailHTML(namaBarang, jenisBarang, lokasiTemuanBarang, warnaBarang, foundDate, fotoBarang, helperPhoneNumber, user)
    }

    const authorityMailOptions = {
      from: process.env.NEXT_PUBLIC_GMAIL,
      to: process.env.NEXT_PUBLIC_AUTHORITY_EMAIL,
      subject: 'Laporan temuan barang!',
      html: authorityMailHTML(namaBarang, jenisBarang, lokasiTemuanBarang, warnaBarang, foundDate, fotoBarang, helperPhoneNumber, user)
    }

    await transporter.sendMail(userMailOptions)
    await transporter.sendMail(authorityMailOptions)

    return NextResponse.json({
      message: 'Email sent successfully!'
    })
  } catch (error) {
    console.log('Error: ', error)
    return NextResponse.json({
      message: 'Something went wrong, please try again later',
      error: error.message
    })
  }
}