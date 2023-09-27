import React, {useState, useEffect} from 'react'
import Home from '../home'
import axios from 'axios';
import { io } from 'socket.io-client';
import { Button, Modal } from "@mui/material";
import {useDispatch, useSelector} from 'react-redux'
import styles from '../../styles/rider.module.css'
import {setMapCordsInBulk} from '../../redux/reducerSlices/locationSlice'
const URL = 'http://localhost:8000';
export const socket = io(URL);
const RideList = ()=> {
    const dispatch = useDispatch()
    const [acceptedId, setAcceptedId]= useState(null)
    const [rideRequests, setRideRequest] = useState([])
    const {userDetails} = useSelector(state=>state.user)
    const [riderLocationCoords, setRiderLocationCoords] = useState({})
    const [selectedId, setSelectedId] = useState(null)
  useEffect(() => {
    socket.on('rideRequests',rideRequests=>{
        setRideRequest(rideRequests)
    })
  },[socket])

  const handleRideAccept = (details)=> {
    setAcceptedId(details._id)
    const acceptanceDetails = {
      ...details,
      ...userDetails,
      rideId: details._id,
      riderLocationCoords
    }
    socket.emit('acceptanceDetails',acceptanceDetails )
  }

  const getCurrentPosition = ()=>{
    if(acceptedId){
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        const currentLocation = { lat: latitude, lng: longitude };
        socket.emit('riderLocationInfo', currentLocation)
        setRiderLocationCoords(currentLocation)
      });
    }
  }

  const fetchPendingRides = async() => {
    const {data} = await axios.get('http://localhost:8000/rides?status=pending')
    setRideRequest(data.rideList)
     if(data?.rideList?.length>0){
      setSelectedId(data.rideList?.[0]?._id)
     }
  }

  useEffect(()=>{
    fetchPendingRides()
    setInterval(()=>{
      getCurrentPosition()
    },5000)
    
  },[acceptedId])


    return (
        <div>
        <input placeholder="search" />
        {acceptedId}
       {rideRequests.length> 0 ? (
               <div>
                   {rideRequests.map((item)=> {
                     if((acceptedId && item._id==acceptedId) || !acceptedId){
                      return (
                        <div onClick={()=>{
                            
                            setSelectedId(item._id)
                            dispatch(setMapCordsInBulk(item))
                            }} className={selectedId==item._id ? styles.selectionCard :styles.defaultCard}>
                      <p>Name: {item?.user?.fullName}</p>
                      <p>Price: {item.price}</p>
                       <p>Distance: {item.distance}</p>
                       {item.pickUpAddress}-----{item.destinationAddress}
                       {JSON.stringify(riderLocationCoords)}
                       {item._id==acceptedId ?  
                        <Button onClick={()=>handleRideAccept(item)}> End</Button>:
                         <Button onClick={()=>handleRideAccept(item)}> Accept</Button>
                       }
                     
                       {/* <Button> Reject</Button> */}
                        </div>
                    )
                     }
                    
                   })}
                   </div>
       ) : "No rides available"}
        </div>
    )
}
function index() {
    return (
        <div style={{display:'flex'}}>
            <RideList/>
            <Home isRider={true}/>
        </div>
    )
}

export default index
