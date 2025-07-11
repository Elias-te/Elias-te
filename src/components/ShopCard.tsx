import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star, Phone, Globe, Heart } from 'lucide-react'
import { Shop } from '../types'

interface ShopCardProps {
  shop: Shop
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Banner/Logo */}
      <div className="relative h-32 bg-gradient-to-r from-primary-600 to-accent-500">
        {shop.banner && (
          <img
            src={shop.banner}
            alt={`${shop.name} banner`}
            className="w-full h-full object-cover"
          />
        )}
        {shop.isFeatured && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <div className="p-4">
        {/* Shop Logo */}
        <div className="flex items-start space-x-3 mb-3">
          {shop.logo ? (
            <img
              src={shop.logo}
              alt={`${shop.name} logo`}
              className="w-12 h-12 rounded-lg object-cover border-2 border-white shadow-sm"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-semibold text-lg">
                {shop.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="flex-1">
            <Link to={`/shop/${shop.id}`}>
              <h3 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                {shop.name}
              </h3>
            </Link>
            {shop.rating > 0 && (
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 ml-1">{shop.rating}</span>
                <span className="text-sm text-gray-500 ml-1">({shop.totalReviews})</span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {shop.description}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-1 mb-3">
          {shop.categories.slice(0, 3).map((category) => (
            <span
              key={category}
              className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
            >
              {category}
            </span>
          ))}
          {shop.categories.length > 3 && (
            <span className="text-xs text-gray-500">+{shop.categories.length - 3}</span>
          )}
        </div>

        {/* Location */}
        {shop.location && (
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{shop.location.city}, {shop.location.state}</span>
          </div>
        )}

        {/* Contact Info */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex space-x-2">
            {shop.phone && (
              <a
                href={`tel:${shop.phone}`}
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                title="Call"
              >
                <Phone className="w-4 h-4" />
              </a>
            )}
            {shop.website && (
              <a
                href={shop.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                title="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>
          <Link
            to={`/shop/${shop.id}`}
            className="btn-primary text-sm px-4 py-2"
          >
            View Shop
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ShopCard