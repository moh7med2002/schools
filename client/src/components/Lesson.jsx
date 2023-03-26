import { Box, Paper, Typography,Button, Tooltip, IconButton, Stack } from '@mui/material'
import React from 'react'
import { FileIcon, defaultStyles } from 'react-file-icon';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';



export default function Lesson({lesson , isTeacher , canView}) {


    const {token} = useSelector(s => s.teacher);

    async function deleteLesson () {
        const willDelete = await swal({
            title: "هل انت متأكد؟",
            text: "هل انت متأكد انك تريد حذف الدرس؟",
            icon: "warning",
            dangerMode: true,
            button:
                {
                    text:"موافق",
                    closeModal:true
                },
          });
           
          if (willDelete) {
            try{
                const res = await fetch(`${process.env.REACT_APP_API}api/teacher/lesson/${lesson.id}`,{
                    method:"DELETE",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":token
                    },
                });
                if(res.status!==200 && res.status!==201){
                    throw new Error('update unit failed');
                }
                const resData = await res.json();
                swal("تم الحذف!", "نجح حذف الدرس !", "success" ,{buttons:[{text:"إغلاق" , closeModal:true}]});
                setTimeout(()=>{
                    window.location.reload();
                },1000)
            }
            catch(err){
                console.log(err);
            }
          }
          
    }

    return (
        <Box sx={{padding:"14px 10px",display:"flex",justifyContent:"space-between",alignItems:"center",columnGap:"4px" , marginY:"15px"}}>
            <Box sx={{display:"flex",columnGap:"8px",alignItems:"center"}}>
                {
                    lesson.isFile?
                    <Box sx={{width:"24px"}}>
                        <FileIcon
                        extension={lesson.url.split(".")[lesson.url.split(".").length-1]} 
                        {...defaultStyles[lesson.url.split(".")[lesson.url.split(".").length-1]]} 
                        />
                    </Box>
                    :
                    <Box sx={{width:"24px"}}>
                    <FileIcon
                    extension={"video"} 
                    {...defaultStyles.mp4} 
                    />
                </Box>
                }
                <Typography>{lesson.title}</Typography>
            </Box>
            <Stack direction={"row"} spacing={1}>
                <Link to={isTeacher ? `/teacher/dashboard/lesson/${lesson.id}` : `/course/lesson/${lesson.id}` }>
                    {(isTeacher || canView) && <Button variant="contained">مشاهدة</Button>}
                </Link>
                {
                    isTeacher &&
                    <Tooltip title="حذف">
                    <IconButton color="error" onClick={deleteLesson}>
                        <DeleteIcon />
                    </IconButton>
                    </Tooltip>
                }
            </Stack>
        </Box>
    )
}
