// src/api/types/gameSystems.types.ts
export interface GameSystemsResponse {
    id: number;
    name: string;
    description: string;
}

export interface CreateGameSystemRequest {
    name: string;
    description: string;
}