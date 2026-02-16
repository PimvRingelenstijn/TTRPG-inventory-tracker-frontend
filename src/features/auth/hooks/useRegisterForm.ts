// src/features/auth/hooks/useRegisterForm.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/api';
import type { UserRegistrationRequest } from '@/api';
import type { RegisterFormData } from '../types';

export const useRegisterForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterFormData>({
        email: '',
        password: '',
        username: '',
    });
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = (): boolean => {
        if (formData.password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const registrationRequest: UserRegistrationRequest = {
                email: formData.email,
                password: formData.password,
                username: formData.username,
            };

            await authService.register(registrationRequest);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        confirmPassword,
        error,
        loading,
        handleChange,
        setConfirmPassword,
        handleSubmit,
    };
};