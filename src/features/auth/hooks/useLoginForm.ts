// src/features/auth/hooks/useLoginForm.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@/hooks/useForm';
import { authService } from '@/api';
import type { UserLoginRequest } from '@/api';
import type { LoginFormData } from '../types';

export const useLoginForm = () => {
    const navigate = useNavigate();
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
            const loginRequest: UserLoginRequest = {
                email: formData.email,
                password: formData.password,
            };

            await authService.login(loginRequest);
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