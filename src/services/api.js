import axios from 'axios'

// ── API base URL ─────────────────────────────────────────────────────────────
// Local server (run `node server.js` first):
const BASE_URL = 'http://localhost:3001'

// To switch back to FakeStoreAPI (20 products), replace the line above with:
// const BASE_URL = 'https://fakestoreapi.com'
// ─────────────────────────────────────────────────────────────────────────────

const API = axios.create({ baseURL: BASE_URL })

export const getProducts           = ()         => API.get('/products')
export const getProductById        = (id)       => API.get(`/products/${id}`)
export const getCategories         = ()         => API.get('/products/categories')
export const getProductsByCategory = (category) => API.get(`/products/category/${encodeURIComponent(category)}`)
