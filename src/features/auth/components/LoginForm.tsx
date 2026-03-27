// src/features/auth/components/LoginForm.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useLoginForm } from '../hooks/useLoginForm';

const LoginForm: React.FC = () => {
    const { formData, error, loading, handleChange, handleSubmit } = useLoginForm();

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h1>Login</h1>

            {error && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                    Error: {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
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

                <div style={{ marginBottom: '20px' }}>
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

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: loading ? '#ccc' : '#28a745',
                        color: 'white',
                        border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        width: '100%'
                    }}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                Don't have an account? <Link to="/register">Register here</Link>
            </div>
        </div>
    );
};

export default LoginForm;