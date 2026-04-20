import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CheckCircle, ShoppingBag, ChevronRight } from 'lucide-react'
import MainLayout from '../layout/MainLayout'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

const SHIPPING_THRESHOLD = 50
const SHIPPING_FEE = 5
const TAX_RATE = 0.08

export default function Checkout() {
  const navigate = useNavigate()
  const { cartArray, cartTotal, clearCart } = useCart()

  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', address: '', city: '', state: '', zip: '',
  })
  const [errors, setErrors] = useState({})

  const shipping = cartTotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const tax = cartTotal * TAX_RATE
  const grandTotal = cartTotal + tax + shipping

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required'
    if (!form.address.trim()) errs.address = 'Address is required'
    if (!form.city.trim()) errs.city = 'City is required'
    if (!form.state.trim()) errs.state = 'State is required'
    if (!form.zip.trim()) errs.zip = 'ZIP code is required'
    return errs
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    toast.promise(
      new Promise(res => setTimeout(res, 1200)),
      { loading: 'Placing order…', success: 'Order placed!', error: 'Something went wrong' }
    ).then(() => {
      clearCart()
      setOrderPlaced(true)
    })
  }

  if (cartArray.length === 0 && !orderPlaced) {
    return (
      <MainLayout>
        <div className="min-h-[80vh] mx-6 flex flex-col items-center justify-center gap-5 text-slate-400">
          <ShoppingBag size={72} strokeWidth={1} />
          <h1 className="text-2xl font-semibold">Nothing to checkout</h1>
          <Link to="/products" className="bg-slate-800 text-white px-8 py-3 rounded hover:bg-slate-900 transition text-sm">
            Shop Now
          </Link>
        </div>
      </MainLayout>
    )
  }

  if (orderPlaced) {
    return (
      <MainLayout>
        <div className="min-h-[80vh] mx-6 flex flex-col items-center justify-center gap-6 text-center">
          <div className="bg-green-50 rounded-full p-6">
            <CheckCircle size={64} className="text-green-500" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Order Confirmed!</h1>
            <p className="text-slate-500 mt-2 text-sm">
              Thank you, {form.name}! Your order has been placed successfully.
            </p>
            <p className="text-slate-400 text-xs mt-1">A confirmation will be sent to {form.email}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-sm text-slate-600 max-w-sm w-full text-left space-y-1">
            <p><span className="font-medium">Total paid:</span> ${grandTotal.toFixed(2)}</p>
            <p><span className="font-medium">Payment:</span> {paymentMethod === 'COD' ? 'Cash on Delivery' : 'Stripe'}</p>
            <p><span className="font-medium">Ships to:</span> {form.city}, {form.state} {form.zip}</p>
          </div>
          <Link
            to="/"
            className="bg-slate-800 text-white px-10 py-3 rounded hover:bg-slate-900 active:scale-95 transition text-sm"
          >
            Back to Home
          </Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="mx-6 min-h-screen">
        <div className="max-w-7xl mx-auto py-8 mb-20">

          {/* Breadcrumb */}
          <nav className="text-gray-500 text-sm mb-6 flex items-center gap-1">
            <Link to="/cart" className="hover:text-green-600 transition">Cart</Link>
            <ChevronRight size={14} />
            <span className="text-slate-700 font-medium">Checkout</span>
          </nav>

          <h1 className="text-2xl font-semibold text-slate-800 mb-8">Checkout</h1>

          <form onSubmit={handlePlaceOrder}>
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Left — address + payment */}
              <div className="flex-1 space-y-8">

                {/* Shipping address */}
                <div className="border border-slate-200 rounded-xl p-6">
                  <h2 className="text-base font-semibold text-slate-700 mb-5">Shipping Address</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'name', label: 'Full Name', placeholder: 'John Doe', full: true },
                      { name: 'email', label: 'Email', placeholder: 'john@example.com', full: true },
                      { name: 'address', label: 'Address', placeholder: '123 Main St', full: true },
                      { name: 'city', label: 'City', placeholder: 'New York' },
                      { name: 'state', label: 'State', placeholder: 'NY' },
                      { name: 'zip', label: 'ZIP Code', placeholder: '10001' },
                    ].map(field => (
                      <div key={field.name} className={field.full ? 'sm:col-span-2' : ''}>
                        <label className="text-xs font-medium text-slate-600 block mb-1">{field.label}</label>
                        <input
                          name={field.name}
                          value={form[field.name]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none transition ${
                            errors[field.name]
                              ? 'border-red-400 bg-red-50'
                              : 'border-slate-200 focus:border-slate-400 bg-white'
                          }`}
                        />
                        {errors[field.name] && (
                          <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment method */}
                <div className="border border-slate-200 rounded-xl p-6">
                  <h2 className="text-base font-semibold text-slate-700 mb-5">Payment Method</h2>
                  <div className="space-y-3">
                    {[
                      { id: 'COD', label: 'Cash on Delivery', desc: 'Pay when your order arrives' },
                      { id: 'STRIPE', label: 'Stripe / Card', desc: 'Secure online payment' },
                    ].map(opt => (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition ${
                          paymentMethod === opt.id
                            ? 'border-slate-800 bg-slate-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={opt.id}
                          checked={paymentMethod === opt.id}
                          onChange={() => setPaymentMethod(opt.id)}
                          className="accent-slate-700"
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-700">{opt.label}</p>
                          <p className="text-xs text-slate-400">{opt.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right — order summary */}
              <div className="w-full lg:max-w-[360px] shrink-0">
                <div className="border border-slate-200 rounded-xl p-6 sticky top-6">
                  <h2 className="text-base font-semibold text-slate-700 mb-5">Order Summary</h2>

                  <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar border-b border-slate-200 pb-4">
                    {cartArray.map(item => (
                      <div key={item.id} className="flex items-center gap-3 text-sm">
                        <div className="size-12 bg-slate-100 rounded-md flex items-center justify-center shrink-0">
                          <img src={item.image} className="max-h-9 w-auto object-contain" alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-700 text-xs line-clamp-2">{item.title}</p>
                          <p className="text-slate-400 text-xs">× {item.quantity}</p>
                        </div>
                        <span className="font-medium text-slate-700 text-sm shrink-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-slate-600 border-b border-slate-200 pb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                        {shipping === 0 ? 'Free' : `$${SHIPPING_FEE.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between py-4 text-base font-semibold text-slate-800">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>

                  {cartTotal < SHIPPING_THRESHOLD && (
                    <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 mb-4">
                      Add ${(SHIPPING_THRESHOLD - cartTotal).toFixed(2)} more for free shipping!
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-900 active:scale-95 transition font-medium"
                  >
                    Place Order — ${grandTotal.toFixed(2)}
                  </button>

                  <p className="text-xs text-slate-400 text-center mt-3">
                    🔒 Secured & encrypted checkout
                  </p>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}
