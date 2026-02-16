// ================= SERVICES =================
export { authService } from './services/auth';
export { gameSystemsService } from './services/gameSystems';


// ================= API TYPES =================
// Auth types
export type {
    UserRegistrationRequest,
    UserLoginRequest,
    AuthResponse,
    UserProfileResponse
} from './types/auth.types';

// Game system types
export type {
    GameSystemsResponse,
    CreateGameSystemRequest
} from './types/gameSystems.types';