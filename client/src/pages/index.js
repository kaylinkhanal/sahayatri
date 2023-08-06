import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const inter = Inter({ subsets: ['latin'] })
import NavBar from '@/components/Navbar'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

export default function Home() {
  const [productsList,setProductsList]= useState([])

  const fetchAllProducts = async( )=> {
   const res = await fetch('http://localhost:8080/products')
   const data = await res.json()
   setProductsList(data.productsList)
  }
  useEffect(()=> {
    fetchAllProducts()
  }, [])
  return (
  <div>
    <NavBar/>
       <Badge badgeContent={4} color="primary">
      <ShoppingCartIcon color="action" />
    </Badge>
    {
      productsList.length> 0 ? (
        <div className='Products'>
          {productsList.map((item)=> (
          <div className='Card'>
            <Image src="https://m.media-amazon.com/images/I/51qvf7j6FmL.jpg" alt="products" height={190} width={170}/>
            {item.productName}
            {item.productPrice}
            <ShoppingCartIcon onClick={()=> alert(item._id)}/>
            </div>
            ))}
          </div>
      ) : "loding"
    }
  </div>
  )
}



// {
//  favlist: [ '234rfdfawerwe', '3erfr32r32', '312fdsafdsa'],
//  cartList: []  
// }



// redecers:{
//   addToCart(state,actions){
//     state.cartList
//     //
//   }
// }


