import { TriviaActionTypes } from '../types';

const initialState = {
  categories: {
    list: [],
    entryCategory: '',
    isLoading: false
  },
  questions: {
    list: [],
    isLoading: false,
    entryQuestion: {},
    answers: [],
    entryQuestionIndex: 0,
    score: 0,
  }
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
    case TriviaActionTypes.SET_ENTRY_CATEGORY:
      return {
        ...state,
        categories: {
          ...state.categories,
          entryCategory: payload
        }
      };
    case TriviaActionTypes.QUESTIONS_LOADING:
      return {
        ...state,
        questions: {
          ...state.questions,
          isLoading: payload
        }
      };
    case TriviaActionTypes.SET_QUESTIONS:
      return {
        ...state,
        questions: {
          ...state.questions,
          list: [ ...payload ]
        }
      };
    case TriviaActionTypes.UPDATE_SCORE:
      return {
        ...state,
        questions: {
          ...state.questions,
          score: payload
        }
      };
    case TriviaActionTypes.SET_ENTRY_QUESTION:
      return {
        ...state,
        questions: {
          ...state.questions,
          entryQuestion: { ...payload }
        }
      };
    case TriviaActionTypes.SET_ENTRY_QUESTION_INDEX:
      return {
        ...state,
        questions: {
          ...state.questions,
          entryQuestionIndex: payload
        }
      };
    case TriviaActionTypes.SET_ANSWERS:
      return {
        ...state,
        questions: {
          ...state.questions,
          answers: [ ...payload ]
        }
      };
    default: return state;
  }
};

export default triviaReducer;