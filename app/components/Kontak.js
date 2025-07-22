import {MapPin, Phone, Mail, Clock, SquareUserRound, SquareUser} from "lucide-react"

export default function Kontak() {
  return (
    <section id="kontak" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Kontak </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Informasi kontak Mendak</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Informasi Kontak</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Alamat</h4>
                  <p className="text-gray-600">
                    Dusun Mendak, Kelurahan Tlogowatu
                    <br />
                    Kecamatan Kemalang, Kabupaten Klaten
                    <br />
                    Jawa Tengah, Indonesia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 text-green-600 p-3 rounded-full">
                  <SquareUserRound className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Bayan / Kadus </h4>
                  <p className="text-gray-600">Bapak Ramdoto</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-100 text-red-600 p-3 rounded-full">
                  <SquareUser className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800"> Ketua RT 5 </h4>
                  <p className="text-gray-600">Bapak Nanto Suwiryo</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-100 text-orange-600 p-3 rounded-full">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Email</h4>
                  <p className="text-gray-600">aryazakaria67@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Lokasi</h3>
            <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center overflow-hidden">
              <iframe
                  src="https://www.google.com/maps/d/u/0/embed?mid=1sHDMvLblimo3lzFxn8RkXOCqZUSr9uo&ehbc=2E312F"
                  width="100%"
                  height="100%"
                  className="border-0 w-full h-96 rounded-xl"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Dusun Mendak"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
