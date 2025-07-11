import React, { useState } from 'react'
import { X, Upload, Plus, Minus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { useShoes } from '../hooks/useShoes'
import { Shoe } from '../types'

interface AddShoeModalProps {
  isOpen: boolean
  onClose: () => void
  shoe?: Shoe
}

interface ShoeFormData {
  name: string
  description: string
  price: number
  originalPrice?: number
  brand: string
  category: string
  condition: 'new' | 'used' | 'refurbished'
  sizes: string[]
  colors: string[]
  images: string[]
  tags: string[]
}

const AddShoeModal: React.FC<AddShoeModalProps> = ({ isOpen, onClose, shoe }) => {
  const { userProfile } = useAuth()
  const { addShoe, updateShoe } = useShoes()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [newSize, setNewSize] = useState('')
  const [newColor, setNewColor] = useState('')
  const [newTag, setNewTag] = useState('')

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<ShoeFormData>({
    defaultValues: shoe ? {
      name: shoe.name,
      description: shoe.description,
      price: shoe.price,
      originalPrice: shoe.originalPrice,
      brand: shoe.brand,
      category: shoe.category,
      condition: shoe.condition,
      sizes: shoe.sizes,
      colors: shoe.colors,
      images: shoe.images,
      tags: shoe.tags
    } : {
      sizes: [],
      colors: [],
      images: [],
      tags: []
    }
  })

  const watchedFields = watch()

  const categories = [
    'Sneakers', 'Boots', 'Heels', 'Flats', 'Sandals', 'Athletic', 
    'Formal', 'Casual', 'Loafers', 'Oxfords', 'Wedges', 'Pumps'
  ]

  const addToArray = (field: keyof Pick<ShoeFormData, 'sizes' | 'colors' | 'images' | 'tags'>, value: string) => {
    const currentArray = watchedFields[field] || []
    if (value && !currentArray.includes(value)) {
      setValue(field, [...currentArray, value])
    }
  }

  const removeFromArray = (field: keyof Pick<ShoeFormData, 'sizes' | 'colors' | 'images' | 'tags'>, index: number) => {
    const currentArray = watchedFields[field] || []
    setValue(field, currentArray.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: ShoeFormData) => {
    if (!userProfile) return

    try {
      setLoading(true)
      
      const shoeData = {
        ...data,
        sellerId: userProfile.uid,
        sellerName: `${userProfile.firstName} ${userProfile.lastName}`,
        isActive: true
      }

      if (shoe) {
        await updateShoe(shoe.id, shoeData)
      } else {
        await addShoe(shoeData)
      }

      reset()
      onClose()
    } catch (error) {
      console.error('Error saving shoe:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {shoe ? 'Edit Shoe' : 'Add New Shoe'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shoe Name *
              </label>
              <input
                {...register('name', { required: 'Shoe name is required' })}
                className="input-field"
                placeholder="Classic White Sneakers"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand *
              </label>
              <input
                {...register('brand', { required: 'Brand is required' })}
                className="input-field"
                placeholder="Nike, Adidas, etc."
              />
              {errors.brand && (
                <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className="input-field h-24"
              placeholder="Describe your shoes in detail..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Category and Condition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="input-field"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition *
              </label>
              <select
                {...register('condition', { required: 'Condition is required' })}
                className="input-field"
              >
                <option value="">Select condition</option>
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="refurbished">Refurbished</option>
              </select>
              {errors.condition && (
                <p className="text-red-500 text-sm mt-1">{errors.condition.message}</p>
              )}
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                {...register('price', { 
                  required: 'Price is required',
                  min: { value: 0.01, message: 'Price must be greater than 0' }
                })}
                className="input-field"
                placeholder="89.99"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('originalPrice')}
                className="input-field"
                placeholder="120.00"
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="input-field flex-1"
                placeholder="Enter image URL"
              />
              <button
                type="button"
                onClick={() => {
                  addToArray('images', imageUrl)
                  setImageUrl('')
                }}
                className="btn-primary px-4"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {watchedFields.images?.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Shoe ${index + 1}`}
                    className="w-full h-20 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => removeFromArray('images', index)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Sizes
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                className="input-field flex-1"
                placeholder="e.g., 8, 8.5, 9"
              />
              <button
                type="button"
                onClick={() => {
                  addToArray('sizes', newSize)
                  setNewSize('')
                }}
                className="btn-primary px-4"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {watchedFields.sizes?.map((size, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {size}
                  <button
                    type="button"
                    onClick={() => removeFromArray('sizes', index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Colors
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="input-field flex-1"
                placeholder="e.g., White, Black, Red"
              />
              <button
                type="button"
                onClick={() => {
                  addToArray('colors', newColor)
                  setNewColor('')
                }}
                className="btn-primary px-4"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {watchedFields.colors?.map((color, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {color}
                  <button
                    type="button"
                    onClick={() => removeFromArray('colors', index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="input-field flex-1"
                placeholder="e.g., comfortable, waterproof, vintage"
              />
              <button
                type="button"
                onClick={() => {
                  addToArray('tags', newTag)
                  setNewTag('')
                }}
                className="btn-primary px-4"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {watchedFields.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeFromArray('tags', index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : shoe ? 'Update Shoe' : 'Add Shoe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddShoeModal