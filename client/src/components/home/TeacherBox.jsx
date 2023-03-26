import { Avatar, Button, Paper , styled, Typography} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Image = styled('img')({
    width:"100px",
    height:"100px",
    borderRadius:"50%"
})

export default function TeacherBox({teacher}) {
  return (
    <Paper sx={{padding:"15px" , marginY:"20px" , borderRadius:"12px" , textAlign:"center"}}>
        <Avatar
        sx={{width:"100px" , height:"100px" , marginX:"auto"}}
        src={`${process.env.REACT_APP_API}images/${teacher.image}`}
        alt={teacher.name}
        />
        <Typography sx={{marginTop:"6px" , fontWeight:"600" , marginBottom:"10px"}}>
            {teacher.name}
        </Typography>
        <Link to={`/teacher/${teacher.id}`}>
          <Button variant='contained' sx={{borderRadius:"20px"}}>
              الملف الشخصي
          </Button>
        </Link>
    </Paper>
  )
}
