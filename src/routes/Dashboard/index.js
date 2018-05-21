import {injectReducer} from '../../store/reducers';

export default (store) => ({
    path: 'dashboard',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const dashboard = require('./containers/DashboardContainer').default
            const reducer = require('./modules/dashboard').default
            injectReducer(store, {key: 'dashboard', reducer})
            cb(null, dashboard)

        }, 'dashboard')
    }
})
