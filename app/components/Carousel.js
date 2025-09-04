"use client"

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebaseConfig.js";
import Image from "next/image";
import { CarouselSkeleton } from "./LoadingSpinner.js";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)

  const [carouselData, setCarouselData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, "carousel"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCarouselData(data[0].images);
        console.log(data[0].images);
      } catch (error) {
        console.error("❌ Gagal fetch UMKM:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselData.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % carouselData.length)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + carouselData.length) % carouselData.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const openImageModal = (slide) => {
    setSelectedImage(slide)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Sorotan Dusun Mendak
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan berbagai hal menarik di Dusun Mendak
          </p>
        </div>
      </div>

      <div
        className="relative w-full max-w-6xl mx-auto"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {/* Main Carousel Container */}
        {loading ? (
          <CarouselSkeleton />
        ) : (
          <div className="relative overflow-hidden bg-white rounded-lg shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {carouselData.map((slide) => (
                <div key={slide.id} className="w-full flex-shrink-0 relative">
                  <div className="relative h-64 md:h-80 lg:h-96 w-full">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover cursor-pointer hover:brightness-110 transition-all duration-300"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white cursor-pointer" onClick={() => openImageModal(slide)}>
                      <div className="container mx-auto px-4">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">
                          {slide.title}
                        </h3>
                        <p className="text-gray-200 text-sm md:text-base">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                    {/* Click indicator */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200 z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200 z-10"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {/* Dots Indicator */}
        {!loading && (
          <div className="flex justify-center mt-6 space-x-2">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentSlide === index 
                    ? 'bg-blue-600 scale-110' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden">
              <button
                  onClick={closeImageModal}
                  className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative">
                <Image
                    src={selectedImage.image || "/placeholder.svg"}
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
  )
}
