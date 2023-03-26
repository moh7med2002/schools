import { useQuery} from 'react-query'


const fetchTeachersData = async () => {
    const res = await fetch(`${process.env.REACT_APP_API}api/teacher/all`);
    return res.json();
}

export const useTeachersData  = () => {
    return useQuery('teachersData' , fetchTeachersData)
}