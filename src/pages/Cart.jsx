import { Trash2, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Counter from '../components/Counter'
import PageTitle from '../components/PageTitle'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

export default function Cart() {
  const { cartArray, cartTotal, deleteFromCart, clearCart } = useCart()

  const TAX_RATE = 0.08
  const tax = cartTotal * TAX_RATE
  const grandTotal = cartTotal + tax

  const handleDelete = (id, title) => {
    deleteFromCart(id)
    toast.success(`${title.split(' ').slice(0, 3).join(' ')}… removed`)
  }

  if (cartArray.length === 0) {
    return (
      <MainLayout>
        <div className="min-h-[80vh] mx-6 flex flex-col items-center justify-center gap-5 text-slate-400">
          <ShoppingBag size={72} strokeWidth={1} />
          <h1 className="text-2xl sm:text-4xl font-semibold">Your cart is empty</h1>
          <Link
            to="/products"
            className="bg-slate-800 text-white px-8 py-3 rounded hover:bg-slate-900 active:scale-95 transition text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="min-h-screen mx-6 text-slate-800">
        <div className="max-w-7xl mx-auto">

          <PageTitle
            heading="My Cart"
            text={`${cartArray.length} item${cartArray.length !== 1 ? 's' : ''} in your cart`}
            path="/products"
            linkText="Add more"
          />

          <div className="flex items-start justify-between gap-8 max-lg:flex-col mb-20">

            {/* Cart items table */}
            <div className="w-full max-w-4xl overflow-x-auto">
              <table className="w-full text-slate-600 table-auto">
                <thead>
                  <tr className="text-sm border-b border-slate-200 pb-2">
                    <th className="text-left pb-3">Product</th>
                    <th className="pb-3">Quantity</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3 max-sm:hidden">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartArray.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100">
                      <td className="py-4">
                        <div className="flex gap-3 items-center">
                          <div className="flex items-center justify-center bg-slate-100 size-16 rounded-md shrink-0">
                            <img
                              src={item.image}
                              className="h-12 w-auto object-contain"
                              alt={item.title}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium line-clamp-2 max-w-[200px]">{item.title}</p>
                            <p className="text-xs text-slate-400 capitalize mt-0.5">{item.category}</p>
                            <p className="text-sm text-slate-700 mt-0.5">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <Counter productId={item.id} />
                      </td>
                      <td className="text-center font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="text-center max-sm:hidden">
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2.5 rounded-full active:scale-95 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => { clearCart(); toast.success('Cart cleared') }}
                  className="text-sm text-red-400 hover:text-red-600 transition"
                >
                  Clear cart
                </button>
                <Link to="/products" className="text-sm text-green-600 hover:underline">
                  ← Continue shopping
                </Link>
              </div>
            </div>

            {/* Order summary sidebar */}
            <div className="w-full max-w-sm lg:max-w-[340px] shrink-0 bg-slate-50/30 border border-slate-200 text-slate-500 text-sm rounded-xl p-7">
              <h2 className="text-xl font-semibold text-slate-700 mb-5">Order Summary</h2>

              <div className="space-y-3 border-b border-slate-200 pb-4">
                {cartArray.map(item => (
                  <div key={item.id} className="flex justify-between gap-2 text-xs">
                    <span className="text-slate-500 line-clamp-1 flex-1">{item.title} × {item.quantity}</span>
                    <span className="font-medium text-slate-700">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 border-b border-slate-200 pb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-700">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">
                    {cartTotal >= 50 ? 'Free' : '$5.00'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span className="font-medium text-slate-700">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between py-4 text-base font-semibold text-slate-800">
                <span>Total</span>
                <span>${(grandTotal + (cartTotal >= 50 ? 0 : 5)).toFixed(2)}</span>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-slate-800 text-white text-center py-3 rounded hover:bg-slate-900 active:scale-95 transition font-medium"
              >
                Proceed to Checkout
              </Link>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  )
}
