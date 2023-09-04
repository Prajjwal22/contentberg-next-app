import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-50 w-full p-8 mt-10">
        <div className="flex flex-col items-center justify-center gap-4">
            <ul className="list-none flex items-center gap-4 font-bold">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/p/about-us">About</Link></li>
                <li><Link href="/p/contact-us">Contact</Link></li>
                <li><Link href="/p/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/p/disclaimer">Disclaimer</Link></li>
                <li><Link href="/p/sitemap">Sitemap</Link></li>

            </ul>
            {/* <ul className="list-none flex items-center gap-4 font-bold">
                <li><FaFacebook size={30}/></li>
                <li><FaTwitter size={30}/></li>
                <li><FaYoutube size={30}/></li>
            </ul> */}

            <div className="flex justify-between w-full border-t border-gray-200 pt-3">
                <span>Copyright {process.env.SITE_TITLE} 2023</span>
                <span>All Rights Reserevd</span>
            </div>
        </div>
    </footer>
  )
}
