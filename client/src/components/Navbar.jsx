import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {useSelector , useDispatch} from 'react-redux'
import {adminLogout} from '../redux/adminSlice'
import {studentLogout} from '../redux/studentSlice'
import {logoutTeacher} from '../redux/teacherSlice'



const drawerWidth = 240;

function Navbar(props) {
    const navigate = useNavigate()
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const {admin} = useSelector(s=>s.admin);
    const {student} = useSelector(s=>s.student);
    const {teacher} = useSelector(s=>s.teacher);
    const dispatch = useDispatch();
    const navItems = [{title:"الرئيسية",link:"/"},{title:"الدورات",link:"/courses"},{title:student&&"لوحة التحكم",link:"/student/dashboard/courses"}];


    const handleLogout = () => {
        dispatch(logoutTeacher());
        dispatch(studentLogout());
        dispatch(adminLogout());
        navigate('/')
    }

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2,fontSize:"20px" }} color="#242424">
            منصة
        </Typography>
        <Divider />
        <List>
            {navItems.filter(item=>item.title!==null).map((item) => {
                return(
                    <Link key={item.title+'1'} to={item.link}>
                    <ListItem disablePadding color="#242424" sx={{fontSize:"15px"}}>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                   </Link>
                )
            })}
            {
                !(admin || teacher || student ) ?
                <>
                <Link to={'/login_student'}>
                <ListItem disablePadding color="#242424" sx={{fontSize:"15px"}}>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={"تسجيل الدخول"} />
                    </ListItemButton>
                </ListItem>
                </Link>
                <Link to={'/register_student'}>
                    <ListItem disablePadding color="#242424" sx={{fontSize:"15px"}}>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText primary={"إنشاء حساب"} />
                        </ListItemButton>
                    </ListItem>
                </Link>
                </>
                :
                <Button variant="outlined" onClick={handleLogout}>تسجيل الخروج</Button>
            }
        </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" sx={{backgroundColor:"white"}}>
            <Toolbar>
            <IconButton
                color="#242424"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            <Typography
                variant="h6"
                component="div"
                sx={{ color:"#242424",flexGrow: 1, display: { xs: 'none', sm: 'block' } ,fontSize:"22px",fontWeight:"600"}}
            >
                منصة
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navItems.filter(item=>item.title!==null).map((item) => (
                <Button key={item.title+'2'} sx={{ color: '#242424',fontSize:"15px",marginRight:"6px" }} onClick={()=>navigate(`${item.link}`)}>
                    {item.title}
                </Button>
                ))}
                {
                    !(admin || teacher || student ) ?
                    <>
                    <Button sx={{ color: '#242424',fontSize:"15px",marginRight:"6px" }} onClick={()=>navigate(`/login_student`)}>
                    تسجيل الدخول
                    </Button>
                    <Button sx={{ color: '#242424',fontSize:"15px" }} onClick={()=>navigate(`/register_student`)}>
                        انشاء حساب
                    </Button>
                    </>
                    :
                    <Button variant="outlined" onClick={handleLogout}>تسجيل الخروج</Button>
                }
            </Box>
            </Toolbar>
        </AppBar>
        <Box component="nav">
            <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            >
            {drawer}
            </Drawer>
        </Box>
        <Box component="main">
            <Toolbar />
    </Box>
    </Box>
    );
}

Navbar.propTypes = {
    window: PropTypes.func,
};

export default Navbar;