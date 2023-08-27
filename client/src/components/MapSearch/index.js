import React from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NearMeIcon from '@mui/icons-material/NearMe';
import { Autocomplete } from '@react-google-maps/api';
function index(props) {
    return (
        <div style={{marginBottom:'7px'}}>
        <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
  
      <Autocomplete>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={props.placeholder}
        inputProps={{ 'aria-label': 'Pickup Address' }}
      />
      </Autocomplete>
     
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
     {props.showCurrentIcon && <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <NearMeIcon />
      </IconButton>}
    </Paper>
        </div>
    )
}

export default index
