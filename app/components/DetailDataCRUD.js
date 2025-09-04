"use client"

import { useState, useEffect } from 'react'
import { collection, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebaseConfig.js'
import { Plus, Edit, Trash2, Save, X, Info, Building2, Users, Droplets, Sprout, Wifi, Calendar, AlertTriangle, List } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner.js'

const iconMap = {
  Building2,
  UserCog: Users,
  Droplets,
  Sprout,
  Wifi,
  Combine: Calendar,
  OctagonAlert: AlertTriangle,
  ListCollapse: List
}

export default function DetailDataCRUD() {
  const [detailData, setDetailData] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentDetail, setCurrentDetail] = useState(null)
  const [formData, setFormData] = useState({
    icon: 'Building2',
    title: '',
    subtitle: '',
    content: []
  })
  const [contentInput, setContentInput] = useState('')

  const iconOptions = [
    { value: 'Building2', label: 'Prasarana', icon: Building2 },
    { value: 'UserCog', label: 'Demografi', icon: Users },
    { value: 'Droplets', label: 'Air Bersih', icon: Droplets },
    { value: 'Sprout', label: 'Potensi', icon: Sprout },
    { value: 'Wifi', label: 'Internet', icon: Wifi },
    { value: 'Combine', label: 'Kegiatan', icon: Calendar },
    { value: 'OctagonAlert', label: 'Masalah', icon: AlertTriangle },
    { value: 'ListCollapse', label: 'Detail Lain', icon: List }
  ]

  useEffect(() => {
    fetchDetailData()
  }, [])

  const fetchDetailData = async () => {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'detail'))
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setDetailData(data[0]?.data || [])
      }
    } catch (error) {
      console.error('Error fetching detail data:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveDetailData = async (newData) => {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'detailData'))

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref
        await updateDoc(docRef, { data: newData })
      }

      setDetailData(newData)
    } catch (error) {
      console.error('Error saving detail data:', error)
      alert('Gagal menyimpan data')
    } finally {
      setLoading(false)
    }
  }

  const handleAddDetail = () => {
    setIsEditMode(false)
    setCurrentDetail(null)
    setFormData({
      icon: 'Building2',
      title: '',
      subtitle: '',
      content: []
    })
    setContentInput('')
    setIsModalOpen(true)
  }

  const handleEditDetail = (detail) => {
    setIsEditMode(true)
    setCurrentDetail(detail)
    setFormData({
      icon: detail.icon,
      title: detail.title,
      subtitle: detail.details.subtitle,
      content: [...detail.details.content]
    })
    setContentInput('')
    setIsModalOpen(true)
  }

  const handleDeleteDetail = async (detailToDelete) => {
    if (!confirm('Apakah Anda yakin ingin menghapus detail ini?')) return

    const newData = detailData.filter(detail => detail.title !== detailToDelete.title)
    await saveDetailData(newData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.subtitle || formData.content.length === 0) {
      alert('Semua field harus diisi dan minimal ada 1 konten')
      return
    }

    const newDetail = {
      icon: formData.icon,
      title: formData.title,
      details: {
        subtitle: formData.subtitle,
        content: formData.content
      }
    }

    let newData
    if (isEditMode) {
      newData = detailData.map(detail =>
        detail.title === currentDetail.title ? newDetail : detail
      )
    } else {
      newData = [...detailData, newDetail]
    }

    await saveDetailData(newData)
    setIsModalOpen(false)
  }

  const addContent = () => {
    if (contentInput.trim()) {
      setFormData({
        ...formData,
        content: [...formData.content, contentInput.trim()]
      })
      setContentInput('')
    }
  }

  const removeContent = (index) => {
    setFormData({
      ...formData,
      content: formData.content.filter((_, i) => i !== index)
    })
  }

  if (loading) {
    return <LoadingSpinner size="large" text="Memuat detail data..." />
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Kelola Detail Informasi</h2>
          <p className="text-gray-600">Atur informasi detail tentang Dusun Mendak</p>
        </div>
        <button
          onClick={handleAddDetail}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Tambah Detail
        </button>
      </div>

      {/* Detail List */}
      <div className="grid gap-6">
        {detailData.length > 0 ? (
          detailData.map((detail, index) => {
            const IconComponent = iconMap[detail.icon] || Info
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{detail.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{detail.details.subtitle}</p>
                      <div className="space-y-2">
                        {detail.details.content.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-sm text-gray-700">{item}</p>
                          </div>
                        ))}
                        {detail.details.content.length > 3 && (
                          <p className="text-sm text-gray-500 italic">
                            +{detail.details.content.length - 3} item lainnya...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditDetail(detail)}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDetail(detail)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <Info className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Belum ada detail informasi</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {isEditMode ? 'Edit Detail Informasi' : 'Tambah Detail Baru'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {iconOptions.map((option) => {
                      const IconComp = option.icon
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, icon: option.value })}
                          className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-colors duration-200 ${
                            formData.icon === option.value
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <IconComp className="w-6 h-6" />
                          <span className="text-xs">{option.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Judul *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan judul"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtitle *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan subtitle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Konten *
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={contentInput}
                      onChange={(e) => setContentInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addContent())}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tambah poin konten"
                    />
                    <button
                      type="button"
                      onClick={addContent}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Tambah
                    </button>
                  </div>

                  {formData.content.length > 0 && (
                    <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                      {formData.content.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-700 flex-1">{item}</span>
                          <button
                            type="button"
                            onClick={() => removeContent(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {isEditMode ? 'Simpan Perubahan' : 'Tambah Detail'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
