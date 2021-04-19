import './App.css';
import Dashboard from './components/minic-dashboard/dashboard';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Dashboard/>
      </BrowserRouter>
    </div>
  );
}

export default App;
