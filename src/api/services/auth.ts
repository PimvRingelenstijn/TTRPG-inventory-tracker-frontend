// src/api/services/auth.ts
import { fetchAPI } from '../client';
// noinspection ES6PreferShortImport
import type {
    UserRegistrationRequest,
    UserLoginRequest,
    AuthResponse,
    UserProfileResponse
} from '../types/auth.types';

export const authService = {
    async register(userData: UserRegistrationRequest): Promise<AuthResponse> {
        return fetchAPI<AuthResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },

    async login(loginData: UserLoginRequest): Promise<void>{
        await fetchAPI('/auth/login', {
            method: 'POST',
            body: JSON.stringify(loginData)
        });
    },

    async logout(): Promise<void> {
        await fetchAPI('/auth/logout', {
            method: 'POST'
        });
    },

    async getCurrentUser(): Promise<{ user: UserProfileResponse }> {
        return fetchAPI<{ user: UserProfileResponse }>('/profile/me', {
            method: 'GET'
        });
    },
};