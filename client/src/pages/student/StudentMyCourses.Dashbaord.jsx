import { Container, Grid } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import Course from '../../components/home/Course';
import Loading from '../../components/Loading';
import StudentLayout from '../../components/student/StudentLayout'
import { useStudentCourses } from '../../hooks/useStudentCourses'

export default function StudentMyCoursesDashbaord() {
    const {token} = useSelector(s => s.student);
    const {isLoading , data} = useStudentCourses(token);
  return (
    <StudentLayout>
        {
            isLoading
            ?
            <Loading/>
            :
            <Container sx={{marginY:"20px"}}>
                <Grid container spacing={3} sx={{marginTop:"15px"}}>
                {
                    data.courses.map(course=>{
                        return <Grid key={course.id+"njg"} item xs={12} sm={12} md={6} lg={3}>
                        <Course Course={course}/>
                    </Grid>
                    })
                }
                </Grid>
            </Container>
        }
    </StudentLayout>
  )
}
