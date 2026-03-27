// src/api/client.ts
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL; // Your FastAPI backend URL

// Base fetch wrapper with consistent error handling
export const fetchAPI = async <T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            credentials: 'include', // IMPORTANT: For cookies
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API Error [${endpoint}]:`, errorText);
            throw new Error(`Request failed: ${response.status} ${response.statusText}`);
        }

        // Handle empty responses (like for logout)
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }

        return undefined as T;
    } catch (error) {
        console.error(`Fetch error [${endpoint}]:`, error);
        throw error;
    }
};