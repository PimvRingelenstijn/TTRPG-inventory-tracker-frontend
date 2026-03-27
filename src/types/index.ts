// src/types/index.ts
// Global types that might be shared across features
export interface User {
    id: number;
    name: string;
    email: string;
}

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}