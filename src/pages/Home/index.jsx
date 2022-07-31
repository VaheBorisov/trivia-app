import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {Box, Typography, FormControl, Select, MenuItem, FormLabel, Button} from '@mui/material';

import {TriviaAction} from '../../store/actions';

import './home.scss';


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories: { list, entryCategory } } = useSelector(state => state.trivia);


  useEffect(() => {
    dispatch(TriviaAction.getCategories());
  }, [dispatch]);

  const renderValue = (selected) => {
    return selected || <span className="placeholder">Category</span>;
  }

  const onSelectCategory = ({ target: { value } }) => {
    dispatch(TriviaAction.onSelectCategory(value));
  };

  const onStart = () => {
    navigate('/questions');
  };

  return (
    <Box className="home-container">
      <Typography variant="h3" className="container-title home-title">Trivia App</Typography>
      <FormControl sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <FormLabel className="category-label">Pick a Category</FormLabel>
        <Select
          className="select-category"
          displayEmpty
          value={entryCategory}
          onChange={onSelectCategory}
          renderValue={renderValue}
          MenuProps={{ PaperProps: { className: 'select-category-dropdown' } }}
        >
          {list.map(category => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
        </Select>
        <Button onClick={onStart} disabled={!entryCategory} variant="contained" className="start-btn">Start</Button>
      </FormControl>
    </Box>
  );
};

export default Home;