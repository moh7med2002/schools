import { useQuery} from 'react-query'


const fetchStudentsData = async () => {
    const res = await fetch(`${process.env.REACT_APP_API}api/student/all`);
    return res.json();
}

export const useStudentsData  = () => {
    return useQuery('studentsData' , fetchStudentsData)
}