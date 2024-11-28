import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        mt: 4,
        py: 2,
        textAlign: "center",
        backgroundColor: "#f1f1f1",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Typography variant="body2">&copy; 2024 Hotel Booking. All Rights Reserved.</Typography>
    </Box>
  );
};

export default Footer;