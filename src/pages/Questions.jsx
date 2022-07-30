import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';

import { Button, CircularProgress, Typography, Box } from "@mui/material";

import { decode } from "html-entities";

import {TriviaAction} from '../store/actions';


const triviaAppTitle = {
  color: '#3A7859',
  fontWeight: 700,
  fontSize: '50px',
  lineHeight: 1.5,
  textAlign: 'center',
  marginBottom: '146px'
};

const Questions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categories: { entryCategory }, questions: { list, isLoading, entryQuestion, entryQuestionIndex, score, answers } } = useSelector(state => state.trivia);

  useEffect(() => {
    !entryCategory && navigate('/');
  }, [entryCategory, navigate]);

  useEffect(() => {
    dispatch(TriviaAction.getQuestions());
  }, [dispatch])

  const onAnswer = ({ target: { textContent } }) => {
    dispatch(TriviaAction.changeQuestion(textContent, navigate))
  };

  if (isLoading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h3" sx={triviaAppTitle}>Questions {entryQuestionIndex + 1}</Typography>
      <Box mt={5} className={entryQuestion?.difficulty}>{entryQuestion?.difficulty}</Box>
      <Typography mt={5}>
        {decode(entryQuestion.question)}
      </Typography>
      {answers.map((data, id) => <Button key={id} variant="contained" onClick={onAnswer}>{decode(data)}</Button>)}
    </Box>
  );
};

export default Questions;