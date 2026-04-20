import { Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import ProductCard from '../components/ProductCard'
import PageTitle from '../components/PageTitle'
import { useCart } from '../context/CartContext'

export default function Wishlist() {
  const { wishlistProducts } = useCart()

  if (wishlistProducts.length === 0) {
    return (
      <MainLayout>
        <div className="min-h-[80vh] mx-6 flex flex-col items-center justify-center gap-5 text-slate-400">
          <Heart size={72} strokeWidth={1} />
          <h1 className="text-2xl sm:text-4xl font-semibold">Your wishlist is empty</h1>
          <p className="text-sm">Save items you love by clicking the heart icon on any product.</p>
          <Link
            to="/products"
            className="bg-slate-800 text-white px-8 py-3 rounded hover:bg-slate-900 active:scale-95 transition text-sm"
          >
            Explore Products
          </Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="min-h-screen mx-6">
        <div className="max-w-7xl mx-auto mb-20">
          <PageTitle
            heading="My Wishlist"
            text={`${wishlistProducts.length} saved item${wishlistProducts.length !== 1 ? 's' : ''}`}
            path="/products"
            linkText="Continue shopping"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-10">
            {wishlistProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
