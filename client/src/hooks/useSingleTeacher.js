import { useQuery} from 'react-query'


const fetchSingleTeacher = async (data) => {
    const res = await fetch(`${process.env.REACT_APP_API}api/teacher/${data.queryKey[1]}`,{
    });
    return res.json();
}

export const useSingleTeacher  = (teacherId) => {
    return useQuery(['singleTeacher',teacherId] , fetchSingleTeacher)
}