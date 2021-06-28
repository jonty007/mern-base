import NavigationState from '../store/navigation/navigation-state';

export default interface RootState {
    appName: string;
    navigation: NavigationState;
}
