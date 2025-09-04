"use client"

import { useState, useEffect } from 'react'
import { collection, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebaseConfig.js'
import { Plus, Edit, Trash2, Save, X, Eye, ArrowUp, ArrowDown } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner.js'
import ImageUploader from './ImageUploader.js'

export default function CarouselCRUD() {
  const [carouselData, setCarouselData] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: ''
  })
  const [uploadError, setUploadError] = useState('')

  useEffect(() => {
    fetchCarouselData()
  }, [])

  const fetchCarouselData = async () => {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'carousel'))
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setCarouselData(data[0]?.images || [])
      }
    } catch (error) {
      console.error('Error fetching carousel data:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveCarouselData = async (newData) => {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'carousel'))

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref
        await updateDoc(docRef, { images: newData })
      }

      setCarouselData(newData)
    } catch (error) {
      console.error('Error saving carousel data:', error)
      alert('Gagal menyimpan data')
    } finally {
      setLoading(false)
    }
  }

  const handleAddSlide = () => {
    setIsEditMode(false)
    setCurrentSlide(null)
    setFormData({
      title: '',
      description: '',
      image: ''
    })
    setIsModalOpen(true)
  }

  const handleEditSlide = (slide) => {
    setIsEditMode(true)
    setCurrentSlide(slide)
    setFormData({
      title: slide.title,
      description: slide.description,
      image: slide.image
    })
    setIsModalOpen(true)
  }

  const handleDeleteSlide = async (slideToDelete) => {
    if (!confirm('Apakah Anda yakin ingin menghapus slide ini?')) return

    const newData = carouselData.filter(slide => slide.id !== slideToDelete.id)
    await saveCarouselData(newData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.description || !formData.image) {
      alert('Semua field harus diisi')
      return
    }

    const newSlide = {
      ...formData,
      id: isEditMode ? currentSlide.id : `slide-${Date.now()}`
    }

    let newData
    if (isEditMode) {
      newData = carouselData.map(slide => slide.id === currentSlide.id ? newSlide : slide)
    } else {
      newData = [...carouselData, newSlide]
    }

    await saveCarouselData(newData)
    setIsModalOpen(false)
  }

  const moveSlide = async (index, direction) => {
    const newData = [...carouselData]
    const targetIndex = direction === 'up' ? index - 1 : index + 1

    if (targetIndex < 0 || targetIndex >= newData.length) return

    [newData[index], newData[targetIndex]] = [newData[targetIndex], newData[index]]
    await saveCarouselData(newData)
  }

  const handleImageUpload = (url, path) => {
    setFormData(prev => ({ ...prev, image: url }))
    setUploadError('')
  }

  const handleUploadError = (error) => {
    setUploadError(error)
    setTimeout(() => setUploadError(''), 5000)
  }

  if (loading) {
    return <LoadingSpinner size="large" text="Memuat data carousel..." />
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Kelola Carousel</h2>
          <p className="text-gray-600">Atur slide di halaman utama</p>
        </div>
        <button
          onClick={handleAddSlide}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Tambah Slide
        </button>
      </div>

      {/* Carousel List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {carouselData.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {carouselData.map((slide, index) => (
              <div key={slide.id} className="p-6">
                <div className="flex items-start gap-6">
                  {/* Image Preview */}
                  <div className="flex-shrink-0 w-32 h-20">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{slide.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{slide.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        Urutan: {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 flex flex-col gap-2">
                    <div className="flex gap-1">
                      <button
                        onClick={() => moveSlide(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Pindah ke atas"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveSlide(index, 'down')}
                        disabled={index === carouselData.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Pindah ke bawah"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditSlide(slide)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSlide(slide)}
                        className="p-1 text-red-600 hover:text-red-800"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Belum ada slide dalam carousel</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {isEditMode ? 'Edit Slide' : 'Tambah Slide Baru'}
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
                    Upload Gambar Slide
                  </label>
                  <ImageUploader
                    currentImage={formData.image}
                    onUploadSuccess={handleImageUpload}
                    onUploadError={handleUploadError}
                    folder="carousel"
                    maxSize={5 * 1024 * 1024}
                  />
                  {uploadError && (
                    <p className="mt-1 text-sm text-red-600">{uploadError}</p>
                  )}

                  {/* Manual URL Input (optional) */}
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Atau masukkan URL manual (opsional)
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
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
                    placeholder="Masukkan judul slide"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan deskripsi slide"
                  />
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
                    {isEditMode ? 'Simpan Perubahan' : 'Tambah Slide'}
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
