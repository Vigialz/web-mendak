"use client"

import { useState } from 'react'
import { MapPin, ZoomIn, ZoomOut, Download, Maximize2, X } from 'lucide-react'

export default function Peta() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const downloadPDF = () => {
    const link = document.createElement('a')
    link.href = '/images/peta.pdf'
    link.download = 'peta.pdf'
    link.click()
  }

  return (
    <section id="peta" className="py-16 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Peta & Lokasi Dusun Mendak
            </h2>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Temukan lokasi dan peta detail Dusun Mendak untuk memudahkan kunjungan Anda
          </p>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* PDF Viewer */}
          <div className="relative">
            <div className="h-96 md:h-[500px] lg:h-[900px] w-full">
              <iframe
                src="/images/peta.pdf#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH"
                className="w-full h-full border-0"
                title="Peta Dusun Mendak"
              />
            </div>

            {/* Overlay gradient for better visibility */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
          <div className="relative w-full h-full max-w-7xl max-h-[95vh] bg-white rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
              <h3 className="text-lg font-semibold flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Peta Dusun Mendak - Tampilan Penuh
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={downloadPDF}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={closeModal}
                  className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                  Tutup
                </button>
              </div>
            </div>

            <div className="h-full">
              <iframe
                src="/images/peta.pdf#toolbar=1&navpanes=1&scrollbar=1&page=1&view=Fit"
                className="w-full h-full border-0"
                title="Peta Dusun Mendak - Fullscreen"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
