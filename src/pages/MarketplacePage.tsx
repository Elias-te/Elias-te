import React, { useState } from 'react'
import { Filter, Grid, List, Star, Heart, ShoppingBag } from 'lucide-react'

const MarketplacePage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    brand: '',
    size: '',
    priceRange: '',
    color: ''
  })

  const shoes = [
    {
      id: 1,
      name: 'Classic White Sneakers',
      brand: 'Urban Steps',
      price: 89.99,
      originalPrice: 120.00,
      rating: 4.8,
      reviews: 124,
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Sneakers',
      sizes: ['7', '8', '9', '10', '11'],
      colors: ['White', 'Black'],
      isOnSale: true
    },
    {
      id: 2,
      name: 'Elegant Black Heels',
      brand: 'Luxe Fashion',
      price: 159.99,
      rating: 4.9,
      reviews: 89,
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Heels',
      sizes: ['6', '7', '8', '9'],
      colors: ['Black'],
      isOnSale: false
    },
    {
      id: 3,
      name: 'Casual Brown Boots',
      brand: 'Comfort Zone',
      price: 129.99,
      originalPrice: 160.00,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Boots',
      sizes: ['8', '9', '10', '11', '12'],
      colors: ['Brown', 'Black'],
      isOnSale: true
    },
    {
      id: 4,
      name: 'Performance Running Shoes',
      brand: 'Athletic Pro',
      price: 199.99,
      rating: 4.9,
      reviews: 203,
      image: 'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Athletic',
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['Blue', 'Red', 'Black'],
      isOnSale: false
    },
    {
      id: 5,
      name: 'Summer Sandals',
      brand: 'Beach Walk',
      price: 49.99,
      rating: 4.5,
      reviews: 67,
      image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Sandals',
      sizes: ['6', '7', '8', '9', '10'],
      colors: ['Tan', 'White', 'Black'],
      isOnSale: false
    },
    {
      id: 6,
      name: 'Formal Oxford Shoes',
      brand: 'Business Elite',
      price: 179.99,
      rating: 4.8,
      reviews: 92,
      image: 'https://images.pexels.com/photos/1240893/pexels-photo-1240893.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Formal',
      sizes: ['8', '9', '10', '11'],
      colors: ['Black', 'Brown'],
      isOnSale: false
    }
  ]

  const categories = ['All', 'Sneakers', 'Heels', 'Boots', 'Athletic', 'Sandals', 'Formal']
  const brands = ['All', 'Urban Steps', 'Luxe Fashion', 'Comfort Zone', 'Athletic Pro', 'Beach Walk', 'Business Elite']
  const sizes = ['6', '7', '8', '9', '10', '11', '12']
  const priceRanges = ['All', '$0-$50', '$50-$100', '$100-$150', '$150-$200', '$200+']

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shoe Marketplace</h1>
          <p className="text-gray-600">Discover amazing shoes from verified sellers</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Filter className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Filters</h3>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        className="text-primary-600 focus:ring-primary-500"
                        onChange={(e) => setSelectedFilters({...selectedFilters, category: e.target.value})}
                      />
                      <span className="ml-2 text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Brand</h4>
                <select
                  className="w-full input-field text-sm"
                  value={selectedFilters.brand}
                  onChange={(e) => setSelectedFilters({...selectedFilters, brand: e.target.value})}
                >
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Size</h4>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`p-2 text-sm border rounded ${
                        selectedFilters.size === size
                          ? 'border-primary-600 bg-primary-50 text-primary-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedFilters({...selectedFilters, size: size})}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range} className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        value={range}
                        className="text-primary-600 focus:ring-primary-500"
                        onChange={(e) => setSelectedFilters({...selectedFilters, priceRange: e.target.value})}
                      />
                      <span className="ml-2 text-sm text-gray-700">{range}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* View Controls */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">{shoes.length} shoes found</p>
              <div className="flex items-center space-x-4">
                <select className="input-field text-sm">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Best Rating</option>
                </select>
                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {shoes.map((shoe) => (
                <div key={shoe.id} className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden shoe-card ${
                  viewMode === 'list' ? 'flex' : ''
                }`}>
                  <div className={`relative ${viewMode === 'list' ? 'w-48' : ''}`}>
                    <img
                      src={shoe.image}
                      alt={shoe.name}
                      className={`object-cover ${
                        viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'
                      }`}
                    />
                    {shoe.isOnSale && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Sale
                      </div>
                    )}
                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="mb-2">
                      <p className="text-sm text-gray-500">{shoe.brand}</p>
                      <h3 className="font-semibold text-gray-900">{shoe.name}</h3>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{shoe.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({shoe.reviews})</span>
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
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">${shoe.price}</span>
                        {shoe.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${shoe.originalPrice}</span>
                        )}
                      </div>
                      <button className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketplacePage