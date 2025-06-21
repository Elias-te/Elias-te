import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SC</span>
              </div>
              <span className="text-xl font-bold">SoleConnect</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              The premier marketplace for shoe businesses to showcase and sell their footwear online. 
              Connect with customers who love quality shoes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* For Sellers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Sellers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/seller-dashboard" className="text-gray-300 hover:text-white transition-colors">Start Selling</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Seller Resources</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Marketing Tools</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Analytics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          {/* For Buyers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Buyers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/marketplace" className="text-gray-300 hover:text-white transition-colors">Browse Shoes</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Return Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Customer Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Track Order</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">support@soleconnect.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 SoleConnect. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer