import { Box, Container } from '@mui/material'
import React from 'react'
import DetailsBannser from '../components/home/DetailsBannser'
import LandingSection from '../components/home/LandingSection'
import LastCourses from '../components/home/LastCourses'
import MainLayout from '../components/home/MainLayout'
import TeachersSwiper from '../components/home/TeachersSwiper'

export default function Home() {
  return (
    <MainLayout>
      <Container sx={{marginY:"20px"}}>
        <LandingSection/>
        <DetailsBannser/>
        <LastCourses/>
        <TeachersSwiper/>
      </Container>
    </MainLayout>
  )
}
