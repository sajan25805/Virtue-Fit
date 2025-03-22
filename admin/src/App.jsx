import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { MealManagement } from './pages/MealManagement';
import { MeditationManagement } from './pages/Meditation';
import {WorkoutManagement} from "./pages/Workout";
import { DashboardOverview } from './pages/DashboardOverview';
import Layout from './Layout/Layout';

const App = () => (
  <Router>
    <Routes>
    <Route path="/" element={<Layout />}>
        {/* Nested routes */}
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/workout" element={<WorkoutManagement />} />
        <Route path="/meals" element={<MealManagement />} />
        <Route path="/meditations" element={<MeditationManagement />} />
    </Route>
    </Routes>
  </Router>
);

export default App;

