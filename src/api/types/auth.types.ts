// src/api/types/auth.types.ts
export interface RegistrationRequest {
    email: string;
    password: string;
    username: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface UserDataResponse {
    uuid: string;
    email: string;
    username: string;
    created_at: string;
}