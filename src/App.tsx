import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MarketplacePage from './pages/MarketplacePage'
import SellerDashboard from './pages/SellerDashboard'
import ProductPage from './pages/ProductPage'
import AuthPage from './pages/AuthPage'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App