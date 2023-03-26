import React from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import Loading from '../../components/Loading';
import { useCoursesData } from '../../hooks/useFetchCourses';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


const columns = [
    { id: 'name_course', label: 'إسم الدورة', minWidth: 150 },
    { id: 'name_subject', label: 'إسم المادة', minWidth: 150 },
    { id: 'name_teacher', label: 'إسم المعلم', minWidth: 150 },
    { id: 'price', label: 'السعر', minWidth: 150 },
  ];
  


export default function AdminDashboardViewCourses() {
    const {data , isLoading} = useCoursesData();
    console.log(data);
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
                        {data?.courses
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            console.log(row);
                            return <TableRow hover role="checkbox"  key={row.id+"demj"}>
                                <TableCell align='center'>
                                    {row.title}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.subject.title}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.teacher.name}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.price}
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
