import MainLayout from '../layout/MainLayout'
import Hero from '../components/Hero'
import LatestProducts from '../components/LatestProducts'
import BestSelling from '../components/BestSelling'
import OurSpec from '../components/OurSpec'
import Newsletter from '../components/Newsletter'
import { useEffect } from 'react'
import { getProducts, getCategories } from '../services/api'
import { useCart } from '../context/CartContext'

export default function Home() {
  const { allProducts, setAllProducts } = useCart()

  // Prefetch products if not already loaded
  useEffect(() => {
    if (allProducts.length === 0) {
      getProducts().then(res => setAllProducts(res.data)).catch(() => {})
    }
  }, [])

  return (
    <MainLayout>
      <Hero />
      <LatestProducts />
      <BestSelling />
      <OurSpec />
      <Newsletter />
    </MainLayout>
  )
}
