import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Heart, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const navigate = useNavigate()
  const { cartCount, wishlist } = useCart()
  const [search, setSearch] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`)
      setSearch('')
      setMobileOpen(false)
    }
  }

  return (
    <nav className="relative bg-white">
      <div className="mx-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">

          {/* Logo */}
          <Link to="/" className="relative text-4xl font-semibold text-slate-700">
            <span className="text-green-600">shop</span>flow
            <span className="text-green-600 text-5xl leading-0">.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
            <Link to="/" className="hover:text-slate-900 transition">Home</Link>
            <Link to="/products" className="hover:text-slate-900 transition">Shop</Link>
            <Link to="/wishlist" className="hover:text-slate-900 transition">Wishlist</Link>

            <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full">
              <Search size={18} className="text-slate-600" />
              <input
                className="w-full bg-transparent outline-none placeholder-slate-600"
                type="text"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            {/* Wishlist Icon */}
            <Link to="/wishlist" className="relative flex items-center gap-1 text-slate-600 hover:text-slate-900 transition">
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 left-3 text-[8px] text-white bg-rose-500 size-3.5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative flex items-center gap-2 text-slate-600 hover:text-slate-900 transition">
              <ShoppingCart size={18} />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="sm:hidden text-slate-600" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="sm:hidden pb-4 flex flex-col gap-3 text-slate-600">
            <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setMobileOpen(false)}>Shop</Link>
            <Link to="/wishlist" onClick={() => setMobileOpen(false)}>Wishlist ({wishlist.length})</Link>
            <Link to="/cart" onClick={() => setMobileOpen(false)}>Cart ({cartCount})</Link>
            <form onSubmit={handleSearch} className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full text-sm">
              <Search size={16} />
              <input
                className="w-full bg-transparent outline-none placeholder-slate-600"
                type="text"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
        )}
      </div>
      <hr className="border-gray-300" />
    </nav>
  )
}
