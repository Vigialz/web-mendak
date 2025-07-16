"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const informasiSection = document.getElementById('fasilitas')

      if (informasiSection) {
        const sectionTop = informasiSection.offsetTop - 80
        const sectionBottom = sectionTop + informasiSection.offsetHeight

        const isInInformasiSection = scrollY >= sectionTop && scrollY <= sectionBottom

        if (isInInformasiSection) {
          setIsScrolled(true)
        } else {
          setIsScrolled(scrollY > 10)
        }
      } else {
        setIsScrolled(scrollY > 10)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll function
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      })
    }
    setIsMenuOpen(false)
  }

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      smoothScrollTo(targetId)
    }
  }

  return (
      <header
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
              isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <div
                  className={`text-2xl font-bold cursor-pointer transition-colors duration-300 ${
                      isScrolled ? "text-blue-600 hover:text-blue-700" : "text-white hover:text-blue-200"
                  }`}
                  onClick={(e) => handleNavClick(e, "home")}
              >
                <img
                    src="/images/logohm.png"
                    alt="Logo Klaten"
                    width={128}
                    height={128}
                    className={`inline-block m-2 align-middle object-contain transition-all duration-300 ${
                        isScrolled ? "filter-none" : "brightness-0 invert"
                    }`}
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                  onClick={(e) => handleNavClick(e, "home")}
                  className={`transition-all duration-300 hover:scale-105 relative group ${
                      isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
                  }`}
              >
                Beranda
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    isScrolled ? "bg-blue-600" : "bg-white"
                }`}></span>
              </button>
              <button
                  onClick={(e) => handleNavClick(e, "statistik")}
                  className={`transition-all duration-300 hover:scale-105 relative group ${
                      isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
                  }`}
              >
                Statistik
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    isScrolled ? "bg-blue-600" : "bg-white"
                }`}></span>
              </button>
              <button
                  onClick={(e) => handleNavClick(e, "fasilitas")}
                  className={`transition-all duration-300 hover:scale-105 relative group ${
                      isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
                  }`}
              >
                Detail Informasi
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    isScrolled ? "bg-blue-600" : "bg-white"
                }`}></span>
              </button>
              <button
                  onClick={(e) => handleNavClick(e, "umkm")}
                  className={`transition-all duration-300 hover:scale-105 relative group ${
                      isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
                  }`}
              >
                UMKM
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    isScrolled ? "bg-blue-600" : "bg-white"
                }`}></span>
              </button>
              <button
                  onClick={(e) => handleNavClick(e, "galeri")}
                  className={`transition-all duration-300 hover:scale-105 relative group ${
                      isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
                  }`}
              >
                Galeri
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    isScrolled ? "bg-blue-600" : "bg-white"
                }`}></span>
              </button>
              <button
                  onClick={(e) => handleNavClick(e, "kontak")}
                  className={`transition-all duration-300 hover:scale-105 relative group ${
                      isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
                  }`}
              >
                Kontak
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    isScrolled ? "bg-blue-600" : "bg-white"
                }`}></span>
              </button>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                  href="https://api.whatsapp.com/send/?phone=6285601356245&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-2 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 transform inline-block ${
                      isScrolled 
                          ? "bg-blue-600 text-white hover:bg-blue-700" 
                          : "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm"
                  }`}
              >
                Contribute
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`transition-all duration-300 hover:scale-110 ${
                      isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
                  }`}
              >
                <div className="relative w-6 h-6">
                  <Menu
                      size={24}
                      className={`absolute transition-all duration-300 ${
                          isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                      }`}
                  />
                  <X
                      size={24}
                      className={`absolute transition-all duration-300 ${
                          isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                      }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
              className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
                  isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <div className={`py-4 border-t ${isScrolled ? "border-gray-200" : "border-white/20"}`}>
              <nav className="flex flex-col space-y-4">
                <button
                    onClick={(e) => handleNavClick(e, "home")}
                    className={`transition-all duration-300 text-left hover:translate-x-2 ${
                        isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
                    }`}
                >
                  Beranda
                </button>
                <button
                    onClick={(e) => handleNavClick(e, "statistik")}
                    className={`transition-all duration-300 text-left hover:translate-x-2 ${
                        isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
                    }`}
                >
                  Statistik
                </button>
                <button
                    onClick={(e) => handleNavClick(e, "fasilitas")}
                    className={`transition-all duration-300 text-left hover:translate-x-2 ${
                        isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
                    }`}
                >
                  Detail Informasi
                </button>
                <button
                    onClick={(e) => handleNavClick(e, "umkm")}
                    className={`transition-all duration-300 text-left hover:translate-x-2 ${
                        isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
                    }`}
                >
                  UMKM
                </button>
                <button
                    onClick={(e) => handleNavClick(e, "galeri")}
                    className={`transition-all duration-300 text-left hover:translate-x-2 ${
                        isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
                    }`}
                >
                  Galeri
                </button>
                <button
                    onClick={(e) => handleNavClick(e, "kontak")}
                    className={`transition-all duration-300 text-left hover:translate-x-2 ${
                        isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
                    }`}
                >
                  Kontak
                </button>
                <button
                    onClick={(e) => handleNavClick(e, "kontak")}
                    className={`px-6 py-2 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 w-fit transform ${
                        isScrolled 
                            ? "bg-blue-600 text-white hover:bg-blue-700" 
                            : "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm"
                    }`}
                >
                  Hubungi Kami
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>
  )
}
