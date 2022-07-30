import {Route, Routes} from 'react-router-dom';

import Home from './pages/Home';
import Questions from './pages/Questions';
import Score from './pages/Score';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="questions" element={<Questions />}/>
        <Route path="score" element={<Score />} />
      </Routes>
    </div>
  );
}

export default App;
