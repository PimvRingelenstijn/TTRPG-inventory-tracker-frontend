// src/features/dashboard/components/DashboardLayout.tsx
import React from 'react';
import { UserInfo, LogoutButton, LoadingState } from '@/features/auth/components';
import { useUser } from '@/features/auth/hooks/useUser.ts';

const DashboardLayout: React.FC = () => {
    const { user, loading } = useUser();

    if (loading) {
        return <LoadingState />;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
            {user && <UserInfo user={user} />}
            <LogoutButton />
        </div>
    );
};

export default DashboardLayout;