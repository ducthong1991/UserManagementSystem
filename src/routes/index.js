// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout';
import Home from './Home';
import DashboardRoute from './Dashboard';


export const createRoutes = (store) => ({
    path: '/',
    component: CoreLayout,
    indexRoute: Home,
    childRoutes: [
        DashboardRoute(store),
    ]
})

export default createRoutes;
