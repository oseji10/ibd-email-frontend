import React, { useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";

import axios from 'axios';
import Cookies from 'js-cookie'; // if you're storing the token in cookies
import { useRouter } from 'next/navigation'; // for navigation


const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const router = useRouter();  // Initialize useRouter at the top level

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const logout = async () => {
    try {
      // Send a logout request to the API
      const token = Cookies.get('token'); // if token is stored in cookies
      // Or if using localStorage
      // const token = localStorage.getItem('token');

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/logout`,
        {}, // no data required
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );

      // Clear token from cookies or local storage
      Cookies.remove('token');
      // Or if using localStorage
      // localStorage.removeItem('token');

      // Redirect to login page
      router.push('/'); // Redirect to login or any other page

      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleLogout = async () => {
    try {
      // Call your logout function here
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src="/images/profile/user-1.jpg"
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>My Tasks</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
