import { Box } from '@mui/system';
import React from 'react'
import { useParams } from 'react-router-dom'
import FileLesson from '../../components/FileLesson';
import Loading from '../../components/Loading';
import TeacherLayout from '../../components/teacher/TeacherLayout'
import VideoLesson from '../../components/VideoLesson';
import { useSingleLesson } from '../../hooks/useSingleLesson';

export default function TeacherSingleLessonDashboard() {
    const {lessonId} = useParams();
    const { isLoading , data} = useSingleLesson(lessonId); 

  return (
    <TeacherLayout>
        {
            isLoading
            ?
            <Loading/>
            :
            <Box>
                {
                    data.lesson.isFile
                    ?
                    <FileLesson lesson={data.lesson}/>
                    :
                    <VideoLesson lesson={data.lesson}/>
                }
            </Box>
        }
    </TeacherLayout>
  )
}
