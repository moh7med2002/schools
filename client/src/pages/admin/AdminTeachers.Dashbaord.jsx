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
import { useTeachersData } from '../../hooks/useFetchTeachers';


const columns = [
    { id: 'name_teacher', label: 'إسم المعلم', minWidth: 150 },
    { id: 'name_email', label: 'الإيميل', minWidth: 150 },
    { id: 'name_years', label: 'سنوات الخبرة', minWidth: 150 },
  ];
  


export default function AdminDashboardTeachers() {
    const {data , isLoading} = useTeachersData();
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
                        {data?.teachers
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
                                <TableCell align='center'>
                                    {row.yearsOfExperience}
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
