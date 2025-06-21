import React, { useState } from 'react'
import { Heart, Share2, Star, ShoppingBag, Truck, Shield, RotateCcw, MessageCircle } from 'lucide-react'

const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('White')
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const product = {
    id: 1,
    name: 'Classic White Sneakers',
    brand: 'Urban Steps',
    price: 89.99,
    originalPrice: 120.00,
    rating: 4.8,
    reviews: 124,
    description: 'These classic white sneakers combine timeless style with modern comfort. Perfect for everyday wear, they feature premium materials and cushioned soles for all-day comfort.',
    features: [
      'Premium leather upper',
      'Cushioned insole for comfort',
      'Durable rubber outsole',
      'Breathable lining',
      'Classic lace-up design'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Gray'],
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    seller: {
      name: 'Urban Steps Store',
      rating: 4.9,
      totalSales: 1250,
      responseTime: '< 2 hours'
    }
  }

  const reviews = [
    {
      id: 1,
      user: 'Sarah M.',
      rating: 5,
      date: '2025-01-10',
      comment: 'Amazing quality! Very comfortable and stylish. Highly recommend!',
      verified: true
    },
    {
      id: 2,
      user: 'Mike R.',
      rating: 4,
      date: '2025-01-08',
      comment: 'Great sneakers, fit perfectly. Fast shipping too.',
      verified: true
    },
    {
      id: 3,
      user: 'Emma L.',
      rating: 5,
      date: '2025-01-05',
      comment: 'Love these shoes! They go with everything and are super comfortable.',
      verified: true
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                    activeImageIndex === index ? 'border-primary-600' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-primary-600 font-medium">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                Save ${(product.originalPrice! - product.price).toFixed(2)}
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg font-medium ${
                      selectedColor === color
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
              <div className="grid grid-cols-6 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border rounded-lg font-medium ${
                      selectedSize === size
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
              <div className="flex space-x-4">
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Save
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping & Returns */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center text-gray-600">
                <Truck className="w-5 h-5 mr-3 text-primary-600" />
                <span>Free shipping on orders over $75</span>
              </div>
              <div className="flex items-center text-gray-600">
                <RotateCcw className="w-5 h-5 mr-3 text-primary-600" />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Shield className="w-5 h-5 mr-3 text-primary-600" />
                <span>Secure payment & buyer protection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Seller Information */}
        <div className="mt-16 bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Seller Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">{product.seller.name}</h3>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.seller.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">{product.seller.rating} seller rating</span>
              </div>
              <p className="text-sm text-gray-600">{product.seller.totalSales} total sales</p>
              <p className="text-sm text-gray-600">Responds within {product.seller.responseTime}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-secondary flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Seller
              </button>
              <button className="btn-secondary">View Store</button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">{review.user}</span>
                    {review.verified && (
                      <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage