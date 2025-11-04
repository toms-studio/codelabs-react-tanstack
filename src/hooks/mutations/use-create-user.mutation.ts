import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { notifyError, notifySuccess } from '@/lib/notify';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateUserData): Promise<User> => {
      try {
        const response = await api.post<User>('/users', data);
        return response.data;
      } catch (error) {
        notifyError('Failed to create user');
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      notifySuccess('User created successfully');
    },
  });
}
