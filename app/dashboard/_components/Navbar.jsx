"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function Navbar() {
    const pathname = usePathname();

  return (
    <header className='flex items-center justify-between px-8 py-4 border-b bg-secondary shadow-sm'>

        <Image src={'/logo.svg'} alt='logo' width={120} height={120}/>

        <nav className='md:flex hidden list-none gap-4 font-semibold pr-20'>
            <Link href={'/dashboard'} className={`hover:text-primary cursor-pointer ${pathname=='/dashboard'?'text-primary':null}`}>Dashboard</Link>
            <Link href={'/dashboard/upgrade'} className={`hover:text-primary cursor-pointer ${pathname=='/dashboard/upgrade'?'text-primary':null}`}>Upgrade</Link>
            <Link href={'/dashboard/howitworks'} className={`hover:text-primary cursor-pointer ${pathname=='/dashboard/howitworks'?'text-primary':null}`}>How it works?</Link>
        </nav>

        <UserButton/>
      
    </header>
  )
}

export default Navbar
