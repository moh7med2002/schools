import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LaptopOutlinedIcon from '@mui/icons-material/LaptopOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import {Link} from 'react-router-dom'
import { Avatar, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { logoutTeacher } from '../../redux/teacherSlice';
const drawerWidth = 240;

function TeacherLayout(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const {teacher} = useSelector((state)=>state.teacher)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    function handleLogout()
    {
        dispatch(logoutTeacher())
        navigate('/')
    }

    const drawer = (
        <div>
        <Toolbar/>
        <Box sx={{padding:"10px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <Avatar src={`${process.env.REACT_APP_API}images/${teacher?.image}`} alt={teacher?.name}
            sx={{width:"95px",height:"95px",fontSize:"38px",marginBottom:"10px"}}/>
            <Typography sx={{fontWeight:"700",marginBottom:"4px"}}>مرحبا بالأستاذ/ة</Typography>
            <Typography sx={{fontWeight:"700",fontSize:"14px"}}>{teacher?.name}</Typography>
        </Box>
        <List>
            <Link to='/teacher/dashboard/courses'>
                <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                    <LaptopOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"دوراتي"} />
                </ListItemButton>
                </ListItem>
            </Link>
            <Link to='/teacher/dashboard/profile'>
                <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                    <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary={"الملف الشخصي"} />
                </ListItemButton>
                </ListItem>
            </Link>
        </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
            position="fixed"
            sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor:"white"
            }}
        >
            <Toolbar>
            <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } ,color:"black"}}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{color:"black"}}>
                لوحة التحكم
            </Typography>
            <Button variant='outlined' onClick={handleLogout}>تسجيل الخروج</Button>
            </Box>
            </Toolbar>
        </AppBar>
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
            <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
            >
            {drawer}
            </Drawer>
        </Box>
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
            <Toolbar/>
            <Box>
            {props.children}
            </Box>
        </Box>
        </Box>
    );
    }

    TeacherLayout.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
    };

export default TeacherLayout
