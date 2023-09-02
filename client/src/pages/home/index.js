import UserMenu from '@/components/UserMenu'
import React, {useEffect, useState} from 'react'
import { GoogleMap, useJsApiLoader,MarkerF } from '@react-google-maps/api'
import styles from '../../styles/userMenu.module.css'
import CheckIcon from '@mui/icons-material/Check';
import MapSearch from '../../components/MapSearch'
import { DotWave } from '@uiball/loaders'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function index() {
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
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((pos)=> {
  //     const {latitude, longitude} = pos.coords
  //     setCenter({lat:latitude, lng:longitude})
  //   });
  // }, [])
  const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
  };

  if (isLoaded) {
    return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
          zoom={13}
    >
      <MarkerF
      onLoad={()=> console.log("loaded")}
      position={center}
      draggable={true}
      icon={{
        // path: google.maps.SymbolPath.CIRCLE,
        
        url:'/pickuplocation.png'
      }}
    />
        <MarkerF
          onLoad={() => console.log("loaded")}
          icon={"/destination-marker.svg"}
          position={center}
          draggable={true}
        />
 		    <div className={styles.map}>
					{searchStep === 1 && (
						<div className="flex items-center gap-1">
							<MapSearch showCurrentIcon={true} placeholder="Pickup Address" />

							<CheckIcon
								className={styles.custom}
								onClick={() => setSearchStep(2)}
							/>
						</div>
					)}
					{searchStep === 2 && (
						<div className="flex items-center gap-1">
							<MapSearch
								showCurrentIcon={false}
								placeholder="Destination Address"
							/>
							<ArrowBackIcon
								className={styles.custom}
								onClick={() => setSearchStep(1)}
							/>
						</div>
					)}
				</div>
      <div className={styles.map}>
        <UserMenu />
      </div>
    
      </GoogleMap>
    );
  }

 return (
  <div className='flex justify-center items-center h-screen'>
    <DotWave size={70} speed={1} color="#2563eb" />
  </div>
 )
}

export default index;
