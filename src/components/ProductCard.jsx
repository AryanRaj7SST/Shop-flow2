import { Star, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart()
  const rating = Math.round(product.rating?.rate || 0)
  const wishlisted = isWishlisted(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product.id)
    toast.success('Added to cart!')
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    toggleWishlist(product.id)
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!')
  }

  return (
    <Link to={`/products/${product.id}`} className="group max-xl:mx-auto relative">
      {/* Wishlist button */}
      <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white transition"
      >
        <Heart
          size={16}
          className={wishlisted ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}
        />
      </button>

      {/* Image box */}
      <div className="bg-[#F5F5F5] h-40 sm:w-60 sm:h-68 rounded-lg flex items-center justify-center overflow-hidden">
        <img
          className="max-h-30 sm:max-h-44 w-auto object-contain group-hover:scale-110 transition duration-300 p-4"
          src={product.image}
          alt={product.title}
        />
      </div>

      {/* Info */}
      <div className="flex justify-between gap-3 text-sm text-slate-800 pt-2 sm:max-w-60">
        <div className="flex-1 min-w-0">
          <p className="truncate">{product.title}</p>
          <div className="flex mt-0.5">
            {Array(5).fill('').map((_, i) => (
              <Star
                key={i}
                size={13}
                className="text-transparent mt-0.5"
                fill={rating > i ? '#00C950' : '#D1D5DB'}
              />
            ))}
            <span className="text-xs text-slate-400 ml-1">({product.rating?.count})</span>
          </div>
          <p className="text-xs text-slate-400 capitalize mt-0.5">{product.category}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-medium">${product.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Add to cart - appears on hover */}
      <button
        onClick={handleAddToCart}
        className="mt-2 w-full sm:max-w-60 text-xs py-2 bg-slate-800 text-white rounded hover:bg-slate-900 active:scale-95 transition opacity-0 group-hover:opacity-100"
      >
        Add to Cart
      </button>
    </Link>
  )
}
