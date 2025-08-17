import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Dusun Mendak - Website Resmi",
  icon: "logohm.ico",
  description:
    "Website resmi Dusun Mendak, Kelurahan Tlogowatu, Kecamatan Kemalang, Kabupaten Klaten. Portal informasi dan pelayanan masyarakat.",
  keywords: "Dusun Mendak, Tlogowatu, Kemalang, Klaten, Jawa Tengah",
  generator: 'v0.dev',
  verification: {
    google: "9W9Vm8UTgEiqT6aN0yTr4m_JhKoUPSk3yO_r9kJlU-8",
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
