import { useQuery} from 'react-query'


const fetchTeacherCourses = async (token) => {
    const res = await fetch(`${process.env.REACT_APP_API}api/teacher/my_courses`,{
        headers:{
            "Authorization":token
        }
    });
    return res.json();
}

export const useTeacherCourses  = (token) => {
    return useQuery('teacherCourses' , ()=>fetchTeacherCourses(token))
}