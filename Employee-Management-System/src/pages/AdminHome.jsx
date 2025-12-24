import React from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  Card,
  CardContent,
  CardActionArea
} from "@mui/material";

import {
  AssignmentTurnedIn,
  CurrencyRupee,
  PersonAdd,
  Update,
  People,
  Search
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const dashboardButtons = [
  { label: "Emp Salary Update", icon: <CurrencyRupee fontSize="large" />, route: "/empsalaryupdate", color: "#1976d2" },
  { label: "Emp Register", icon: <PersonAdd fontSize="large" />, route: "/empregister", color: "#2e7d32" },
  { label: "Emp Data Update", icon: <Update fontSize="large" />, route: "/empdataupdate", color: "#ed6c02" },
  { label: "Emp Data", icon: <People fontSize="large" />, route: "/empdata", color: "#0288d1" },
  { label: "Delete Emp", icon: <AssignmentTurnedIn fontSize="large" />, route: "/deleteempbyid", color: "#d32f2f" },
  { label: "Get Emp Data By ID", icon: <Search fontSize="large" />, route: "/empdatabyid", color: "#7b1fa2" }
];

export const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f0f2f5", p: 4 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold", mb: 6 }}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {dashboardButtons.map((btn, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={6} sx={{ borderRadius: 3, overflow: "hidden", transition: "transform 0.2s", "&:hover": { transform: "scale(1.05)" } }}>
              <CardActionArea onClick={() => navigate(btn.route)}>
                <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 6, bgcolor: btn.color, color: "#fff" }}>
                  {btn.icon}
                  <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold", textAlign: "center" }}>
                    {btn.label}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
