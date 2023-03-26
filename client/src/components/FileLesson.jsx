import { Box, Paper, Typography,Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import { FileIcon, defaultStyles } from 'react-file-icon';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';



export default function FileLesson({lesson}) {
    return (
        <Paper sx={{padding:"20px",border:"#7090B0 2px solid",borderRadius:"10px"}}>
            <Grid container sx={{alignItems:"center"}} spacing={2}>
                <Grid item xs={12} md={4} lg={3} sx={{display:"flex",justifyContent:"center"}}>
                    <Box sx={{width:"100px"}}>
                        <FileIcon extension={lesson.url.split('.')[lesson.url.split('.').length-1]} {...defaultStyles[lesson.url.split('.')[lesson.url.split('.').length-1]]} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Typography sx={{fontSize:"20px",textAlign:"center",fontWeight:"700"}}>الدرس : {lesson.title}</Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={3} sx={{display:"flex",flexDirection:"column",rowGap:"8px"}}>
                    <a href={`${process.env.REACT_APP_API}images/${lesson.url}`} download style={{display:"block" , width:"100%"}}>
                        <Button color="secondary" variant='contained' fullWidth startIcon={<CloudDownloadIcon/>}>تحميل</Button>                   
                    </a>
                </Grid>
            </Grid>
        </Paper>
    )
}
