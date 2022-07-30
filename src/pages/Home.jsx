import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {Box, Typography, FormControl, Select, MenuItem, FormLabel, Button} from '@mui/material';
import {makeStyles, styled} from '@mui/styles';

import {TriviaAction} from '../store/actions';

const triviaAppTitle = {
  color: '#3A7859',
  fontWeight: 700,
  fontSize: '50px',
  lineHeight: 1.5,
  textAlign: 'center',
  marginBottom: '146px'
};

const useClasses = makeStyles(() => ({
  startBtn: {
    width: '150px',
    height: '56px',
  }
}));

const CustomLabelSelect = styled(FormLabel)(() => ({
  '&.MuiFormLabel-root': {
    marginBottom: '36px',
    color: '#354153',
    fontWeight: 700,
    fontSize: '30px',
    lineHeight: 1.5,
    textAlign: 'center',
    '&.Mui-focused': {
      color: '#354153',
    }
  },
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  '&.css-1dp8wnk-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root': {
    borderRadius: '18px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.04)',
    background: '#F6F7F8',
    '& > .MuiSelect-select': {
      padding: '12.5px 46px 12.5px 16px',
    },
    '& > .MuiOutlinedInput-notchedOutline': {
      border: '2px solid #E7EBF1',
    },
    '&:hover': {
      '& > .MuiOutlinedInput-notchedOutline': {
        borderColor: '#95B6A9',
      }
    },
    '&.Mui-focused': {
      '& > .MuiOutlinedInput-notchedOutline': {
        borderColor: '#95B6A9',
        borderWidth: '2px',
      }
    }
  }
}));


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories: { isLoading, list, entryCategory } } = useSelector(state => state.trivia);

  const classes = useClasses();

  useEffect(() => {
    dispatch(TriviaAction.getCategories());
  }, [dispatch]);

  const onSelectCategory = ({ target: { value } }) => {
    dispatch(TriviaAction.onSelectCategory(value));
  };

  const onStart = () => navigate('/questions');

  return (
    <Box sx={{ width: '320px' }}>
      <Typography variant="h3" sx={triviaAppTitle}>Trivia App</Typography>
      <FormControl sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <CustomLabelSelect>Pick a Category</CustomLabelSelect>
        <CustomSelect
          sx={{ width: '100%' }}
          displayEmpty
          value={entryCategory || ''}
          onChange={onSelectCategory}
          MenuProps={{ PaperProps: { sx: { maxHeight: 222, marginTop: '6px', width: '320px', background: '#F6F7F8', borderRadius: '18px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.04)' } } }}
        >
          {list.map(category => <MenuItem key={category.id} value={`${category.id}`}>{category.name}</MenuItem>)}
        </CustomSelect>
        <Button onClick={onStart} disabled={!entryCategory} variant="contained" sx={{ marginTop: '99px' }} className={classes.startBtn}>Start</Button>
      </FormControl>
    </Box>
  );
};

export default Home;