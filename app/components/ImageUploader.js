"use client"

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react'
import { uploadFile } from '../../lib/supabaseConfig.js'

export default function ImageUploader({
  onUploadSuccess,
  onUploadError,
  currentImage = null,
  folder = 'mendak',
  acceptedTypes = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB
  className = ''
}) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(currentImage)
  const fileInputRef = useRef(null)

  const validateFile = (file) => {
    if (file.size > maxSize) {
      return `File terlalu besar. Maksimal ${Math.round(maxSize / 1024 / 1024)}MB`
    }

    if (!file.type.startsWith('image/')) {
      return 'File harus berupa gambar'
    }

    return null
  }

  const handleFileSelect = async (file) => {
    const validation = validateFile(file)
    if (validation) {
      onUploadError?.(validation)
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => setPreviewUrl(e.target.result)
    reader.readAsDataURL(file)

    // Upload to Supabase
    setUploading(true)
    try {
      const result = await uploadFile(file, folder)

      if (result.success) {
        onUploadSuccess?.(result.url, result.path)
        setPreviewUrl(result.url)
      } else {
        onUploadError?.(result.error)
        setPreviewUrl(currentImage) // Reset to original
      }
    } catch (error) {
      onUploadError?.(error.message)
      setPreviewUrl(currentImage)
    } finally {
      setUploading(false)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const clearImage = () => {
    setPreviewUrl(null)
    onUploadSuccess?.('', '') // Clear the URL
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedTypes}
          onChange={handleInputChange}
          disabled={uploading}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="text-sm text-gray-600">Uploading gambar...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload className="w-8 h-8 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                Klik untuk upload atau drag & drop
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, JPEG hingga {Math.round(maxSize / 1024 / 1024)}MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Preview */}
      {previewUrl && (
        <div className="relative">
          <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div
              className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100"
              style={{ display: 'none' }}
            >
              <div className="text-center">
                <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Gambar tidak dapat dimuat</p>
              </div>
            </div>

            {/* Clear button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                clearImage()
              }}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
            <p className="text-xs text-green-700 break-all">
              URL: {previewUrl}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
