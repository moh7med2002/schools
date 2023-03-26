import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import Course from './Course'
import {useCoursesData} from '../../hooks/useFetchCourses'
import CourseSkelton from '../skelton/CourseSkelton';

export default function LastCourses() {
    const {data , isLoading} =  useCoursesData();
    console.log(data);
  return (
    <Box sx={{marginTop:"20px"}}>
        <Typography variant='h4' sx={{fontWeight:"bold" , fontSize:{md:"28px", xs:"22px"}}}>أحدث الدورات</Typography>
        {
            isLoading
            ?
            <Grid container spacing={3} sx={{marginTop:"15px"}}>
                <Grid  item xs={12} sm={6} md={4}>
                    <CourseSkelton/>
                </Grid>
                <Grid  item xs={12} sm={6} md={4}>
                    <CourseSkelton/>
                </Grid>
                <Grid  item xs={12} sm={6} md={4}>
                    <CourseSkelton/>
                </Grid>
            </Grid>
            :
            <Grid container spacing={3} sx={{marginTop:"15px"}}>
                {
                    data.courses.slice(0,3).map(course=>{
                        return <Grid key={course.id+"njwvg"} item xs={12} sm={6} md={4}>
                        <Course Course={course}/>
                    </Grid>
                    })
                }
            </Grid>
        }
    </Box>
  )
}
