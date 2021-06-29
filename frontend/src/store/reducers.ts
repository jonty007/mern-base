import { combineReducers } from 'redux';
import userReducer from '../store/user/user-action-reducers';
import navigationReducer from '../store/navigation/navigation-action-reducers';
import authReducer from '../store/auth/auth-action-reducers';

export default combineReducers({
    navigation: navigationReducer,
    user: userReducer,
    auth: authReducer,
});
