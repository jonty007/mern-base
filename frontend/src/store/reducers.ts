import { combineReducers } from 'redux';
import navigationReducer from '../store/navigation/navigation-action-reducers';

export default combineReducers({
    navigation: navigationReducer,
});
