"use client"

import { Users, Home, MapPin, UsersRound, LandPlot, MapPinHouse, CircleUserRound, SquareChevronUp, CircleUser, Mountain} from "lucide-react"
import { useEffect, useState, useRef } from "react"

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState([0, 0, 0, 0])
  const sectionRef = useRef(null)

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: 184,
      suffix: "+",
      label: "Total Jiwa",
      color: "bg-yellow-500",
    },
    {
      icon: <UsersRound className="w-8 h-8" />,
      number: 63,
      suffix: "+",
      label: "Kepala Keluarga",
      color: "bg-green-500",
    },
    {
      icon: <MapPinHouse className="w-8 h-8" />,
      number: 17,
      suffix: "",
      label: "Luas Wilayah (Hektar)",
      color: "bg-orange-500",
    },
    {
      icon: <Home className="w-8 h-8" />,
      number: 48,
      suffix: "+",
      label: "Rumah",
      color: "bg-purple-500",
    },
    {
      icon: <LandPlot className="w-8 h-8" />,
      keterangan: " 1 (RT 5)",
      suffix: "+",
      label: "Jumlah RT",
      color: "bg-blue-500",
    },
    {
      icon: <CircleUserRound className="w-8 h-8" />,
      keterangan: "RW 3",
      suffix: "+",
      label: "RW",
      color: "bg-blue-500",
    },
    {
      icon: <Mountain className="w-8 h-8" />,
      keterangan: "860 Mdpl",
      suffix: "+",
      label: "Ketinggian Permukaan",
      color: "bg-blue-500",
    },
    {
      icon: <SquareChevronUp className="w-8 h-8" />,
      keterangan: "Pertanian dan Peternakan",
      suffix: "+",
      label: "Potensi Wilayah",
      color: "bg-slate-500",
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
            animateCounters()
          }
        },
        { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      let start = 0
      const end = stat.number
      const duration = 2000
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          start = end
          clearInterval(timer)
        }
        setCounters((prev) => {
          const newCounters = [...prev]
          newCounters[index] = start
          return newCounters
        })
      }, 16)
    })
  }

  return (
      <div className="bg-gray-50" id="statistik">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 ">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Statistik Dusun Mendak</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
                Data dan informasi terkini tentang Dusun Mendak
            </p>
      </div>
      <section ref={sectionRef} className="py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={`bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl hover:scale-105 transition-all duration-500 transform group ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                      className={`${stat.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {stat.number !== undefined
                        ? (stat.suffix === "" ? counters[index].toFixed(1) : Math.floor(counters[index])) + stat.suffix
                        : stat.keterangan}
                  </div>
                  <div className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{stat.label}</div>
                </div>
            ))}
          </div>
        </div>
      </section>
      </div>
  )
}
