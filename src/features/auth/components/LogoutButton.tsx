// src/features/auth/components/LogoutButton.tsx
import React from 'react';
import { useLogout } from '../hooks/useLogout';

const LogoutButton: React.FC = () => {
    const { handleLogout, loading } = useLogout();

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            style={{
                padding: '10px 20px',
                backgroundColor: loading ? '#ccc' : '#dc3545',
                color: 'white',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '20px',
                opacity: loading ? 0.7 : 1
            }}
        >
            {loading ? 'Logging out...' : 'Logout'}
        </button>
    );
};

export default LogoutButton;