import { Button, DialogActions, DialogContent, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateTeacher } from '../../redux/teacherSlice';

export default function EditTeacherProfile({setOpenDialog}) {
    const {teacher  , token} = useSelector(s => s.teacher);
    const { control, handleSubmit, formState: { errors },register } = useForm({
        defaultValues: {
            name:teacher.name,
            about:teacher.about,
            yearsOfExperience:teacher.yearsOfExperience
        }
        });
        const dispatch = useDispatch();
        const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const onSubmit = async (data) => {
        closeSnackbar();
        const formData = new FormData();
        formData.append('about' , data.about);
        formData.append('name' , data.name);
        formData.append('yearsOfExperience', data.yearsOfExperience);
        try{
            const res = await fetch(`${process.env.REACT_APP_API}api/teacher/update/information`,{
                method:"PUT",
                headers:{
                    "Authorization":token
                },
                body : formData
            });
            if(res.status!==200 && res.status!==201){
                throw new Error('update teacher information failed');
            }
            const resData = await res.json();
            dispatch(updateTeacher({teacher:resData.teacher}));
            enqueueSnackbar("تم تعديل البيانات بنجاح", {variant:"success" , autoHideDuration:2000});
            setOpenDialog(false);
        }
        catch(err){
            enqueueSnackbar("فشل تعديل البيانات", {variant:"error" , autoHideDuration:2000});
            console.log(err);
        }

    };
  return (
    <DialogContent sx={{width:"400px" , maxWidth:"100%"}}>
        <Typography sx={{marginBottom:"20px"}}>تعديل الملف الشخصي</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{marginBottom:"20px"}}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => <TextField {...field} label="الإسم" fullWidth/>}
                            {...register("name", { required: "name Address is required" })}
                        />
                        {errors.name?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>حقل الإسم مطلوب</Typography>}
                    </Box>
                    <Box sx={{marginBottom:"20px"}}>
                        <Controller
                            name="about"
                            control={control}
                            render={({ field }) => <TextField {...field} label="النبذة" fullWidth/>}
                            {...register("about")}
                        />
                        {errors.about?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>حقل النبذة مطلوب</Typography>}
                    </Box>
                    <Box sx={{marginBottom:"20px"}}>
                        <Controller
                            name="yearsOfExperience"
                            control={control}
                            render={({ field }) => <TextField type={"number"} inputProps={{min:0}} {...field} label=" سنوات الخبرة" fullWidth/>}
                            {...register("yearsOfExperience", { required: "Email Address is required" })}
                        />
                        {errors.yearsOfExperience?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>حقل سنوات الخبرة مطلوب</Typography>}
                    </Box>
                    <DialogActions direction={"row"} spacing={2}>
                        <Button onClick={()=>setOpenDialog(false)}  variant="contained">الغاء</Button>
                        <Button type="submit"  variant="outlined">حفظ التعديل</Button>
                    </DialogActions>
                </form>
    </DialogContent>
  )
}
