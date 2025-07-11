import React, { useState } from 'react'
import { Plus, Package, TrendingUp, Users, DollarSign, Eye, Edit, Trash2, BarChart3 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useShoes } from '../hooks/useShoes'
import AddShoeModal from '../components/AddShoeModal'
import ShoeCard from '../components/ShoeCard'

const SellerDashboard = () => {
  const { userProfile } = useAuth()
  const { shoes, loading, fetchShoes, deleteShoe } = useShoes()
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingShoe, setEditingShoe] = useState(null)

  React.useEffect(() => {
    if (userProfile) {
      fetchShoes({ sellerId: userProfile.uid })
    }
  }, [userProfile])

  const stats = [
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: '$12,450',
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      icon: Package,
      label: 'Products Listed',
      value: '24',
      change: '+3',
      changeType: 'positive'
    },
    {
      icon: Users,
      label: 'Total Customers',
      value: '156',
      change: '+8.2%',
      changeType: 'positive'
    },
    {
      icon: TrendingUp,
      label: 'Conversion Rate',
      value: '3.2%',
      change: '+0.5%',
      changeType: 'positive'
    }
  ]

  const recentOrders = [
    {
      id: '#ORD-001',
      customer: 'Sarah Johnson',
      product: 'Classic White Sneakers',
      amount: '$89.99',
      status: 'Shipped',
      date: '2025-01-15'
    },
    {
      id: '#ORD-002',
      customer: 'Mike Chen',
      product: 'Elegant Black Heels',
      amount: '$159.99',
      status: 'Processing',
      date: '2025-01-14'
    },
    {
      id: '#ORD-003',
      customer: 'Emma Davis',
      product: 'Casual Brown Boots',
      amount: '$129.99',
      status: 'Delivered',
      date: '2025-01-13'
    }
  ]

  const handleDeleteShoe = async (shoeId: string) => {
    if (window.confirm('Are you sure you want to delete this shoe?')) {
      try {
        await deleteShoe(shoeId)
        fetchShoes({ sellerId: userProfile?.uid })
      } catch (error) {
        console.error('Error deleting shoe:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
          <p className="text-gray-600">Manage your shoe business and track performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'products', label: 'Products' },
                { id: 'orders', label: 'Orders' },
                { id: 'analytics', label: 'Analytics' },
                { id: 'settings', label: 'Settings' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Orders */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
                    <div className="space-y-3">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.customer} • {order.product}</p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{order.amount}</p>
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Products */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h3>
                    <div className="space-y-3">
                      {shoes.slice(0, 3).map((shoe) => (
                        <div key={shoe.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <img
                            src={shoe.images[0] || 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=200'}
                            alt={shoe.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{shoe.name}</p>
                            <p className="text-sm text-gray-600">{shoe.views} views • ${shoe.price}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">${shoe.price}</p>
                            <p className="text-xs text-gray-500">Price</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Your Products</h3>
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="btn-primary flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Product
                  </button>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-white rounded-xl shadow-sm animate-pulse">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-4 space-y-3">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : shoes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {shoes.map((shoe) => (
                      <div key={shoe.id} className="relative">
                        <ShoeCard shoe={shoe} />
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <button
                            onClick={() => setEditingShoe(shoe)}
                            className="p-1 bg-white rounded-full shadow-md text-gray-600 hover:text-primary-600"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteShoe(shoe.id)}
                            className="p-1 bg-white rounded-full shadow-md text-gray-600 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No shoes listed yet</h3>
                    <p className="text-gray-600 mb-4">Start by adding your first shoe to the marketplace.</p>
                    <button 
                      onClick={() => setShowAddModal(true)}
                      className="btn-primary"
                    >
                      Add Your First Shoe
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Management</h3>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{order.id}</h4>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <span className={`px-3 py-1 text-sm rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Customer</p>
                          <p className="font-medium text-gray-900">{order.customer}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Product</p>
                          <p className="font-medium text-gray-900">{order.product}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Amount</p>
                          <p className="font-medium text-gray-900">{order.amount}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Analytics & Insights</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <BarChart3 className="w-5 h-5 text-primary-600 mr-2" />
                      <h4 className="font-semibold text-gray-900">Sales Performance</h4>
                    </div>
                    <p className="text-gray-600 mb-4">Your sales have increased by 25% this month compared to last month.</p>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">This Month</span>
                        <span className="font-medium">$4,250</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Last Month</span>
                        <span className="font-medium">$3,400</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Top Categories</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Sneakers</span>
                        <div className="flex items-center">
                          <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                            <div className="w-16 h-2 bg-primary-600 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">80%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Boots</span>
                        <div className="flex items-center">
                          <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                            <div className="w-12 h-2 bg-primary-600 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">60%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Heels</span>
                        <div className="flex items-center">
                          <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                            <div className="w-8 h-2 bg-primary-600 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">40%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Store Settings</h3>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Store Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                        <input type="text" className="input-field" placeholder="Your Store Name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                        <input type="email" className="input-field" placeholder="store@example.com" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Store Description</label>
                        <textarea className="input-field h-24" placeholder="Tell customers about your store..."></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Shipping Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input type="checkbox" className="text-primary-600 focus:ring-primary-500" />
                        <label className="ml-2 text-sm text-gray-700">Offer free shipping on orders over $100</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="text-primary-600 focus:ring-primary-500" />
                        <label className="ml-2 text-sm text-gray-700">Enable local pickup</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="text-primary-600 focus:ring-primary-500" />
                        <label className="ml-2 text-sm text-gray-700">International shipping available</label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="btn-primary">Save Settings</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Shoe Modal */}
      <AddShoeModal
        isOpen={showAddModal || !!editingShoe}
        onClose={() => {
          setShowAddModal(false)
          setEditingShoe(null)
        }}
        shoe={editingShoe}
      />
    </div>
  )
}

export default SellerDashboard