import { combineReducers } from 'redux';
import AuthReducer from './reducer_auth';
import ProfilesReducer from './reducer_profiles';
const rootReducer = combineReducers({
  userInfo: AuthReducer,
  profiles: ProfilesReducer
});

export default rootReducer;
