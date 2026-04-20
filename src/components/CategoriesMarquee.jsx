import { useNavigate } from 'react-router-dom'

const BRANDS = ['All', 'Apple', 'Samsung', 'Sony', 'Dell', 'LG', 'Bose', 'Microsoft', 'ASUS', 'Google', 'Dyson', 'DJI', 'GoPro', 'Logitech', 'Accessories']

export default function CategoriesMarquee() {
  const navigate = useNavigate()

  return (
    <div className="overflow-hidden w-full relative max-w-7xl mx-auto select-none group sm:my-20">
      <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
      <div className="flex min-w-[200%] animate-[marqueeScroll_40s_linear_infinite] group-hover:[animation-play-state:paused] gap-4">
        {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
          <button
            key={i}
            onClick={() => navigate(brand === 'All' ? '/products' : `/products?category=${encodeURIComponent(brand)}`)}
            className="px-5 py-2 bg-slate-100 rounded-lg text-slate-500 text-xs sm:text-sm hover:bg-slate-700 hover:text-white active:scale-95 transition-all duration-300 whitespace-nowrap"
          >
            {brand}
          </button>
        ))}
      </div>
      <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
    </div>
  )
}
