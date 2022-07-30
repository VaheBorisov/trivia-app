import { TriviaActionTypes } from '../types';

const initialState = {
    categories: {
        list: [],
        isLoading: false
    },
};

const triviaReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TriviaActionTypes.CATEGORIES_LOADING:
      return {
        ...state,
        categories: {
          ...state.categories,
          isLoading: payload
        }
      };
    case TriviaActionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: {
          ...state.categories,
          list: [ ...payload ]
        }
      };
    default: return state;
  }
};

export default triviaReducer;