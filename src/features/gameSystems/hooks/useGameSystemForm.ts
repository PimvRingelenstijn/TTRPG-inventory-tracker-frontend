// src/features/gameSystems/hooks/useGameSystemForm.ts
import { useState } from 'react';
import { useForm } from '@/hooks/useForm';
import { gameSystemsService } from '@/api';
import type { CreateGameSystemRequest, GameSystemsResponse } from '@/api';
import type { GameSystemFormData } from '../types';

export const useGameSystemForm = (onSuccess?: (newSystem: GameSystemsResponse) => void) => {
    const { formData, handleChange, resetForm } = useForm<GameSystemFormData>({
        name: '',
        description: '',
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const validateForm = (): boolean => {
        if (!formData.name.trim()) {
            setError('Game system name is required');
            return false;
        }

        if (!formData.description.trim()) {
            setError('Description is required');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const gameSystemRequest: CreateGameSystemRequest = {
                name: formData.name,
                description: formData.description
            };

            const createdGameSystem = await gameSystemsService.createGameSystem(gameSystemRequest);

            if (onSuccess) {
                onSuccess(createdGameSystem);
            }

            resetForm();  // Using the reset from useForm
            console.log('New game system added:', createdGameSystem);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            setError(`Failed to create game system: ${errorMessage}`);
            console.error('Error creating game system:', err);
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        error,
        loading,
        handleChange,  // From useForm
        handleSubmit,
    };
};