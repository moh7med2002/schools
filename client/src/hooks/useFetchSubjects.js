import { useMutation , useQuery} from 'react-query'
import { useSelector } from 'react-redux';


const fetchSubjectsData = async () => {
    const res = await fetch(`${process.env.REACT_APP_API}api/subject/all`);
    return res.json();
}

export const useSubjectsData  = () => {
    return useQuery('subjectsData' , fetchSubjectsData)
}