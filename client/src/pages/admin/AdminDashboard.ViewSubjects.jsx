import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import AdminLayout from '../../components/admin/AdminLayout';
import Loading from '../../components/Loading';
import { useSubjectsData } from '../../hooks/useFetchSubjects';


export default function AdminDashboardViewSubjects() {
    const {data , isLoading} = useSubjectsData();
  return (
    <AdminLayout>
        {
            isLoading
            ?
            <Loading/>
            :
            <Grid container spacing={2}>
                {
                    data?.subjects.map(sub=>{
                        return <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Box sx={{backgroundColor:"#1f3b64" , color:"white" , padding:"20px 14px", borderRadius:"6px"}}>
                                <Typography sx={{marginBottom:"10px"}}>إسم المادة : {sub.title}</Typography>
                                <Typography> عدد الدورات : {sub.courses.length}</Typography>
                            </Box>
                        </Grid>
                    })
                }
            </Grid>
        }
    </AdminLayout>
  )
}
