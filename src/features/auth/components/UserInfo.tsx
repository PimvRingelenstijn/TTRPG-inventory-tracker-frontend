// src/features/auth/components/UserInfo.tsx
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const UserInfo: React.FC = () => {
    const { user } = useAuth();
    return (
        <div className="user-info">
            <p>Welcome, {user.email}!</p>
            <p>Username: {user.username}</p>
            <p>User ID: {user.uuid}</p>
            <p>Joined: {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
    );
};

export default UserInfo;