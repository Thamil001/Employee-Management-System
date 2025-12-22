import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import style from '../css/GetEmployeeData.module.css'
import Table from '../components/Table'
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';

export const GetEmployeeData = () => {
  const { state } = useLocation();
  const tableData = state?.tableData || [];
  return (
    <>
      <div className={style.cart}>
        <Typography gutterBottom variant="h5" fontSize={"2rem"} fontWeight={"bold"} component="div" >
          Employee Data
        </Typography>
        <Table data={tableData} />
      </div>
    </>
  )
}
