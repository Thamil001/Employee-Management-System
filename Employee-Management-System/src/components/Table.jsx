import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(id, name, contact, role, department, status, salary, Paid) {
  return { id, name, contact, role, department, status, salary, Paid };
}

export default function BasicTable({ data }) {

  const rows = data.map((item) =>
    createData(
      item.id,
      item.name,
      item.contact,
      item.role,
      item.department,
      item.status,
      item.salary,
      item.Paid

    )
  );


  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Contact</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Department</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Salary</TableCell>
              <TableCell align="left">Paid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.contact}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>
                  <span style={{ color: row.paid ? 'red' : 'green' }}>
                    {!row.status ? 'Absent' : 'Present'}
                  </span>
                </TableCell>
                <TableCell>${row.salary}</TableCell>
                <TableCell>
                  <span style={{ color: row.paid ? 'red' : 'green' }}>
                    {!row.paid ? 'Paid' : 'Not Paid'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

}
