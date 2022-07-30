import { combineReducers } from 'redux';

// reducers
import triviaReducer from './trivia.reducer';

const appReducers = combineReducers({
  trivia: triviaReducer
});

export default appReducers;