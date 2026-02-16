// src/features/auth/hooks/useLoginForm.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/api';
import type { UserLoginRequest } from '@/api';
import type { LoginFormData } from '../types';

export const useLoginForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

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
            alert(`Login successful!`);
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
        handleChange,
        handleSubmit,
    };
};