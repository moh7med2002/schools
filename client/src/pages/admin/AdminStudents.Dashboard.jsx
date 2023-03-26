import React from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import Loading from '../../components/Loading';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useStudentsData } from '../../hooks/useFetchStudents';


const columns = [
    { id: 'name_student', label: 'إسم الطالب', minWidth: 150 },
    { id: 'student_email', label: 'الإيميل', minWidth: 150 },
  ];
  


export default function AdminDashboardStudents() {
    const {data , isLoading} = useStudentsData();
    const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <AdminLayout>
        {
            isLoading
            ?
            <Loading/>
            :
            <Paper sx={{ width: '100%'  , marginTop:"30px"}}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableRow sx={{backgroundColor:"#43d477" , color:"white"}}>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={"center"}
                            style={{ top: 57, minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    <TableBody>
                        {data?.students
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            console.log(row);
                            return <TableRow hover role="checkbox"  key={row.id+"demj"}>
                                <TableCell align='center'>
                                    {row.name}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.email}
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 15, 20]}
                    component="div"
                    count={data?.courses?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        }
    </AdminLayout>
  )
}
