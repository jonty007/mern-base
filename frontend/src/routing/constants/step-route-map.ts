import { ActionSteps } from './steps';
import * as Routes from './routes';

export const STEP_ROUTE_MAP: { [key: string]: string } = {
    /**
     * UI Owned Actions
     */
    [ActionSteps.SET_MAIN_DASHBOARD]: Routes.MAIN_DASHBOARD,
    [ActionSteps.SET_LANDING_PAGE]: Routes.LANDING_PAGE,
    [ActionSteps.SET_LOGIN_PAGE]: Routes.LOGIN_PAGE,
    [ActionSteps.SET_SIGN_UP_PAGE]: Routes.SIGN_UP_PAGE,
};
