import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Store, TrendingUp, Users, Shield, Zap, Globe } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import FeaturedShoes from '../components/FeaturedShoes'
import StatsSection from '../components/StatsSection'

const HomePage = () => {
  const features = [
    {
      icon: Store,
      title: 'Easy Store Setup',
      description: 'Create your professional shoe store in minutes with our intuitive setup process.'
    },
    {
      icon: TrendingUp,
      title: 'Boost Sales',
      description: 'Advanced marketing tools and analytics to help grow your shoe business online.'
    },
    {
      icon: Users,
      title: 'Connect with Customers',
      description: 'Direct messaging and engagement tools to build lasting customer relationships.'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Safe and secure payment processing with multiple payment options for customers.'
    },
    {
      icon: Zap,
      title: 'Fast Performance',
      description: 'Lightning-fast platform ensures your customers have the best shopping experience.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Reach customers worldwide with our international shipping and currency support.'
    }
  ]

  return (
    <div className="space-y-16">
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Sell Shoes Online
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SoleConnect provides all the tools and features shoe businesses need to succeed in the digital marketplace.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsSection />
      <FeaturedShoes />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-accent-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Selling Your Shoes?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of shoe businesses already growing their sales on SoleConnect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/seller-dashboard"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
            >
              Start Selling Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/marketplace"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
            >
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage