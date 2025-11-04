import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { notifyError } from '@/lib/notify';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface GetUsersResponse {
  users: User[];
  total: number;
}

export function useGetListUser() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<GetUsersResponse> => {
      try {
        const response = await api.get<GetUsersResponse>('/users');
        return response.data;
      } catch (error) {
        notifyError('Failed to fetch users');
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
