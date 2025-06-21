import React, { useState } from 'react'
import { Plus, Package, TrendingUp, Users, DollarSign, Eye, Edit, Trash2, BarChart3 } from 'lucide-react'

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')

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

  const products = [
    {
      id: 1,
      name: 'Classic White Sneakers',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=200',
      price: 89.99,
      stock: 15,
      sales: 24,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Elegant Black Heels',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=200',
      price: 159.99,
      stock: 8,
      sales: 12,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Casual Brown Boots',
      image: 'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=200',
      price: 129.99,
      stock: 0,
      sales: 18,
      status: 'Out of Stock'
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
                      {products.slice(0, 3).map((product) => (
                        <div key={product.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-600">{product.sales} sales • ${product.price}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">${(product.sales * product.price).toFixed(2)}</p>
                            <p className="text-xs text-gray-500">Revenue</p>
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
                  <button className="btn-primary flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Product
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Product</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Price</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Stock</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Sales</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-gray-100">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <span className="font-medium text-gray-900">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-900">${product.price}</td>
                          <td className="py-4 px-4">
                            <span className={`${product.stock === 0 ? 'text-red-600' : 'text-gray-900'}`}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-900">{product.sales}</td>
                          <td className="py-4 px-4">
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                              product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-gray-600 hover:text-primary-600">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-600 hover:text-primary-600">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-600 hover:text-red-600">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
    </div>
  )
}

export default SellerDashboard