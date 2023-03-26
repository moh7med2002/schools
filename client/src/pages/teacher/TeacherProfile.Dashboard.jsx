import { Avatar, Button, Dialog, FormLabel, IconButton, Paper , styled, Tooltip, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useState } from 'react'
import { useSelector  , useDispatch} from 'react-redux'
import TeacherLayout from '../../components/teacher/TeacherLayout'
import EditIcon from '@mui/icons-material/Edit';
import EditTeacherProfile from '../../components/teacher/EditTeacherProfile'
import { useSnackbar } from 'notistack'
import { updateTeacher } from '../../redux/teacherSlice'

const Input = styled("input")({});

const Circle = styled(Box)({
    width:"14px",
    height:"14px",
    borderRadius:"50%",
    backgroundColor:'gray'
})


export default function TeacherProfileDashboard() {
   
    const {teacher , token} = useSelector(s => s.teacher);
    const [image , setImage] = useState(null);
    const [openDialog , setOpenDialog] = useState(false);
    const dispatch = useDispatch();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const updateTecaherHandler = async () => {
        closeSnackbar();
        const formData = new FormData();
        formData.append('image', image);
        try{
            const res = await fetch(`${process.env.REACT_APP_API}api/teacher/update/image`,{
                method:"PUT",
                headers:{
                    "Authorization":token
                },
                body : formData
            });
            if(res.status!==200 && res.status!==201){
                throw new Error('update teacher image failed');
            }
            const resData = await res.json();
            dispatch(updateTeacher({teacher:resData.teacher}));
            enqueueSnackbar("تم تعديل الصورة بنجاح", {variant:"success" , autoHideDuration:2000});
            setImage(null);
        }
        catch(err){
            enqueueSnackbar("فشل تعديل الصورة", {variant:"error" , autoHideDuration:2000});
            console.log(err);
        }
    }

  return (
    <TeacherLayout>
        <Paper sx={{marginY:"10px" , padding:"40px 20px" , maxWidth:"700px"}}>
            <Stack direction={"row"} alignItems="center" justifyContent={"space-between"}>
                <Avatar
                sx={{width:{sm:"200px", xs:"140px"} , height:{sm:"200px", xs:"140px"} , fontSize:"80px"}}
                alt={teacher.name}
                src={image?URL.createObjectURL(image):`${process.env.REACT_APP_API}images/${teacher.image}`}
                />
                <Box sx={{display:"flex",flexDirection:"column",columnGap:"8px",marginBottom:"24px"}}>
                    <FormLabel htmlFor='upload' sx={{marginBottom:"4px"}}>تعديل صورة الملف</FormLabel>
                    <Input hidden 
                    id="upload"
                    type="file" sx={{width:"100%",border:"1px solid #dde0e3",padding:"8px 5px"}} onChange={e=>setImage(e.target.files[0])}/>
                   {image &&  <Button onClick={updateTecaherHandler} variant='contained'>تعديل</Button>}
                </Box>
            </Stack>
        </Paper>
        <Stack sx={{marginTop:"30px"}} direction={"row"} alignItems="center" spacing={"10px"}>
            <Typography variant='h5' sx={{fontWeight:"bold"}}>المعلومات الشخصية</Typography>
            <Tooltip title="تعديل">
                <IconButton sx={{minWidth:"10px"}} onClick={()=>setOpenDialog(true)}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
        </Stack>
        <Box sx={{marginTop:"30px"}}>
            <Typography sx={{fontWeight:"bold" , fontSize:"20px"}}>الإيميل</Typography>
            <Stack direction={"row"} alignItems="center"  spacing={"6px"} sx={{marginTop:"10px"}}>
                <Circle/>
                <Typography>{teacher.email}</Typography>
            </Stack>
        </Box>
        <Box sx={{marginTop:"30px"}}>
            <Typography sx={{fontWeight:"bold" , fontSize:"20px"}}>الإسم</Typography>
            <Stack direction={"row"} alignItems="center"  spacing={"6px"} sx={{marginTop:"10px"}}>
                <Circle/>
                <Typography>{teacher.name}</Typography>
            </Stack>
        </Box>
        <Box sx={{marginTop:"30px"}}>
            <Typography sx={{fontWeight:"bold" , fontSize:"20px"}}>عدد سنوات الخبرة</Typography>
            <Stack direction={"row"} alignItems="center"  spacing={"6px"} sx={{marginTop:"10px"}}>
                <Circle/>
                <Typography>{teacher.yearsOfExperience}</Typography>
            </Stack>
        </Box>
        <Box sx={{marginTop:"30px"}}>
            <Typography sx={{fontWeight:"bold" , fontSize:"20px"}}>نبذة عنك</Typography>
            <Stack direction={"row"} alignItems="center"  spacing={"6px"} sx={{marginTop:"10px"}}>
                <Circle/>
                <Typography>{teacher.about}</Typography>
            </Stack>
        </Box>
        <Dialog
        open={openDialog}
        onClose={()=>setOpenDialog(false)}
        >
            <EditTeacherProfile setOpenDialog={setOpenDialog}/>
        </Dialog>
    </TeacherLayout>
  )
}
