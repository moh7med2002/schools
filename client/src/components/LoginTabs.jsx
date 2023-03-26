import { Box ,Button} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function RegisterTabs({isStudent,isTeacher,isAdmin}) {
    const navigate = useNavigate()
    return (
        <Box sx={{display:"flex",justifyContent:"center",columnGap:"14px"}}>
            <Button onClick={()=>navigate('/login_student')} variant="contained" color={isStudent?'primary':"White"}>تسجيل كطالب</Button>
            <Button onClick={()=>navigate('/login_teacher')} variant="contained" color={isTeacher?'primary':"White"}>تسجيل كمعلم</Button>
            <Button onClick={()=>navigate('/login_admin')} variant="contained" color={isAdmin?"primary":"White"}>تسجيل كأدمن</Button>
        </Box>
    )
}
