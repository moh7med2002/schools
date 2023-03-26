import { Stack } from '@mui/material'
import React from 'react'
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {
  return (
    <Stack 
    component={"footer"}
    sx={{backgroundColor:"#1f3b64" , height:"200px"}} direction="row" justifyContent={"center"} alignItems="center" spacing={2}>
        <FacebookSharpIcon sx={{color:"white" , fontSize:"40px"}}/>
        <InstagramIcon sx={{color:"white" , fontSize:"40px"}}/>
        <TwitterIcon sx={{color:"white" , fontSize:"40px"}}/>
    </Stack>
  )
}
