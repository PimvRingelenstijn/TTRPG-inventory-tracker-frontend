// src/features/gameSystems/components/GameSystemForm.tsx
import React from 'react';
import { useGameSystemForm } from '../hooks/useGameSystemForm';
import type { GameSystemsResponse } from '@/api';

interface GameSystemFormProps {
    onSuccess?: (newSystem: GameSystemsResponse) => void;
}

const GameSystemForm: React.FC<GameSystemFormProps> = ({ onSuccess }) => {
    const { formData, error, loading, handleChange, handleSubmit } =
        useGameSystemForm(onSuccess);

    return (
        <div className="add-system-form">
            <h2>Add New Game System</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., Dungeons & Dragons 5e"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description *</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the game system..."
                        rows={3}
                        required
                    />
                </div>

                {error && (
                    <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
                        Error: {error}
                    </div>
                )}

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                    style={{
                        opacity: loading ? 0.7 : 1,
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Adding...' : 'Add Game System'}
                </button>
            </form>
        </div>
    );
};

export default GameSystemForm;