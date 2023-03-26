import { useQuery} from 'react-query'


const fetchCoursesData = async () => {
    const res = await fetch(`${process.env.REACT_APP_API}api/course/all`);
    return res.json();
}

export const useCoursesData  = () => {
    return useQuery('coursesData' , fetchCoursesData)
}