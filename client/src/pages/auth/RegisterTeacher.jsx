import { Container,TextField,Box,Button, Typography,InputLabel,Select,MenuItem,FormControl} from '@mui/material'
import React from 'react'
import RegisterTabs from '../../components/RegisterTabs'
import { useForm, Controller } from "react-hook-form";
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import MainLayout from '../../components/home/MainLayout';

export default function RegisterTeacher() {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const registerTeacher = async (data) => {
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password' , data.password);
        formData.append('name', data.name);
        formData.append('gender' , data.gender);
        formData.append('phone' , data.phone);
        const res = await fetch(`${process.env.REACT_APP_API}api/teacher/auth/register`,{
            method : "POST",
            body : formData
        });
        if(res.status!==200 && res.status!==201){
            throw new Error('register falied')
        }
        return res.json();
    }
    
        const {isLoading , mutate: registerMutate } = useMutation(registerTeacher ,{
            onError:()=>{
                enqueueSnackbar('فشل انشاء الحساب',{variant:"error" , autoHideDuration:2000})
            },
            onSuccess:(data)=>{
                enqueueSnackbar(data.message,{variant:"success" , autoHideDuration:2000});
                navigate('/login_teacher')
            }
        })

    const { control, handleSubmit, formState: { errors },register } = useForm({
        defaultValues: {
            name: '',
            email:'',
            password:'',
            gender:'',
            phone:""
        }
        });
    const onSubmit = data => {
        registerMutate(data);
    };

    return (
        <MainLayout>
            <Container sx={{marginY:"40px"}}>
            <RegisterTabs isTeacher={true}/>
            <Box sx={{margin:"40px auto",width:"450px",maxWidth:"100%"}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{marginBottom:"20px"}}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => <TextField {...field} label="الإسم" fullWidth/>}
                            {...register("name", { required: "Name Address is required" })}
                        />
                        {errors.name?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>حقل الإسم مطلوب</Typography>}
                    </Box>
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
                        {errors.password?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>حقل كلمة السر مطلوب</Typography>}
                    </Box>
                    <Box sx={{marginBottom:"20px"}}>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => <TextField {...field} label="رقم الجوال" fullWidth/>}
                            {...register("phone", { required: "phone Address is required" })}
                        />
                        {errors.phone?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>حقل كلمة السر مطلوب</Typography>}
                    </Box>
                    <Box sx={{marginBottom:"20px"}}>
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) =><FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">الجنس</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="الجنس"
                                {...register("gender", { required: "gender Address is required" })}
                            >
                                <MenuItem value={'male'}>ذكر</MenuItem>
                                <MenuItem value={'female'}>أنثى</MenuItem>
                            </Select>
                            </FormControl>
                            }
                        />
                        {errors.gender?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>حقل الجنس مطلوب</Typography>}
                    </Box>
                    {
                        isLoading
                        ?
                        <Button sx={{opacity:"0.7"}} fullWidth variant="contained"> جاري انشاء الحساب ...</Button>
                        :
                        <Button type="submit" fullWidth variant="contained">إنشاء حساب</Button>
                    }
                </form>
            </Box>
        </Container>
        </MainLayout>
    )
}