import { Link } from 'react-router-dom'

const MailIcon    = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14.665 4.667L8.671 8.485a1.333 1.333 0 01-1.34 0L1.332 4.667M2.665 2.667h10.667c.736 0 1.333.597 1.333 1.333v8c0 .736-.597 1.333-1.333 1.333H2.665c-.736 0-1.333-.597-1.333-1.333v-8c0-.736.597-1.333 1.333-1.333z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>)
const PhoneIcon   = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M9.22 11.045a.667.667 0 00.44-.124l.237-.31a1.333 1.333 0 011.04-.51H13a1.333 1.333 0 011.333 1.332V13.333A1.333 1.333 0 0113 14.667C9.149 14.667 6.097 13.402 3.847 11.152 1.596 8.901.332 5.849.332 2.667A1.333 1.333 0 011.665 1.333h2a1.333 1.333 0 011.333 1.334v2a1.333 1.333 0 01-.51 1.04l-.312.237a.667.667 0 00-.124.44C4.963 8.204 6.286 9.527 9.22 11.045z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>)
const MapPinIcon  = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.335 6.667C13.335 10 9.642 13.462 8.402 14.533a.667.667 0 01-.804 0C6.36 13.462 2.668 10 2.668 6.667a5.333 5.333 0 1110.667 0z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 8.667a2 2 0 100-4 2 2 0 000 4z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>)

const linkSections = [
  {
    title: 'SHOP BY BRAND',
    links: [
      { text: 'Apple',    path: '/products?category=Apple' },
      { text: 'Samsung',  path: '/products?category=Samsung' },
      { text: 'Sony',     path: '/products?category=Sony' },
      { text: 'Dell',     path: '/products?category=Dell' },
    ],
  },
  {
    title: 'MORE BRANDS',
    links: [
      { text: 'Microsoft', path: '/products?category=Microsoft' },
      { text: 'Google',    path: '/products?category=Google' },
      { text: 'Bose',      path: '/products?category=Bose' },
      { text: 'Accessories', path: '/products?category=Accessories' },
    ],
  },
  {
    title: 'CONTACT',
    links: [
      { text: '+1-212-456-7890',      path: '/', icon: PhoneIcon },
      { text: 'contact@shopflow.com', path: '/', icon: MailIcon },
      { text: '794 Francisco, 94102', path: '/', icon: MapPinIcon },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="mx-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-slate-500/30 text-slate-500">
          <div>
            <Link to="/" className="text-4xl font-semibold text-slate-700">
              <span className="text-green-600">shop</span>flow
              <span className="text-green-600 text-5xl leading-0">.</span>
            </Link>
            <p className="max-w-[380px] mt-6 text-sm">
              ShopFlow — your destination for premium electronics from Apple, Samsung, Sony, Dell and more.
              80+ products, real prices, smooth shopping.
            </p>
          </div>
          <div className="flex flex-wrap justify-between w-full md:w-[55%] gap-5 text-sm">
            {linkSections.map((section, i) => (
              <div key={i}>
                <h3 className="font-medium text-slate-700 md:mb-5 mb-3">{section.title}</h3>
                <ul className="space-y-2.5">
                  {section.links.map((link, j) => (
                    <li key={j} className="flex items-center gap-2">
                      {link.icon && <link.icon />}
                      <Link to={link.path} className="hover:underline transition">{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="py-4 text-sm text-slate-500">
          Copyright 2025 © ShopFlow. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
