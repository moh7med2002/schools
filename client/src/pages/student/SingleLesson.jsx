import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useParams } from 'react-router-dom'
import FileLesson from '../../components/FileLesson';
import MainLayout from '../../components/home/MainLayout';
import Loading from '../../components/Loading';
import TeacherLayout from '../../components/teacher/TeacherLayout'
import VideoLesson from '../../components/VideoLesson';
import { useSingleLesson } from '../../hooks/useSingleLesson';

export default function SingleLesson() {
    const {lessonId} = useParams();
    const { isLoading , data} = useSingleLesson(lessonId); 

  return (
    <MainLayout>
        {
            isLoading
            ?
            <Loading/>
            :
            <Container sx={{minHeight:"70vh" , marginTop:"50px"}}>
                {
                    data.lesson.isFile
                    ?
                    <FileLesson lesson={data.lesson}/>
                    :
                    <VideoLesson lesson={data.lesson}/>
                }
            </Container>
        }
    </MainLayout>
  )
}
