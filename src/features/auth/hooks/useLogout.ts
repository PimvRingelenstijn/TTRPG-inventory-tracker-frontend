// src/features/auth/hooks/useLogout.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/api';

export const useLogout = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            setLoading(true);
            setError(null);
            await authService.logout();
            navigate('/login');
        } catch (err) {
            setError('Logout failed');
            console.error('Logout error:', err);
        } finally {
            setLoading(false);
        }
    };

    return {
        handleLogout,
        loading,
        error
    };
};