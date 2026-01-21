import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TOP HAT BARITONE CANOLI MAN',
  description: 'Generate punchy, witty headlines in the iconic NY Post style. The worse the pun makes you groan, the better the headline! 🗞️',
  openGraph: {
    title: 'TOP HAT BARITONE CANOLI MAN',
    description: 'Generate punchy, witty headlines in the iconic NY Post style. The worse the pun makes you groan, the better! 🗞️',
    images: [
      {
        url: 'https://headline-grabber.vercel.app/mascot.jpg',
        width: 600,
        height: 800,
        alt: 'TOP HAT BARITONE CANOLI MAN - Headline Grabber Mascot',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TOP HAT BARITONE CANOLI MAN',
    description: 'Generate punchy, witty headlines in the iconic NY Post style 🗞️',
    images: ['https://headline-grabber.vercel.app/mascot.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">{children}</body>
    </html>
  )
}
