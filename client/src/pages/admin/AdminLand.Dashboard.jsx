import { Grid } from '@mui/material'
import React from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import LastStudents from '../../components/admin/LastStudents'
import LastTeachers from '../../components/admin/LastTeachers'
import DetailsBannser from '../../components/home/DetailsBannser'

export default function AdminLandDashboard() {

  return (
    <AdminLayout>
      <DetailsBannser/>
      <Grid container spacing={2}>
        <Grid item sm={12} md={6} sx={{overflow:"auto"}}>
          <LastTeachers/>
        </Grid>
        <Grid item sm={12} md={6} sx={{overflow:"auto"}}>
          <LastStudents/>
        </Grid>
      </Grid>
    </AdminLayout>
  )
}
