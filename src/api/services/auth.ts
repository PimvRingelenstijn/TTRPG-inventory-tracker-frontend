// src/api/services/auth.ts
import { fetchAPI } from '../client';
// noinspection ES6PreferShortImport
import type {
    RegistrationRequest,
    LoginRequest,
    UserDataResponse
} from '../types/auth.types';

export const authService = {
    async register(userData: RegistrationRequest): Promise<void> {
        await fetchAPI('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },

    async login(loginData: LoginRequest): Promise<UserDataResponse> {
        return await fetchAPI<UserDataResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(loginData)
        });
    },

    async logout(): Promise<void> {
        await fetchAPI('/auth/logout', {
            method: 'POST'
        });
    },

    async getCurrentUser(): Promise<UserDataResponse> {
            return await fetchAPI<UserDataResponse>('/auth/me', {
            method: 'GET'
        });
    },
};