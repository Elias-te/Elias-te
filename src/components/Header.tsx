import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, ShoppingBag, User, Menu, X, Heart } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SC</span>
            </div>
            <span className="text-xl font-bold text-gray-900">SoleConnect</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for shoes, brands, styles..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/marketplace"
              className={`text-sm font-medium transition-colors ${
                isActive('/marketplace') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Marketplace
            </Link>
            <Link
              to="/seller-dashboard"
              className={`text-sm font-medium transition-colors ${
                isActive('/seller-dashboard') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Sell Shoes
            </Link>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                <ShoppingBag className="w-5 h-5" />
              </button>
              <Link
                to="/auth"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">Sign In</span>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search shoes..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                <Link
                  to="/marketplace"
                  className="block py-2 text-gray-700 hover:text-primary-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Marketplace
                </Link>
                <Link
                  to="/seller-dashboard"
                  className="block py-2 text-gray-700 hover:text-primary-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sell Shoes
                </Link>
                <Link
                  to="/auth"
                  className="block py-2 text-gray-700 hover:text-primary-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header