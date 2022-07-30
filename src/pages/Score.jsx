import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {Box, Button, Typography} from '@mui/material';

import {TriviaAction} from '../store/actions';

const triviaAppTitle = {
  color: '#3A7859',
  fontWeight: 700,
  fontSize: '50px',
  lineHeight: 1.5,
  textAlign: 'center',
  marginBottom: '146px'
};


const Score = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { questions: { score, list } } = useSelector(state => state.trivia);

  const onBackHome = () => {
    dispatch(TriviaAction.onBackHome(navigate));
  };

  return (
    <Box>
      <Typography variant="h3" sx={triviaAppTitle}>Thank You</Typography>
      <Box mt={5}>Your Score: {score} / {list.length}</Box>
      <Button onClick={onBackHome}>Back to home</Button>
    </Box>
  );
};

export default Score;