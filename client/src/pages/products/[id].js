import React,{useEffect, useState} from 'react'
import { useRouter } from 'next/router'
function index() {
    const [productDetails, setProductDetails] = useState([])
    const router = useRouter()
    const fetchProductDetails = async ()=> {
        const response = await fetch("http://localhost:8000/vehicles/"+router.query.id);
        const result = await response.json();
        setProductDetails(result.data)
    }
    useEffect(() => {
      if(router.query.id) {
        fetchProductDetails()
      }
    }, [router.query.id])

    return (
        <div>
         <h1>vehicleNumber</h1>   {productDetails.vehicleNumber}
        <strong>vehicleCategory</strong> {productDetails.vehicleCategory}
        </div>
    )
}

export default index
