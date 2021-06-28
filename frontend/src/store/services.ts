import { History } from 'history';
import AuthServiceModel from '../services/auth/model/service-model';

export interface Services {
    history: History;
    authService: AuthServiceModel;
}
