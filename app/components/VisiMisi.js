"use client"

import { Target, Eye, Users, Leaf, Building, Handshake } from "lucide-react"
import { useEffect, useState, useRef } from "react"

export default function VisiMisi() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const features = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Visi Dusun",
      description: "Mewujudkan Dusun Mendak yang maju, sejahtera, dan berkarakter",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Transparansi",
      description: "Pengelolaan dusun yang terbuka dan dapat dipertanggungjawabkan",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Partisipasi Warga",
      description: "Melibatkan seluruh warga dalam pembangunan dusun",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Lingkungan Hijau",
      description: "Menjaga kelestarian lingkungan untuk generasi mendatang",
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Infrastruktur",
      description: "Pembangunan fasilitas yang mendukung kehidupan warga",
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "Kerjasama",
      description: "Membangun kemitraan dengan berbagai pihak",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        },
        { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
      <section id="visi-misi" ref={sectionRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
              className={`text-center mb-12 transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Visi misi Dusun Mendak</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Komitmen kami dalam membangun dusun yang lebih baik untuk semua warga
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className={`text-center p-6 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-500 transform cursor-pointer group bg-gray-50 hover:bg-white ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
            ))}
          </div>
        </div>
      </section>
  )
}
