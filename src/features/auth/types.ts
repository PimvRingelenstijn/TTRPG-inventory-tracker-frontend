// src/features/auth/types.ts
// Feature-specific types for UI components
export interface AuthState {
    user: any | null;
    isLoading: boolean;
    error: string | null;
}

export type AuthFormErrors = {
    email?: string;
    password?: string;
    username?: string;
    confirmPassword?: string;
};