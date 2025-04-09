import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MealManagement } from './pages/MealManagement';
import { MeditationManagement } from './pages/Meditation';
import { WorkoutManagement } from './pages/Workout';
import { DashboardOverview } from './pages/DashboardOverview';
import { ProgramManagement } from './pages/Program';
import Layout from './Layout/Layout';
import TrainerLogin from "./pages/Login/TrainerLogin";
import TrainerSignup from './pages/Signup/TrainerSignup';
import VerifyEmail from "./pages/VerifyEmail"

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Nested routes inside the layout */}
        <Route path="trainer/dashboard" element={<DashboardOverview />} />
        <Route path="workout" element={<WorkoutManagement />} />
        <Route path="meals" element={<MealManagement />} />
        <Route path="meditations" element={<MeditationManagement />} />
        <Route path="programs" element={<ProgramManagement />} />
      </Route>

      {/* Outside the Layout */}
      <Route path="/trainer/login" element={<TrainerLogin />} />
      <Route path="/trainer/signup" element={<TrainerSignup />} />
      <Route path="/trainer/verify-email" element={<VerifyEmail />} />

    </Routes>
  </Router>
);

export default App;
