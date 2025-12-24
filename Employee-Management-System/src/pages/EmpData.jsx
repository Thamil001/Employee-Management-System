import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Chip,
  Button,
  Stack,
  IconButton
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

export const EmpData = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const adminId = 1;
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await fetch("http://localhost:8080/admin/getEmployeeData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: adminId })
      });

      if (!response.ok) throw new Error("Error fetching data");
      const data = await response.json();
      setEmployees(data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateAttendance = async (empId) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/employeeStatus/${empId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: adminId })
      });

      if (!response.ok) throw new Error("Update failed");
      fetchEmployeeData(); // refresh data
    } catch (error) {
      console.error("Attendance update failed", error);
    }
  };

  return (
    <Box sx={{ p: 4, position: "relative" }}>
      {/* Back Button */}
      <IconButton
        onClick={() => navigate("/adminhome")}
        sx={{ position: "absolute", top: 16, left: 16, color: "#1c70ed" }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Typography variant="h4" align="center" gutterBottom>
        Employee Data & Attendance
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Joining Date</b></TableCell>
                <TableCell><b>Contact</b></TableCell>
                <TableCell><b>Department</b></TableCell>
                <TableCell><b>Role</b></TableCell>
                <TableCell><b>Salary</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Paid</b></TableCell>
                <TableCell><b>Attendance</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.id}</TableCell>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.joiningDate}</TableCell>
                  <TableCell>{emp.contact}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>{emp.role}</TableCell>
                  <TableCell>₹{emp.salary}</TableCell>
                  <TableCell>
                    <Chip label={emp.status ? "Present" : "Absent"} color={emp.status ? "success" : "error"} size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip label={emp.Paid ? "Paid" : "Unpaid"} color={emp.Paid ? "primary" : "warning"} size="small" />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        disabled={emp.status}
                        onClick={() => updateAttendance(emp.id)}
                      >
                        Present
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        disabled={!emp.status}
                        onClick={() => updateAttendance(emp.id)}
                      >
                        Absent
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
