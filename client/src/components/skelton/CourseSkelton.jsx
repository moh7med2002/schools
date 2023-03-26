import { Paper, Skeleton, Stack, styled } from '@mui/material'
import React from 'react'

const ImageSkelton = styled(Skeleton)({
    width:"100%",
    borderRadius:"15px 15px 0 0",
    height:"280px"
})

export default function CourseSkelton() {
  return (
    <Paper  sx={{borderRadius:"15px", paddingBottom:"20px"}}>
        <ImageSkelton variant="rectangular"/>
        <Stack direction={"row"} spacing={2} sx={{paddingX:"15px" , marginTop:"6px"}}>
            <Skeleton variant="circular" width={40} height={40}/>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100}/>
        </Stack>
    </Paper>
  )
}
