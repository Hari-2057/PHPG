import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Form from './pages/Form';
import Results from './pages/Results';
import Tools from './pages/Tools';
import Tips from './pages/Tips';

import MealPlanner from './pages/MealPlanner';
import Mindfulness from './pages/Mindfulness';
import Workouts from './pages/Workouts';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/results" element={<Results />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/meals" element={<MealPlanner />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/mindfulness" element={<Mindfulness />} />
      </Routes>
    </Router>
  );
}

export default App;
