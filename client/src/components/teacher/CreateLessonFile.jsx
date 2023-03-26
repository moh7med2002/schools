import { Button, DialogActions, DialogContent, DialogContentText, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

export default function CreateLessonFile({setopenLesson , unitId}) {
    const { control, handleSubmit, formState: { errors },register } = useForm({
        defaultValues: {
            title:"",
        }
    });
    const {token} = useSelector(s => s.teacher);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [file , setFile] = useState(null);
    const onSubmit = async (data) => {
        closeSnackbar();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('isFile',true);
        formData.append('iSVideo',false);
        formData.append('unitId',unitId);
        formData.append('image', file);
        try{
            const res = await fetch(`${process.env.REACT_APP_API}api/teacher/lesson/create`,{
                method:"POST",
                headers:{
                    "Authorization":token
                },
                body : formData
            });
            setopenLesson(false)
            if(res.status!==200 && res.status!==201){
                throw new Error('create lesson failed');
            }
            const resData = await res.json();
            enqueueSnackbar(resData.message, {variant:"success" , autoHideDuration:2000});
        }
        catch(err){
            enqueueSnackbar("فشل إنشاء الدرس", {variant:"error" , autoHideDuration:2000});
            console.log(err);
        }
    }
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContentText id="alert-dialog-description">
        <Controller
        name="title"
        control={control}
        render={({ field }) => <TextField variant="standard" {...field} label="إسم الدرس" fullWidth  sx={{marginBottom:"20px"}}/>}
        {...register("title", { required: "Title Address is required" })}
        />
        {errors.title?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>حقل الإسم مطلوب</Typography>}
        <input type={"file"} accept=".pdf , .docx" required onChange={e=>setFile(e.target.files[0])}/>
        </DialogContentText>
        <DialogActions sx={{marginTop:"20px"}}>
        <Button type='submit'>إضافة</Button>
        <Button onClick={()=>setopenLesson(false)} autoFocus variant="contained">
            إلغاء
        </Button>
        </DialogActions>
    </form> 
    </>
  )
}
