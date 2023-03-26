import { Avatar, Box  , Paper, Stack, styled, Typography} from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom'

const Image = styled('img')({
    width:"100%",
    height:"200px",
    borderRadius:"15px 15px 0 0"
});

const SubjectText = styled(Box)({
    width:"fit-content",
    padding:"3px 14px",
    borderRadius:"33px",
    backgroundColor:"#43d477",
    color:"white",
    fontSize:"14px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
})

export default function TeacherCourse({course}) {
    return (
        <Link to={`/teacher/dashboard/course/${course.id}`}>
            <Paper sx={{borderRadius:"15px", paddingBottom:"20px", ":hover":{translate:"0px -12px"}}} className="trans">
                <Image
                src={`${process.env.REACT_APP_API}images/${course.image}`}
                />
                <Box sx={{paddingX:"15px"}}>
                    <Typography sx={{marginTop:"12px" , fontWeight:"500" , minHeight:"38px"}}>{course.title}</Typography>
                    <Box sx={{display:"flex",justifyContent:"space-between",alginItems:"center"}}>
                        <SubjectText>{course.subject.title}</SubjectText>
                        <Stack direction={"row"} alignItems="center" spacing={1} sx={{marginTop:"12px"}}>
                            <Typography sx={{fontWeight:"bold",fontSize:"14px"}}>السعر :</Typography>
                            <Typography sx={{color:"#43d477" , fontWeight:"bold"}}>{course.price}</Typography>
                        </Stack>
                    </Box>
                </Box>
            </Paper>
        </Link>
    )
}

