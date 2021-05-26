import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { gamesReducer } from './gamesReducer';


export const rootReducer = combineReducers({
    auth: authReducer,
    games: gamesReducer
})
