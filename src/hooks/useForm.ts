// src/hooks/useForm.ts
import React, { useState } from 'react';

type FormFields = Record<string, any>;

interface UseFormReturn<T extends FormFields> {
    formData: T;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    resetForm: () => void;
    setFormData: React.Dispatch<React.SetStateAction<T>>;
}

export const useForm = <T extends FormFields>(initialData: T): UseFormReturn<T> => {
    const [formData, setFormData] = useState<T>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData(initialData);
    };

    return {
        formData,
        handleChange,
        resetForm,
        setFormData,
    };
};