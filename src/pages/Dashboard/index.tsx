// src/pages/Dashboard/index.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await authService.getCurrentUser();
                setUser(userData.user);
            } catch (error) {
                navigate('/login'); // Redirect to login if not authenticated
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
            {user && (
                <div>
                    <p>Welcome, {user.email}!</p>
                    <p>Username: {user.username}</p>
                    <p>User ID: {user.id}</p>
                    <p>Joined: {new Date(user.created_at).toLocaleDateString()}</p>
                </div>
            )}
            <button
                onClick={handleLogout}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '20px'
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default DashboardPage;