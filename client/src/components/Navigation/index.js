import Link from 'next/link'
import React from 'react'

const index = () => {
  return (
    <>  
        <div className='bg-white py-4'>
            <div className='container mx-auto flex justify-between items-center'>
                {/* ---------Logo Area-------- */}
                <div className='text-primary text-4xl font-semibold'>
                    <h3>SahaYatri Logo</h3>
                </div>
                
                {/* --------Navbar Area--------- */}
                <nav>
                    <ul className='flex gap-4 text-primary text-base'>
                        <li><Link href='#'> Home</Link></li>
                        <li><Link href='#'> About</Link></li>
                        <li><Link href='#'> Services</Link></li>
                        <li><Link href='#'> Features</Link></li>
                        <li><Link href='#'> Blog</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    </>
    
  )
}

export default index