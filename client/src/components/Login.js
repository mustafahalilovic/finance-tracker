import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';

export default function Login({setAuth}) {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const {email, password} = inputs;

  const onChange = (e)=>{
    setInputs({...inputs, [e.target.name]
    : e.target.value});
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const body = {email, password};
      const response = await fetch('http://localhost:5000/auth/login',
      {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })

      const parseResponse = await response.json();

      localStorage.setItem("token", parseResponse.token);
      setAuth(true);

    } catch (error) {
      console.log(error.message);
    }
  }
  

  return (
    <div style={{width: '500px', margin:'200px auto'}}>
      <h1 style={{letterSpacing:'3px', color:'green', textAlign:'center'}}>Login</h1>
      <form onSubmit={handleSubmit}>
        <input 
        type="email" 
        name="email" 
        placeholder='email' 
        className='form-control my-3'
        value={email}
        onChange={onChange}
        />
        <input 
        type="password" 
        name="password" 
        placeholder='password' 
        className='form-control my-3'
        value={password}
        onChange={onChange}
        />
        <button style={{width: '100%'}} className='btn btn-success btn-block'>
          Submit
        </button>
      </form>
      <Link to="/register">Create new account</Link>
    </div>
  )
}
