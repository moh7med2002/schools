import { Box ,styled, Typography } from '@mui/material'
import React from 'react'

const Frame = styled("iframe")({
    maxWidth:"100%"
})

export default function VideoLesson({lesson}) {
  return (
    <Box>
        <Typography sx={{fontSize:"22px", marginBottom:"20px"}}>{lesson.title}</Typography>
        <Box sx={{display:"flex"}}>
            <Frame src={lesson.url} width="860px" height="350px" allowfullscreen frameborder="0"></Frame>
        </Box>
    </Box>
  )
}
