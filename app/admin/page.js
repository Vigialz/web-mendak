"use client"

import { useState, useEffect } from 'react'
import { auth } from '../../lib/firebaseConfig.js'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import {
  Users,
  ShoppingBag,
  Camera,
  BarChart3,
  Settings,
  LogOut,
  Home,
  Plus,
  Edit,
  Trash2,
  Eye,
  Info
} from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner.js'
import Image from 'next/image'
import UmkmCRUD from '../components/UmkmCRUD.js'
import GaleriCRUD from '../components/GaleriCRUD.js'
import CarouselCRUD from '../components/CarouselCRUD.js'
import DetailDataCRUD from '../components/DetailDataCRUD.js'
import FunctionalDashboard from '../components/FunctionalDashboard.js'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true)

      if (user) {
        // Check if user is authorized admin
        if (await isAuthorizedAdmin(user)) {
          setUser(user)
        } else {
          // Unauthorized user, sign them out and redirect
          await signOut(auth)
          router.push('/login')
        }
      } else {
        setUser(null)
        router.push('/login')
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  // Function to check if user is authorized admin
  const isAuthorizedAdmin = async (user) => {
    const authorizedEmails = process.env.AUTHORIZED_ADMIN_EMAILS?.split(',') || [
      'za@gmail.com',
      'admin@dusunmendak.id',
      'aryaz@example.com'
    ]

    return authorizedEmails.includes(user.email)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Quick action handler for dashboard
  const handleQuickAction = (tabName) => {
    setActiveTab(tabName)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" text="Memuat dashboard..." />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'umkm', name: 'UMKM', icon: ShoppingBag },
    { id: 'galeri', name: 'Galeri', icon: Camera },
    { id: 'carousel', name: 'Carousel', icon: Eye },
    { id: 'detaildata', name: 'Detail Info', icon: Info },
    { id: 'settings', name: 'Pengaturan', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo-mendak.png"
                alt="Logo Dusun Mendak"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Dusun Mendak</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <Home className="w-4 h-4" />
                Lihat Website
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{user.displayName || 'Admin'}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
                {user.photoURL && (
                  <Image
                    src={user.photoURL}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-gray-200"
                  />
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  Keluar
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen sticky top-16">
          <nav className="mt-6">
            <div className="px-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </button>
                )
              })}
            </div>

            {/* Sidebar Footer Info */}
            <div className="mt-8 px-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-700 mb-2">System Info</p>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>Version: v1.0.0</p>
                  <p>Last Deploy: Today</p>
                  <p className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    All systems operational
                  </p>
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-h-screen overflow-y-auto">
          {activeTab === 'dashboard' && <FunctionalDashboard user={user} onQuickAction={handleQuickAction} />}

          {activeTab === 'umkm' && <UmkmCRUD />}

          {activeTab === 'galeri' && <GaleriCRUD />}

          {activeTab === 'carousel' && <CarouselCRUD />}

          {activeTab === 'detaildata' && <DetailDataCRUD />}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Pengaturan</h2>
              <p className="text-gray-600 mb-8">Konfigurasi website dan akun admin</p>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Akun</h3>
                    <div className="flex items-center gap-4">
                      {user.photoURL && (
                        <Image
                          src={user.photoURL}
                          alt="Profile"
                          width={64}
                          height={64}
                          className="rounded-full"
                        />
                      )}
                      <div>
                        <p className="font-medium text-gray-800">{user.displayName || 'Admin'}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">Login terakhir: {new Date().toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Tentang Sistem</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-700">Versi Admin Panel</p>
                        <p className="text-lg font-bold text-blue-600">v1.0.0</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-700">Total Data Terkelola</p>
                        <p className="text-lg font-bold text-green-600">4 Kategori</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
