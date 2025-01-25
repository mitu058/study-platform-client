import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useAllUser = () => {
    const { user, loading } = useAuth();
   const axiosPublic = useAxiosPublic()
    const { data: isAllUser} = useQuery({
        queryKey: [user.email,'isAllUser'],
       
        queryFn: async () => {
            const res = await axiosPublic.get(`/alluser/${user.email}`);
            console.log(res.data);
            return res.data[0];
        }
    })
    return [isAllUser]
};

export default useAllUser;