import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';

import {Button, CircularProgress, Typography, Box, Grid} from "@mui/material";

import { decode } from "html-entities";

import {TriviaAction} from '../../store/actions';

import './questions.scss';

const Questions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categories: { entryCategory }, questions: { isLoading, entryQuestion, entryQuestionIndex, answers } } = useSelector(state => state.trivia);

  useEffect(() => {
    if (!entryCategory) {
      dispatch(TriviaAction.onBackHome(navigate));
    }
  }, [dispatch, entryCategory, navigate]);

  useEffect(() => {
    entryCategory && dispatch(TriviaAction.getQuestions());
  }, [dispatch, entryCategory]);

  const onAnswer = ({ target: { textContent } }) => {
    dispatch(TriviaAction.changeQuestion(textContent, navigate));
  };

  if (isLoading) {
    return (
      <Box mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="question-container">
      <Typography variant="h3" className="container-title question-title">Questions {entryQuestionIndex + 1}</Typography>
      <Box className={`difficulty ${entryQuestion?.difficulty}`}>{entryQuestion?.difficulty}</Box>
      <Typography className="question">{decode(entryQuestion.question)}</Typography>
      <Grid container alignItems="center" justifyContent="space-evenly" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {answers.map((data, id) => (
          <Grid item xs={4} sm={3} md={3} key={id}>
            <Button className="answer-btn" variant="contained" onClick={onAnswer}>{decode(data)}</Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Questions;