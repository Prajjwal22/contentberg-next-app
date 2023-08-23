import React from 'react'
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-50 w-full p-8 mt-10">
        <div className="flex flex-col items-center justify-center gap-4">
            <ul className="list-none flex items-center gap-4 font-bold">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li>Privacy</li>
                <li>Disclaimer</li>
            </ul>
            <ul className="list-none flex items-center gap-4 font-bold">
                <li><FaFacebook size={30}/></li>
                <li><FaTwitter size={30}/></li>
                <li><FaYoutube size={30}/></li>
            </ul>

            <div className="flex justify-between w-full border-t border-gray-200 pt-3">
                <span>Copyright LoveIgnitePool 2023</span>
                <span>All Rights Reserevd</span>
            </div>
        </div>
    </footer>
  )
}
