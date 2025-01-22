import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useRole = (searchParams = "") => {
  const axiosPublic = useAxiosPublic();

  const { data: user = [], isLoading: loading ,refetch} = useQuery({
    queryKey: ['user',searchParams],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user?searchParams=${searchParams}`);
      return res.data;
    },
  });

  return  [user, loading, refetch ];
};

export default useRole;
