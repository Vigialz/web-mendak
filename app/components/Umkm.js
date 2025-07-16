"use client"

import { ShoppingBag, Users, MapPin, Phone, Star, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function Umkm() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const umkmData = [
    {
      id: 1,
      name: "Warung Makan Bu Sari",
      category: "kuliner",
      owner: "Ibu Sari",
      description: "Warung makan dengan menu masakan tradisional Jawa yang lezat dan harga terjangkau",
      phone: "0857-1234-5678",
      address: "RT 5 RW 3, Dusun Mendak",
      image: "/images/placeholder.jpg",
      rating: 4.5,
      specialties: ["Gudeg", "Soto Ayam", "Nasi Pecel"]
    },
    {
      id: 2,
      name: "Toko Kelontong Pak Budi",
      category: "retail",
      owner: "Pak Budi",
      description: "Toko kelontong lengkap dengan berbagai kebutuhan sehari-hari warga dusun",
      phone: "0858-9876-5432",
      address: "RT 5 RW 3, Dusun Mendak",
      image: "/images/placeholder.jpg",
      rating: 4.2,
      specialties: ["Sembako", "Alat Tulis", "Obat-obatan"]
    },
    {
      id: 3,
      name: "Kerajinan Anyaman Bambu",
      category: "kerajinan",
      owner: "Ibu Wati",
      description: "Kerajinan tangan dari bambu seperti keranjang, tempat sampah, dan dekorasi rumah",
      phone: "0859-1111-2222",
      address: "RT 5 RW 3, Dusun Mendak",
      image: "/images/placeholder.jpg",
      rating: 4.8,
      specialties: ["Keranjang", "Tempat Sampah", "Dekorasi"]
    },
    {
      id: 4,
      name: "Bengkel Motor Jaya",
      category: "jasa",
      owner: "Pak Joko",
      description: "Bengkel motor dengan layanan service, ganti oli, dan reparasi kendaraan bermotor",
      phone: "0856-3333-4444",
      address: "RT 5 RW 3, Dusun Mendak",
      image: "/images/placeholder.jpg",
      rating: 4.3,
      specialties: ["Service Motor", "Ganti Oli", "Reparasi"]
    },
    {
      id: 5,
      name: "Penjual Sayur Keliling",
      category: "pertanian",
      owner: "Ibu Tini",
      description: "Penjual sayur keliling dengan sayuran segar langsung dari kebun sendiri",
      phone: "0857-5555-6666",
      address: "RT 5 RW 3, Dusun Mendak",
      image: "/images/placeholder.jpg",
      rating: 4.6,
      specialties: ["Sayur Segar", "Cabai", "Tembakau"]
    },
    {
      id: 6,
      name: "Ternak Ayam Kampung",
      category: "peternakan",
      owner: "Pak Sutrisno",
      description: "Usaha ternak ayam kampung dengan telur dan daging berkualitas tinggi",
      phone: "0858-7777-8888",
      address: "RT 5 RW 3, Dusun Mendak",
      image: "/images/placeholder.jpg",
      rating: 4.4,
      specialties: ["Ayam Kampung", "Telur Segar", "Daging Ayam"]
    }
  ]

  const categories = [
    { id: "all", name: "Semua", icon: <ShoppingBag className="w-5 h-5" /> },
    { id: "kuliner", name: "Kuliner", icon: <ShoppingBag className="w-5 h-5" /> },
    { id: "retail", name: "Retail", icon: <ShoppingBag className="w-5 h-5" /> },
    { id: "kerajinan", name: "Kerajinan", icon: <ShoppingBag className="w-5 h-5" /> },
    { id: "jasa", name: "Jasa", icon: <Users className="w-5 h-5" /> },
    { id: "pertanian", name: "Pertanian", icon: <ShoppingBag className="w-5 h-5" /> },
    { id: "peternakan", name: "Peternakan", icon: <ShoppingBag className="w-5 h-5" /> }
  ]

  const filteredUmkm = selectedCategory === "all"
    ? umkmData
    : umkmData.filter(item => item.category === selectedCategory)

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <section id="umkm" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            UMKM Dusun Mendak
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dukung usaha mikro, kecil, dan menengah yang ada di Dusun Mendak untuk kemajuan ekonomi masyarakat
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        {/* UMKM Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUmkm.map((umkm) => (
            <div
              key={umkm.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group hover:scale-105 border border-gray-100"
            >
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <div className="text-white text-6xl opacity-20">
                  <ShoppingBag className="w-20 h-20" />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {umkm.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    {renderStars(umkm.rating)}
                    <span className="text-sm text-gray-600 ml-1">({umkm.rating})</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {umkm.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{umkm.owner}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{umkm.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{umkm.phone}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Produk/Layanan:</h4>
                  <div className="flex flex-wrap gap-2">
                    {umkm.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`tel:${umkm.phone}`}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Hubungi
                  </a>
                  <a
                    href={`https://wa.me/${umkm.phone.replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <ChevronRight className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUmkm.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <ShoppingBag className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-gray-600 text-lg">
              Belum ada UMKM dalam kategori ini
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
