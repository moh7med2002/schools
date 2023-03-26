import { Avatar, Button, Dialog, FormLabel, IconButton, Paper , styled, Tooltip, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useState } from 'react'
import { useSelector  , useDispatch} from 'react-redux'
import StudentLayout from '../../components/student/StudentLayout'
import EditIcon from '@mui/icons-material/Edit';
import { useSnackbar } from 'notistack'
import EditStudentProfile from '../../components/student/EditStudentDialog'
import { updateStudent } from '../../redux/studentSlice'

const Input = styled("input")({});

const Circle = styled(Box)({
    width:"14px",
    height:"14px",
    borderRadius:"50%",
    backgroundColor:'gray'
})


export default function StudentProfileDashboard() {
   
    const {student , token} = useSelector(s => s.student);
    const [image , setImage] = useState(null);
    const [openDialog , setOpenDialog] = useState(false);
    const dispatch = useDispatch();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const updateTecaherHandler = async () => {
        closeSnackbar();
        const formData = new FormData();
        formData.append('image', image);
        try{
            const res = await fetch(`${process.env.REACT_APP_API}api/student/update/image`,{
                method:"PUT",
                headers:{
                    "Authorization":token
                },
                body : formData
            });
            if(res.status!==200 && res.status!==201){
                throw new Error('update student image failed');
            }
            const resData = await res.json();
            dispatch(updateStudent({student:resData.student}));
            enqueueSnackbar("تم تعديل الصورة بنجاح", {variant:"success" , autoHideDuration:2000});
            setImage(null);
        }
        catch(err){
            enqueueSnackbar("فشل تعديل الصورة", {variant:"error" , autoHideDuration:2000});
            console.log(err);
        }
    }

  return (
    <StudentLayout>
        <Paper sx={{marginY:"10px" , padding:"40px 20px" , maxWidth:"700px"}}>
            <Stack direction={"row"} alignItems="center" justifyContent={"space-between"}>
                <Avatar
                sx={{width:{sm:"200px", xs:"140px"} , height:{sm:"200px", xs:"140px"} , fontSize:"80px"}}
                alt={student.name}
                src={image?URL.createObjectURL(image):`${process.env.REACT_APP_API}images/${student.image}`}
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
                <Typography>{student.email}</Typography>
            </Stack>
        </Box>
        <Box sx={{marginTop:"30px"}}>
            <Typography sx={{fontWeight:"bold" , fontSize:"20px"}}>الإسم</Typography>
            <Stack direction={"row"} alignItems="center"  spacing={"6px"} sx={{marginTop:"10px"}}>
                <Circle/>
                <Typography>{student.name}</Typography>
            </Stack>
        </Box>
        <Dialog
        open={openDialog}
        onClose={()=>setOpenDialog(false)}
        >
            <EditStudentProfile setOpenDialog={setOpenDialog}/>
        </Dialog>
    </StudentLayout>
  )
}
