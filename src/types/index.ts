export interface Shoe {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  brand: string
  category: string
  condition: 'new' | 'used' | 'refurbished'
  sizes: string[]
  colors: string[]
  images: string[]
  tags: string[]
  sellerId: string
  sellerName: string
  shopId?: string
  createdAt: Date
  updatedAt: Date
  views: number
  isActive: boolean
}

export interface Shop {
  id: string
  name: string
  description: string
  logo?: string
  banner?: string
  ownerId: string
  ownerName: string
  email: string
  phone?: string
  website?: string
  socialMedia?: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
  location?: {
    address: string
    city: string
    state: string
    zipCode: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  categories: string[]
  isPhysical: boolean
  isFeatured: boolean
  rating: number
  totalReviews: number
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export interface User {
  uid: string
  email: string
  firstName: string
  lastName: string
  userType: 'buyer' | 'seller'
  storeName?: string
  businessType?: string
  createdAt: Date
}

export interface Inquiry {
  id: string
  shoeId: string
  buyerId: string
  sellerId: string
  message: string
  buyerEmail: string
  buyerName: string
  createdAt: Date
  status: 'pending' | 'responded' | 'closed'
}