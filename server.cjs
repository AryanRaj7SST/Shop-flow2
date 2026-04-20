// server.js — Local REST API server for ShopFlow
// Serves db.json as a fully functional API matching FakeStoreAPI's endpoint structure
//
// Start with:  node server.cjs
// Runs on:     http://localhost:3001
//
// Endpoints:
//   GET /products                       → all products
//   GET /products/:id                   → single product
//   GET /products/categories            → all category names
//   GET /products/category/:category    → products filtered by category

const http = require('http')
const fs   = require('fs')
const path = require('path')
const url  = require('url')

const PORT    = process.env.PORT || 3001
const DB_PATH = path.join(__dirname, 'db.json')

// ── CORS headers (allows your Vite dev server on 5173 to call this) ──────────
function setCORS(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

function sendJSON(res, data, status = 200) {
  setCORS(res)
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

function send404(res, message = 'Not found') {
  sendJSON(res, { error: message }, 404)
}

// ── Load the database ────────────────────────────────────────────────────────
function loadDB() {
  const raw = fs.readFileSync(DB_PATH, 'utf8')
  return JSON.parse(raw)
}

// ── Request handler ──────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  const parsed   = url.parse(req.url, true)
  const pathname = parsed.pathname.replace(/\/$/, '') // strip trailing slash

  // Handle CORS pre-flight
  if (req.method === 'OPTIONS') {
    setCORS(res)
    res.writeHead(204)
    res.end()
    return
  }

  // Only handle GET
  if (req.method !== 'GET') {
    sendJSON(res, { error: 'Method not allowed' }, 405)
    return
  }

  const db = loadDB()
  const { products, categories } = db

  console.log(`[${new Date().toLocaleTimeString()}] GET ${pathname}`)

  // ── Routes ─────────────────────────────────────────────────────────────────

  // GET /products/categories   ← MUST come before /products/:id
  if (pathname === '/products/categories') {
    return sendJSON(res, categories)
  }

  // GET /products/category/:category
  const categoryMatch = pathname.match(/^\/products\/category\/(.+)$/)
  if (categoryMatch) {
    const categoryName = decodeURIComponent(categoryMatch[1])
    const filtered = products.filter(
      p => p.category.toLowerCase() === categoryName.toLowerCase()
    )
    return sendJSON(res, filtered)
  }

  // GET /products/:id
  const productMatch = pathname.match(/^\/products\/(\d+)$/)
  if (productMatch) {
    const id = parseInt(productMatch[1], 10)
    const product = products.find(p => p.id === id)
    if (!product) return send404(res, `Product with id ${id} not found`)
    return sendJSON(res, product)
  }

  // GET /products
  if (pathname === '/products') {
    // Optional query params: ?limit=10&sort=asc|desc
    const limit = parsed.query.limit ? parseInt(parsed.query.limit, 10) : null
    const sort  = parsed.query.sort  // 'asc' | 'desc'

    let result = [...products]
    if (sort === 'desc') result.reverse()
    if (limit) result = result.slice(0, limit)
    return sendJSON(res, result)
  }

  // GET /  — health check
  if (pathname === '' || pathname === '/') {
    return sendJSON(res, {
      status:    'running',
      name:      'ShopFlow API',
      version:   '1.0.0',
      products:  products.length,
      categories: categories.length,
      endpoints: [
        'GET /products',
        'GET /products/:id',
        'GET /products/categories',
        'GET /products/category/:category'
      ]
    })
  }

  // Fallback 404
  send404(res)
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n  ⚠ Port ${PORT} is already in use.`)
    console.error(`  Try one of these fixes:`)
    console.error(`    1. Kill the other process:  npx kill-port ${PORT}`)
    console.error(`    2. Use a different port:    PORT=3002 node server.cjs\n`)
    process.exit(1)
  }
  throw err
})

server.listen(PORT, () => {
  console.log('')
  console.log('  ╔═══════════════════════════════════════╗')
  console.log('  ║       ShopFlow Local API Server       ║')
  console.log('  ╠═══════════════════════════════════════╣')
  console.log(`  ║  Running at: http://localhost:${PORT}    ║`)
  console.log(`  ║  Products:   ${JSON.parse(require("fs").readFileSync(DB_PATH,"utf8")).products.length} items                   ║`)
  console.log('  ║  Press Ctrl+C to stop                 ║')
  console.log('  ╚═══════════════════════════════════════╝')
  console.log('')
})
