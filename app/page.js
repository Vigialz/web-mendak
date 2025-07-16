import Header from "./components/Header"
import Hero from "./components/Hero"
import Stats from "./components/Stats"
import VisiMisi from "./components/VisiMisi"
import Fasilitas from "./components/Fasilitas"
import Umkm from "./components/Umkm"
import Galeri from "./components/Galeri"
import Kontak from "./components/Kontak"
import Footer from "./components/Footer"
import Informasi from "./components/Informasi"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
        {/*<Informasi />*/}
      <Stats />
        <Fasilitas />
      <Umkm />
      {/*<VisiMisi />*/}
      <Galeri />
      <Kontak />
      <Footer />
    </div>
  )
}
