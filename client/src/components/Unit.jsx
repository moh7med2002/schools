import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Dialog, IconButton, Stack, Tooltip, Typography  } from '@mui/material'
import React, { useState } from 'react'
import Lesson from './Lesson'
import CreateLessson from './teacher/CreateLessson';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UpdateUnit from './teacher/UpdateUnit';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

export default function Unit({unit , index , isTeacher , canView}) {
    const [openAddLesson , setopenLesson] = useState(false);
    const [openUpdateUnit , setOpenUpdateUnit] = useState(false);

    return(
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{columnGap:"10px"}}
            >
                <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0px",columnGap:"12px", flex:1 , paddingTop:"6px"}}>
                    <Typography>الوحدة {index+1} : {unit.title}</Typography>
                    <Stack direction={"row"} alignItems="center">
                        <Typography>{unit.lessons.filter(lesson=>lesson.isFile === true).length} ملفات</Typography>
                        {
                            isTeacher &&
                            <Tooltip title="إضافة درس">
                            <IconButton onClick={()=>setopenLesson(true)}>
                                <AddIcon />
                            </IconButton>
                            </Tooltip>
                        }
                        {
                            isTeacher &&
                            <Tooltip title=" تعديل إسم الوحدة">
                            <IconButton onClick={()=>setOpenUpdateUnit(true)}>
                                <EditIcon />
                            </IconButton>
                            </Tooltip>
                        }
                    </Stack>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box>
                    {
                        unit.lessons.map(lesson=>{
                            return <Lesson key={lesson.id+"nv"} lesson={lesson} isTeacher={isTeacher} canView={canView}/>
                        })
                    }
                </Box>
            </AccordionDetails>
            <Dialog open={openAddLesson} onClose={()=>setopenLesson(false)}>
                <CreateLessson setopenLesson={setopenLesson} unitId={unit.id}/>
            </Dialog>
            <Dialog open={openUpdateUnit}  onClose={()=>setOpenUpdateUnit(false)}>
                <UpdateUnit setOpenUpdateUnit={setOpenUpdateUnit} unit={unit} />
            </Dialog>
        </Accordion>

    )
}
