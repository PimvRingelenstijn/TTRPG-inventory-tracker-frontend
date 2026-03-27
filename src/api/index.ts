// ================= SERVICES =================
export { authService } from './services/auth';
export { gameSystemsService } from './services/gameSystems';


// ================= API TYPES =================
// Auth types
export type {
    RegistrationRequest,
    LoginRequest,
    UserDataResponse
} from './types/auth.types';

// Game system types
export type {
    GameSystemsResponse,
    CreateGameSystemRequest
} from './types/gameSystems.types';