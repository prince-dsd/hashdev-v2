import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import profilesReducer from './profiles/reducer';
import profileReducer from './profile/reducer';
import alertsReducer from './alerts/reducer';

const rootReducer = combineReducers({
    alerts: alertsReducer,
    auth: authReducer,
    profile: profileReducer,
    profiles: profilesReducer,
});

export default rootReducer;
