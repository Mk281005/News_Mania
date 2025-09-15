import React from 'react'
import Link from 'next/link'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

function Sidebar() {
  return (
    <div className='bg-slate-900-400 h-10 flex items-center gap-8 p-4 justify-between shadow-md shadow-slate-600'>
      <div className='font-bold text-xl font-sans'>
        <span className='text-violet-500'>N</span>ewsMania
      </div>
      
      <div className='flex justify-evenly items-center gap-6 mr-6'>
        <Link href='/'>
          <img className='w-6 cursor-pointer' src="home.png" alt="" />
        </Link>
        <Link href='/like'>
          <img className='w-6 cursor-pointer' src="heart.png" alt="" />
        </Link>
        {/* <img src="search.svg" className='w-6 h-6 cursor-pointer' alt="" /> */}
        
        {/* Auth Buttons */}
        <SignedOut>
          <SignInButton>
            <button className="bg-black hover:bg-gray-800 text-white text-sm font-medium py-1 px-3 rounded-lg transition-colors duration-200">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="bg-white hover:bg-gray-100 text-black text-sm font-medium py-1 px-3 rounded-lg border border-black transition-colors duration-200">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton 
            appearance={{
              elements: {
                userButtonAvatarBox: "h-6 w-6"
              }
            }}
          />
        </SignedIn>
      </div>
    </div>
  )
}

export default Sidebar