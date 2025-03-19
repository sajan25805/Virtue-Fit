import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
// import Dashboard from "./pages/Dashboard"
// import ProgramsPage from "./pages/ProgramsPage"
// import ProgramForm from "./pages/ProgramForm"
// import WorkoutsPage from "./pages/WorkoutsPage"
import WorkoutForm from "./pages/WorkoutForm"
import MeditationsPage from "./pages/MeditationsPage"
import MeditationForm from "./pages/MeditationForm"
import MealsPage from "./pages/MealsPage";
import MealForm from "./pages/MealForm"
import Dashboard from "./pages/Dashboard"
import ProgramsPage from "./pages/ProgramsPage"
// import ProgramForm from "./pages/Pro"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="meals" element={<MealsPage />} />
          <Route path="meals/new" element={<MealForm />} />
          <Route path="meals/:id" element={<MealForm />} />
          <Route path="meditations" element={<MeditationsPage />} />
          <Route path="meditations/new" element={<MeditationForm />} />
          <Route path="meditations/:id" element={<MeditationForm />} />
          <Route path="programs" element={<ProgramsPage />} />
          {/* <Route path="programs/new" element={<ProgramForm />} /> */}
          {/* <Route path="programs/:id" element={<ProgramForm />} /> */}
          {/* <Route path="workouts" element={<WorkoutsPage />} /> */}
          {/* <Route path="workouts/new" element={<WorkoutForm />} /> */}
          {/* <Route path="workouts/:id" element={<WorkoutForm />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

