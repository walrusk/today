import { combineReducers } from 'redux';
import app from '@/app/appReducer';
import auth from '@/auth/authReducer';

export default combineReducers({
    app,
    auth,
});
