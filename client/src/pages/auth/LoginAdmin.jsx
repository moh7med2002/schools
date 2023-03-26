import { Container,TextField,Box,Button, Typography} from '@mui/material'
import React from 'react'
import LoginTabs from '../../components/LoginTabs'
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import {useDispatch} from 'react-redux'
import { adminLogin } from '../../redux/adminSlice';
import MainLayout from '../../components/home/MainLayout';
import { useNavigate } from 'react-router-dom';


export default function LoginAdmin() {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginAdmin = async (data) => {
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password' , data.password);
        const res = await fetch(`${process.env.REACT_APP_API}api/admin/auth/login`,{
            method : "POST",
            body : formData
        });
        if(res.status!==200 && res.status!==201){
            throw new Error('login falied')
        }
        return res.json();
    }
    
        const {isLoading , mutate: loginMutate } = useMutation(loginAdmin ,{
            onError:()=>{
                enqueueSnackbar('كلمة المرور او الايميل خاطئة',{variant:"error" , autoHideDuration:2000})
            },
            onSuccess:(data)=>{
                enqueueSnackbar("نجح تسجيل الدخول",{variant:"success" , autoHideDuration:2000});
                dispatch(adminLogin({admin:data.admin , token:data.token}));
                navigate('/admin/dashboard')
            }
        })

    const { control, handleSubmit, formState: { errors },register } = useForm({
        defaultValues: {
            password:'',
            email:''
        }
        });
    const onSubmit = data => {
        closeSnackbar();
        loginMutate({email:data.email , password:data.password});
    };

    return (
        <MainLayout>
            <Container sx={{marginY:"40px"}}>
            <LoginTabs isAdmin={true}/>
            <Box sx={{margin:"40px auto",width:"450px",maxWidth:"100%"}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{marginBottom:"20px"}}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => <TextField {...field} label="الإيميل" fullWidth/>}
                            {...register("email", { required: "Email Address is required" })}
                        />
                        {errors.email?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>حقل الإيميل مطلوب</Typography>}
                    </Box>
                    <Box sx={{marginBottom:"20px"}}>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => <TextField type={"password"} {...field} label="كلمة السر" fullWidth/>}
                            {...register("password", { required: "password Address is required" })}
                        />
                        {errors.password?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>حقل كلمة المرور مطلوب</Typography>}
                    </Box>
                    {isLoading ?
                    <Button  fullWidth variant="contained" sx={{opacity:"0.7"}}> ...جار تسجيل الدخول</Button>:
                    <Button type="submit" fullWidth variant="contained">تسجيل الدخول</Button>
                    }
                </form>
            </Box>
        </Container>
        </MainLayout>
    )
}