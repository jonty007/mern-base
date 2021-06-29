import { UserActionTypes } from 'src/store/user/user-action-types';
import { AuthActionTypes } from '../store/auth/auth-action-types';
import { NavigationActionTypes } from '../store/navigation/navigation-action-types';

export type RootAction = NavigationActionTypes | AuthActionTypes | UserActionTypes;
