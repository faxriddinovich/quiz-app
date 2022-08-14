import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';

function App() {
  return (
    <div className='container-fluid app'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='app'>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/home' element={<Home/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
