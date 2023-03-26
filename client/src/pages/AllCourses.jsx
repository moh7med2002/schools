import { Container, Grid } from '@mui/material';
import React from 'react'
import Course from '../components/home/Course';
import MainLayout from '../components/home/MainLayout'
import Loading from '../components/Loading'
import {useCoursesData} from '../hooks/useFetchCourses'

export default function AllCourses() {
    const {isLoading , data} = useCoursesData();
  return (
    <MainLayout>
        {
            isLoading
            ?
            <Loading/>
            :
            <Container sx={{marginY:"50px"}}>
                <Grid container spacing={3} sx={{marginTop:"15px"}}>
                {
                    data.courses.map(course=>{
                        console.log(course);
                        return <Grid key={course.id+"njwvgwsh"} item xs={12} sm={6} md={4}>
                        <Course Course={course}/>
                    </Grid>
                    })
                }
                </Grid>
            </Container>
        }
    </MainLayout>
  )
}
