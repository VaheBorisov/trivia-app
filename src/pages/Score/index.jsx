import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {Box, Button, Typography} from '@mui/material';

import {TriviaAction} from '../../store/actions';

import './score.scss';

const Score = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { questions: { score, list } } = useSelector(state => state.trivia);

  const onBackHome = () => {
    dispatch(TriviaAction.onBackHome(navigate));
  };

  return (
    <Box className="score-container">
      <Typography variant="h3" className="container-title score-title">Thank You</Typography>
      <Box className="score">Your Score: {score} / {list.length}</Box>
      <Button className="back-to-home" onClick={onBackHome}>Back to home</Button>
    </Box>
  );
};

export default Score;