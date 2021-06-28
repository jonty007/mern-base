import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './reducers';
import rootEpic from './epics';
import RootState from './state';
import { RootAction } from './action';
import { Services } from './services';
import history from '../routing/history';
import AUTH_SERVICE from '../services/auth/auth-service';

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, Services>({
    dependencies: {
        history: history,
        authService: AUTH_SERVICE,
    },
});

export default function configureStore() {
    const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

    epicMiddleware.run(rootEpic);

    return store;
}
