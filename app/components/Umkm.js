"use client"

import { ShoppingBag, Users, Star } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebaseConfig.js";
import LoadingSpinner, { CardSkeleton } from "./LoadingSpinner.js";

export default function Umkm() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedUmkm, setSelectedUmkm] = useState(null)
  const [umkmDataArray, setUmkmDataArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", name: "Semua", icon: <ShoppingBag className="w-5 h-5" /> },
    { id: "kuliner", name: "Kuliner", icon: <ShoppingBag className="w-5 h-5" /> },
    { id: "retail", name: "Retail", icon: <ShoppingBag className="w-5 h-5" /> },
    { id: "kerajinan", name: "Kerajinan", icon: <ShoppingBag className="w-5 h-5" /> },
    { id: "jasa", name: "Jasa", icon: <Users className="w-5 h-5" /> }
  ]

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "umkm"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (data.length > 0 && data[0].data) {
          setUmkmDataArray(data[0].data);
          console.log(data[0].data);
        } else {
          console.warn("No UMKM data found");
          setUmkmDataArray([]);
        }
      } catch (error) {
        console.error("❌ Gagal fetch UMKM:", error);
        setUmkmDataArray([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredUmkm = selectedCategory === "all"
      ? umkmDataArray
      : umkmDataArray.filter(item => item.category === selectedCategory)

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

  const openUmkmModal = (umkm) => {
    setSelectedUmkm(umkm)
  }

  const closeUmkmModal = () => {
    setSelectedUmkm(null)
  }

  return (
      <section id="umkm" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              UMKM Dusun Mendak
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dukung usaha mikro, kecil, dan menengah yang ada di Dusun Mendak
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
          {loading ? (
            <CardSkeleton count={8} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredUmkm.map((umkm) => (
                  <div
                      key={umkm.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group hover:scale-105 border border-gray-100 cursor-pointer"
                      onClick={() => openUmkmModal(umkm)}
                  >
                    <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
                      {umkm.image && umkm.image !== "/images/placeholder.jpg" ? (
                          <img
                              src={umkm.image}
                              alt={umkm.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                      ) : (
                          <div className="text-white text-6xl opacity-20">
                            <ShoppingBag className="w-20 h-20" />
                          </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>

                      {/* Click indicator */}
                      <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                          {umkm.name}
                        </h3>
                      </div>

                      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                        {umkm.description}
                      </p>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2">Produk/Layanan:</h4>
                        <div className="flex flex-wrap gap-2">
                          {umkm.specialties.slice(0, 2).map((specialty, index) => (
                              <span
                                  key={index}
                                  className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                              >
                        {specialty}
                      </span>
                          ))}
                          {umkm.specialties.length > 2 && (
                              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{umkm.specialties.length - 2} lainnya
                      </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          )}

          {!loading && filteredUmkm.length === 0 && (
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

        {/* UMKM Detail Modal */}
        {selectedUmkm && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
              <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden">
                <button
                    onClick={closeUmkmModal}
                    className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="relative">
                  <Image
                      src={selectedUmkm.image || "/placeholder.svg"}
                      width={800}
                      height={600}
                      className="w-full h-auto max-h-[70vh] object-contain"
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{selectedUmkm.name}</h3>
                    <p className="text-gray-200 leading-relaxed">{selectedUmkm.description}</p>
                  </div>
                </div>
              </div>
            </div>
        )}
      </section>
  )
}
