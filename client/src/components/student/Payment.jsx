import React, { useState } from 'react'
import {Button, DialogActions, DialogContent, Typography,Box, TextField} from '@mui/material'
import { useForm, Controller } from "react-hook-form";
import {useSnackbar} from 'notistack'
import { useSelector } from 'react-redux';

export default function PaymentDialog({handleClosePayment,price,courseId}) {

    const {enqueueSnackbar , closeSnackbar} = useSnackbar()
    const { control, handleSubmit, formState: { errors },register } = useForm({
        defaultValues: {
            cardNumber:'',
            date:'',
            name:''
        }
    });

    const {token} = useSelector(s => s.student);
    const [isLoad , setIsLoad] = useState(false);

    const onSubmit = async (data) => {
        closeSnackbar();
        try{
            const res = await fetch(`${process.env.REACT_APP_API}api/student/course/register`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":token
                },
                body:JSON.stringify({courseId})
            });
            const resData = await res.json();
            handleClosePayment();
            if(res.status!==200 && res.status!==201){
                enqueueSnackbar(resData.message ,  {variant:"error" , autoHideDuration:2000});
                return;
            }
            enqueueSnackbar(resData.message ,  {variant:"success" , autoHideDuration:2000});
        }
        catch(err){
            enqueueSnackbar("عملية الإشتراك فشلت" , {variant:"error" , autoHideDuration:2000});
            console.log(err)
        }
    };

    return (
        <Box sx={{width:"450px",maxWidth:"100%"}}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                <Typography sx={{marginBottom:"20px",fontSize:"20px",fontWeight:"600"}}>الدفع - {price}$</Typography>
                    <Box sx={{marginBottom:"20px"}}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => <TextField {...field} label="الإسم على البطاقة" fullWidth/>}
                            {...register("name", { required: "name Address is required" })}
                        />
                        {errors.name?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>هذا الحقل مطلوب</Typography>}
                    </Box>
                    <Box sx={{marginBottom:"20px"}}>
                        <Controller
                            name="cardNumber"
                            control={control}
                            render={({ field }) => <TextField {...field} label="رقم البطاقة" fullWidth/>}
                            {...register("cardNumber", { required: "cardNumber Address is required" })}
                        />
                        {errors.cardNumber?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>هذا الحقل مطلوب</Typography>}
                    </Box>
                    <Box>
                        <Controller
                            name="date"
                            control={control}
                            render={({ field }) => <TextField {...field} label="تاريخ الإنتهاء" fullWidth/>}
                            {...register("date", { required: "date Address is required" })}
                        />
                        {errors.date?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>هذا الحقل مطلوب</Typography>}
                    </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClosePayment}>إلغاء</Button>
                {
                    isLoad
                    ?
                    <Button type="submit" variant="contained" sx={{opacity:0.7}}>
                    ....
                    </Button>
                    :
                    <Button type="submit" variant="contained">
                    دفع
                    </Button>
                }
            </DialogActions>
            </form>
        </Box>
    )
}