// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/api';
import type { UserDataResponse } from '@/api/types/auth.types';

interface AuthContextType {
    user: UserDataResponse | null;
    setUser: (user: UserDataResponse | null) => void;
    isLoading: boolean;
    logout: () => Promise<void>;
    checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserDataResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async (): Promise<boolean> => {
        try {
            const userData = await authService.getCurrentUser();
            setUser(userData);
            return true; // Added for future proofing
        } catch (error) {
            setUser(null);
            return false; // Added for future proofing
        }
    };

    useEffect(() => {
        checkAuth().finally(() => setIsLoading(false));
    }, []);

    const logout = async () => {
        try {
            await authService.logout();
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};