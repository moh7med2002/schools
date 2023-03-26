import React from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { useSelector } from 'react-redux' 
import { useForm, Controller } from "react-hook-form";
import { Box } from '@mui/system';
import { Button, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';


export default function AdminDashboardAddSubject() {
    const {token} = useSelector(s => s.admin);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const loginAdmin = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        const res = await fetch(`${process.env.REACT_APP_API}api/admin/subject/create`,{
            method : "POST",
            headers:{
                "Authorization":token
            },
            body : formData
        });
        const resData =  await res.json();
        if(res.status!==200 && res.status!==201){
            throw new Error(resData.message)
        }
        return resData;
    }
    
        const {isLoading , mutate } = useMutation(loginAdmin ,{
            onError:(data)=>{
                console.log(data);
                enqueueSnackbar(data.message,{variant:"error" , autoHideDuration:2000})
            },
            onSuccess:(data)=>{
                enqueueSnackbar(data.message,{variant:"success" , autoHideDuration:2000});
                navigate('/admin/dashboard/subjects')
            }
        })


    const { control, handleSubmit, formState: { errors },register } = useForm({
        defaultValues: {
            title:''
        }
        });
        const onSubmit = data => {
            mutate(data);
        };
  return (
    <AdminLayout>
        <form onSubmit={handleSubmit(onSubmit)} style={{maxWidth:"500px" , margin:"40px auto"}}>
            <Box sx={{marginBottom:"20px"}}>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <TextField {...field} label="اسم المادة" fullWidth/>}
                    {...register("title", { required: "Email Address is required" })}
                />
                {errors.title?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>حقل اسم المادة مطلوب</Typography>}
            </Box>
            {isLoading ?
            <Button  fullWidth variant="contained" sx={{opacity:"0.7"}}>جاري انشاء المادة...</Button>:
            <Button type="submit" fullWidth variant="contained">انشاء المادة</Button>
            }
        </form>
    </AdminLayout>
  )
}
