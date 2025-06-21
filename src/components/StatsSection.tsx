import React from 'react'
import { Store, Users, Package, TrendingUp } from 'lucide-react'

const StatsSection = () => {
  const stats = [
    {
      icon: Store,
      value: '2,500+',
      label: 'Active Sellers',
      description: 'Shoe businesses trust our platform'
    },
    {
      icon: Users,
      value: '50K+',
      label: 'Happy Customers',
      description: 'Satisfied buyers worldwide'
    },
    {
      icon: Package,
      value: '100K+',
      label: 'Shoes Listed',
      description: 'Wide variety of footwear'
    },
    {
      icon: TrendingUp,
      value: '95%',
      label: 'Success Rate',
      description: 'Sellers see increased sales'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Shoe Businesses Worldwide
          </h2>
          <p className="text-xl text-gray-600">
            Join a thriving community of successful shoe sellers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection