import { useState, useEffect } from 'react'
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  where, 
  getDocs, 
  doc, 
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  increment
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { Shoe } from '../types'
import toast from 'react-hot-toast'

export const useShoes = () => {
  const [shoes, setShoes] = useState<Shoe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchShoes = async (filters?: {
    category?: string
    priceRange?: [number, number]
    condition?: string
    sellerId?: string
    searchTerm?: string
  }) => {
    try {
      setLoading(true)
      let q = query(
        collection(db, 'shoes'),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      )

      if (filters?.category && filters.category !== 'All') {
        q = query(q, where('category', '==', filters.category))
      }

      if (filters?.condition && filters.condition !== 'All') {
        q = query(q, where('condition', '==', filters.condition))
      }

      if (filters?.sellerId) {
        q = query(q, where('sellerId', '==', filters.sellerId))
      }

      const querySnapshot = await getDocs(q)
      let fetchedShoes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Shoe[]

      // Client-side filtering for price range and search term
      if (filters?.priceRange) {
        const [min, max] = filters.priceRange
        fetchedShoes = fetchedShoes.filter(shoe => shoe.price >= min && shoe.price <= max)
      }

      if (filters?.searchTerm) {
        const term = filters.searchTerm.toLowerCase()
        fetchedShoes = fetchedShoes.filter(shoe => 
          shoe.name.toLowerCase().includes(term) ||
          shoe.brand.toLowerCase().includes(term) ||
          shoe.description.toLowerCase().includes(term) ||
          shoe.tags.some(tag => tag.toLowerCase().includes(term))
        )
      }

      setShoes(fetchedShoes)
      setError(null)
    } catch (err: any) {
      setError(err.message)
      toast.error('Failed to fetch shoes')
    } finally {
      setLoading(false)
    }
  }

  const getShoeById = async (id: string): Promise<Shoe | null> => {
    try {
      const docRef = doc(db, 'shoes', id)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        // Increment view count
        await updateDoc(docRef, {
          views: increment(1)
        })
        
        return { id: docSnap.id, ...docSnap.data() } as Shoe
      }
      return null
    } catch (err: any) {
      toast.error('Failed to fetch shoe details')
      return null
    }
  }

  const addShoe = async (shoeData: Omit<Shoe, 'id' | 'createdAt' | 'updatedAt' | 'views'>) => {
    try {
      const docRef = await addDoc(collection(db, 'shoes'), {
        ...shoeData,
        createdAt: new Date(),
        updatedAt: new Date(),
        views: 0
      })
      toast.success('Shoe listed successfully!')
      return docRef.id
    } catch (err: any) {
      toast.error('Failed to add shoe')
      throw err
    }
  }

  const updateShoe = async (id: string, updates: Partial<Shoe>) => {
    try {
      const docRef = doc(db, 'shoes', id)
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date()
      })
      toast.success('Shoe updated successfully!')
    } catch (err: any) {
      toast.error('Failed to update shoe')
      throw err
    }
  }

  const deleteShoe = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'shoes', id))
      toast.success('Shoe deleted successfully!')
    } catch (err: any) {
      toast.error('Failed to delete shoe')
      throw err
    }
  }

  useEffect(() => {
    fetchShoes()
  }, [])

  return {
    shoes,
    loading,
    error,
    fetchShoes,
    getShoeById,
    addShoe,
    updateShoe,
    deleteShoe
  }
}