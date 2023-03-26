import { Paper, Skeleton } from '@mui/material'
import React from 'react'

export default function TeacherSkelton() {
  return (
    <Paper sx={{padding:"15px" , marginY:"20px" , borderRadius:"12px" , display:"flex" , flexDirection:"column" , alignItems:"center"}}>
        <Skeleton variant="circular" width={100} height={100}/>
        <Skeleton variant="text" sx={{ fontSize: '1rem' , marginTop:"6px" , marginBottom:"10px"}} width={200}/>
        <Skeleton variant="rounded" sx={{  borderRadius:"20px", marginTop:"6px" , marginBottom:"10px"}} height={26} width={200}/>
    </Paper>
  )
}
