import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const index = () => {
  return (
    <>  
        <div className='bg-white'>
            <div className='container mx-auto flex justify-between items-center'>
                {/* ---------Logo Area-------- */}
                <div className='text-primary text-4xl font-semibold'>
                   <Image src='/slogo.jpg' width={300} height={300} />
                </div>
                
                {/* --------Navbar Area--------- */}
                <nav>
                    <ul className='flex gap-4 text-primary text-base'>
                        <li><Link href='#'> Home</Link></li>
                        <li><Link href='#'> About</Link></li>
                        <li><Link href='#'> Services</Link></li>
                        <li><Link href='#'> Contact</Link></li>
                       
                    </ul>
                </nav>
            </div>
        </div>
    </>
    
  )
}

export default index