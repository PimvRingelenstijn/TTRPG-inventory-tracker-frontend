// src/api/services/gameSystems.ts
import { fetchAPI } from '../client';
// noinspection ES6PreferShortImport
import type { GameSystemsResponse, CreateGameSystemRequest } from '../types/gameSystems.types';


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
