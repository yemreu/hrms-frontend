import './App.css';
import 'semantic-ui-css/semantic.min.css';
import AdminDashboard from './layouts/admin-dashboard/AdminDashboard';
import System from './layouts/system/System';

function App() {
  return (
    <div className="App">
      {/* <AdminDashboard/> */}
      <System/>
    </div>
  );
}

export default App;
