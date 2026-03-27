// src/features/auth/hooks/useLoginForm.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@/hooks/useForm';
import { authService } from '@/api';
import { useAuth } from '@/contexts/AuthContext';
import type { LoginRequest, UserDataResponse } from '@/api';
import type { LoginFormData } from '../types';

export const useLoginForm = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const { formData, handleChange} = useForm<LoginFormData>({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const loginRequest: LoginRequest = {
                email: formData.email,
                password: formData.password,
            };

            const userData: UserDataResponse = await authService.login(loginRequest);

            setUser(userData);

            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        error,
        loading,
        handleChange,  // From useForm
        handleSubmit,
    };
};