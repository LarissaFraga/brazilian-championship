import { BrowserRouter as Router } from 'react-router-dom';
import BrazilianChampionship from './pages/BrazilianChampionship';

export default function App() {
  return (
    <div>
      <Router>
        <BrazilianChampionship />
      </Router>
    </div>
  );
}
