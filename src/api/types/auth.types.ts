// src/api/types/auth.types.ts

// API request/response types
export interface UserRegistrationRequest {
    email: string;
    password: string;
    username: string;
}

export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: {
        id: string;
        email: string;
    };
    expires_at?: string;
}

export interface UserProfileResponse {
    id: string;
    email: string;
    username: string;
    created_at: string;
}