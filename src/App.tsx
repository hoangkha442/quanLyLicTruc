import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routes from './routes';
import 'animate.css';
function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const routing = useRoutes(routes);
  return routing;
}

export default App;
