import './App.css';
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import {createTheme,ThemeProvider} from '@mui/material'
import {Route,Routes , Navigate} from 'react-router-dom'
import RegisterStudent from './pages/auth/RegisterStudent';
import RegisterTeacher from './pages/auth/RegisterTeacher';
import LoginStudent from './pages/auth/LoginStudent';
import LoginTeacher from './pages/auth/LoginTeacher';
import LoginAdmin from './pages/auth/LoginAdmin';
import { QueryClient, QueryClientProvider } from 'react-query'
import { SnackbarProvider } from 'notistack';
import Home from './pages/Home';
import AdminLandDashboard from './pages/admin/AdminLand.Dashboard';
import AdminDashboardAddSubject from './pages/admin/AdminDashboard.AddSubject';
import AdminDashboardViewSubjects from './pages/admin/AdminDashboard.ViewSubjects';
import { useSelector } from 'react-redux';
import AdminDashboardAddCourse from './pages/admin/AdminDashboard.AddCourse';
import AdminDashboardViewCourses from './pages/admin/AdminDashboard.ViewCourses';
import TeacherLandDashboard from './pages/teacher/TeacherLand.Dashboard';
import TeacherCoursesDashboard from './pages/teacher/TeacherCourses.Dashboard';
import TeacherProfileDashboard from './pages/teacher/TeacherProfile.Dashboard';
import TeacherSingleCourseDashboard from './pages/teacher/TeacherSingleCourse.Dashboard';
import TeacherSingleLessonDashboard from './pages/teacher/TeacherSingleLesson.Dashboard';
import SingleCourse from './pages/student/SingleCourse';
import SingleLesson from './pages/student/SingleLesson';
import StudentLandDashboard from './pages/student/StudentLand.Dashboard';
import AllCourses from './pages/AllCourses';
import StudentMyCoursesDashbaord from './pages/student/StudentMyCourses.Dashbaord';
import StudentProfileDashboard from './pages/student/StudentProfile.Dashboard';
import AdminDashboardTeachers from './pages/admin/AdminTeachers.Dashbaord';
import AdminDashboardStudents from './pages/admin/AdminStudents.Dashboard';
import TeacherProfile from './pages/TeacherProfile';



/** create rtl cache */
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
  palette:{
    primary:{
      main:"#43d477",
      contrastText:"#ffffff"
    },
    secondary:{
      main:"#1f3b64",
      contrastText:"#ffffff"
    },
    White:{
      main:"#ffffff",
      contrastText:"#242424"
    }
  }
});

const queryClient = new QueryClient()


function App() {

  const {admin} = useSelector(s => s.admin);
  const {teacher} = useSelector(s => s.teacher);
  const {student} = useSelector(s => s.student);


  return (
    <SnackbarProvider>
      <div className="App">
     <QueryClientProvider client={queryClient}>
      <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path='' index element={teacher?<Navigate to="/teacher/dashboard/courses"/>:admin?<Navigate to={"/admin/dashboard"}/>:<Home/>}/>
              {/* auth page */}
              <Route path='register_student' element={<RegisterStudent/>}/>
              <Route path='register_teacher' element={<RegisterTeacher/>}/>
              <Route path='login_student' element={<LoginStudent/>}/>
              <Route path='login_teacher' element={<LoginTeacher/>}/>
              <Route path='login_admin' element={<LoginAdmin/>}/>
              {/* public pages */}
              <Route path='courses' element={<AllCourses/>}/>
              <Route path='teacher/:teacherId' element={<TeacherProfile/>}/>
              {/* admin dashboard pages */}
              <Route path='admin/dashboard' element={admin?<AdminLandDashboard/>:<Navigate to={"/login_admin"}/>}/>
              <Route path='admin/dashboard/add-subject' element={admin?<AdminDashboardAddSubject/>:<Navigate to={'/login_admin'}/>}/>
              <Route path='admin/dashboard/subjects' element={admin?<AdminDashboardViewSubjects/>:<Navigate to={'/login_admin'}/>}/>
              <Route path='admin/dashboard/add-course' element={admin?<AdminDashboardAddCourse/>:<Navigate to={'/login_admin'}/>}/>
              <Route path='admin/dashboard/courses' element={admin?<AdminDashboardViewCourses/>:<Navigate to={'/login_admin'}/>}/>
              <Route path='admin/dashboard/teachers' element={admin?<AdminDashboardTeachers/>:<Navigate to={'/login_admin'}/>}/>
              <Route path='admin/dashboard/students' element={admin?<AdminDashboardStudents/>:<Navigate to={'/login_admin'}/>}/>
              {/* tecaher dashboard pages */}
              <Route path='teacher/dashboard/courses' element={teacher?<TeacherCoursesDashboard/>:<Navigate to={'/'}/>}/>
              <Route path='teacher/dashboard/profile' element={teacher?<TeacherProfileDashboard/>:<Navigate to={'/'}/>}/>
              <Route path='teacher/dashboard/course/:courseId' element={teacher?<TeacherSingleCourseDashboard/>:<Navigate to={'/'}/>}/>
              <Route path='teacher/dashboard/lesson/:lessonId' element={teacher?<TeacherSingleLessonDashboard/>:<Navigate to={'/'}/>}/>
              {/* student pages */}
              <Route path='courses/:courseId' element={<SingleCourse/>}/>
              <Route path='course/lesson/:lessonId' element={<SingleLesson/>}/>
              {/* student dashboard pages */}
              <Route path='student/dashboard' element={student?<StudentLandDashboard/>:<Navigate to={'/'}/>}/>
              <Route path='student/dashboard/courses' element={student?<StudentMyCoursesDashbaord/>:<Navigate to={'/'}/>}/>
              <Route path='student/dashboard/profile' element={student?<StudentProfileDashboard/>:<Navigate to={'/'}/>}/>
            </Routes>
          </ThemeProvider>
        </CacheProvider>
     </QueryClientProvider>
    </div>
    </SnackbarProvider>
  );
}

export default App;
