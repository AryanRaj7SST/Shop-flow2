import { useCart } from '../context/CartContext'
import Title from './Title'
import ProductCard from './ProductCard'
import Loading from './Loading'

export default function BestSelling() {
  const { allProducts } = useCart()
  const displayQty = 8

  if (!allProducts.length) return <Loading text="Loading products..." />

  const sorted = [...allProducts]
    .sort((a, b) => b.rating.count - a.rating.count)
    .slice(0, displayQty)

  return (
    <div className="px-6 my-30 max-w-6xl mx-auto">
      <Title
        title="Best Selling"
        description={`Showing ${sorted.length} of ${allProducts.length} products`}
        href="/products"
      />
      <div className="mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
