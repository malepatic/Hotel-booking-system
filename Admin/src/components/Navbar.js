import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch the user role from localStorage
  const userRole = localStorage.getItem("role");

  const handleLogout = () => {
    // Clear localStorage and redirect to login page
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  // Define navigation items based on role
  const navItems =
    userRole === "admin"
      ? [
          { label: "Admin Home", path: "/admin/home" },
          { label: "Dashboard", path: "/admin/dashboard" },
          { label: "Manage Hotels", path: "/admin/manage-hotels" },
          { label: "Manage Rooms", path: "/admin/manage-rooms" },
          { label: "Manage Orders", path: "/admin/orders" },
        ]
      : [
          { label: "Home", path: "/user/home" },
          { label: "Dashboard", path: "/user/dashboard" },
          { label: "Bookings", path: "/user/bookings" },
          { label: "Search Rooms", path: "/user/search-rooms" }, // Add search rooms
        ];

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          LivinBoston
        </Typography>
        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {navItems.map((item) => (
            <Button key={item.label} color="inherit" component={Link} to={item.path}>
              {item.label}
            </Button>
          ))}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
        {/* Mobile Navigation */}
        <IconButton
          color="inherit"
          edge="start"
          sx={{ display: { xs: "block", sm: "none" } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      {/* Drawer for Mobile View */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {navItems.map((item) => (
              <ListItem button key={item.label} component={Link} to={item.path}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
