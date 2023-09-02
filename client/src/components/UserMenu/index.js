import React, { useState } from "react";

import { handleLogout } from "../../redux/reducerSlices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/router";
import styles from "../../styles/userMenu.module.css";

function UserMenu() {
  const router = useRouter();
  const { userDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const displayName = () => {
    const { fullName } = userDetails;
    const fullNameArr = fullName.split(" ");
    return fullNameArr[0][0] + fullNameArr[fullNameArr.length - 1][0];
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.userMenu}>
        <Avatar 
          onClick={handleClick} 
          sx={{ bgcolor: deepOrange[500] }}
        >
          {displayName()}
        </Avatar>
      
      
        <Menu
         id="basic-menu"
         anchorEl={anchorEl}
         open={open}
         onClose={handleClose}
         MenuListProps={{
           'aria-labelledby': 'basic-button',
         }}
        >                           
          <MenuItem onClick={() => router.push("/profile")}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={() => dispatch(handleLogout())}>Logout</MenuItem>
        </Menu>
    </div>
  );
}

export default UserMenu;
