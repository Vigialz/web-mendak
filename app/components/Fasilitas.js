"use client"
import { School, Heart, Zap, Droplets, Car, Wifi, X, UserCog, Sprout } from "lucide-react"
import { useState } from "react"

export default function Fasilitas() {
  const [selectedFacility, setSelectedFacility] = useState(null)

  const facilities = [
    {
      icon: <School className="w-12 h-12" />,
      title: "Pendidikan",
      details: {
        subtitle: "Fasilitas Pendidikan di Dusun Mendak",
        content: [
          "PAUD (Pendidikan Anak Usia Dini) dengan tenaga pengajar terlatih",
          "Taman Kanak-kanak yang memiliki fasilitas bermain yang lengkap",
          "Akses mudah ke Sekolah Dasar terdekat hanya 2 km dari dusun",
          "Program bimbingan belajar untuk anak-anak sekolah",
          "Perpustakaan desa dengan koleksi buku yang terus bertambah"
        ]
      }
    },
    {
      icon: <UserCog className="w-12 h-12" />,
      title: "Struktur Demografi",
      details: {
        subtitle: "Detail Struktur Demografi",
        content: [
          "Jumlah KK yang ada : 63",
          "Jumlah Jiwa : 184",
          "Jumlah Lansia (50 Tahun > ) : 59",
          "Jumlah Remaja (14-24 Tahun) : 41",
          "Jumlah Anak-Anak : (3-13 Tahun) : 24"
        ]
      }
    },
    {
      icon: <Droplets className="w-12 h-12" />,
      title: "Air Bersih",
      details: {
        subtitle: "Sistem Penyediaan Air Bersih",
        content: [
          "Sumur tidak dapat ditemukan disini",
          "PAM juga tidak sampai ke atas untuk aksesnya",
          "Warga memanfaatkan air hujan dalam kebutuhan sehari-hari",
          "Jika musim kemarau, warga harus membeli air bersih dari luar dengan tangki besar",
          "Terdapat mata air kecil di sekitar dusun yang dapat digunakan warga"
        ]
      }
    },
    {
      icon: <Sprout className="w-12 h-12" />,
      title: "Potensi Dusun",
      details: {
        subtitle: "Hal-hal yang dapat dikembangkan di dusun",
        content: [
          "Warga banyak yang memiliki lahan pertanian",
          "Hampir semua warga memiliki hewan ternak sebagai investasi",
          "Meskipun ada yang tidak memiliki lahan, mereka tetap menanam di halaman rumah",
          "Biasanya yang ditanam adalah cabai, timun, tembakau, dan sayuran lainnya. penanaman sesuai dengan musim",
          "Lahan pertanian disini bukan sawah melainkan tegalan kering, sehingga tanaman yang ditanam adalah tanaman musiman"
        ]
      }
    },
    {
      icon: <Wifi className="w-12 h-12" />,
      title: "Internet",
      details: {
        subtitle: "Konektivitas Digital",
        content: [
          "Jaringan internet fiber optik yang tidak stabil",
          "WiFi gratis di balai desa",
          "Kartu yang ada sinyal (lumayan) : ByU, Telkomsel, Indosat",
          "Banyak warga yang sudah memiliki WiFi sendiri",
          "Sinyal sulit di dapatkan di beberapa titik dusun, terutama di area yang sudah diatas"
        ]
      }
    },
  ]

  const openModal = (facility) => {
    setSelectedFacility(facility)
  }

  const closeModal = () => {
    setSelectedFacility(null)
  }

  return (
    <section id="fasilitas" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Detail Dusun Mendak</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Berbagai fasilitas yang tersedia untuk mendukung kehidupan warga dusun
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 hover:-translate-y-2"
              onClick={() => openModal(facility)}
            >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center group-hover:from-blue-500 group-hover:to-blue-700 transition-all duration-300">
                <div className="text-white transform group-hover:scale-110 transition-transform duration-300">{facility.icon}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">{facility.title}</h3>
                <div className="mt-4 text-blue-600 text-sm font-medium group-hover:text-blue-700 transform group-hover:translate-x-2 transition-all duration-300">
                  Klik untuk detail lebih lanjut →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-blue-600">{selectedFacility.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{selectedFacility.title}</h3>
                  <p className="text-gray-600">{selectedFacility.details.subtitle}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {selectedFacility.details.content.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 p-6">
              <button
                onClick={closeModal}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

