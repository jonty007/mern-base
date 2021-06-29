import AuthState from '../store/auth/auth-state';
import UserState from '../store/user/user-state';
import NavigationState from '../store/navigation/navigation-state';

export default interface RootState {
    appName: string;
    navigation: NavigationState;
    auth: AuthState;
    user: UserState;
}
