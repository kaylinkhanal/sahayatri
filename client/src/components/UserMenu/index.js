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
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={styles.userMenu}>
      <Avatar onClick={() => setOpen(true)} sx={{ bgcolor: deepOrange[500] }}>
        {displayName()}
      </Avatar>
      <Menu
        id="basic-menu"
        open={open}
        MenuListProps={{
          "aria-labelledby": "basic-button",
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
