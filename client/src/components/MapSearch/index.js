import React, {useRef} from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NearMeIcon from "@mui/icons-material/NearMe";
import { Autocomplete } from "@react-google-maps/api";
import {useSelector, useDispatch} from 'react-redux'
import {setAddress} from '../../redux/reducerSlices/locationSlice'
function index(props) {
	const inputRef=  useRef(null)
	const dispatch = useDispatch()
const {destinationAddress, pickUpAddress} = useSelector(state=>state.location)
const handlePlaceChange = ()=> {
	console.log(inputRef.current.children[0].value)
}
	return (
		<div style={{ marginBottom: "7px" }}>
			<Paper
				component="form"
				sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 300 }}
			>
				<Autocomplete onPlaceChanged={handlePlaceChange}>
					<InputBase
						ref={inputRef}
						sx={{ ml: 1, flex: 1 }}
						placeholder={props.placeholder}
						onChange={(e)=> dispatch(setAddress({addr: e.target.value, locType:props.searchStep == 1 ? 'pickUpAddress': 'destinationAddress'}))}
						inputProps={{ "aria-label": "Pickup Address" }}
					/>
				</Autocomplete>

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
						<NearMeIcon onClick={()=>props.setCurrentPickUpLoc()} />
					</IconButton>
				)}
			</Paper>
		</div>
	);
}

export default index;
