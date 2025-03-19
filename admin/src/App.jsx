import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Workout } from './pages/Workout';
import Layout from './Layout/Layout';

const App = () => (
  <Router>
    <Routes>
    <Route path="/" element={<Layout />}>
        {/* Nested routes */}
        <Route path="/" element={<Workout />} />
    </Route>
    </Routes>
  </Router>
);

export default App;
