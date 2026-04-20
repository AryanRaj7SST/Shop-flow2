import { useState, useEffect, useMemo } from 'react'
import { getProducts, getCategories } from '../services/api'
import { useCart } from '../context/CartContext'
import { useDebounce } from './useDebounce'

export function useProducts() {
  const { setAllProducts } = useCart()
  const [products,   setProducts]   = useState([])
  const [categories, setCategories] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)

  // Filter / sort state
  const [search,           setSearch]           = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange,       setPriceRange]       = useState('all')
  const [sortBy,           setSortBy]           = useState('default')

  const debouncedSearch = useDebounce(search, 400)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true)
        const [prodRes, catRes] = await Promise.all([getProducts(), getCategories()])
        setProducts(prodRes.data)
        setAllProducts(prodRes.data)
        // catRes.data is already a plain array of strings from our server
        setCategories(['all', ...catRes.data])
      } catch (err) {
        setError('Failed to load products. Make sure the API server is running (node server.js).')
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const PRICE_RANGES = {
    all:      [0,    Infinity],
    '0-100':  [0,    100],
    '100-500':[100,  500],
    '500-1000':[500, 1000],
    '1000+':  [1000, Infinity],
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (debouncedSearch) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }

    const [min, max] = PRICE_RANGES[priceRange] || [0, Infinity]
    result = result.filter(p => p.price >= min && p.price <= max)

    if      (sortBy === 'price-asc')  result.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price)
    else if (sortBy === 'rating')     result.sort((a, b) => b.rating.rate - a.rating.rate)
    else if (sortBy === 'newest')     result.sort((a, b) => b.id - a.id)

    return result
  }, [products, debouncedSearch, selectedCategory, priceRange, sortBy])

  return {
    products,
    filteredProducts,
    categories,
    loading,
    error,
    search,           setSearch,
    selectedCategory, setSelectedCategory,
    priceRange,       setPriceRange,
    sortBy,           setSortBy,
  }
}
