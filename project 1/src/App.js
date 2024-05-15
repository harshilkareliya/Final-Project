import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import LeftPanel from './Componennts/LeftPanel';
import Mainpanel from './Componennts/Mainpanel';



function App() {
  return (
    <div className="App">
      <div className='left border border-dark'>
        <LeftPanel/>
      </div>
      <div className='main'>
        <Mainpanel/>
      </div>
    </div>
  );
}

export default App;
