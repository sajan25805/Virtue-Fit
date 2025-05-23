

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { MealManagement } from './pages/MealManagement';
// import { MeditationManagement } from './pages/Meditation';
// import { WorkoutManagement } from './pages/Workout';
// import { DashboardOverview } from './pages/DashboardOverview';
// // import { ProgramManagement } from './pages/Program';
// import Layout from './Layout/Layout';
// import TrainerLogin from "./pages/Login/TrainerLogin";
// import TrainerSignup from './pages/Signup/TrainerSignup';
// import VerifyEmail from "./pages/VerifyEmail";
// import { SnackManagement } from './pages/SnackManagement';
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminTrainer from "./pages/admin/trainers/AdminTrainers";
// import AdminUsers from "./pages/admin/users/AdminUsers";
// import { ProtectedRoute } from "./components/ProtectedRoute";
// import ProgramManagement from './pages/program/ProgramManagement';



// const App = () => (
//   <Router>
//     <Routes>

//       {/* Outside the layout (Public Routes) */}
//       <Route path="/trainer/login" element={<TrainerLogin />} />
//       <Route path="/trainer/signup" element={<TrainerSignup />} />
//       <Route path="/trainer/verify-email" element={<VerifyEmail />} />

//       {/* Admin panel (Public for now) */}
// <Route
//   path="/admin"
//   element={
//     <AdminProtectedRoute>
//       <AdminLayout>
//         <AdminDashboard />
//       </AdminLayout>
//     </AdminProtectedRoute>
//   }
// />

// <Route
//   path="/admin/users"
//   element={
//     <AdminProtectedRoute>
//       <AdminLayout>
//         <AdminUsers />
//       </AdminLayout>
//     </AdminProtectedRoute>
//   }
// />

// <Route
//   path="/admin/trainers"
//   element={
//     <AdminProtectedRoute>
//       <AdminLayout>
//         <AdminTrainers />
//       </AdminLayout>
//     </AdminProtectedRoute>
//   }
// />

//       {/* Protected Routes inside Layout */}
//       <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
//         <Route path="trainer/dashboard" element={<DashboardOverview />} />
//         <Route path="workout" element={<WorkoutManagement />} />
//         <Route path="meals" element={<MealManagement />} />
//         <Route path="meditations" element={<MeditationManagement />} />
//         <Route path="programs" element={<ProgramManagement />} />
//         <Route path="snacks" element={<SnackManagement />} />
//       </Route>

//     </Routes>
//   </Router>
// );

// export default App;


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MealManagement } from './pages/MealManagement';
import { MeditationManagement } from './pages/Meditation';
import { WorkoutManagement } from './pages/Workout';
import { DashboardOverview } from './pages/DashboardOverview';
import Layout from './Layout/Layout';
import TrainerLogin from "./pages/Login/TrainerLogin";
import TrainerSignup from './pages/Signup/TrainerSignup';
import VerifyEmail from "./pages/VerifyEmail";
import { SnackManagement } from './pages/SnackManagement';
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTrainers from "./pages/admin/trainers/AdminTrainers";
import AdminUsers from "./pages/admin/users/AdminUsers";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ProgramManagement from './pages/program/ProgramManagement';
import  AdminProtectedRoute  from './pages/admin/ProtectedAdmin/AdminProtectedRoute';
import {AdminLayout} from './components/admin/adminLayout';
import AdminLogin from './pages/admin/Login/AdminLogin';
const App = () => (
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/trainer/login" element={<TrainerLogin />} />
      <Route path="/trainer/signup" element={<TrainerSignup />} />
      <Route path="/trainer/verify-email" element={<VerifyEmail />} />
      <Route path="/admin/login" element={<AdminLogin />} />


      {/* Admin Routes */}
      <Route 
        path="/admin" 
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </AdminProtectedRoute>
        } 
      />
      <Route 
        path="/admin/users" 
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          </AdminProtectedRoute>
        } 
      />
      <Route 
        path="/admin/trainers" 
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminTrainers />
            </AdminLayout>
          </AdminProtectedRoute>
        } 
      />

      {/* Protected Trainer Routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="trainer/dashboard" element={<DashboardOverview />} />
        <Route path="workout" element={<WorkoutManagement />} />
        <Route path="meals" element={<MealManagement />} />
        <Route path="meditations" element={<MeditationManagement />} />
        <Route path="programs" element={<ProgramManagement />} />
        <Route path="snacks" element={<SnackManagement />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
