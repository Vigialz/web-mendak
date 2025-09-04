"use client"

import { School, Combine, Heart, Zap, Droplets, Car, Wifi, X, UserCog, Sprout, Building2, OctagonAlert, ListCollapse } from "lucide-react"
import {useEffect, useState} from "react"
import detail from "../data/detailData.json"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebaseConfig.js";
import LoadingSpinner, { CardSkeleton } from "./LoadingSpinner.js";

export default function Fasilitas() {
  const [selectedFacility, setSelectedFacility] = useState(null)
  const [facilities, setFasilitasData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, "detail"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFasilitasData(data[0].data);
        console.log(data[0].data);
      } catch (error) {
        console.error("❌ Gagal fetch UMKM:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Icon mapping untuk mengkonversi string ke komponen React
  const iconMap = {
    Building2: <Building2 className="w-12 h-12" />,
    UserCog: <UserCog className="w-12 h-12" />,
    Droplets: <Droplets className="w-12 h-12" />,
    Sprout: <Sprout className="w-12 h-12" />,
    Wifi: <Wifi className="w-12 h-12" />,
    OctagonAlert: <OctagonAlert className="w-12 h-12" />,
    ListCollapse: <ListCollapse className="w-12 h-12" />,
    Combine : <Combine className="w-12 h-12" />,
  }

  const getIcon = (iconName) => {
    return iconMap[iconName] || <Building2 className="w-12 h-12" />
  }

  const openModal = (facility) => {
    setSelectedFacility(facility)
  }

  const closeModal = () => {
    setSelectedFacility(null)
  }

  return (
    <section id="fasilitas" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Detail Dusun Mendak</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Berbagai fasilitas yang tersedia untuk mendukung kehidupan warga dusun
          </p>
        </div>

        {loading ? (
            <CardSkeleton count={8} />
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 hover:-translate-y-2"
              onClick={() => openModal(facility)}
            >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center group-hover:from-blue-500 group-hover:to-blue-700 transition-all duration-300">
                <div className="text-white transform group-hover:scale-110 transition-transform duration-300">
                  {getIcon(facility.icon)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">{facility.title}</h3>
                <div className="mt-4 text-blue-600 text-sm font-medium group-hover:text-blue-700 transform group-hover:translate-x-2 transition-all duration-300">
                  Klik untuk detail lebih lanjut →
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>

      {/* Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-blue-600">{getIcon(selectedFacility.icon)}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{selectedFacility.title}</h3>
                  <p className="text-gray-600">{selectedFacility.details.subtitle}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {selectedFacility.details.content.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 p-6">
              <button
                onClick={closeModal}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

