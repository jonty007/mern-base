import { combineEpics } from 'redux-observable';
import navigationEpics from './navigation/navigation-epics';
import authEpics from './auth/auth-epics';
import userEpics from './user/user-epics';

export default combineEpics(...navigationEpics, ...authEpics, ...userEpics);
