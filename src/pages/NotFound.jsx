import { Link } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'

export default function NotFound() {
  return (
    <MainLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-5 text-slate-400">
        <p className="text-8xl font-bold text-slate-200">404</p>
        <h1 className="text-2xl font-semibold text-slate-600">Page Not Found</h1>
        <p className="text-sm">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="bg-slate-800 text-white px-8 py-3 rounded hover:bg-slate-900 transition text-sm"
        >
          Go Home
        </Link>
      </div>
    </MainLayout>
  )
}
