const API_BASE_URL = 'http://localhost:8000'; // Your FastAPI backend URL

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
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API Error [${endpoint}]:`, errorText);
            throw new Error(`Request failed: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Fetch error [${endpoint}]:`, error);
        throw error;
    }
};