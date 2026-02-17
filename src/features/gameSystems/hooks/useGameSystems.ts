// src/features/gameSystems/hooks/useGameSystems.ts
import { useState, useEffect } from 'react';
import { gameSystemsService } from '@/api';
import type { GameSystemsResponse } from '@/api';

export const useGameSystems = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [gameSystems, setGameSystems] = useState<GameSystemsResponse[]>([]);


    const fetchGameSystems = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await gameSystemsService.getGameSystems();
            setGameSystems(data);
            console.log('Game systems loaded:', data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            setError(`Failed to load game systems: ${errorMessage}`);
            console.error('Error loading game systems:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGameSystems();
    }, []);

    return {
        gameSystems,
        loading,
        error,
        refetch: fetchGameSystems
    };
};