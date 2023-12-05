import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'
import { userMailHTML, authorityMailHTML } from '@/lib/email/klaim-barang-temuan'

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
      claimersEmail,
      claimersEmailDisplayName,
      claimersPhoneNumber,
      claimersItemColor,
      claimersItemDescription,
      item
    } = requestBody

    const userMailOptions = {
      from: process.env.NEXT_PUBLIC_GMAIL,
      to: claimersEmail,
      subject: 'Pengajuan klaim barang temuan sudah kami terima!',
      html: userMailHTML(claimersEmail, claimersEmailDisplayName, claimersPhoneNumber, claimersItemColor, claimersItemDescription, item)
    }

    const authorityMailOptions = {
      from: process.env.NEXT_PUBLIC_GMAIL,
      to: process.env.NEXT_PUBLIC_AUTHORITY_EMAIL,
      subject: 'Permintaan klaim barang temuan!',
      html: authorityMailHTML(claimersEmail, claimersEmailDisplayName, claimersPhoneNumber, claimersItemColor, claimersItemDescription, item)
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