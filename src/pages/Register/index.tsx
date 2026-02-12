// src/pages/Register/index.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../api';
import type { UserRegistrationRequest } from '../../api';
import type { RegisterFormData } from './types';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterFormData>({
        email: '',
        password: '',
        username: '',
    });
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = (): boolean => {
        if (formData.password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const registrationRequest: UserRegistrationRequest = {
                email: formData.email,
                password: formData.password,
                username: formData.username,
            };

            await authService.register(registrationRequest);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
    <h1>Register</h1>

    {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
        Error: {error}
        </div>
    )}

    <form onSubmit={handleSubmit}>
    <div style={{ marginBottom: '10px' }}>
    <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
    Username:
        </label>
        <input
    type="text"
    id="username"
    name="username"
    value={formData.username}
    onChange={handleChange}
    required
    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
    />
    </div>

    <div style={{ marginBottom: '10px' }}>
    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
    Email:
        </label>
        <input
    type="email"
    id="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    required
    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
    />
    </div>

    <div style={{ marginBottom: '10px' }}>
    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
    Password:
        </label>
        <input
    type="password"
    id="password"
    name="password"
    value={formData.password}
    onChange={handleChange}
    required
    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
    />
    </div>

    <div style={{ marginBottom: '20px' }}>
    <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>
    Confirm Password:
        </label>
        <input
    type="password"
    id="confirmPassword"
    name="confirmPassword"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
    />
    </div>

    <button
    type="submit"
    disabled={loading}
    style={{
        padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            width: '100%'
    }}
>
    {loading ? 'Registering...' : 'Register'}
    </button>
    </form>

    <div style={{ marginTop: '20px', textAlign: 'center' }}>
    Already have an account? <Link to="/login">Login here</Link>
        </div>
        </div>
);
};

export default RegisterPage;