import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Dusun Mendak</h3>
            <p className="text-gray-300 mb-4">
              Website resmi Dusun Mendak, Kelurahan Tlogowatu, Kecamatan Kemalang, Kabupaten Klaten. Menyediakan
              informasi terkini tentang dusun mendak kepada masyarakat luas.
            </p>
            <div className="mb-4">
              <img
                  src="/images/logo.png"
                  alt="Logo KKN"
                  className="h-12"
                  style={{ maxHeight: "48px" }}
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#tentang" className="text-gray-300 hover:text-white transition-colors">
                  Tentang
                </a>
              </li>
              <li>
                <a href="#visi-misi" className="text-gray-300 hover:text-white transition-colors">
                  Visi Misi
                </a>
              </li>
              <li>
                <a href="#fasilitas" className="text-gray-300 hover:text-white transition-colors">
                  Fasilitas
                </a>
              </li>
              <li>
                <a href="#galeri" className="text-gray-300 hover:text-white transition-colors">
                  Galeri
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Dusun Mendak</li>
              <li>Kelurahan Tlogowatu</li>
              <li>Kecamatan Kemalang</li>
              <li>Kabupaten Klaten</li>
              <li>Jawa Tengah</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">© 2025 KKN UPNVY AD.83.273. Semua hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
