import { useQuery} from 'react-query'


const fetchSingleLesson = async (data) => {
    const res = await fetch(`${process.env.REACT_APP_API}api/lesson/${data.queryKey[1]}`,{
    });
    return res.json();
}

export const useSingleLesson  = (lessonId) => {
    return useQuery(['singleLesson',lessonId] , fetchSingleLesson)
}