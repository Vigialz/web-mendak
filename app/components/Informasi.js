"use client"
import { School, Heart, Zap, Droplets, MapPin, Users, Mountain, TreePine } from "lucide-react"
import { useState } from "react"

export default function Fasilitas() {
    const [selectedFacility, setSelectedFacility] = useState(null)

    const facilities = [
        {
            icon: <School />,
            name: "Pos Ronda",
            description: "Tempat berkumpul warga untuk menjaga keamanan dusun"
        },
        {
            icon: <Heart />,
            name: "Lapangan Badminton",
            description: "Fasilitas olahraga untuk aktivitas warga"
        },
        {
            icon: <Zap />,
            name: "Makam",
            description: "Area pemakaman untuk warga dusun"
        },
        {
            icon: <Droplets />,
            name: "Mushola",
            description: "Tempat ibadah untuk kegiatan keagamaan"
        },
    ]

    const stats = [
        { icon: <Users className="w-6 h-6" />, value: "169", label: "Jiwa", color: "text-blue-600" },
        { icon: <Mountain className="w-6 h-6" />, value: "860", label: "Mdpl", color: "text-green-600" },
        { icon: <MapPin className="w-6 h-6" />, value: "1", label: "RT", color: "text-purple-600" },
        { icon: <TreePine className="w-6 h-6" />, value: "RW 3", label: "Wilayah", color: "text-orange-600" },
    ]

    return (
        <section id="fasilitas" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
                        <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
                        Informasi Dusun Mendak
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Deskripsi singkat mengenai Dusun Mendak, potensi wilayah, dan fasilitas yang tersedia
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                        >
                            <div className={`${stat.color} mb-2`}>
                                {stat.icon}
                            </div>
                            <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16 border border-gray-100">
                    <div className="prose prose-lg max-w-none">
                        <div className="flex items-start mb-6">
                            <div className="flex-shrink-0 w-1 h-20 bg-gradient-to-b from-green-500 to-blue-500 rounded-full mr-6"></div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Tentang Dusun Mendak</h3>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    <span className="font-semibold text-green-600">Dusun Mendak</span> adalah sebuah dusun yang terletak di kaki
                                    <span className="font-semibold text-blue-600"> Gunung Merapi</span> dengan detail Kelurahan Tlogowatu,
                                    Kecamatan Kemalang, Kabupaten Klaten, Jawa Tengah dengan ketinggian permukaan
                                    <span className="font-semibold text-purple-600"> 860 Mdpl</span>.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mt-8">
                            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
                                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <TreePine className="w-6 h-6 text-green-600 mr-2" />
                                    Potensi Wilayah
                                </h4>
                                <p className="text-gray-700 leading-relaxed">
                                    Dusun ini memiliki potensi dalam sektor <span className="font-semibold text-green-600">pertanian dan peternakan</span>.
                                    Dalam Dusun Mendak terdapat banyak lahan pertanian (tegal) terutama cabai dan tembakau.
                                    Selain itu semua warga mendak hampir memiliki ternak dan kebun pribadi untuk dikelola.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <Users className="w-6 h-6 text-blue-600 mr-2" />
                                    Demografis
                                </h4>
                                <p className="text-gray-700 leading-relaxed">
                                    Dengan jumlah penduduk sekitar <span className="font-semibold text-blue-600">169 jiwa</span>,
                                    Dusun Mendak terdiri dari <span className="font-semibold text-purple-600">1 RT</span> dan
                                    termasuk kedalam <span className="font-semibold text-orange-600">RW 3</span> di Kelurahan Tlogowatu.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {facilities.map((facility, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="text-gray-800 text-4xl mb-4">{facility.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-700">{facility.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}


