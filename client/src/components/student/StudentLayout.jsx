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
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Button } from '@mui/material';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const drawerWidth = 240;

function StudentLayout(props) {
const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
};

const {student} = useSelector((state)=>state.student)

const drawer = (
    <div>
        <Toolbar />
        <Box sx={{padding:"10px",display:"flex",justifyContent:"center"}}>
            <Avatar src={`${process.env.REACT_APP_API}images/${student?.image}`}
            alt={student.name}
            sx={{width:"95px",height:"95px"}}/>
        </Box>
        <Typography sx={{textAlign:"center",fontSize:"18px",fontWeight:"700",marginBottom:"6px"}}>مرحبا !</Typography>
        <Typography sx={{textAlign:"center",marginBottom:"20px",fontSize:"15px"}}>{student?.name}</Typography>
        <Divider />
        <List>
            <Link to="/student/dashboard/courses">
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <ComputerOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"دوراتي"} />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/student/dashboard/profile">
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <AccountBoxOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"تعديل الملف الشخصي"} />
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
            backgroundColor:"#ffffff"
            }}
        >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
                <Link to="/">
                    <Typography variant="h6" noWrap component="div" sx={{color:"#43d477"}}>
                        منصة
                    </Typography>
                    </Link>
                <Button>
                    تسجيل الخروج
                </Button>
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
        <Toolbar />
            {props.children}
        </Box>
        </Box>
    );
}

StudentLayout.propTypes = {

window: PropTypes.func,
};
export default StudentLayout;