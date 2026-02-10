import { fetchAPI } from './client';

// Your existing interfaces
export interface GameSystem {
    id: number;
    name: string;
    description: string;
}

export interface CreateGameSystemDTO {
    name: string;
    description: string;
}

// Game systems API methods
export const getGameSystems = async (): Promise<GameSystem[]> => {
    const data = await fetchAPI<GameSystem[]>('/game-systems');
    console.log('Received game systems data:', data);
    return data;
};

// no use yet
// export const getGameSystemById = async (id: number): Promise<GameSystem> => {
//     return fetchAPI<GameSystem>(`/game-systems/${id}`);
// };

export const createGameSystem = async (gameSystem: CreateGameSystemDTO): Promise<GameSystem> => {
    const data = await fetchAPI<GameSystem>('/game-systems', {
        method: 'POST',
        body: JSON.stringify(gameSystem),
    });
    console.log('Created game system:', data);
    return data;
};