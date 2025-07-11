import React, { useState } from 'react'
import { Filter, Grid, List, Star, Heart, ShoppingBag } from 'lucide-react'
import { useShoes } from '../hooks/useShoes'
import ShoeCard from '../components/ShoeCard'

const MarketplacePage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCondition, setSelectedCondition] = useState('All')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  
  const { shoes, loading, fetchShoes } = useShoes()

  React.useEffect(() => {
    fetchShoes({
      category: selectedCategory !== 'All' ? selectedCategory : undefined,
      condition: selectedCondition !== 'All' ? selectedCondition : undefined,
      priceRange: priceRange,
      searchTerm: searchTerm || undefined
    })
  }, [selectedCategory, selectedCondition, priceRange, searchTerm])

  const categories = ['All', 'Sneakers', 'Heels', 'Boots', 'Athletic', 'Sandals', 'Formal', 'Casual', 'Flats']
  const conditions = ['All', 'new', 'used', 'refurbished']
  const sizes = ['6', '7', '8', '9', '10', '11', '12']

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchShoes({
      category: selectedCategory !== 'All' ? selectedCategory : undefined,
      condition: selectedCondition !== 'All' ? selectedCondition : undefined,
      priceRange: priceRange,
      searchTerm: searchTerm || undefined
    })
  }

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

              {/* Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search shoes..."
                  className="w-full input-field text-sm mb-2"
                />
                <button type="submit" className="w-full btn-primary text-sm py-2">
                  Search
                </button>
              </form>

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
                        checked={selectedCategory === category}
                        className="text-primary-600 focus:ring-primary-500"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Condition Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Condition</h4>
                <div className="space-y-2">
                  {conditions.map((condition) => (
                    <label key={condition} className="flex items-center">
                      <input
                        type="radio"
                        name="condition"
                        value={condition}
                        checked={selectedCondition === condition}
                        className="text-primary-600 focus:ring-primary-500"
                        onChange={(e) => setSelectedCondition(e.target.value)}
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-20 input-field text-sm"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-20 input-field text-sm"
                      placeholder="Max"
                    />
                  </div>
                  <p className="text-xs text-gray-500">${priceRange[0]} - ${priceRange[1]}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* View Controls */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {loading ? 'Loading...' : `${shoes.length} shoes found`}
              </p>
              <div className="flex items-center space-x-4">
                <select className="input-field text-sm">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Most Views</option>
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
            {loading ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : shoes.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {shoes.map((shoe) => (
                  <ShoeCard key={shoe.id} shoe={shoe} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No shoes found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or browse all shoes.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketplacePage