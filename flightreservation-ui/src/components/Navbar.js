import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>

        <Button color="inherit" onClick={handleMenuOpen}>
          Menu
        </Button>

        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem
            onClick={() => {
              navigate("/home");
              handleMenuClose();
            }}
          >
            Home
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/flights");
              handleMenuClose();
            }}
          >
            Flights
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/add-flight");
              handleMenuClose();
            }}
          >
            Add flight
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
