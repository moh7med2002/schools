import { Box ,Button} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function RegisterTabs({isStudent,isTeacher}) {
    const navigate = useNavigate()
    return (
        <Box sx={{display:"flex",justifyContent:"center",columnGap:"14px"}}>
            <Button onClick={()=>navigate('/register_student')} variant="contained" color={isTeacher&&"White"}>تسجيل كطالب</Button>
            <Button onClick={()=>navigate('/register_teacher')} variant="contained" color={isStudent&&"White"}>تسجيل كمعلم</Button>
        </Box>
    )
}
