// const API_BASE_URL = 'http://localhost:8000'; // Your FastAPI backend URL
//
// // Match your Pydantic model exactly
// export interface GameSystem {
//     id: number;           // Required in backend response
//     name: string;         // Required in backend response
//     description: string;  // Required in backend response
//     // Note: No version or created_at fields based on your backend model
// }
//
// // Create DTO (Data Transfer Object) for sending data to backend
// export interface CreateGameSystemDTO {
//     name: string;
//     description: string;
// }
//
// // Get all game systems
// export const getGameSystems = async (): Promise<GameSystem[]> => {
//     try {
//         const response = await fetch(`${API_BASE_URL}/game-systems`);
//
//         // Log response for debugging
//         console.log('Response status:', response.status);
//         console.log('Response headers:', response.headers);
//
//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error('Error response:', errorText);
//             throw new Error(`Failed to fetch game systems: ${response.status} ${response.statusText}`);
//         }
//
//         const data = await response.json();
//         console.log('Received data:', data); // Debug log
//         return data;
//     } catch (error) {
//         console.error('Fetch error:', error);
//         throw error;
//     }
// };
//
// // Get a single game system by ID
// export const getGameSystemById = async (id: number): Promise<GameSystem> => {
//     const response = await fetch(`${API_BASE_URL}/game-systems/${id}`);
//     if (!response.ok) {
//         throw new Error(`Failed to fetch game system with id ${id}`);
//     }
//     return response.json();
// };
//
// // Create a new game system - use CreateGameSystemDTO instead of Omit<GameSystem, 'id'>
// export const createGameSystem = async (gameSystem: CreateGameSystemDTO): Promise<GameSystem> => {
//     try {
//         const response = await fetch(`${API_BASE_URL}/game-systems`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(gameSystem),
//         });
//
//         console.log('Create response status:', response.status);
//
//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error('Create error response:', errorText);
//             throw new Error(`Failed to create game system: ${response.status}`);
//         }
//
//         const data = await response.json();
//         console.log('Created system:', data);
//         return data;
//     } catch (error) {
//         console.error('Create request error:', error);
//         throw error;
//     }
// };