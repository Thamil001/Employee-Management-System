import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { GetEmployeeData } from '../pages/GetEmployeeData';


export const Cart = () => {
    const navigate = useNavigate();
    const [isError, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("")
    const [id, setId] = useState(0)

    const checkValidInputs = () => {
        if (id <= 0) {
            setError(true)
            setMessage("id must grederthan 0")
            return false;
        }

        if (name.trim() === '') {
            setError(true)
            setMessage("Mention correct name")
            return false;
        }

        return true

    }

    const fetchData = async () => {
        if (!checkValidInputs()) return;

        setError(false);
        setMessage('');

        const payload = { id, name };

        try {
            
            const response = await fetch("http://localhost:8080/employee/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Invalid credentials");

            setMessage("Login Successfully!!!");

            
            const request = await fetch("http://localhost:8080/employee/data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: payload.id }),
            });

            if (!request.ok) throw new Error("Employee not found");

            const data = await request.json();

            
            navigate("/home", { state: { tableData: data } });

        } catch (e) {
            setError(true);
            setMessage(e.message || "Something went wrong");
        }
    };


    return (
        <>
            <Container sx={{ display: "flex", minHeight: '60vh', alignItems: "center", justifyContent: "center" }}>
                <Box sx={{ bgcolor: '#cfe8fc', width: { xs: "100%", sm: "50%", md: "40%" }, gap: 2, p: { xs: 4, sm: 6, md: 8 }, borderRadius: 2, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Typography gutterBottom variant="h5" fontSize={"2rem"} fontWeight={"bold"} component="div" >
                            Login
                        </Typography>
                    </div>
                    <TextField
                        id="empId"
                        label="Id"
                        type='number'
                        value={id}
                        onChange={(e) => setId(Number(e.target.value))}
                    />

                    <TextField
                        id="empName"
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Button variant="contained" onClick={fetchData}>Login</Button>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Typography color={isError ? 'error' : 'success.main'}>
                            {message}
                        </Typography>
                    </div>

                </Box>
            </Container>
        </>
    )
}


