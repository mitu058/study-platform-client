import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useRole = () => {
  const axiosPublic = useAxiosPublic();

  const { data: user = [], isLoading: loading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosPublic.get('/user');
      return res.data;
    },
  });

  return  [user, loading ];
};

export default useRole;
