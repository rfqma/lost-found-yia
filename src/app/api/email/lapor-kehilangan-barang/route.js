import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'
import { userMailHTML, authorityMailHTML } from '@/lib/email/lapor-kehilangan-barang'

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
      reporterName,
      reporterPhoneNumber,
      reporterMessage,
      reporterEmail,
      reporterEmailDisplayName
    } = requestBody

    const userMailOptions = {
      from: process.env.NEXT_PUBLIC_GMAIL,
      to: 'abelcaster025@gmail.com',
      subject: 'Laporanmu sudah kami terima!',
      html: userMailHTML(reporterName, reporterPhoneNumber, reporterMessage, reporterEmail, reporterEmailDisplayName)
    }

    const authorityMailOptions = {
      from: process.env.NEXT_PUBLIC_GMAIL,
      to: process.env.NEXT_PUBLIC_AUTHORITY_EMAIL,
      subject: 'Laporan kehilangan barang!',
      html: authorityMailHTML(reporterName, reporterPhoneNumber, reporterMessage, reporterEmail, reporterEmailDisplayName)
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