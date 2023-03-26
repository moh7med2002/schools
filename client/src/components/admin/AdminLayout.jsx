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
import TopicIcon from '@mui/icons-material/Topic';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import LaptopOutlinedIcon from '@mui/icons-material/LaptopOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import {Link} from 'react-router-dom'
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux'; 
import { adminLogout } from '../../redux/adminSlice';
const drawerWidth = 240;

function AdminLayout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
 
  const dispatch = useDispatch();


  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <Link to='/admin/dashboard'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TopicIcon />
                </ListItemIcon>
                <ListItemText primary={"الرئيسية"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='/admin/dashboard/subjects'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TopicIcon />
                </ListItemIcon>
                <ListItemText primary={"المواد"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='/admin/dashboard/add-subject'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AddOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={"إضافة مادة"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='/admin/dashboard/courses'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LaptopOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={"الدورات"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='/admin/dashboard/add-course'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LibraryAddOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={"إضافة دورة"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='/admin/dashboard/students'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary={"الطلاب"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='/admin/dashboard/teachers'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary={"المعلمين"} />
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
          ml: { sm: `${drawerWidth}px`},
          backgroundColor:"white"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } ,color:"black"}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{color:"black" , flex:1}}>
            لوحة التحكم
          </Typography>
          <Button onClick={()=>dispatch(adminLogout())}>تسجيل الخروج</Button>
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
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } ,  overflow:"hidden" }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

AdminLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AdminLayout
