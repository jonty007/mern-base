import { combineEpics } from 'redux-observable';
import navigationEpics from './navigation/navigation-epics';
import authEpics from './auth/auth-epics';

export default combineEpics(...navigationEpics, ...authEpics);
