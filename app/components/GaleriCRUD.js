"use client"

import { useState, useEffect } from 'react'
import { collection, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebaseConfig.js'
import { Plus, Edit, Trash2, Save, X, Camera, Eye } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner.js'
import ImageUploader from './ImageUploader.js'

export default function GaleriCRUD() {
  const [galeriData, setGaleriData] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)
  const [formData, setFormData] = useState({
    src: '',
    alt: '',
    title: '',
    description: '',
    category: 'kegiatan'
  })
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [uploadError, setUploadError] = useState('')

  const categories = [
    { id: 'all', name: 'Semua' },
    { id: 'kegiatan', name: 'Kegiatan' },
    { id: 'kesehatan', name: 'Kesehatan' },
    { id: 'fasilitas', name: 'Fasilitas' },
    { id: 'pertanian', name: 'Pertanian' },
    { id: 'infrastruktur', name: 'Infrastruktur' },
    { id: 'pemandangan', name: 'Pemandangan' }
  ]

  useEffect(() => {
    fetchGaleriData()
  }, [])

  const fetchGaleriData = async () => {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'galeri'))
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setGaleriData(data[0]?.images || [])
      }
    } catch (error) {
      console.error('Error fetching galeri data:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveGaleriData = async (newData) => {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'galeri'))

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref
        await updateDoc(docRef, { images: newData })
      }

      setGaleriData(newData)
    } catch (error) {
      console.error('Error saving galeri data:', error)
      alert('Gagal menyimpan data')
    } finally {
      setLoading(false)
    }
  }

  const handleAddImage = () => {
    setIsEditMode(false)
    setCurrentImage(null)
    setFormData({
      src: '',
      alt: '',
      title: '',
      description: '',
      category: 'kegiatan'
    })
    setIsModalOpen(true)
  }

  const handleEditImage = (image) => {
    setIsEditMode(true)
    setCurrentImage(image)
    setFormData({
      src: image.src,
      alt: image.alt,
      title: image.title,
      description: image.description,
      category: image.category
    })
    setIsModalOpen(true)
  }

  const handleDeleteImage = async (imageToDelete) => {
    if (!confirm('Apakah Anda yakin ingin menghapus gambar ini?')) return

    const newData = galeriData.filter(img => img.id !== imageToDelete.id)
    await saveGaleriData(newData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.src || !formData.title || !formData.description) {
      alert('URL gambar, judul, dan deskripsi harus diisi')
      return
    }

    const newImage = {
      ...formData,
      id: isEditMode ? currentImage.id : Date.now(),
      alt: formData.alt || formData.title
    }

    let newData
    if (isEditMode) {
      newData = galeriData.map(img => img.id === currentImage.id ? newImage : img)
    } else {
      newData = [...galeriData, newImage]
    }

    await saveGaleriData(newData)
    setIsModalOpen(false)
  }

  const handleImageUpload = (url, path) => {
    setFormData(prev => ({ ...prev, src: url }))
    setUploadError('')
  }

  const handleUploadError = (error) => {
    setUploadError(error)
    setTimeout(() => setUploadError(''), 5000)
  }

  const filteredImages = selectedCategory === 'all'
    ? galeriData
    : galeriData.filter(img => img.category === selectedCategory)

  if (loading) {
    return <LoadingSpinner size="large" text="Memuat data galeri..." />
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Kelola Galeri</h2>
          <p className="text-gray-600">Upload dan atur foto galeri</p>
        </div>
        <button
          onClick={handleAddImage}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Tambah Foto
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div key={image.id} className="group relative bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 flex gap-2">
                      <button
                        onClick={() => handleEditImage(image)}
                        className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteImage(image)}
                        className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 truncate">{image.title}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {image.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Belum ada foto dalam galeri</p>
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
                  {isEditMode ? 'Edit Foto' : 'Tambah Foto Baru'}
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
                    Upload Gambar
                  </label>
                  <ImageUploader
                    currentImage={formData.src}
                    onUploadSuccess={handleImageUpload}
                    onUploadError={handleUploadError}
                    folder="galeri"
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
                      value={formData.src}
                      onChange={(e) => setFormData({ ...formData, src: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                {formData.src && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preview
                    </label>
                    <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={formData.src}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                      <div className="w-full h-full flex items-center justify-center text-gray-500" style={{ display: 'none' }}>
                        Gambar tidak dapat dimuat
                      </div>
                    </div>
                  </div>
                )}

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
                    placeholder="Masukkan judul foto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={formData.alt}
                    onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Deskripsi alternatif untuk aksesibilitas"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="kegiatan">Kegiatan</option>
                    <option value="kesehatan">Kesehatan</option>
                    <option value="fasilitas">Fasilitas</option>
                    <option value="pertanian">Pertanian</option>
                    <option value="infrastruktur">Infrastruktur</option>
                    <option value="pemandangan">Pemandangan</option>
                  </select>
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
                    placeholder="Masukkan deskripsi foto"
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
                    {isEditMode ? 'Simpan Perubahan' : 'Tambah Foto'}
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
