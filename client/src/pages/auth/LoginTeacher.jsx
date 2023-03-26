import { Container,TextField,Box,Button, Typography} from '@mui/material'
import React from 'react'
import LoginTabs from '../../components/LoginTabs'
import { useForm, Controller } from "react-hook-form";
import MainLayout from '../../components/home/MainLayout';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { loginTeacher } from '../../redux/teacherSlice';

export default function LoginTeacher() {

    const { control, handleSubmit, formState: { errors },register } = useForm({
        defaultValues: {
            password:'',
            email:''
        }
        });

        const {enqueueSnackbar , closeSnackbar} = useSnackbar()
        const navigate = useNavigate()
        const dispatch = useDispatch()

        async function handleLogin(data)
        {
            const response = await fetch(`${process.env.REACT_APP_API}api/teacher/auth/login`,{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(data)
            })
            const resData = await response.json()
            if(response.ok)
            {
                return resData
            }
            throw new Error(resData.message)
        }
    
        function onSuccess(data)
        {
            enqueueSnackbar("تم تسجيل الدخول",{variant:"success",autoHideDuration:6000})
            dispatch(loginTeacher({token:data.token , teacher:data.teacher}))
            navigate('/teacher/dashboard/courses')
        }
    
        function onError(error)
        {
            enqueueSnackbar(error.message,{variant:"error",autoHideDuration:6000})
        }
    
        const {mutate,isLoading} = useMutation(handleLogin,{onSuccess,onError})
    
        const onSubmit = data => {
            closeSnackbar();
            mutate(data)
        };


    return (
        <MainLayout>
            <Container sx={{marginY:"40px"}}>
            <LoginTabs isTeacher={true}/>
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
                    {
                        isLoading
                        ?
                        <Button sx={{opacity:"0.7"}} fullWidth variant="contained">جاري تسجيل الدخول...</Button>
                        :
                        <Button type="submit" fullWidth variant="contained">تسجيل الدخول</Button>
                    }
                </form>
            </Box>
        </Container>
        </MainLayout>
    )
}