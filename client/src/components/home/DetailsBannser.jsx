import React from 'react'
import {Card, Container, Grid, Typography,styled,Box} from '@mui/material'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import { useBoxsData } from '../../hooks/useBoxsData';

const IconWrapper = styled(Box)({
    width:"75px",
    height:"75px",
    borderRadius:"12px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:"10px",
    color:"white"
})

const CardBox = styled(Card)({
    padding:"20px 12px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",width:"100%",
    ":hover":{
        transform:"translateY(-15px)",
    }
})

export default function DetailsBannser() {
    const {data} = useBoxsData();
    console.log(data);
    return (
        <Container sx={{marginBottom:"60px",marginTop:"30px"}}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} lg={3}>
                    <CardBox className='trans'>
                        <IconWrapper sx={{backgroundColor:"#066ac9"}}><LocalLibraryOutlinedIcon sx={{fontSize:"52px"}}/></IconWrapper>
                        <Typography sx={{fontSize:"28px",color:"#1f3b64",fontWeight:"700"}}>{data?.teachersNumber}</Typography>
                        <Typography sx={{fontWeight:"700",fontSize:"16px",color:"black"}}>المدرسون</Typography>
                    </CardBox>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <CardBox className='trans'>
                        <IconWrapper sx={{backgroundColor:"#6f42c1"}}><PeopleOutlineOutlinedIcon sx={{fontSize:"52px"}}/></IconWrapper>
                        <Typography sx={{fontSize:"28px",color:"#1f3b64",fontWeight:"700"}}>{data?.studentsNumber}</Typography>
                        <Typography sx={{fontWeight:"700",fontSize:"16px",color:"black"}}>الطلاب</Typography>
                    </CardBox>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <CardBox className='trans'>
                        <IconWrapper sx={{backgroundColor:"#0cbc87"}}><ComputerOutlinedIcon sx={{fontSize:"52px"}}/></IconWrapper>
                        <Typography sx={{fontSize:"28px",color:"#1f3b64",fontWeight:"700"}}>{data?.coursesNumber}</Typography>
                        <Typography sx={{fontWeight:"700",fontSize:"16px",color:"black"}}>الدورات</Typography>
                    </CardBox>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <CardBox className='trans'>
                        <IconWrapper sx={{backgroundColor:"#d6293e"}}><DescriptionOutlinedIcon sx={{fontSize:"52px"}}/></IconWrapper>
                        <Typography sx={{fontSize:"28px",color:"#1f3b64",fontWeight:"700"}}>{data?.subjectsNumber}</Typography>
                        <Typography sx={{fontWeight:"700",fontSize:"16px",color:"black"}}>المواد</Typography>
                    </CardBox>
                </Grid>
            </Grid>
        </Container>
    )
}
