import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { LoginSchema } from '../schemas/loginSchema';
import agent from '../api/agent';
import { useNavigate } from 'react-router';
import type { RegisterSchema } from '../schemas/registerSchema';
import { toast } from 'react-toastify';

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Login User
    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post('/login?useCookies=true', creds);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user'],
            });
        },
    });

    // Register User
    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post('/account/register', creds);
        },
        onSuccess: () => {
            toast.success('Register successful - You can now login :)');
            navigate('/login');
        },
    });

    // Logout User
    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout');
        },
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['user'] });
            queryClient.removeQueries({ queryKey: ['activities'] });
            navigate('/');
        },
    });

    // Get User Info
    const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>(`/account/user-info`);
            return response.data;
        },
        // it will get the currentUser if we don't have a currentUser.
        enabled: !queryClient.getQueryData(['user']),
    });

    return {
        loginUser,
        currentUser,
        logoutUser,
        loadingUserInfo,
        registerUser,
    };
};
