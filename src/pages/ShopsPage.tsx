import React, { useState, useEffect } from 'react'
import { Search, Filter, MapPin, Star } from 'lucide-react'
import { useShops } from '../hooks/useShops'
import ShopCard from '../components/ShopCard'

const ShopsPage = () => {
  const { shops, loading, fetchShops } = useShops()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const categories = [
    'All', 'Sneakers', 'Boots', 'Heels', 'Athletic', 'Formal', 
    'Casual', 'Vintage', 'Luxury', 'Designer'
  ]

  useEffect(() => {
    fetchShops({
      category: selectedCategory,
      isFeatured: showFeaturedOnly || undefined,
      searchTerm: searchTerm || undefined
    })
  }, [selectedCategory, showFeaturedOnly, searchTerm])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchShops({
      category: selectedCategory,
      isFeatured: showFeaturedOnly || undefined,
      searchTerm: searchTerm || undefined
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop Directory</h1>
          <p className="text-gray-600">Discover amazing shoe shops and connect with sellers</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search shops by name, description, or category..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <button
                type="submit"
                className="btn-primary px-6"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-wrap items-center gap-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Featured Filter */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showFeaturedOnly}
                onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                className="text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Featured shops only</span>
            </label>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {loading ? 'Loading...' : `${shops.length} shops found`}
          </p>
        </div>

        {/* Shops Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm animate-pulse">
                <div className="h-32 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : shops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map(shop => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No shops found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all shops.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShopsPage