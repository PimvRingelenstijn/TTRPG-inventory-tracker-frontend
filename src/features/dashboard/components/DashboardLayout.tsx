// src/features/dashboard/components/DashboardLayout.tsx
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserInfo, LogoutButton, LoadingState } from '@/features/auth/components';

const DashboardLayout: React.FC = () => {
    const { isLoading } = useAuth();

    if (isLoading) {
        return <LoadingState />;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
            <UserInfo />
            <LogoutButton />
        </div>
    );
};

export default DashboardLayout;