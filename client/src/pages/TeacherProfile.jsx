import styled from '@emotion/styled';
import { Avatar, Box, Container, Paper, Stack, Typography } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'
import MainLayout from '../components/home/MainLayout';
import Loading from '../components/Loading';
import { useSingleTeacher } from '../hooks/useSingleTeacher';

const Circle = styled(Box)({
    width:"14px",
    height:"14px",
    borderRadius:"50%",
    backgroundColor:'gray'
})

export default function TeacherProfile() {
    const {teacherId} = useParams();
    const {data , isLoading} = useSingleTeacher(teacherId);
  return (
    <MainLayout>
        <Container sx={{minHeight:'70vh'}}>
            {
                isLoading
                ?
                <Loading/>
                :
                <Box sx={{marginTop:"40px" , marginBottom:"80px"}}>
                <Paper sx={{marginY:"10px" , padding:"40px 20px" , width:"fit-content"}}>
                    <Stack direction={"row"} alignItems="center" justifyContent={"space-between"}>
                        <Avatar
                        sx={{width:{sm:"200px", xs:"140px"} , height:{sm:"200px", xs:"140px"} , fontSize:"80px"}}
                        alt={data?.teacher?.name}
                        src={`${process.env.REACT_APP_API}images/${data?.teacher?.image}`}
                        />
                    </Stack>
                </Paper>
                <Box sx={{marginTop:"30px"}}>
                    <Typography sx={{fontWeight:"bold" , fontSize:"20px"}}>الإيميل</Typography>
                    <Stack direction={"row"} alignItems="center"  spacing={"6px"} sx={{marginTop:"10px"}}>
                        <Circle/>
                        <Typography>{data?.teacher?.email}</Typography>
                    </Stack>
                </Box>
                <Box sx={{marginTop:"30px"}}>
                    <Typography sx={{fontWeight:"bold" , fontSize:"20px"}}>الإسم</Typography>
                    <Stack direction={"row"} alignItems="center"  spacing={"6px"} sx={{marginTop:"10px"}}>
                        <Circle/>
                        <Typography>{data?.teacher?.name}</Typography>
                    </Stack>
                </Box>
                <Box sx={{marginTop:"30px"}}>
                    <Typography sx={{fontWeight:"bold" , fontSize:"20px"}}>الجنس</Typography>
                    <Stack direction={"row"} alignItems="center"  spacing={"6px"} sx={{marginTop:"10px"}}>
                        <Circle/>
                        <Typography>{data?.teacher?.gender==="male"?"ذكر":"أنثى"}</Typography>
                    </Stack>
                </Box>
                <Box sx={{marginTop:"30px"}}>
                    <Typography sx={{fontWeight:"bold" , fontSize:"20px"}}>عدد سنوات الخبرة</Typography>
                    <Stack direction={"row"} alignItems="center"  spacing={"6px"} sx={{marginTop:"10px"}}>
                        <Circle/>
                        <Typography>{data?.teacher?.yearsOfExperience}</Typography>
                    </Stack>
                </Box>
                <Box sx={{marginTop:"30px"}}>
                    <Typography sx={{fontWeight:"bold" , fontSize:"20px"}}>نبذة عن المعلم</Typography>
                    <Stack direction={"row"} alignItems="center"  spacing={"6px"} sx={{marginTop:"10px"}}>
                        <Circle/>
                        <Typography>{data?.teacher?.about}</Typography>
                    </Stack>
                </Box>
                </Box>
            }
        </Container>
    </MainLayout>
  )
}
