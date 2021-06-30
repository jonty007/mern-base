import UserState from 'src/store/user/user-state';
import AuthState from '../store/auth/auth-state';
import NavigationState from '../store/navigation/navigation-state';

export const INITIAL_NAVIGATION_STATE: NavigationState = {
    stepsList: [],
};

export const INITIAL_AUTH_STATE: AuthState = {
    token: '',
    isLoggedIn: false,
};

export const INITIAL_USER_STATE: UserState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    profilePictureBase64: undefined as any,
    profilePictureId: '',
    userPasswordUpdateStatus: '',
};
