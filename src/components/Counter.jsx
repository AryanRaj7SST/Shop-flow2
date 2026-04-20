import { useCart } from '../context/CartContext'

export default function Counter({ productId }) {
  const { cartItems, addToCart, removeFromCart } = useCart()
  const qty = cartItems[productId] || 0

  return (
    <div className="inline-flex items-center gap-1 sm:gap-3 px-3 py-1 rounded border border-slate-200 text-slate-600">
      <button onClick={() => removeFromCart(productId)} className="p-1 select-none hover:text-slate-900">−</button>
      <p className="p-1 min-w-[1.5rem] text-center">{qty}</p>
      <button onClick={() => addToCart(productId)} className="p-1 select-none hover:text-slate-900">+</button>
    </div>
  )
}
