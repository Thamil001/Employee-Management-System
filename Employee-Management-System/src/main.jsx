import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { EmpMain } from './pages/EmpMain';
import { DeleteEmployee } from './pages/DeleteEmployee'
import { EmpLogin } from './pages/EmpLogin'
import { GetEmployeeData } from './pages/GetEmployeeData'
import { AdminHome } from './pages/AdminHome'
import { AdminLogin } from './pages/AdminLogin'
import { EmpData } from './pages/EmpData'
import { EmpSalaryUpdate } from './pages/EmpSalaryUpdate'
import { EmpRegisterForm } from './pages/EmpRegisterForm'
import { EmpUpdateForm } from './pages/EmpUpdateForm'
import { EmpDataById } from './pages/EmpDataById'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<EmpMain />} />
        <Route path="/emplogin" element={<EmpLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/home" element={<GetEmployeeData />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/empdata" element={<EmpData />} />
        <Route path="/empsalaryupdate" element={<EmpSalaryUpdate />} />
        <Route path="/empregister" element={<EmpRegisterForm />} />
        <Route path="/empdataupdate" element={<EmpUpdateForm />} />
        <Route path="/empdatabyid" element={<EmpDataById />} />
        <Route path="/deleteempbyid" element={<DeleteEmployee />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
