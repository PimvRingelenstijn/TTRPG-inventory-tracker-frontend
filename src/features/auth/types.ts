// src/features/auth/types.ts
// Feature-specific types for UI components - NOT API types

export interface LoginFormData {
    email: string;
    password: string;
}

export interface RegisterFormData {
    email: string;
    password: string;
    username: string;
    confirmPassword?: string;
}

export interface AuthFormErrors {
    email?: string;
    password?: string;
    username?: string;
    confirmPassword?: string;
}

export type AuthStatus = 'idle' | 'loading' | 'success' | 'error';