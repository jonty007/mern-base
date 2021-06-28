import AuthState from '../store/auth/auth-state';
import NavigationState from '../store/navigation/navigation-state';

export const INITIAL_NAVIGATION_STATE: NavigationState = {
    stepsList: [],
};

export const INITIAL_AUTH_STATE: AuthState = {
    token: '',
    isLoggedIn: false,
};
