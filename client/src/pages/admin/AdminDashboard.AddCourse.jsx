import styled from '@emotion/styled';
import { Button, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout'
import { useSubjectsData } from '../../hooks/useFetchSubjects';
import { useTeachersData } from '../../hooks/useFetchTeachers';


const Input = styled("input")({})
const Image = styled('img')({
    width:"100%",
    marginTop:"14px",
})


export default function AdminDashboardAddCourse() {
    const {token} = useSelector(s => s.admin);

    const {data : subjects} = useSubjectsData();
    const {data : teachers} = useTeachersData();
    const [image , setImage] = useState(null);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const loginAdmin = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('subjectId', data.subjectId);
        formData.append('teacherId', data.teacherId);
        formData.append('price', data.price);
        formData.append('image', image);
        const res = await fetch(`${process.env.REACT_APP_API}api/admin/course/create`,{
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
                navigate('/admin/dashboard/courses')
            }
        })


    const { control, handleSubmit, formState: { errors },register } = useForm({
        defaultValues: {
            title:'',
            subjectId:"",
            teacherId:"",
            price:0
        }
        });
        const onSubmit = data => {
            closeSnackbar();
            if(!image){
                enqueueSnackbar('الرجاء تحميل صورة' , {variant:"error" , autoHideDuration:2000})
                return;
            }
            mutate(data);
        };
  return (
    <AdminLayout>
        <form onSubmit={handleSubmit(onSubmit)} style={{maxWidth:"500px" , margin:"40px auto"}}>
            <Box sx={{marginBottom:"20px"}}>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => <TextField {...field} label="اسم الدورة" fullWidth/>}
                    {...register("title", { required: "Email Address is required" })}
                />
                {errors.title?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>حقل اسم الدورة مطلوب</Typography>}
            </Box>
            <Box sx={{marginBottom:"20px"}}>
                <Controller
                    name="subjectId"
                    control={control}
                    render={({ field }) => <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">إسم المادة</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="إسم المادة"
                      {...field}
                    >
                      {
                        subjects?.subjects.map(s=>{
                            return <MenuItem value={s.id}>{s.title}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>}
                    {...register("subjectId", { required: "Email Address is required" })}
                />
                {errors.subjectId?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>حقل اسم المادة مطلوب</Typography>}
            </Box>
            <Box sx={{marginBottom:"20px"}}>
                <Controller
                    name="teacherId"
                    control={control}
                    render={({ field }) => <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">إسم المعلم</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="إسم المعلم"
                      {...field}
                    >
                      {
                        teachers?.teachers.map(t=>{
                            return <MenuItem value={t.id}>{t.name}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>}
                    {...register("teacherId", { required: "Email Address is required" })}
                />
                {errors.teacherId?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>حقل اسم المعلم مطلوب</Typography>}
            </Box>
            <Box sx={{marginBottom:"20px"}}>
                <Controller
                    name="price"
                    control={control}
                    render={({ field }) => <TextField type={"number"} inputProps={{min:0}} {...field} label="سعر الدورة" fullWidth/>}
                    {...register("price", { required: "Email Address is required" })}
                />
                {errors.title?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>حقل اسم الدورة مطلوب</Typography>}
            </Box>
            <Box sx={{display:"flex",flexDirection:"column",columnGap:"8px",marginBottom:"24px"}}>
                <FormLabel sx={{marginBottom:"4px"}}>تحميل صورة الدورة</FormLabel>
                <Input type="file" sx={{width:"100%",border:"1px solid #dde0e3",padding:"8px 5px"}} onChange={e=>setImage(e.target.files[0])}/>
            </Box>
                    {image&&
            <Box sx={{height:"300px" , overflowY:"auto" , marginBottom:"20px"}}>
                <Image src={URL.createObjectURL(image)}/>
            </Box>
            }
            {isLoading ?
            <Button  fullWidth variant="contained" sx={{opacity:"0.7"}}>جاري انشاء الدورة...</Button>:
            <Button type="submit" fullWidth variant="contained">انشاء الدورة</Button>
            }
        </form>
    </AdminLayout>
  )
}
