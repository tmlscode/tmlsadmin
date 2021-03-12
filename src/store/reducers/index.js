import {combineReducers} from 'redux';
import { appReducer } from './appreducer';

export default combineReducers({
    app:appReducer,
})