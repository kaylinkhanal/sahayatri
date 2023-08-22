import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Pagination from '@mui/material/Pagination';
const ProductCard = (props)=> {
    const router = useRouter()
    return (
        <div 
        onClick={()=> router.push(`/products/${props.item._id}`)}
        style={{margin:'10px', backgroundColor:props.id %5  === 0 ? 'green':'aqua', width:'220px', padding:'30px'}}>
            {props.item.vehicleNumber}
            {props.item.vehicleImage}
            {props.item.vehicleCategory}
            <Image src={"http://localhost:8000/vehicle-image/"+props.item._id} width={100} height={100}/>
            </div>
    )
}
function index() {
    const [ productDetails, setProductDetails] = useState([])
    const [pageCount, setPageCount]= useState(1)
    const fetchProducts = async(limit=5, page=1)=> {
        const response = await fetch(`http://localhost:8000/vehicles?page=${page}&limit=${limit}`);
        const result = await response.json();
        setProductDetails(result.data)
        setPageCount(Math.ceil(result.totalCount/limit))
    }

     useEffect(()=>{
        fetchProducts()
    },[])

    const handlePageChange = (e,page) => {
        fetchProducts(5, page)
    }
    return (
        <>
        <div style={{display: 'flex', }}>
            product list here
            {productDetails.length>0 ? (
                productDetails.map((item, id)=>{
                    return <ProductCard id={id} item={item}/>
                })
            ): "loading"}
        </div>
        <Pagination 
        onChange={handlePageChange}
        count={pageCount} variant="outlined" shape="rounded" />
        </>
    )
}

export default index
