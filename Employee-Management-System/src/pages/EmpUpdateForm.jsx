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

export const EmpUpdateForm = () => {
  const [empId, setEmpId] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const adminId = 1; 
  const navigate = useNavigate();

  const handleUpdate = async () => {
    const idValue = parseInt(empId);

    if (!idValue) {
      setSnackbar({ open: true, message: "Enter valid ID", severity: "error" });
      return;
    }

    const employee = {
      id: idValue,
      name,
      contact,
      department,
      role
    };

    try {
      const res = await fetch(`http://localhost:8080/admin/updateEmpData/${adminId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
      });

      if (res.status === 200) {
        setSnackbar({ open: true, message: "Employee updated successfully", severity: "success" });
        setEmpId(""); setName(""); setContact(""); setDepartment(""); setRole("");
      } else if (res.status === 404) {
        setSnackbar({ open: true, message: "Employee ID not found", severity: "error" });
      } else if (res.status === 401) {
        setSnackbar({ open: true, message: "Unauthorized", severity: "error" });
      } else {
        setSnackbar({ open: true, message: "Failed to update employee", severity: "error" });
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
        position: "relative" // required for absolute positioning of back button
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
          Update Employee Data
        </Typography>

        <Stack spacing={2}>
          <TextField label="Employee ID" type="number" value={empId} onChange={(e) => setEmpId(e.target.value)} fullWidth />
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          <TextField label="Contact" value={contact} onChange={(e) => setContact(e.target.value)} fullWidth />
          <TextField label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} fullWidth />
          <TextField label="Role" value={role} onChange={(e) => setRole(e.target.value)} fullWidth />

          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update Employee
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
