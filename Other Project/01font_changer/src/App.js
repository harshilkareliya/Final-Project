import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState } from 'react';
import Changer from './Changer';
import Navbar from './Navbar';
import Alert from './Alert';

function App() {
  const [mode, setMode] = useState('light')
  const [alert, setAlert]= useState(null)

  function showAlert(message, type){
    setAlert({
      msg : message,
      type : type
    })
    setTimeout(() => {
      setAlert(null)
    },1500);
  }
  
  function toggleMode(){
    if(mode === "light"){
      setMode('dark')
      document.body.style.backgroundColor = '#31363F'
      showAlert("Dark mode enable", "success")
    }
    else{
      setMode('light')
      document.body.style.backgroundColor = 'white'
     showAlert("Light mode enable", "success")

    }
  }
  
  return (
    <div className="App">
      <Navbar mode={mode} toggleMode={toggleMode}/>
      <Alert alert={alert}/>
      <Changer mode={mode} showAlert={showAlert}/>
    </div>
  );
}

export default App;
