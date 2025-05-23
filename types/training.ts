// types/training.ts
export interface SanityTrainingItem {
    _id: string;
    title: string;
    description: string;
    shortDescription?: string;
    slug: {
        current: string;
    };
    image?: {
        asset: {
            _ref: string;
        };
    };
    duration?: string;
    price?: number;
    level?: 'beginner' | 'intermediate' | 'advanced';
    category?: string;
    instructor?: string;
    features?: string[];
    schedule?: {
        startDate: string;
        endDate: string;
        daysOfWeek: string[];
        timeSlot: string;
    };
    maxStudents?: number;
    currentStudents?: number;
    isActive?: boolean;
    _createdAt: string;
    _updatedAt: string;
}

export interface TrainingItem {
    id: string;
    title: string;
    description: string;
    shortDescription?: string;
    slug: string;
    image?: string;
    duration?: string;
    price?: number;
    level?: 'beginner' | 'intermediate' | 'advanced';
    category?: string;
    instructor?: string;
    features?: string[];
    schedule?: {
        startDate: string;
        endDate: string;
        daysOfWeek: string[];
        timeSlot: string;
    };
    maxStudents?: number;
    currentStudents?: number;
    isActive?: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface RegistrationFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    trainingId: string;
    trainingTitle: string;
    message?: string;
    preferredSchedule?: string;
}