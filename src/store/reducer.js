import { combineReducers } from 'redux-immutable';
import Header from '../common/header/reducer';
import Error from '../component/404/reducer';

export default combineReducers({
    Header,
    Error
})