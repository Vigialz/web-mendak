"use client"

export default function LoadingSpinner({ size = "default", text = "Memuat data..." }) {
  const sizeClasses = {
    small: "h-8 w-8",
    default: "h-12 w-12",
    large: "h-16 w-16"
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4`}></div>
        <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-r-blue-400 rounded-full animate-spin animation-delay-200`}></div>
      </div>
      <p className="text-gray-600 text-sm animate-pulse">{text}</p>
    </div>
  )
}

// Card skeleton for grid layouts with enhanced animations
export function CardSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse bg-[length:200%_100%] animate-shimmer"></div>
          <div className="p-6">
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-3 animate-pulse bg-[length:200%_100%] animate-shimmer"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2 animate-pulse bg-[length:200%_100%] animate-shimmer" style={{ animationDelay: '0.1s' }}></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-4 w-3/4 animate-pulse bg-[length:200%_100%] animate-shimmer" style={{ animationDelay: '0.2s' }}></div>
            <div className="flex gap-2">
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full w-16 animate-pulse bg-[length:200%_100%] animate-shimmer" style={{ animationDelay: '0.3s' }}></div>
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full w-12 animate-pulse bg-[length:200%_100%] animate-shimmer" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Image skeleton for gallery with wave animation
export function ImageSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div
            className="h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse bg-[length:200%_100%] animate-shimmer"
            style={{ animationDelay: `${index * 0.1}s` }}
          ></div>
        </div>
      ))}
    </div>
  )
}

// Carousel skeleton with enhanced animation
export function CarouselSkeleton() {
  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="relative overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="h-64 md:h-80 lg:h-96 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse bg-[length:200%_100%] animate-shimmer relative">
          {/* Fake content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="container mx-auto px-4">
              <div className="h-8 bg-gray-400/50 rounded mb-2 w-1/3 animate-pulse"></div>
              <div className="h-4 bg-gray-400/30 rounded w-2/3 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="w-3 h-3 rounded-full bg-gray-300 animate-pulse"
            style={{ animationDelay: `${index * 0.1}s` }}
          ></div>
        ))}
      </div>
    </div>
  )
}
