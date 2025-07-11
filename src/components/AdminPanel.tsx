import React, { useState, useEffect } from 'react'
import { Trash2, Eye, User, Package, AlertTriangle, Shield } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useShoes } from '../hooks/useShoes'
import { useShops } from '../hooks/useShops'
import { Shoe, Shop } from '../types'
import toast from 'react-hot-toast'

const AdminPanel = () => {
  const { userProfile } = useAuth()
  const { shoes, loading: shoesLoading, fetchShoes, deleteShoe } = useShoes()
  const { shops, loading: shopsLoading, fetchShops, deleteShop } = useShops()
  const [activeTab, setActiveTab] = useState('shoes')
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  useEffect(() => {
    fetchShoes()
    fetchShops()
  }, [])

  if (!userProfile?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access the admin panel.</p>
        </div>
      </div>
    )
  }

  const handleDeleteShoe = async (shoeId: string) => {
    if (window.confirm('Are you sure you want to delete this shoe? This action cannot be undone.')) {
      try {
        await deleteShoe(shoeId)
        toast.success('Shoe deleted successfully')
        fetchShoes()
      } catch (error) {
        toast.error('Failed to delete shoe')
      }
    }
  }

  const handleDeleteShop = async (shopId: string) => {
    if (window.confirm('Are you sure you want to delete this shop? This action cannot be undone.')) {
      try {
        await deleteShop(shopId)
        toast.success('Shop deleted successfully')
        fetchShops()
      } catch (error) {
        toast.error('Failed to delete shop')
      }
    }
  }

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) {
      toast.error('Please select items to delete')
      return
    }

    if (window.confirm(`Are you sure you want to delete ${selectedItems.length} selected items? This action cannot be undone.`)) {
      try {
        const deletePromises = selectedItems.map(id => {
          if (activeTab === 'shoes') {
            return deleteShoe(id)
          } else {
            return deleteShop(id)
          }
        })
        
        await Promise.all(deletePromises)
        toast.success(`${selectedItems.length} items deleted successfully`)
        setSelectedItems([])
        
        if (activeTab === 'shoes') {
          fetchShoes()
        } else {
          fetchShops()
        }
      } catch (error) {
        toast.error('Failed to delete some items')
      }
    }
  }

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const selectAll = () => {
    if (activeTab === 'shoes') {
      setSelectedItems(shoes.map(shoe => shoe.id))
    } else {
      setSelectedItems(shops.map(shop => shop.id))
    }
  }

  const clearSelection = () => {
    setSelectedItems([])
  }

  const stats = {
    totalShoes: shoes.length,
    totalShops: shops.length,
    totalViews: shoes.reduce((sum, shoe) => sum + shoe.views, 0),
    activeListings: shoes.filter(shoe => shoe.isActive).length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Shield className="w-8 h-8 text-red-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <p className="text-gray-600">Manage all shoes, shops, and platform content</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Shoes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalShoes}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <User className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Shops</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalShops}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Eye className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeListings}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => {
                  setActiveTab('shoes')
                  setSelectedItems([])
                }}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'shoes'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Manage Shoes ({shoes.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab('shops')
                  setSelectedItems([])
                }}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'shops'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Manage Shops ({shops.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Bulk Actions */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={selectAll}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Select All
                </button>
                <button
                  onClick={clearSelection}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Clear Selection
                </button>
                {selectedItems.length > 0 && (
                  <span className="text-sm text-gray-600">
                    {selectedItems.length} selected
                  </span>
                )}
              </div>
              {selectedItems.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Selected ({selectedItems.length})
                </button>
              )}
            </div>

            {/* Shoes Tab */}
            {activeTab === 'shoes' && (
              <div>
                {shoesLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading shoes...</p>
                  </div>
                ) : shoes.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Select
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Shoe
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Seller
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Views
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {shoes.map((shoe) => (
                          <tr key={shoe.id} className={selectedItems.includes(shoe.id) ? 'bg-red-50' : ''}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(shoe.id)}
                                onChange={() => toggleSelectItem(shoe.id)}
                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img
                                  src={shoe.images[0] || 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=100'}
                                  alt={shoe.name}
                                  className="w-10 h-10 object-cover rounded-lg mr-3"
                                />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{shoe.name}</p>
                                  <p className="text-sm text-gray-500">{shoe.brand}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {shoe.sellerName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${shoe.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {shoe.views}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                shoe.isActive 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {shoe.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleDeleteShoe(shoe.id)}
                                className="text-red-600 hover:text-red-900 flex items-center"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No shoes found</p>
                  </div>
                )}
              </div>
            )}

            {/* Shops Tab */}
            {activeTab === 'shops' && (
              <div>
                {shopsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading shops...</p>
                  </div>
                ) : shops.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Select
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Shop
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Owner
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Featured
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {shops.map((shop) => (
                          <tr key={shop.id} className={selectedItems.includes(shop.id) ? 'bg-red-50' : ''}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(shop.id)}
                                onChange={() => toggleSelectItem(shop.id)}
                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {shop.logo ? (
                                  <img
                                    src={shop.logo}
                                    alt={shop.name}
                                    className="w-10 h-10 object-cover rounded-lg mr-3"
                                  />
                                ) : (
                                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                                    <span className="text-gray-500 font-semibold text-sm">
                                      {shop.name.charAt(0)}
                                    </span>
                                  </div>
                                )}
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{shop.name}</p>
                                  <p className="text-sm text-gray-500">{shop.categories.join(', ')}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {shop.ownerName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {shop.location ? `${shop.location.city}, ${shop.location.state}` : 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                shop.isFeatured 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {shop.isFeatured ? 'Featured' : 'Regular'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleDeleteShop(shop.id)}
                                className="text-red-600 hover:text-red-900 flex items-center"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No shops found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel