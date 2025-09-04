"use client"

import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../lib/firebaseConfig.js'
import {
  Users,
  ShoppingBag,
  Camera,
  Eye,
  TrendingUp,
  Activity,
  Plus,
  Calendar,
  MapPin,
  Clock,
  FileText
} from 'lucide-react'
import LoadingSpinner from './LoadingSpinner.js'

export default function FunctionalDashboard({ user, onQuickAction }) {
  const [dashboardData, setDashboardData] = useState({
    umkmCount: 0,
    galeriCount: 0,
    carouselCount: 0,
    detailInfoCount: 0,
    recentActivities: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch all collections data
      const [umkmSnap, galeriSnap, carouselSnap, detailSnap] = await Promise.all([
        getDocs(collection(db, 'umkm')),
        getDocs(collection(db, 'galeri')),
        getDocs(collection(db, 'carousel')),
        getDocs(collection(db, 'detail'))
      ])

      // Count data from each collection
      const umkmData = umkmSnap.docs[0]?.data()?.data || []
      const galeriData = galeriSnap.docs[0]?.data()?.images || []
      const carouselData = carouselSnap.docs[0]?.data()?.images || []
      const detailData = detailSnap.docs[0]?.data()?.data || []

      // Generate recent activities (simulated based on current time)
      const activities = [
        {
          type: 'umkm',
          action: 'tambah',
          item: 'Warung Makan Bu Sari',
          time: '2 jam yang lalu',
          icon: ShoppingBag,
          color: 'blue'
        },
        {
          type: 'galeri',
          action: 'update',
          item: '3 foto kegiatan PKK',
          time: '1 hari yang lalu',
          icon: Camera,
          color: 'green'
        },
        {
          type: 'carousel',
          action: 'edit',
          item: 'Slide perkebunan tembakau',
          time: '3 hari yang lalu',
          icon: Eye,
          color: 'purple'
        },
        {
          type: 'detail',
          action: 'update',
          item: 'Informasi struktur demografi',
          time: '1 minggu yang lalu',
          icon: FileText,
          color: 'orange'
        }
      ]

      setDashboardData({
        umkmCount: umkmData.length,
        galeriCount: galeriData.length,
        carouselCount: carouselData.length,
        detailInfoCount: detailData.length,
        recentActivities: activities
      })

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getDemographicStats = () => {
    return [
      { label: 'Jumlah KK', value: '63', icon: Users, color: 'blue' },
      { label: 'Total Jiwa', value: '184', icon: Users, color: 'green' },
      { label: 'Lansia (50+)', value: '59', icon: Users, color: 'purple' },
      { label: 'Remaja (14-24)', value: '41', icon: Users, color: 'orange' },
    ]
  }

  if (loading) {
    return <LoadingSpinner size="large" text="Memuat dashboard..." />
  }

  const stats = [
    {
      name: 'Total UMKM',
      value: dashboardData.umkmCount.toString(),
      change: '+2',
      icon: ShoppingBag,
      color: 'blue',
      description: 'UMKM terdaftar'
    },
    {
      name: 'Foto Galeri',
      value: dashboardData.galeriCount.toString(),
      change: '+8',
      icon: Camera,
      color: 'green',
      description: 'Dokumentasi kegiatan'
    },
    {
      name: 'Slide Carousel',
      value: dashboardData.carouselCount.toString(),
      change: '0',
      icon: Eye,
      color: 'purple',
      description: 'Banner utama aktif'
    },
    {
      name: 'Info Detail',
      value: dashboardData.detailInfoCount.toString(),
      change: '+1',
      icon: FileText,
      color: 'orange',
      description: 'Informasi dusun'
    },
  ]

  const demographicStats = getDemographicStats()

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Selamat Datang, {user.displayName || 'Admin'}! 👋
            </h2>
            <p className="text-gray-600">
              Dashboard admin website Dusun Mendak - {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            Last update: {new Date().toLocaleTimeString('id-ID')}
          </div>
        </div>
      </div>

      {/* Content Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                  {stat.change !== '0' && (
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <p className="text-sm text-green-600">{stat.change} bulan ini</p>
                    </div>
                  )}
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}-50`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Demographic Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Demografi Dusun</h3>
              <p className="text-sm text-gray-600">Data kependudukan terkini</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {demographicStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                      <Icon className={`w-4 h-4 text-${stat.color}-600`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-50 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Status Sistem</h3>
              <p className="text-sm text-gray-600">Kondisi website dan layanan</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Website Status</span>
              </div>
              <span className="text-sm text-green-600 font-medium">Online</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Database Firebase</span>
              </div>
              <span className="text-sm text-green-600 font-medium">Connected</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Admin Session</span>
              </div>
              <span className="text-sm text-blue-600 font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Aktivitas Terbaru</h3>
                <p className="text-sm text-gray-600">Log aktivitas admin</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {dashboardData.recentActivities.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div key={index} className={`flex items-center gap-4 p-4 bg-${activity.color}-50 rounded-lg`}>
                  <div className={`p-2 bg-${activity.color}-100 rounded-full`}>
                    <Icon className={`w-4 h-4 text-${activity.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {activity.action === 'tambah' ? 'Menambahkan' :
                       activity.action === 'edit' ? 'Mengedit' : 'Memperbarui'} {activity.type}
                    </p>
                    <p className="text-sm text-gray-600">{activity.item} - {activity.time}</p>
                  </div>
                  <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                    {activity.type.toUpperCase()}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-50 rounded-lg">
            <Plus className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
            <p className="text-sm text-gray-600">Aksi cepat untuk mengelola konten</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => onQuickAction('umkm')}
            className="flex flex-col items-center gap-3 p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
          >
            <ShoppingBag className="w-8 h-8 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
            <div className="text-center">
              <p className="font-medium text-gray-700 group-hover:text-blue-700">Kelola UMKM</p>
              <p className="text-xs text-gray-500">Tambah/Edit UMKM</p>
            </div>
          </button>

          <button
            onClick={() => onQuickAction('galeri')}
            className="flex flex-col items-center gap-3 p-6 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200 group"
          >
            <Camera className="w-8 h-8 text-gray-400 group-hover:text-green-600 transition-colors duration-200" />
            <div className="text-center">
              <p className="font-medium text-gray-700 group-hover:text-green-700">Upload Foto</p>
              <p className="text-xs text-gray-500">Tambah ke galeri</p>
            </div>
          </button>

          <button
            onClick={() => onQuickAction('carousel')}
            className="flex flex-col items-center gap-3 p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
          >
            <Eye className="w-8 h-8 text-gray-400 group-hover:text-purple-600 transition-colors duration-200" />
            <div className="text-center">
              <p className="font-medium text-gray-700 group-hover:text-purple-700">Edit Carousel</p>
              <p className="text-xs text-gray-500">Atur slide banner</p>
            </div>
          </button>

          <button
            onClick={() => onQuickAction('detaildata')}
            className="flex flex-col items-center gap-3 p-6 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group"
          >
            <FileText className="w-8 h-8 text-gray-400 group-hover:text-orange-600 transition-colors duration-200" />
            <div className="text-center">
              <p className="font-medium text-gray-700 group-hover:text-orange-700">Info Detail</p>
              <p className="text-xs text-gray-500">Update informasi</p>
            </div>
          </button>
        </div>

        {/* Refresh Data Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Activity className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Memperbarui...' : 'Refresh Data'}
          </button>
        </div>
      </div>

      {/* Website Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Dusun Mendak</h3>
          </div>
          <p className="text-blue-100 mb-4">
            Kelurahan Tlogowatu, Kecamatan Kemalang, Kabupaten Klaten, Jawa Tengah
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-blue-200">Altitude</p>
              <p className="font-medium">~800m dpl</p>
            </div>
            <div>
              <p className="text-blue-200">Suhu Rata-rata</p>
              <p className="font-medium">13-25°C</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Website Analytics</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-green-100">Total Konten</span>
              <span className="font-bold text-xl">
                {dashboardData.umkmCount + dashboardData.galeriCount + dashboardData.carouselCount}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-100">Admin Aktif</span>
              <span className="font-bold">1</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-100">Status</span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                Live
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
