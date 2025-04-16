import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MealManagement } from './pages/MealManagement';
import { MeditationManagement } from './pages/Meditation';
import { WorkoutManagement } from './pages/Workout';
import { DashboardOverview } from './pages/DashboardOverview';
import { ProgramManagement } from './pages/Program';
import Layout from './Layout/Layout';
import TrainerLogin from "./pages/Login/TrainerLogin";
import TrainerSignup from './pages/Signup/TrainerSignup';
import VerifyEmail from "./pages/VerifyEmail";
import { SnackManagement } from './pages/SnackManagement';
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTrainer from "./pages/admin/trainers/AdminTrainers";
import AdminUsers from "./pages/admin/users/AdminUsers";



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
        <Route path="snacks" element={<SnackManagement />} />
      </Route>

      {/* Outside the Layout */}
      <Route path="/trainer/login" element={<TrainerLogin />} />
      <Route path="/trainer/signup" element={<TrainerSignup />} />
      <Route path="/trainer/verify-email" element={<VerifyEmail />} />

      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/trainers" element={<AdminTrainer />} />
      <Route path="/admin/users" element={<AdminUsers />} />

    </Routes>
  </Router>
);

export default App;
