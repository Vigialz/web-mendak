"use client"

import { useEffect, useState } from "react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        behavior: "smooth",
        top: elementPosition
      })
    }
  }

  return (
      <section id="tentang" className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <img
              src="/images/merapi2.jpg"
              alt="Background"
              className="w-full h-full object-cover object-center opacity-80"
              draggable="false"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
                className={`transition-all duration-1000 ease-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              <h1 className="text-4xl md:text-5xl mt-32 font-bold mb-6 leading-tight">Website Dusun Mendak</h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed text-justify">
                Dusun Mendak adalah sebuah dusun yang terletak di kaki Gunung Merapi dengan detail Kelurahan Tlogowatu, Kecamatan Kemalang, Kabupaten Klaten, Jawa Tengah dengan ketinggian permukaan 860 Mdpl. Dusun ini memiliki potensi dalam sektor <span className="font-semibold text-green-600">pertanian dan peternakan</span>. Dalam Dusun Mendak terdapat banyak lahan pertanian (tegal) terutama cabai dan tembakau. Selain itu semua warga mendak hampir memiliki ternak dan kebun pribadi untuk dikelola. Dengan jumlah penduduk sekitar 169 jiwa,
                Dusun Mendak terdiri dari 1 RT dan
                termasuk kedalam RW 3 di Kelurahan Tlogowatu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-32">
                <button
                    onClick={() => window.open("https://www.google.com/maps/@-7.5877303,110.4926235,3a,60y,313.82h,81.19t/data=!3m7!1e1!3m5!1sYFZz86K2M6aVEyohF5tP8w!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D8.813149017136737%26panoid%3DYFZz86K2M6aVEyohF5tP8w%26yaw%3D313.815087516072!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI1MDcwOC4wIKXMDSoASAFQAw%3D%3D", "_blank")}
                    className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 hover:scale-105 hover:shadow-xl transition-all duration-300 transform group"
                >
                <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                  Jelajahi Dusun
                </span>
                </button>
                <button
                    onClick={() => smoothScrollTo("statistik")}
                    className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 hover:scale-105 hover:shadow-xl transition-all duration-300 transform group"
                >
                <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                  Informasi Dusun
                </span>
                </button>
              </div>
            </div>

            <div
                className={`relative transition-all duration-1000 ease-out delay-300 ${
                    isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
                }`}
            >
            </div>
          </div>
        </div>
      </section>
  )
}
