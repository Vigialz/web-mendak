"use client"

import { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../lib/firebaseConfig.js'
import { Plus, Edit, Trash2, Save, X, Upload, Eye } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner.js'
import ImageUploader from './ImageUploader.js'

export default function UmkmCRUD() {
  const [umkmData, setUmkmData] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentUmkm, setCurrentUmkm] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'kuliner',
    description: '',
    image: '',
    specialties: []
  })
  const [specialtyInput, setSpecialtyInput] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [uploadError, setUploadError] = useState('')

  const categories = [
    { id: 'all', name: 'Semua' },
    { id: 'kuliner', name: 'Kuliner' },
    { id: 'retail', name: 'Retail' },
    { id: 'kerajinan', name: 'Kerajinan' },
    { id: 'jasa', name: 'Jasa' }
  ]

  useEffect(() => {
    fetchUmkmData()
  }, [])

  const fetchUmkmData = async () => {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'umkm'))
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setUmkmData(data[0]?.data || [])
      }
    } catch (error) {
      console.error('Error fetching UMKM data:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveUmkmData = async (newData) => {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'umkm'))

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref
        await updateDoc(docRef, { data: newData })
      } else {
        await addDoc(collection(db, 'umkm'), { data: newData })
      }

      setUmkmData(newData)
    } catch (error) {
      console.error('Error saving UMKM data:', error)
      alert('Gagal menyimpan data')
    } finally {
      setLoading(false)
    }
  }

  const handleAddUmkm = () => {
    setIsEditMode(false)
    setCurrentUmkm(null)
    setFormData({
      name: '',
      category: 'kuliner',
      description: '',
      image: '',
      specialties: []
    })
    setSpecialtyInput('')
    setIsModalOpen(true)
  }

  const handleEditUmkm = (umkm) => {
    setIsEditMode(true)
    setCurrentUmkm(umkm)
    setFormData({
      name: umkm.name,
      category: umkm.category,
      description: umkm.description,
      image: umkm.image,
      specialties: [...umkm.specialties]
    })
    setSpecialtyInput('')
    setIsModalOpen(true)
  }

  const handleDeleteUmkm = async (umkmToDelete) => {
    if (!confirm('Apakah Anda yakin ingin menghapus UMKM ini?')) return

    const newData = umkmData.filter(umkm => umkm.id !== umkmToDelete.id)
    await saveUmkmData(newData)
  }

  const addSpecialty = () => {
    if (specialtyInput.trim() && !formData.specialties.includes(specialtyInput.trim())) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, specialtyInput.trim()]
      })
      setSpecialtyInput('')
    }
  }

  const removeSpecialty = (specialty) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.filter(s => s !== specialty)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.description) {
      alert('Nama dan deskripsi harus diisi')
      return
    }

    const newUmkm = {
      ...formData,
      id: isEditMode ? currentUmkm.id : Date.now()
    }

    let newData
    if (isEditMode) {
      newData = umkmData.map(umkm => umkm.id === currentUmkm.id ? newUmkm : umkm)
    } else {
      newData = [...umkmData, newUmkm]
    }

    await saveUmkmData(newData)
    setIsModalOpen(false)
  }

  const filteredUmkm = selectedCategory === 'all'
    ? umkmData
    : umkmData.filter(umkm => umkm.category === selectedCategory)

  const handleImageUpload = (url, path) => {
    setFormData(prev => ({ ...prev, image: url }))
    setUploadError('')
  }

  const handleUploadError = (error) => {
    setUploadError(error)
    setTimeout(() => setUploadError(''), 5000)
  }

  if (loading) {
    return <LoadingSpinner size="large" text="Memuat data UMKM..." />
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Kelola UMKM</h2>
          <p className="text-gray-600">Tambah, edit, atau hapus data UMKM</p>
        </div>
        <button
          onClick={handleAddUmkm}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Tambah UMKM
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

      {/* UMKM List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredUmkm.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    UMKM
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deskripsi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spesialisasi
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUmkm.map((umkm) => (
                  <tr key={umkm.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          {umkm.image ? (
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={umkm.image}
                              alt={umkm.name}
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                              <Eye className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{umkm.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {umkm.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {umkm.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex flex-wrap gap-1">
                        {umkm.specialties?.slice(0, 2).map((specialty, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {specialty}
                          </span>
                        ))}
                        {umkm.specialties?.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            +{umkm.specialties.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditUmkm(umkm)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUmkm(umkm)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Belum ada data UMKM</p>
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
                  {isEditMode ? 'Edit UMKM' : 'Tambah UMKM Baru'}
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
                    Nama UMKM *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan nama UMKM"
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
                    <option value="kuliner">Kuliner</option>
                    <option value="retail">Retail</option>
                    <option value="kerajinan">Kerajinan</option>
                    <option value="jasa">Jasa</option>
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
                    placeholder="Masukkan deskripsi UMKM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gambar UMKM
                  </label>
                  <ImageUploader
                    currentImage={formData.image}
                    onUploadSuccess={handleImageUpload}
                    onUploadError={handleUploadError}
                    folder="umkm"
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
                    Spesialisasi
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={specialtyInput}
                      onChange={(e) => setSpecialtyInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tambah spesialisasi"
                    />
                    <button
                      type="button"
                      onClick={addSpecialty}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Tambah
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1"
                      >
                        {specialty}
                        <button
                          type="button"
                          onClick={() => removeSpecialty(specialty)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
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
                    {isEditMode ? 'Simpan Perubahan' : 'Tambah UMKM'}
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
