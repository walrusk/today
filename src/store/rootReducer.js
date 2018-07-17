import { combineReducers } from 'redux';
import app from '@/app/appReducer';
import auth from '@/auth/authReducer';
import list from '@/list/listReducer';

export default combineReducers({
    app,
    auth,
    list,
});
