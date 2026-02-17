// src/features/auth/hooks/useUser.ts
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/api';
import type { UserDisplayData } from '../types';

export const useUser = () => {
    const [user, setUser] = useState<UserDisplayData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            setLoading(true);
            const userData = await authService.getCurrentUser();
            setUser(userData.user);
            setError(null);
        } catch (err) {
            setError('Failed to fetch user');
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    const clearUser = () => {
        setUser(null);
    };

    useEffect(() => {
        fetchUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        user,
        loading,
        error,
        refetch: fetchUser,
        clearUser
    };
};