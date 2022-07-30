import { TriviaActionTypes } from '../types';
import axios from 'axios';
import {getRandomInt} from '../../utils/helper';

const axiosIns = axios.create({
  baseURL: 'https://opentdb.com',
});

const getCategories = () => async (dispatch) => {
  try {
    dispatch(categoriesLoading(true));

    const res = await axiosIns.get('/api_category.php');

    dispatch(setCategories(res.data.trivia_categories));

  } catch (e) {
    console.warn(e);
  } finally {
    dispatch(categoriesLoading(false));
  }
};

const getQuestions = () => async (dispatch, getState) => {
  try {
    dispatch(questionsLoading(true));
    const { trivia: { categories: { entryCategory }, questions: { entryQuestionIndex } } } = getState();

    const res = await axiosIns.get(`/api.php?amount=10&category=${entryCategory}`);

    const questions = res.data.results;
    const question = questions[entryQuestionIndex];
    const answers = [...question.incorrect_answers];
    answers.splice(getRandomInt(question.incorrect_answers.length), 0, question.correct_answer);

    dispatch(setQuestions(res.data.results));
    dispatch(setEntryQuestion(question));
    dispatch(setAnswers(answers));

  } catch (e) {
    // console.warn(e);
  } finally {
    dispatch(questionsLoading(false));
  }
};

const changeQuestion = (value, navigate) => async (dispatch, getState) => {
  const { trivia: { questions: { entryQuestionIndex, list, entryQuestion, score } } } = getState();

  if (value === entryQuestion.correct_answer) {
    dispatch(updateScore(score + 1));
  }

  if (entryQuestionIndex + 1 < list.length) {
    dispatch(setEntryQuestionIndex(entryQuestionIndex + 1));

    const question = list.at(entryQuestionIndex + 1);
    const answers = [...question.incorrect_answers];

    answers.splice(getRandomInt(question.incorrect_answers.length), 0, question.correct_answer);

    dispatch(setEntryQuestion(question));
    dispatch(setAnswers(answers));
  } else {
    navigate('/score');
  }
};

const onBackHome = (navigate) => async (dispatch) => {
  dispatch({ type: 'RESET_STORE' });
  navigate('/');
};

const setAnswers = (answers) => {
  return {
    type: TriviaActionTypes.SET_ANSWERS,
    payload: [...answers]
  };
}

const setEntryQuestionIndex = (index) => {
  return {
    type: TriviaActionTypes.SET_ENTRY_QUESTION_INDEX,
    payload: index,
  };
};

const updateScore = (score) => {
  return {
    type: TriviaActionTypes.UPDATE_SCORE,
    payload: score
  };
};

const setEntryQuestion = (question) => {
  return {
    type: TriviaActionTypes.SET_ENTRY_QUESTION,
    payload: { ...question }
  };
};

const setQuestions = (questions) => {
  return {
    type: TriviaActionTypes.SET_QUESTIONS,
    payload: [ ...questions ]
  };
};

const questionsLoading = (loading) => {
  return {
    type: TriviaActionTypes.CATEGORIES_LOADING,
    payload: loading
  };
};

const onSelectCategory = (value) => {
  return {
    type: TriviaActionTypes.SET_ENTRY_CATEGORY,
    payload: value
  }
};

const categoriesLoading = (loading) => {
  return {
    type: TriviaActionTypes.CATEGORIES_LOADING,
    payload: loading
  };
};

const setCategories = (categories) => {
  return {
    type: TriviaActionTypes.SET_CATEGORIES,
    payload: [...categories]
  };
};

export const TriviaAction = {
  getCategories,
  onSelectCategory,
  getQuestions,
  updateScore,
  changeQuestion,
  setEntryQuestionIndex,
  onBackHome
};