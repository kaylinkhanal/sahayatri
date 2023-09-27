import UserMenu from "@/components/UserMenu";
import React, { useEffect, useState } from "react";

import {
  GoogleMap,
  Circle,
  useJsApiLoader,
  MarkerF,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

import styles from "../../styles/userMenu.module.css";
import CheckIcon from "@mui/icons-material/Check";
import Switch from "@mui/material/Switch";
import { getDistance } from "geolib";
import MapSearch from "../../components/MapSearch";
import { useSelector, useDispatch } from "react-redux";
import { DotWave } from "@uiball/loaders";
import { setCoords, setAddress } from "../../redux/reducerSlices/locationSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import priceMap from "../../config/priceMap.json";
import { io } from "socket.io-client";
const URL = "http://localhost:8000";
export const socket = io(URL);
function index(props) {
  const [rideRequested, setRideRequested] = useState(false);
  const [openRideDetailsDiv, setOpenRideDetailsDiv] = useState(false);
  const dispatch = useDispatch();
  const { pickCords, pickUpAddress, destinationAddress, destinationCords } =
    useSelector((state) => state.location);
  const { userDetails } = useSelector((state) => state.user);

  let price;
  const distance = (getDistance(pickCords, destinationCords) / 1000).toFixed(2);
  if (priceMap.unitKmPrice * distance < priceMap.basePrice) {
    price = priceMap.basePrice.toFixed(2);
  } else {
    price = (distance * priceMap.unitKmPrice).toFixed(2);
  }
  const [searchStep, setSearchStep] = useState(1);
  const [riderLocationInfo, setRiderLocationInfo] = useState({});
  const [acceptanceDetails, setAcceptanceDetails] = useState({});
  const [routeResponse, setRouteResponse] = useState(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCBYY-RtAAYnN1w_wAFmsQc2wz0ReCjriI", // ,
    libraries: ["places"],
    // ...otherOptions
  });

  const [date, setDate] = useState(dayjs(""));
  const [switchCheck, setSwitchCheck] = useState(false);

  const handleDate = (newValue) => {
    setDate(newValue);
  };

  const handleSwitch = (event) => {
    setSwitchCheck(event.target.checked);
  };

  useEffect(() => {
    socket.on("acceptanceDetails", (acceptanceDetails) => {
      if (acceptanceDetails?.user?._id === userDetails._id) {
        setAcceptanceDetails(acceptanceDetails);
      }
    });

    socket.on("riderLocationInfo", (riderLocationInfo) => {
      setRiderLocationInfo(riderLocationInfo);
    });
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

  useEffect(() => {
    socket.on("connection");
  }, []);

  const setCurrentPickUpLoc = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const currentLocation = { lat: latitude, lng: longitude };
      setCenter(currentLocation);
      dispatch(setCoords({ currentLocation, cordType: "pickCords" }));
    });
  };

  const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
  };

  const handleRideRequest = () => {
    if (!rideRequested) {
      setRideRequested(true);
      socket.emit("rideRequests", {
        distance,
        price,
        pickupCoords: pickCords,
        destinationCoords: destinationCords,
        user: userDetails._id,
        pickUpAddress,
        destinationAddress,
      });
    }
  };
  const mapContainerStyleRider = {
    height: "100vh",
    width: "80vw",
    borderRadius: "40px",
    right: 0,
    position: "absolute",
    overflow: "hidden",
  };
  const handleDrag = async (e, locType) => {
    const currentLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setCenter(currentLocation);
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${currentLocation.lat}&lon=${currentLocation.lng}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
    );
    const data = await res.json();
    if (data) {
      const addr = data.features[0].properties.formatted;
      dispatch(
        setCoords({
          currentLocation,
          cordType:
            locType == "pickUpAddress" ? "pickCords" : "destinationCords",
        })
      );
      dispatch(setAddress({ addr, locType }));
    }
  };

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK") {
        setRouteResponse(response);
      } else {
        console.log("response: ", response);
      }
    }
  };
  const options2 = {
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
    zIndex: 999,
  };
  if (isLoaded) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
        >
          {/* <Circle
      // required
      center={center}
      // required
      options={options2}
    /> */}

          {/* <DirectionsService
                options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                  destination: destinationCords,
                  origin: pickCords,
                  travelMode: 'DRIVING'
                }}
                callback={directionsCallback}
              /> */}
          {/* {routeResponse &&  <DirectionsRenderer
                // required
                  options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    directions: routeResponse,
                    suppressMarkers: true,
                    preserveViewport: true,                  
                  }}
                />} */}

          {(searchStep === 1 || openRideDetailsDiv) && (
            <MarkerF
              onLoad={() => console.log("loaded")}
              position={pickCords.lat ? pickCords : center}
              onDragEnd={(e) => handleDrag(e, "pickUpAddress")}
              draggable={!props.isRider}
              icon={{
                // path: google.maps.SymbolPath.CIRCLE,

                url: "/pickuplocation.png",
              }}
            />
          )}
          {(searchStep === 2 || openRideDetailsDiv || props.isRider) && (
            <MarkerF
              onLoad={() => console.log("loaded")}
              icon={"/destination-marker.svg"}
              position={destinationCords.lat ? destinationCords : center}
              onDragEnd={(e) => handleDrag(e, "destinationAddress")}
              draggable={!props.isRider}
            />
          )}

          {(acceptanceDetails?.riderLocationCoords?.lat ||
            riderLocationInfo.lat) &&
            !props.isRider && (
              <MarkerF
                style={{ fontSize: "10px" }}
                onLoad={() => console.log("loaded")}
                position={
                  riderLocationInfo.lat
                    ? riderLocationInfo
                    : acceptanceDetails?.riderLocationCoords
                }
                icon={{
                  url: "/bike.png",
                }}
              />
            )}
          {!props.isRider && (
            <div className={styles.map}>
              {searchStep === 1 && (
                <div className="flex items-center gap-1">
                  <MapSearch
                    setCurrentPickUpLoc={setCurrentPickUpLoc}
                    searchStep={searchStep}
                    setCenter={setCenter}
                    showCurrentIcon={true}
                    placeholder="Pickup Address"
                  />

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
                    setCenter={setCenter}
                    placeholder="Destination Address"
                  />
                  <ArrowBackIcon
                    className={styles.custom}
                    onClick={() => setSearchStep(1)}
                  />
                  <CheckIcon
                    className={styles.custom}
                    onClick={() => setOpenRideDetailsDiv(true)}
                  />
                </div>
              )}
            </div>
          )}
          <div className={styles.userMenu}>
            <UserMenu />
          </div>
          {openRideDetailsDiv && (
            <div className={styles.rideInfo}>
              <p className="text-blue-500 font-bold">
                Total distance: {distance} km
              </p>
              <p className="text-blue-500 font-bold">
                Total amount: Nrs. {price}
              </p>
              {JSON.stringify(riderLocationInfo)}
              <p className="text-blue-500 font-bold">
                Time Estimate:{" "}
                {routeResponse?.routes?.[0]?.legs?.[0]?.duration?.text}
              </p>
              <div className="flex flex-row items-center mt-4 justify-between">
                <p className="text-blue-500 font-bold">Schedule Ride: </p>
                <Switch
                  checked={switchCheck}
                  onChange={handleSwitch}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              {switchCheck ? (
                <DateTimePicker
                  value={date}
                  onChange={handleDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              ) : null}

              {Object.keys(acceptanceDetails).length === 0 ? (
                <button
                  onClick={handleRideRequest}
                  className="bg-transparent w-full mt-4 py-1 font-semibold text-blue-500 border-2 border-blue-500 rounded-md hover:bg-blue-500 hover:text-white"
                >
                  {rideRequested
                    ? "Please wait for rider confirmation"
                    : "Make a Ride"}{" "}
                </button>
              ) : (
                <p className="text-blue-500 font-bold">
                  Rider : {acceptanceDetails?.fullName} (
                  {acceptanceDetails?.phoneNumber}) is on his way
                </p>
              )}
            </div>
          )}
        </GoogleMap>
      </LocalizationProvider>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <DotWave size={70} speed={1} color="#2563eb" />
    </div>
  );
}

export default index;
