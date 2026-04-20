import { useCart } from '../context/CartContext'
import Title from './Title'
import ProductCard from './ProductCard'
import Loading from './Loading'

export default function LatestProducts() {
  const { allProducts } = useCart()
  const displayQty = 4

  if (!allProducts.length) return <Loading text="Loading products..." />

  // FakeStore doesn't have createdAt, use reverse id order as "newest"
  const newest = [...allProducts]
    .sort((a, b) => b.id - a.id)
    .slice(0, displayQty)

  return (
    <div className="px-6 my-30 max-w-6xl mx-auto">
      <Title
        title="Latest Products"
        description={`Showing ${newest.length} of ${allProducts.length} products`}
        href="/products"
      />
      <div className="mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 justify-between">
        {newest.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
