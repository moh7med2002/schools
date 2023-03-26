import { useQuery} from 'react-query'


const fetchStudentCourses = async (token) => {
    const res = await fetch(`${process.env.REACT_APP_API}api/student/my_courses`,{
        headers:{
            "Authorization":token
        }
    });
    return res.json();
}

export const useStudentCourses  = (token) => {
    return useQuery('studentCourses' , ()=>fetchStudentCourses(token))
}