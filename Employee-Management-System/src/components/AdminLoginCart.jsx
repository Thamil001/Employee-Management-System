import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
export const AdminLoginCart = () => {

    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleCheckPassword = async () => {
        try {
            const response = await fetch("http://localhost:8080/admin/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parseInt(password, 10)),
            });

            if (response.status === 200) {
                navigate("/adminhome")
                setMessage("Password is correct!");
            } else if (response.status === 401) {
                setMessage("Unauthorized! Wrong password.");
            } else {
                setMessage("Something went wrong!");
            }
        } catch (error) {
            setMessage("Network error!");
            console.error(error);
        }
    };

    return (

        <Container sx={{ display: "flex", minHeight: '60vh', alignItems: "center", justifyContent: "center" }}>
            <Box sx={{ bgcolor: '#cfe8fc', width: { xs: "100%", sm: "50%", md: "40%" }, gap: 2, p: { xs: 4, sm: 6, md: 8 }, borderRadius: 2, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Typography gutterBottom variant="h5" fontSize={"2rem"} fontWeight={"bold"} component="div" >
                        Login
                    </Typography>
                </div>
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    sx={{ bgcolor: '#cfe8fc', borderRadius: "1px" }}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button variant="contained" color="primary" onClick={handleCheckPassword}>
                    Check Password
                </Button>
                {message && <Typography>{message}</Typography>}
            </Box>
        </Container>
    );
};