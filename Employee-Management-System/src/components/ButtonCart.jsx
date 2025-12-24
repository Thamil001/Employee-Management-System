import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ButtonCart() {
    return (
        <>
           <Button variant="contained" onClick={()=>navigator('/admin')}>Contained</Button>
           
        </>
    )
}
