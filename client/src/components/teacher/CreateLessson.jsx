import { Box, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CreateLessonFile from './CreateLessonFile';
import CreateLessonVideo from './CreateLessonVideo';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


export default function CreateLessson({setopenLesson , unitId}) {
    const { control, handleSubmit, formState: { errors },register } = useForm({
        defaultValues: {
            title:""
        }
    });
    const onSubmit = (data) => {
        console.log(data)
    }

    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{width:{md:"450px",xs:"100%"}}}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="فيديو" {...a11yProps(0)} />
          <Tab label="ملف" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CreateLessonVideo setopenLesson={setopenLesson} unitId={unitId}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CreateLessonFile setopenLesson={setopenLesson} unitId={unitId}/>
      </TabPanel>
    </Box>
  )
}
