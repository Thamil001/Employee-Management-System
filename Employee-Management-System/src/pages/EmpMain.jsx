import React from "react";
import { Box, Typography, Button, Stack, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const EmpMain = () => {
  const navigate = useNavigate();
  const handleAdminClick = () => {
    navigate("/adminlogin")
  };

  const handleEmployeeClick = () => {
    navigate("/emplogin")
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
        flexDirection: "column",
        textAlign: "center",
        color: "#fff",
        px: 2
      }}
    >
      <Container maxWidth="md">
        {/* Main Title */}
        <Typography
          variant="h1"
          sx={{
            fontWeight: "bold",
            mb: 4,
            fontSize: { xs: "2rem", sm: "5rem", md: "4rem" },
            textShadow: "3px 3px 10px rgba(0,0,0,0.3)"
          }}
        >
          Employee Management System
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="h5"
          sx={{
            mb: 6,
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
            textShadow: "2px 2px 6px rgba(0,0,0,0.2)"
          }}
        >
          Manage employees efficiently, track attendance and salaries with ease
        </Typography>

        {/* Buttons */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          justifyContent="center"
        >
          <Button
            variant="contained"
            size="large"
            color="secondary"
            sx={{
              px: 6,
              py: 2.5,
              fontSize: "1.5rem",
              fontWeight: "bold",
              borderRadius: 2,
              boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
              transition: "all 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 8px 20px rgba(0,0,0,0.4)"
              }
            }}
            onClick={handleAdminClick}
          >
            Admin
          </Button>

          <Button
            variant="contained"
            size="large"
            color="primary"
            sx={{
              px: 6,
              py: 2.5,
              fontSize: "1.5rem",
              fontWeight: "bold",
              borderRadius: 2,
              boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
              transition: "all 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 8px 20px rgba(0,0,0,0.4)"
              }
            }}
            onClick={handleEmployeeClick}
          >
            Employee
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
