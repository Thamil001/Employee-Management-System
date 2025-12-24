import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
  Container,
  Alert,
  IconButton
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

export const EmpRegisterForm = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const adminId = 1; // logged-in admin ID
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name.trim() || !contact.trim()) {
      setSnackbar({ open: true, message: "Name and Contact are required", severity: "error" });
      return;
    }
    let dateStr = "2025-12-24T15:30:00Z";
    let date = new Date(dateStr);
    let joiningDate = date.toISOString().split('T')[0];
    const employee = {
      name,
      contact,
      department,
      role,
      salary: salary ? parseFloat(salary) : 0,
      joiningDate
    };

    try {
      const res = await fetch(`http://localhost:8080/admin/employee/registration/${adminId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
      });

      if (res.status === 201) {
        setSnackbar({ open: true, message: "Employee registered successfully", severity: "success" });
        setName(""); setContact(""); setDepartment(""); setRole(""); setSalary("");
        navigate("/adminhome");
      } else if (res.status === 400) {
        setSnackbar({ open: true, message: "Contact already exists or invalid input", severity: "error" });
      } else if (res.status === 401) {
        setSnackbar({ open: true, message: "Unauthorized", severity: "error" });
      } else {
        setSnackbar({ open: true, message: "Failed to register employee", severity: "error" });
      }
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Server error", severity: "error" });
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        backgroundColor:"#1c70ed",
        minWidth:"100vw",
        minHeight: '100vh',
        alignItems: "center",
        justifyContent: "center",
        position: "relative" // needed for back button
      }}
    >
      {/* Back Button */}
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
        <Typography variant="h5" align="center" gutterBottom>
          Register New Employee
        </Typography>

        <Stack spacing={2}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          <TextField label="Contact" value={contact} onChange={(e) => setContact(e.target.value)} fullWidth />
          <TextField label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} fullWidth />
          <TextField label="Role" value={role} onChange={(e) => setRole(e.target.value)} fullWidth />
          <TextField label="Salary" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} fullWidth />

          <Button variant="contained" color="primary" onClick={handleRegister}>
            Register Employee
          </Button>
        </Stack>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};
