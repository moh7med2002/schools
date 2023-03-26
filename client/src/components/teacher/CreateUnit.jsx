import React from 'react'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Button,Typography,TextField, Box} from '@mui/material'
import { useForm, Controller } from "react-hook-form";
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

export default function CreateUnit({setOpenAddUnit , courseId}) {
    const { control, handleSubmit, formState: { errors },register } = useForm({
        defaultValues: {
            title:""
        }
    });
    const {token} = useSelector(s => s.teacher);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const onSubmit = async (data) => {
        closeSnackbar();
        try{
            const res = await fetch(`${process.env.REACT_APP_API}api/teacher/unit/create`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":token
                },
                body : JSON.stringify({title : data.title , courseId:courseId})
            });
            setOpenAddUnit(false)
            if(res.status!==200 && res.status!==201){
                throw new Error('create unit failed');
            }
            const resData = await res.json();
            enqueueSnackbar(resData.message, {variant:"success" , autoHideDuration:2000});
        }
        catch(err){
            enqueueSnackbar("فشل إنشاء الوحدة", {variant:"error" , autoHideDuration:2000});
            console.log(err);
        }
    };
    return (
        <Box sx={{width:{md:"450px",xs:"100%"}}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle id="alert-dialog-title">
                إضافة وحدة
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <Controller
                name="title"
                control={control}
                render={({ field }) => <TextField {...field} label="إسم الوحدة" fullWidth  sx={{marginTop:"12px"}}/>}
                {...register("title", { required: "Title Address is required" })}
                />
                {errors.title?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>حقل الإسم مطلوب</Typography>}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button type='submit'>إضافة</Button>
                <Button onClick={()=>setOpenAddUnit(false)} autoFocus variant="contained">
                    إلغاء
                </Button>
                </DialogActions>
            </form>
        </Box>
    )
}