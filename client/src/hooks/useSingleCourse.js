import { useQuery} from 'react-query'


const fetchSingleCourse = async (data) => {
    const res = await fetch(`${process.env.REACT_APP_API}api/course/${data.queryKey[1]}`,{
    });
    return res.json();
}

export const useSingleCourses  = (courseId) => {
    return useQuery(['singleCourse',courseId] , fetchSingleCourse)
}