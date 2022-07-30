import { combineReducers } from 'redux';

// reducers
import triviaReducer from './trivia.reducer';

const appReducers = combineReducers({
  trivia: triviaReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    state = undefined;
  }
  return appReducers(state, action);
};

export default rootReducer;