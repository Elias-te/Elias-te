import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MarketplacePage from './pages/MarketplacePage'
import SellerDashboard from './pages/SellerDashboard'
import ProductPage from './pages/ProductPage'
import AuthPage from './pages/AuthPage'
import ShopsPage from './pages/ShopsPage'
import AdminPanel from './components/AdminPanel'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/shops" element={<ShopsPage />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  )
}

export default App