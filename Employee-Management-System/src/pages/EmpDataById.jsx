import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    CircularProgress,
    Snackbar,
    Alert,
    Chip,
    IconButton,
    Container
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

export const EmpDataById = () => {
    const [Id, setId] = useState("");
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });
    const navigate = useNavigate();
    const adminId = 1; // logged-in admin id

    const fetchEmployee = async () => {
        if (!Id) {
            setSnackbar({ open: true, message: "Enter Employee ID", severity: "error" });
            return;
        }

        setLoading(true);
        setEmployee(null);

        try {
            const res = await fetch(`http://localhost:8080/admin/getEmployeeDataById/${Id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: adminId })
            });

            if (res.status === 200) {
                const data = await res.json();
                setEmployee(data);
            } else if (res.status === 401) {
                setSnackbar({ open: true, message: "Unauthorized", severity: "error" });
            } else if (res.status === 404) {
                setSnackbar({ open: true, message: "Employee not found", severity: "error" });
            } else {
                setSnackbar({ open: true, message: "Employee not not found", severity: "error" });
            }
        } catch (err) {
            console.error(err);
            setSnackbar({ open: true, message: "Server error", severity: "error" });
        } finally {
            setLoading(false);
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
            <IconButton
                onClick={() => navigate("/adminhome")}
                sx={{ position: "absolute", top: 16, left: 0, color: "#ffffffff" }}
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
                {/* Back Button */}


                <Typography variant="h5" align="center" gutterBottom>
                    Employee Details by ID
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <TextField
                        label="Employee ID"
                        type="number"
                        value={Id}
                        onChange={(e) => setId(e.target.value)}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" onClick={fetchEmployee}>
                        Get
                    </Button>
                </Box>

                {loading && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                        <CircularProgress />
                    </Box>
                )}

                {employee && (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><b>ID</b></TableCell>
                                    <TableCell>{employee.id}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>Name</b></TableCell>
                                    <TableCell>{employee.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>Joining Date</b></TableCell>
                                    <TableCell>{employee.joiningDate}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>Contact</b></TableCell>
                                    <TableCell>{employee.contact}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>Department</b></TableCell>
                                    <TableCell>{employee.department}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>Role</b></TableCell>
                                    <TableCell>{employee.role}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>Salary</b></TableCell>
                                    <TableCell>₹{employee.salary}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>Status</b></TableCell>
                                    <TableCell>
                                        <Chip
                                            label={employee.status ? "Present" : "Absent"}
                                            color={employee.status ? "success" : "error"}
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>Paid</b></TableCell>
                                    <TableCell>
                                        <Chip
                                            label={employee.Paid ? "Paid" : "Unpaid"}
                                            color={employee.Paid ? "primary" : "warning"}
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

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
