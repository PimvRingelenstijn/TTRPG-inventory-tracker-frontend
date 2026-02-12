// src/api/services/gameSystems.ts
import { fetchAPI } from '../client';
import type { GameSystemsResponse, CreateGameSystemRequest } from '../types/';


export const gameSystemsService = {
    async getGameSystems(): Promise<GameSystemsResponse[]> {
        const data = await fetchAPI<GameSystemsResponse[]>('/game-systems');
        console.log('Received game systems data:', data);
        return data;
    },

    async createGameSystem(gameSystem: CreateGameSystemRequest): Promise<GameSystemsResponse> {
        const data = await fetchAPI<GameSystemsResponse>('/game-systems', {
            method: 'POST',
            body: JSON.stringify(gameSystem),
        });
        console.log('Created game system:', data);
        return data;
    }
};

// export const getGameSystems = async (): Promise<GameSystemsResponse[]> => {
//     const data = await fetchAPI<GameSystemsResponse[]>('/game-systems');
//     console.log('Received game systems data:', data);
//     return data;
// };
//
// export const createGameSystem = async (gameSystem: CreateGameSystemRequest): Promise<GameSystemsResponse> => {
//     const data = await fetchAPI<GameSystemsResponse>('/game-systems', {
//         method: 'POST',
//         body: JSON.stringify(gameSystem),
//     });
//     console.log('Created game system:', data);
//     return data;
// };