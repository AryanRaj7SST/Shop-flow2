import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'
import { useProducts } from '../hooks/useProducts'
import { Search, SlidersHorizontal, X } from 'lucide-react'

const PRICE_OPTIONS = [
  { label: 'All Prices',       value: 'all' },
  { label: 'Under $100',       value: '0-100' },
  { label: '$100 – $500',      value: '100-500' },
  { label: '$500 – $1,000',    value: '500-1000' },
  { label: '$1,000+',          value: '1000+' },
]

const SORT_OPTIONS = [
  { label: 'Default',            value: 'default' },
  { label: 'Price: Low → High',  value: 'price-asc' },
  { label: 'Price: High → Low',  value: 'price-desc' },
  { label: 'Top Rated',          value: 'rating' },
  { label: 'Newest',             value: 'newest' },
]

export default function Products() {
  const [searchParams] = useSearchParams()
  const {
    filteredProducts, categories, loading, error,
    search, setSearch,
    selectedCategory, setSelectedCategory,
    priceRange, setPriceRange,
    sortBy, setSortBy,
  } = useProducts()

  // Sync URL params → state on mount
  useEffect(() => {
    const q    = searchParams.get('search')
    const cat  = searchParams.get('category')
    const sort = searchParams.get('sortBy')
    if (q)    setSearch(q)
    if (cat)  setSelectedCategory(cat)
    if (sort) setSortBy(sort)
  }, [])

  if (loading) return <MainLayout><Loading text="Loading products…" /></MainLayout>
  if (error)   return (
    <MainLayout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-6">
        <p className="text-red-500 font-medium">{error}</p>
        <div className="bg-slate-100 rounded-xl p-5 text-sm text-slate-600 max-w-sm text-left">
          <p className="font-semibold mb-2">To start the API server:</p>
          <code className="block bg-white rounded px-3 py-2 text-green-700 font-mono">node server.js</code>
          <p className="mt-2 text-slate-400">Then refresh this page.</p>
        </div>
      </div>
    </MainLayout>
  )

  const categoryLabel = (cat) =>
    cat === 'all' ? 'All' : cat

  return (
    <MainLayout>
      <div className="mx-6 min-h-screen">
        <div className="max-w-7xl mx-auto py-8">

          {/* Heading */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h1 className="text-2xl font-semibold text-slate-800">
              All <span className="text-green-600">Products</span>
            </h1>
            <p className="text-sm text-slate-500">{filteredProducts.length} results</p>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {categoryLabel(cat)}
              </button>
            ))}
          </div>

          {/* Search + filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2.5 rounded-full text-sm flex-1 min-w-[200px] max-w-xs">
              <Search size={16} className="text-slate-500 shrink-0" />
              <input
                className="bg-transparent outline-none w-full placeholder-slate-500"
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button onClick={() => setSearch('')}>
                  <X size={14} className="text-slate-400 hover:text-slate-700" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2.5 rounded-full text-sm">
              <SlidersHorizontal size={15} className="text-slate-500" />
              <select
                className="bg-transparent outline-none text-slate-600"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                {PRICE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2.5 rounded-full text-sm">
              <select
                className="bg-transparent outline-none text-slate-600"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Grid or empty */}
          {filteredProducts.length === 0 ? (
            <div className="min-h-[40vh] flex flex-col items-center justify-center text-slate-400 gap-3">
              <Search size={48} strokeWidth={1} />
              <p className="text-xl">No products found</p>
              <button
                onClick={() => { setSearch(''); setSelectedCategory('all'); setPriceRange('all') }}
                className="text-green-500 text-sm hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-10 mb-20">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>
      </div>
    </MainLayout>
  )
}
