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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export const EmpSalaryUpdate = () => {
  const [empId, setEmpId] = useState("");
  const [newSalary, setNewSalary] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const adminId = 1;
  const navigate = useNavigate();

  const handleUpdateSalary = async () => {
    const salaryValue = parseFloat(newSalary);
    const idValue = parseInt(empId);

    if (!idValue || !salaryValue || salaryValue <= 0) {
      setSnackbar({ open: true, message: "Enter valid ID and Salary", severity: "error" });
      return;
    }

    const employee = {
      id: idValue,
      salary: salaryValue
    };

    try {
      const res = await fetch(`http://localhost:8080/admin/employee/salaryUpdate/${adminId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
      });

      if (!res.ok) throw new Error("Salary update failed");
      setSnackbar({ open: true, message: "Salary updated successfully", severity: "success" });
      setEmpId("");
      setNewSalary("");
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Salary update failed", severity: "error" });
    }
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          backgroundColor: "#1c70ed",
          minWidth: "100vw",
          minHeight: '100vh',
          alignItems: "center",
          justifyContent: "center",
          position: "relative" // for positioning the back button
        }}
      >
        {/* Back button at top-left */}
        <IconButton
          onClick={() => navigate("/adminhome")}
          sx={{ position: "absolute", top: 16, left: 16, color: "#fff" }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box
          sx={{
            bgcolor: '#cfe8fc',
            width: { xs: "100%", sm: "50%", md: "40%" },
            gap: 2,
            p: { xs: 4, sm: 6, md: 8 },
            borderRadius: 2,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Update Employee Salary
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Employee ID"
              type="number"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              fullWidth
            />
            <TextField
              label="New Salary"
              type="number"
              value={newSalary}
              onChange={(e) => setNewSalary(e.target.value)}
              fullWidth
            />

            <Button variant="contained" color="primary" onClick={handleUpdateSalary}>
              Update Salary
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
    </>
  );
};
