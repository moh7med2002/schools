import { useQuery} from 'react-query'


const fetchBoxesData = async () => {
    const res = await fetch(`${process.env.REACT_APP_API}api/auth/data`);
    return res.json();
}

export const useBoxsData  = () => {
    return useQuery('boxsData' , fetchBoxesData)
}