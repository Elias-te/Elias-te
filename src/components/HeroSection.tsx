import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Your Shoes,
              <br />
              <span className="text-accent-300">Our Platform</span>
            </h1>
            <p className="text-xl lg:text-2xl text-primary-100 leading-relaxed">
              The premier marketplace designed exclusively for shoe businesses. 
              Showcase your footwear, connect with customers, and grow your sales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/seller-dashboard"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center text-lg"
              >
                Start Selling Today
                <ArrowRight className="ml-2 w-6 h-6" />
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200 flex items-center justify-center text-lg">
                <Play className="mr-2 w-6 h-6" />
                Watch Demo
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Stylish sneakers"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <img
                  src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Elegant heels"
                  className="w-full h-32 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img
                  src="https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Casual boots"
                  className="w-full h-32 object-cover rounded-lg shadow-lg"
                />
                <img
                  src="https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Running shoes"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-400 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-300 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection