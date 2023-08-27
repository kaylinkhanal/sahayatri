import UserMenu from "@/components/UserMenu";
import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import styles from "../../styles/userMenu.module.css";
import CheckIcon from "@mui/icons-material/Check";
import MapSearch from "../../components/MapSearch";
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
	const [destCenter, setDestCenter] = useState({
		lat: 27.702348,
		lng: 85.307631,
	});

	const [flag, setFlag] = useState(true);

	const handleMarker = (e) => {
		const newPosition = {
			lat: e.latLng.lat(),
			lng: e.latLng.lng(),
		};
		setCenter(newPosition);
		setFlag(true);
		console.log("Marker dragged to:", newPosition);
	};
	const handleSecondMarker = (e) => {
		const newPosition = {
			lat: e.latLng.lat(),
			lng: e.latLng.lng(),
		};
		setDestCenter(newPosition);
		setFlag(false);
		console.log("Marker dragged to:", newPosition);
	};
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
				center={flag ? center : destCenter}
				zoom={13}
			>
				<MarkerF
					onLoad={() => console.log("loaded")}
					position={center}
					draggable={true}
					onDragEnd={handleMarker}
				/>
				<MarkerF
					onLoad={() => console.log("loaded")}
					position={destCenter}
					draggable={true}
					onDragEnd={handleSecondMarker}
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
							<CheckIcon
								className={styles.custom}
								onClick={() => setSearchStep(2)}
							/>
						</div>
					)}
				</div>

				{/* <div className={styles.map}>

    </div> */}
			</GoogleMap>
		);
	}
	return "LOADING...";
}

export default index;
