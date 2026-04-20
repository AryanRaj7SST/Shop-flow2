import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({}) // { productId: quantity }
  const [wishlist, setWishlist] = useState([])   // [productId, ...]
  const [allProducts, setAllProducts] = useState([]) // product cache

  // ── Cart ──────────────────────────────────────────
  const addToCart = useCallback((productId) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCartItems(prev => {
      const updated = { ...prev }
      if (updated[productId] > 1) {
        updated[productId] -= 1
      } else {
        delete updated[productId]
      }
      return updated
    })
  }, [])

  const deleteFromCart = useCallback((productId) => {
    setCartItems(prev => {
      const updated = { ...prev }
      delete updated[productId]
      return updated
    })
  }, [])

  const clearCart = useCallback(() => setCartItems({}), [])

  const cartCount = Object.values(cartItems).reduce((a, b) => a + b, 0)

  // Build cart array from cache
  const cartArray = Object.entries(cartItems).reduce((acc, [id, qty]) => {
    const product = allProducts.find(p => p.id === Number(id))
    if (product) acc.push({ ...product, quantity: qty })
    return acc
  }, [])

  const cartTotal = cartArray.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // ── Wishlist ──────────────────────────────────────
  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }, [])

  const isWishlisted = (productId) => wishlist.includes(productId)

  const wishlistProducts = allProducts.filter(p => wishlist.includes(p.id))

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartArray,
        cartTotal,
        cartCount,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCart,
        wishlist,
        wishlistProducts,
        toggleWishlist,
        isWishlisted,
        allProducts,
        setAllProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
