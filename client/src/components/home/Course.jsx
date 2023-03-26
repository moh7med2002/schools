import { Avatar, Box  , Paper, Stack, styled, Typography} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';

const Image = styled('img')({
    width:"100%",
    borderRadius:"15px 15px 0 0",
    height:"280px"
});

const SubjectText = styled(Box)({
    width:"fit-content",
    padding:"5px 13px",
    borderRadius:"33px",
    marginTop:"13px",
    backgroundColor:"#43d477",
    color:"white"
})

export default function Course({Course}) {
  return (
    <Link to={`/courses/${Course.id}`}>
    <Paper sx={{borderRadius:"15px", paddingBottom:"20px", ":hover":{translate:"0px -12px"}}} className="trans">
        <Image
        src={`${process.env.REACT_APP_API}images/${Course.image}`}
        />
        <Box sx={{paddingX:"15px" , marginTop:"6px"}}>
            <Stack direction={"row"} alignItems="center" spacing={2}>
                <Avatar
                src={Course.teacher.image}
                alt={Course.teacher.name}
                />
                <Typography>الاستاذ : {Course.teacher.name}</Typography>
            </Stack>
            <Typography sx={{marginTop:"12px" , fontWeight:"500" , minHeight:"48px"}}>{Course.title}</Typography>
            <SubjectText>{Course.subject.title}</SubjectText>
            <Stack direction={"row"} alignItems="center" spacing={1} sx={{marginTop:"12px"}}>
                <Typography sx={{fontWeight:"bold"}}>السعر:</Typography>
                <Typography sx={{color:"#43d477" , fontWeight:"bold"}}>{Course.price}</Typography>
            </Stack>
        </Box>
    </Paper>
    </Link>
  )
}
