import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Upload file to Supabase Storage
export const uploadFile = async (file, folder = 'mendak') => {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    // Check file size limit from environment
    const maxSize = parseInt(process.env.MAX_FILE_SIZE || '5242880') // 5MB default
    if (file.size > maxSize) {
      throw new Error(`File terlalu besar. Maksimal ${Math.round(maxSize / 1024 / 1024)}MB`)
    }

    // Check file type from environment
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/jpg,image/png,image/webp,image/gif').split(',')
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Tipe file tidak diizinkan. Hanya gambar yang diperbolehkan.')
    }

    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_S3_BUCKET || 'mendak')
      .upload(filePath, file)

    if (error) {
      throw error
    }

    const { data: { publicUrl } } = supabase.storage
      .from(process.env.SUPABASE_S3_BUCKET || 'mendak')
      .getPublicUrl(filePath)

    return {
      success: true,
      url: publicUrl,
      path: filePath
    }
  } catch (error) {
    console.error('Upload error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Delete file from Supabase Storage
export const deleteFile = async (filePath) => {
  try {
    const { error } = await supabase.storage
      .from(process.env.SUPABASE_S3_BUCKET || 'mendak')
      .remove([filePath])

    if (error) {
      throw error
    }

    return { success: true }
  } catch (error) {
    console.error('Delete error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}
