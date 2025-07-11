import { useState, useEffect } from 'react'
import { 
  collection, 
  query, 
  orderBy, 
  where, 
  getDocs, 
  doc, 
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { Shop } from '../types'
import toast from 'react-hot-toast'

export const useShops = () => {
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchShops = async (filters?: {
    category?: string
    isFeatured?: boolean
    ownerId?: string
    searchTerm?: string
  }) => {
    try {
      setLoading(true)
      let q = query(
        collection(db, 'shops'),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      )

      if (filters?.isFeatured) {
        q = query(q, where('isFeatured', '==', true))
      }

      if (filters?.ownerId) {
        q = query(q, where('ownerId', '==', filters.ownerId))
      }

      const querySnapshot = await getDocs(q)
      let fetchedShops = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Shop[]

      // Client-side filtering
      if (filters?.category && filters.category !== 'All') {
        fetchedShops = fetchedShops.filter(shop => 
          shop.categories.includes(filters.category!)
        )
      }

      if (filters?.searchTerm) {
        const term = filters.searchTerm.toLowerCase()
        fetchedShops = fetchedShops.filter(shop => 
          shop.name.toLowerCase().includes(term) ||
          shop.description.toLowerCase().includes(term) ||
          shop.categories.some(cat => cat.toLowerCase().includes(term))
        )
      }

      setShops(fetchedShops)
      setError(null)
    } catch (err: any) {
      setError(err.message)
      toast.error('Failed to fetch shops')
    } finally {
      setLoading(false)
    }
  }

  const getShopById = async (id: string): Promise<Shop | null> => {
    try {
      const docRef = doc(db, 'shops', id)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Shop
      }
      return null
    } catch (err: any) {
      toast.error('Failed to fetch shop details')
      return null
    }
  }

  const addShop = async (shopData: Omit<Shop, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'totalReviews'>) => {
    try {
      const docRef = await addDoc(collection(db, 'shops'), {
        ...shopData,
        createdAt: new Date(),
        updatedAt: new Date(),
        rating: 0,
        totalReviews: 0
      })
      toast.success('Shop created successfully!')
      return docRef.id
    } catch (err: any) {
      toast.error('Failed to create shop')
      throw err
    }
  }

  const updateShop = async (id: string, updates: Partial<Shop>) => {
    try {
      const docRef = doc(db, 'shops', id)
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date()
      })
      toast.success('Shop updated successfully!')
    } catch (err: any) {
      toast.error('Failed to update shop')
      throw err
    }
  }

  const deleteShop = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'shops', id))
      toast.success('Shop deleted successfully!')
    } catch (err: any) {
      toast.error('Failed to delete shop')
      throw err
    }
  }

  useEffect(() => {
    fetchShops()
  }, [])

  return {
    shops,
    loading,
    error,
    fetchShops,
    getShopById,
    addShop,
    updateShop,
    deleteShop
  }
}