import './App.css';
import 'semantic-ui-css/semantic.min.css';
import AdminDashboard from './layouts/admin-dashboard/AdminDashboard';
import System from './layouts/system/System';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route path="/" component={System}/>
      <Route path="/admin-dashboard" component={AdminDashboard}/>
    </div>
  );
}

export default App;
