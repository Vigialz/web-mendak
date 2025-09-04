"use client"

import Image from "next/image"
import {useEffect, useState} from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import galeriData from "../data/galeriData.json"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebaseConfig.js";
import LoadingSpinner, { ImageSkeleton } from "./LoadingSpinner.js";

export default function Galeri() {
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, "galeri"));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setImages(data[0].images);
        console.log(data[0].images);
      } catch (error) {
        console.error("❌ Gagal fetch UMKM:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const initialDisplayCount = 6;
  const displayedImages = showAll ? images : images.slice(0, initialDisplayCount);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section id="galeri" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
            Galeri Dusun Mendak
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dokumentasi kegiatan dan suasana kehidupan di Dusun Mendak
          </p>
        </div>

        {loading ? (
          <ImageSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border border-gray-100 cursor-pointer"
                onClick={() => openModal(image)}
              >
                {/* Image container */}
                <div className="relative overflow-hidden">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt || "Galeri Image"}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Hover overlay with title and description */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                    <div className="p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h4 className="text-lg font-bold mb-2">{image.title}</h4>
                      <p className="text-sm text-gray-200 leading-relaxed">{image.description}</p>
                    </div>
                  </div>

                  {/* Decorative gradient border on hover */}
                  <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-blue-500/50 transition-all duration-300 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show More/Less Button */}
        {images.length > initialDisplayCount && !loading && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 hover:scale-105 transition-all duration-300 transform group"
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform duration-300" />
                  Tampilkan Lebih Sedikit
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-[2px] transition-transform duration-300" />
                  Tampilkan Lebih Banyak ({images.length - initialDisplayCount} lainnya)
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative">
              <Image
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                width={800}
                height={600}
                className="w-full h-auto max-h-[70vh] object-contain"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-gray-200 leading-relaxed">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
