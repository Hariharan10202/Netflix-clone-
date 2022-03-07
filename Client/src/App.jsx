import React, { useContext } from 'react';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import { AuthContext } from './Components/AuthContext/AuthContext';

const App = () => {
  const user = true;
  console.log(user);

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={user ? <Home /> : <Register />}></Route>
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />}></Route>
        {user && (
          <React.Fragment>
            <Route path='/movies' element={<Home type='movie' />}></Route>
            <Route path='/series' element={<Home type='series' />}></Route>
          </React.Fragment>
        )}
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
