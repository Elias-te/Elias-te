import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Star, ShoppingBag, Eye, MapPin } from 'lucide-react'
import { Shoe } from '../types'

interface ShoeCardProps {
  shoe: Shoe
  viewMode?: 'grid' | 'list'
}

const ShoeCard: React.FC<ShoeCardProps> = ({ shoe, viewMode = 'grid' }) => {
  const isOnSale = shoe.originalPrice && shoe.originalPrice > shoe.price

  return (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden shoe-card ${
      viewMode === 'list' ? 'flex' : ''
    }`}>
      <div className={`relative ${viewMode === 'list' ? 'w-48' : ''}`}>
        <Link to={`/product/${shoe.id}`}>
          <img
            src={shoe.images[0] || 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400'}
            alt={shoe.name}
            className={`object-cover ${
              viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'
            }`}
          />
        </Link>
        
        {isOnSale && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Sale
          </div>
        )}
        
        <div className="absolute top-3 right-3 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
          {shoe.condition}
        </div>
        
        <button className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      
      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className="mb-2">
          <p className="text-sm text-gray-500">{shoe.brand}</p>
          <Link to={`/product/${shoe.id}`}>
            <h3 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors">
              {shoe.name}
            </h3>
          </Link>
        </div>
        
        <div className="flex items-center mb-2 text-sm text-gray-600">
          <Eye className="w-4 h-4 mr-1" />
          <span>{shoe.views} views</span>
        </div>
        
        <div className="flex items-center mb-3">
          <span className="text-sm text-gray-600 mr-2">Sizes:</span>
          <div className="flex space-x-1">
            {shoe.sizes.slice(0, 3).map((size) => (
              <span key={size} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {size}
              </span>
            ))}
            {shoe.sizes.length > 3 && (
              <span className="text-xs text-gray-500">+{shoe.sizes.length - 3}</span>
            )}
          </div>
        </div>

        <div className="flex items-center mb-3">
          <span className="text-sm text-gray-600 mr-2">Colors:</span>
          <div className="flex space-x-1">
            {shoe.colors.slice(0, 3).map((color) => (
              <div
                key={color}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
            {shoe.colors.length > 3 && (
              <span className="text-xs text-gray-500">+{shoe.colors.length - 3}</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">${shoe.price}</span>
            {isOnSale && (
              <span className="text-sm text-gray-500 line-through">${shoe.originalPrice}</span>
            )}
          </div>
          <Link
            to={`/product/${shoe.id}`}
            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Sold by <span className="font-medium">{shoe.sellerName}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ShoeCard