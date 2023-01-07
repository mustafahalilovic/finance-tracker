import React, {useEffect, useState} from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import ErrorPage from './components/ErrorPage';

import {
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

export default function App() {
const [isAuthenticated, setIsAuthenticated] = useState(false);
const setAuth = (setter)=>{
    setIsAuthenticated(setter);
}

const isAuth = async ()=>{
    try {

        const response = await fetch('http://localhost:5000/auth/verify',{
            method: "GET",
            headers: {token: localStorage.token}
        })

        const parseResponse = await response.json();

        parseResponse === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
        
    } catch (error) {
        console.error(error.message);
    }
}

useEffect(()=>{
    isAuth();
})

  return (
        <Routes>
            <Route exact path='/login' element={ !isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" />}/>
            <Route exact path='/register' element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/login" />}/>
            <Route exact path='/dashboard/*' element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />}/>
            <Route path="*" element={<ErrorPage />} />
        </Routes>
  )
}
