import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Star, Heart, ShoppingCart, Truck, CreditCard, ShieldCheck,
  ChevronRight, Tag
} from 'lucide-react'
import MainLayout from '../layout/MainLayout'
import Counter from '../components/Counter'
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
import { getProductById } from '../services/api'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { cartItems, addToCart, toggleWishlist, isWishlisted, allProducts } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('Description')

  const inCart = cartItems[Number(id)]
  const wishlisted = isWishlisted(Number(id))

  useEffect(() => {
    setLoading(true)
    setTab('Description')
    window.scrollTo(0, 0)
    getProductById(id)
      .then(res => setProduct(res.data))
      .catch(() => toast.error('Failed to load product'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <MainLayout><Loading text="Loading product…" /></MainLayout>
  if (!product) return (
    <MainLayout>
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400 text-xl">
        Product not found.
      </div>
    </MainLayout>
  )

  const rating = Math.round(product.rating?.rate || 0)
  const mrp = (product.price * 1.25).toFixed(2)
  const discount = Math.round(((mrp - product.price) / mrp) * 100)

  // Related products - same category, exclude current
  const related = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product.id)
    toast.success('Added to cart!')
  }

  const handleWishlist = () => {
    toggleWishlist(product.id)
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!')
  }

  return (
    <MainLayout>
      <div className="mx-6">
        <div className="max-w-7xl mx-auto">

          {/* Breadcrumb */}
          <nav className="text-gray-500 text-sm mt-8 mb-5 flex items-center gap-1 flex-wrap">
            <Link to="/" className="hover:text-green-600 transition">Home</Link>
            <ChevronRight size={14} />
            <Link to="/products" className="hover:text-green-600 transition">Products</Link>
            <ChevronRight size={14} />
            <span className="capitalize text-slate-600">{product.category}</span>
          </nav>

          {/* Main product section */}
          <div className="flex max-lg:flex-col gap-12">

            {/* Image - single image from FakeStore, displayed large */}
            <div className="flex gap-3 max-sm:flex-col-reverse">
              {/* Thumbnail strip (same image repeated for visual) */}
              <div className="flex sm:flex-col gap-3">
                {[product.image].map((img, i) => (
                  <div
                    key={i}
                    className="bg-slate-100 flex items-center justify-center size-20 rounded-lg cursor-pointer ring-2 ring-green-400"
                  >
                    <img src={img} className="max-h-14 w-auto object-contain" alt="" />
                  </div>
                ))}
              </div>

              {/* Main image */}
              <div className="flex justify-center items-center h-80 sm:size-96 bg-slate-100 rounded-lg p-6">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full w-auto object-contain"
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1">
              <p className="text-xs text-slate-400 capitalize mb-2 border border-slate-200 inline-block px-3 py-1 rounded-full">
                {product.category}
              </p>
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 leading-snug">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center mt-3 gap-2">
                <div className="flex">
                  {Array(5).fill('').map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-transparent"
                      fill={rating > i ? '#00C950' : '#D1D5DB'}
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-500">
                  {product.rating?.rate} ({product.rating?.count} reviews)
                </p>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 my-6">
                <p className="text-3xl font-semibold text-slate-800">${product.price.toFixed(2)}</p>
                <p className="text-lg text-slate-400 line-through">${mrp}</p>
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <Tag size={14} /> Save {discount}%
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 flex-wrap mt-6">
                {inCart ? (
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-slate-600 font-medium">Quantity</p>
                    <Counter productId={product.id} />
                  </div>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center gap-2 bg-slate-800 text-white px-8 py-3 rounded hover:bg-slate-900 active:scale-95 transition text-sm font-medium"
                  >
                    <ShoppingCart size={16} /> Add to Cart
                  </button>
                )}

                <button
                  onClick={handleWishlist}
                  className={`flex items-center gap-2 px-6 py-3 rounded border text-sm font-medium active:scale-95 transition ${
                    wishlisted
                      ? 'bg-rose-50 border-rose-300 text-rose-600'
                      : 'border-slate-300 text-slate-600 hover:border-slate-400'
                  }`}
                >
                  <Heart size={16} className={wishlisted ? 'fill-rose-500 text-rose-500' : ''} />
                  {wishlisted ? 'Wishlisted' : 'Wishlist'}
                </button>

                {inCart && (
                  <Link
                    to="/cart"
                    className="px-6 py-3 rounded border border-green-500 text-green-600 text-sm font-medium hover:bg-green-50 transition"
                  >
                    View Cart →
                  </Link>
                )}
              </div>

              <hr className="border-gray-200 my-6" />

              {/* Trust badges */}
              <div className="flex flex-col gap-3 text-slate-500 text-sm">
                <p className="flex items-center gap-3"><Truck size={16} className="text-slate-400" /> Free shipping on orders above $50</p>
                <p className="flex items-center gap-3"><CreditCard size={16} className="text-slate-400" /> 100% Secured Payment</p>
                <p className="flex items-center gap-3"><ShieldCheck size={16} className="text-slate-400" /> Quality Guaranteed</p>
              </div>
            </div>
          </div>

          {/* Description / Reviews tabs */}
          <div className="my-16 text-sm text-slate-600">
            <div className="flex border-b border-slate-200 mb-6 max-w-2xl">
              {['Description', 'Reviews'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2.5 font-medium transition ${
                    tab === t
                      ? 'border-b-2 border-slate-800 text-slate-800'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === 'Description' && (
              <p className="max-w-2xl leading-relaxed text-slate-600">{product.description}</p>
            )}

            {tab === 'Reviews' && (
              <div className="max-w-2xl space-y-8">
                <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-xl">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-slate-800">{product.rating?.rate}</p>
                    <div className="flex mt-1">
                      {Array(5).fill('').map((_, i) => (
                        <Star key={i} size={14} fill={rating > i ? '#00C950' : '#D1D5DB'} className="text-transparent" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{product.rating?.count} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct = star === Math.round(product.rating?.rate) ? 70 : Math.max(5, Math.random() * 20)
                      return (
                        <div key={star} className="flex items-center gap-2 text-xs">
                          <span className="w-4 text-slate-500">{star}</span>
                          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <p className="text-slate-400 text-sm">
                  Based on {product.rating?.count} verified purchases. Detailed reviews are available on the retailer's website.
                </p>
              </div>
            )}
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="mb-20">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Related Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {related.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}

        </div>
      </div>
    </MainLayout>
  )
}
