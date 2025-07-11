import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Star, ShoppingBag, ArrowRight } from 'lucide-react'

const FeaturedShoes = () => {
  const featuredShoes = [
    {
      id: 1,
      name: 'Classic White Sneakers',
      brand: 'Urban Steps',
      price: 89.99,
      originalPrice: 120.00,
      rating: 4.8,
      reviews: 124,
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
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
      isOnSale: false
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Shoes</h2>
          <p className="text-xl text-gray-600">Discover the latest and most popular shoes from our sellers</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredShoes.map((shoe) => (
            <div key={shoe.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden shoe-card">
              <div className="relative">
                <img
                  src={shoe.image}
                  alt={shoe.name}
                  className="w-full h-48 object-cover"
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
              
              <div className="p-4">
                <div className="mb-2">
                  <p className="text-sm text-gray-500">{shoe.brand}</p>
                  <h3 className="font-semibold text-gray-900 truncate">{shoe.name}</h3>
                </div>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{shoe.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({shoe.reviews})</span>
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

        <div className="text-center mt-12">
          <Link
            to="/marketplace"
            className="btn-primary inline-flex items-center px-8 py-3 text-lg"
          >
            View All Shoes
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedShoes