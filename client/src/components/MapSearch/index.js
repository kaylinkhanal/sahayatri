import React, { useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NearMeIcon from "@mui/icons-material/NearMe";
import { Autocomplete } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import { setAddress, setCoords } from "../../redux/reducerSlices/locationSlice";
function index(props) {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const dispatch = useDispatch();
  const { destinationAddress, pickUpAddress } = useSelector(
    (state) => state.location
  );
  // const [inputValue, setInputValue] = useState(""
  //   );

  const handlePlaceChange = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      const formattedAddress = place.formatted_address;
      console.log(place);
      const location = place.geometry.location;
      const latitude = location.lat();
      const longitude = location.lng();
      const currentLocation = {
        lat: latitude,
        lng: longitude,
      };

      props.setCenter(currentLocation);
      const locType =
        props.searchStep == 1 ? "pickUpAddress" : "destinationAddress";

      // Update the input value with the formatted address
      dispatch(
        setCoords({
          currentLocation,
          cordType:
            locType == "pickUpAddress" ? "pickCords" : "destinationCords",
        })
      );

      dispatch(
        setAddress({
          addr: formattedAddress, // Update the Redux state with the formatted address
          locType:
            props.searchStep === 1 ? "pickUpAddress" : "destinationAddress",
        })
      );
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  //   const handlePlaceChange = (e) => {
  //     // console.log(inputRef.current.children[0].value)
  //     if (autocompleteRef.current !== null) {
  //       const place = autocompleteRef.current.getPlace();
  //       const a = place.formatted_address;
  //       console.log(a);
  //       inputRef.current.value = a;
  //     } else {
  //       console.log("Autocomplete is not loaded yet!");
  //     }
  //   };
  const handleInputChange = (e) => {
    const value = e.target.value;
    //setInputValue(value);

    dispatch(
      setAddress({
        addr: value,
        locType:
          props.searchStep === 1 ? "pickUpAddress" : "destinationAddress",
      })
    );
  };
  return (
    <div style={{ marginBottom: "7px" }}>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 300 }}
      >
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceChange}
        >
          <InputBase
            ref={inputRef}
            sx={{ ml: 1, flex: 1 }}
            //value={inputValue} // Use inputValue to control the value
            value={props.searchStep == 1 ? pickUpAddress : destinationAddress}
            placeholder={props.placeholder}
            onChange={handleInputChange}
            inputProps={{ "aria-label": "Pickup Address" }}
          />
        </Autocomplete>
        {/* <Autocomplete onPlaceChanged={handlePlaceChange}>
					<InputBase
						ref={inputRef}
						sx={{ ml: 1, flex: 1 }}
						value={props.searchStep == 1 ?  pickUpAddress : destinationAddress }
						placeholder={props.placeholder}
						onChange={(e)=> dispatch(setAddress({addr: e.target.value, locType:props.searchStep == 1 ? 'pickUpAddress': 'destinationAddress'}))}
						inputProps={{ "aria-label": "Pickup Address" }}
					/>
				</Autocomplete> */}

        {/* <Autocomplete onLoad={autocomplete => autocompleteRef.current = autocomplete} onPlaceChanged={handlePlaceChange}>
          <InputBase
            ref={inputRef}
            sx={{ ml: 1, flex: 1 }}
            
			value={props.searchStep == 1 ?  pickUpAddress : destinationAddress }

            placeholder={props.placeholder}
            onChange={handleInputChange}
            inputProps={{ "aria-label": "Pickup Address" }}
          />
        </Autocomplete> */}

        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        {props.showCurrentIcon && (
          <IconButton
            color="primary"
            sx={{ pl: "10px" }}
            aria-label="directions"
          >
            <NearMeIcon onClick={() => props.setCurrentPickUpLoc()} />
          </IconButton>
        )}
      </Paper>
    </div>
  );
}

export default index;
