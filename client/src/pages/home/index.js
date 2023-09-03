import UserMenu from '@/components/UserMenu'
import React, {useEffect, useState} from 'react'
import { GoogleMap, useJsApiLoader,MarkerF } from '@react-google-maps/api'
import styles from '../../styles/userMenu.module.css'
import CheckIcon from '@mui/icons-material/Check';
import MapSearch from '../../components/MapSearch'
import {useSelector, useDispatch} from 'react-redux'
import { DotWave } from '@uiball/loaders'
import {setCoords, setAddress} from '../../redux/reducerSlices/locationSlice'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function index() {
   const dispatch = useDispatch()
   const {pickCords,destinationCords   } = useSelector(state=>state.location)
  const [searchStep, setSearchStep] = useState(1);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDLfjmFgDEt9_G2LXVyP61MZtVHE2M3H-0", // ,
    libraries: ["places"],
    // ...otherOptions
  });

  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1,
  };

  const [center, setCenter] = useState({
    lat: 27.702348,
    lng: 85.307631,
  });

  // Just playing around with static data
  const dest = {
    lat: 26.4175616,
    lng: 87.2677376,
  };

  // Finding averages
  const centerLat = (center.lat + dest.lat) / 2;
  const centerLng = (center.lng + dest.lng) / 2;

  const centerLatLng = {
    lat: centerLat,
    lng: centerLng,
  };

  // useEffect(() => {

  // }, [])

const setCurrentPickUpLoc= ()=>{
  navigator.geolocation.getCurrentPosition((pos)=> {
    const {latitude, longitude} = pos.coords
    const currentLocation = {lat:latitude, lng:longitude}
    setCenter(currentLocation)
      dispatch(setCoords({currentLocation, cordType: 'pickCords'}))
  });
}



  const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
  };

  const handleDrag = async(e, locType) => {
    const currentLocation ={
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }
    setCenter(currentLocation)
    const res =await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${currentLocation.lat}&lon=${currentLocation.lng}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`)
    const data = await res.json()
    if(data) { 
    const addr = data.features[0].properties.formatted
    dispatch(setCoords({currentLocation, cordType: locType=='pickUpAddress' ? 'pickCords': 'destinationCords'}))
    dispatch(setAddress({addr, locType}))

}
  }

  if (isLoaded) {
    return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
          zoom={13}
    >
        {searchStep === 1 && (
          <MarkerF
          onLoad={()=> console.log("loaded")}
          position={pickCords.lat ? pickCords: center}
          onDragEnd= {(e)=>handleDrag(e, 'pickUpAddress')}
          draggable={true}
          icon={{
            // path: google.maps.SymbolPath.CIRCLE,
            
            url:'/pickuplocation.png'
          }}
          />
      )}
      {searchStep === 2 &&  <MarkerF
          onLoad={() => console.log("loaded")}
          icon={"/destination-marker.svg"}
          position={destinationCords.lat ? destinationCords: center}
          onDragEnd= {(e)=>handleDrag(e, 'destinationAddress')}
          draggable={true}
        />}
 		    <div className={styles.map}>
					{searchStep === 1 && (
						<div className="flex items-center gap-1">
              <MapSearch 
              setCurrentPickUpLoc= {setCurrentPickUpLoc}
              searchStep={searchStep}
              showCurrentIcon={true} placeholder="Pickup Address" />

							<CheckIcon
								className={styles.custom}
								onClick={() => setSearchStep(2)}
							/>
						</div>
					)}
					{searchStep === 2 && (
						<div className="flex items-center gap-1">
							<MapSearch
                searchStep={searchStep}
								showCurrentIcon={false}
								placeholder="Destination Address"
							/>
							<ArrowBackIcon
								className={styles.custom}
								onClick={() => setSearchStep(1)}
							/>
              			<CheckIcon
								className={styles.custom}
								onClick={() => setSearchStep(2)}
							/>
						</div>
					)}
				</div>
    <div className={styles.userMenu}>
            <UserMenu/>
    </div>
      </GoogleMap>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <DotWave size={70} speed={1} color="#2563eb" />
    </div>
  );
}

export default index;
