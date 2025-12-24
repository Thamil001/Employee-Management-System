import React, { useState } from "react";
import { TextField, Button, Typography, Box, Alert, IconButton } from "@mui/material";
import Container from '@mui/material/Container';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

export const DeleteEmployee = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    setMessage("");
    setError("");

    if (!employeeId) {
      setError("Please enter an employee ID.");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete employee with ID ${employeeId}?`
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8080/admin/deleteEmpData/${employeeId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: 1 }), // AdminEntity id = 1
        }
      );

      if (response.status === 200) {
        setMessage(`Employee with ID ${employeeId} deleted successfully.`);
        setEmployeeId("");
      } else if (response.status === 404) {
        setError("Employee not found.");
      } else if (response.status === 401) {
        setError("Unauthorized request. Admin ID invalid.");
      } else {
        setError("Something went wrong.");
      }
    } catch (err) {
      console.log(err);
      setError("Network error or CORS issue.");
    }
  };

  return (
    <Container 
      sx={{ 
        display: "flex", 
        backgroundColor: "#1c70ed", 
        minWidth: "100vw", 
        minHeight: '100vh', 
        alignItems: "center", 
        justifyContent: "center",
        position: "relative" // for absolute positioning back button
      }}
    >
      {/* Back button */}
      <IconButton
        onClick={() => navigate("/adminhome")}
        sx={{ position: "absolute", top: 16, left: 16, color: "#fff" }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Box sx={{ 
        bgcolor: '#cfe8fc', 
        width: { xs: "100%", sm: "50%", md: "40%" }, 
        gap: 2, 
        p: { xs: 4, sm: 6, md: 8 }, 
        borderRadius: 2, 
        display: "flex", 
        flexDirection: "column" 
      }}>
        <Typography variant="h5">Delete Employee Data By Id</Typography>

        <TextField
          label="Employee ID"
          variant="outlined"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />

        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete Employee
        </Button>

        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Container>
  );
};
