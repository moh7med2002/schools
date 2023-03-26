import { Grid, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import TeacherCourse from '../../components/teacher/TeacherCourse'
import TeacherLayout from '../../components/teacher/TeacherLayout'
import { useTeacherCourses } from '../../hooks/useTeacherCourses'

export default function TeacherCoursesDashboard() {
    const {token} = useSelector(s => s.teacher );
    const {isLoading , data} = useTeacherCourses(token);
  return (
    <TeacherLayout>
        <Typography variant='h4' sx={{fontWeight:"bold" , fontSize:"30px"}}>دوراتي</Typography>
        {
            isLoading
            ?
            <Loading/>
            :
            <Grid container sx={{marginTop:"40px"}} spacing={3}>
                {
                    data?.courses?.map(course=>{
                        return <Grid xs={12} sm={6} md={4} lg={3} item key={course.id+"jb"}>
                            <TeacherCourse course={course}/>
                        </Grid>
                    })
                }
            </Grid>
        }
    </TeacherLayout>
  )
}
