// src/features/auth/components/UserInfo.tsx
import React from 'react';
import type { UserDisplayData } from '../types';

interface UserInfoProps {
    user: UserDisplayData;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
    return (
        <div className="user-info">
            <p>Welcome, {user.email}!</p>
            <p>Username: {user.username}</p>
            <p>User ID: {user.id}</p>
            <p>Joined: {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
    );
};

export default UserInfo;