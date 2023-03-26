import { Button, Grid , styled, Typography } from '@mui/material'
import React from 'react'
import LandImage from '../../images/landHero.jpg'

const Image = styled('img')({
    width:"100%",
    maxWidth:"500px"
})

export default function LandingSection() {
  return (
    <Grid container alignItems={"center"} spacing={3}>
        <Grid item xs={12} md={6} sx={{textAlign:{md:"start" , xs:"center"}}}>
            <Image src={LandImage} alt="صورة"/>
        </Grid>
        <Grid item xs={12} md={6} >
            <Typography variant='h4' sx={{fontWeight:"bold" , fontSize:{md:"32px", xs:"24px"}}}>التعلم اللامحدود اصبح في متناولك</Typography>
            <Typography sx={{marginY:"20px" , fontSize:"18px"}}>
             منصة ، مدرسة المستقبل . نحن نعلمك المهارات المناسبة للاستعداد للغد.
            </Typography>
            <Button variant='contained' sx={{minWidth:"100px"}}>
                إبدأ الأن
            </Button>
        </Grid>
    </Grid>
  )
}
