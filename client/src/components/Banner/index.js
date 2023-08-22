import Image from 'next/image'
import { useRouter } from "next/router";
import React from 'react'

const index = () => {
    const router = useRouter();
    return (
        <>
            <div className='xl:h-[1000px] text-white flex justify-center items-center overflow-hidden relative mb-8'>
                <div className=' bg-primary h-full w-full mx-8 rounded-3xl relative overflow-hidden'>
                    <Image src='/banner.jpg' width={2000} height={500} alt='sahayatri banner' />
                    
                    <div className='bg-black h-full w-full opacity-60 absolute top-0 left-0 z-10'></div>
                    
                    <div className='w-4/5 h-96  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center z-20'>
                        <div>
                            <Image src='/maponphone.png' width={800} height={600} alt='sahayatri banner' />
                        </div>
                        
                        <div className='flex flex-col items-start gap-4  ps-20'>
                            <div className=' bg-green-100 text-primary px-6 py-2 rounded-xl uppercase font-bold'>
                                <p>The Perfect Ride Awaits</p>
                            </div>
                            <div className=' w-10/12 text-6xl font-semibold'>
                                <h3>Get Where You Need To Go, <span className='text-secondary'>Safely</span> And <span className='text-secondary'>Affordably</span></h3>
                            </div>
                            <div className='flex gap-4 pt-10'>
                                <button className='text-xl font-semibold py-4 px-10 bg-transparent rounded-2xl transition duration-300 hover:bg-secondary border uppercase' onClick={()=> router.push('/login')} >Login</button>

                                <button className='text-xl font-semibold py-4 px-10 bg-transparent rounded-2xl transition duration-300 hover:bg-secondary border uppercase' onClick={()=> router.push('/register')} >Register</button>
                               
                            </div>
                        </div>
                    </div>
                </div>





            </div>
        </>
    )
}

export default index