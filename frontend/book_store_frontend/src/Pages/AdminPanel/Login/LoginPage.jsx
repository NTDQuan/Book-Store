import React, { useState }  from 'react'
import { useAuth } from "../../../hooks/AuthProvider"
import './LoginPage.css'

const LoginPage = () => {
  const [input, setInput] = useState({
    username: '',
    password: ''
  })

  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if(input.username !== "" & input.password !== "") {
      auth.loginAction(input);
      return
    }
    alert("Provide a valid input")
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className='LoginPage'>
      <div className='LoginModal'>
        <h1>Login</h1>
        <div className='loginForm'>
            <form onSubmit={handleSubmitEvent}>
                <div className='item'>
                    <label>Username</label>
                    <input type="text" name="username" onChange={handleInput}/>
                </div>
                <div className='item'>
                    <label>Password</label>
                    <input type="password" name="password" onChange={handleInput}/> 
                </div>
                <input className='submitBtn' type="submit" value="Login" />
            </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
