// src/features/auth/components/LogoutButton.tsx
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const LogoutButton: React.FC = () => {
    const { isLoading, logout } = useAuth();

    return (
        <button
            onClick={logout}
            disabled={isLoading}
            style={{
                padding: '10px 20px',
                backgroundColor: isLoading ? '#ccc' : '#dc3545',
                color: 'white',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                marginTop: '20px',
                opacity: isLoading ? 0.7 : 1
            }}
        >
            {isLoading ? 'Logging out...' : 'Logout'}
        </button>
    );
};

export default LogoutButton;