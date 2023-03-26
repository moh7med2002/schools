import React from 'react'
import TeacherLayout from '../../components/teacher/TeacherLayout'
import { useParams } from 'react-router-dom'
import { Box,styled, Typography,Container, Button, Dialog } from '@mui/material'
import Unit from '../../components/Unit'
import { useState } from 'react'
import CreateUnit from '../../components/teacher/CreateUnit'
import { useSingleCourses } from '../../hooks/useSingleCourse'
import Loading from '../../components/Loading'

const ImageWrapper = styled(Box)({
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    height:"45vh",
    position:"relative"
})

export default function TeacherSingleCourseDashboard() {
    const {courseId} = useParams()
    const [openAddUnit,setOpenAddUnit] = useState(false);

    const {data , isLoading} = useSingleCourses(courseId);

    return (
        <TeacherLayout>
            {
                isLoading
                ?
                <Loading/>
                :
                <>
                <ImageWrapper className='overlay' sx={{backgroundImage:`url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh32ibbQfJAt8Odvhk4mVLXow_fURyQRWQTw&usqp=CAUv)`}}>
                <Box sx={{position:"absolute",top:"50%",left:"20px",zIndex:"5",color:"white"}}>
                    <Typography sx={{fontSize:"24px",fontWeight:"700",marginBottom:"30px"}}> {data.course.title} - {data.course.subject.title}</Typography>
                </Box>
                </ImageWrapper>
                <Container sx={{paddingY:"20px"}}>
                    <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"30px"}}>
                        <Typography sx={{fontSize:"20px",fontWeight:"700"}}>محتوى الدورة : </Typography>
                        <Button variant="contained" color="secondary" onClick={()=>setOpenAddUnit(true)}>إضافة وحدة</Button>
                    </Box>
                    {
                        data.course.units.map((unit , index)=>{
                            return <Box key={unit.id} sx={{marginBottom:"40px"}}>
                                <Unit unit={unit} index={index} isTeacher={true}/>
                            </Box>
                        })
                    }
                    <Dialog open={openAddUnit} onClose={()=>setOpenAddUnit(false)}>
                        <CreateUnit setOpenAddUnit={setOpenAddUnit} courseId={courseId}/>
                    </Dialog>
                </Container>
                </>
            }
        </TeacherLayout>
    )
}
