import { History } from 'history';
import UserServiceModel from 'src/services/user/model/service-model';
import AuthServiceModel from '../services/auth/model/service-model';

export interface Services {
    history: History;
    authService: AuthServiceModel;
    userService: UserServiceModel;
}
