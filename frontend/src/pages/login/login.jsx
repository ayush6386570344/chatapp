
import React, { useState, useContext } from 'react'
import assets from '../../assets/assets'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../usecontext/authcontext'
const Login = () => {
  const {login,signup}=useContext(AuthContext);
  const navigate=useNavigate();
  const [currstate, setcurrstate] = useState('signup')
  const [formdata, setformdata] = useState({
    username: '',
    email: '',
    password: ''
  })
const [showPassword, setShowPassword] = useState(false)

  const [error, seterror] = useState({
    username: '',
    email: '',
    password: ''
  })

  // input handler
  const handleonchange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }

  // validation
  const checkerror = () => {
    let errorlist = {
      username: '',
      email: '',
      password: ''
    }

    if (currstate === 'signup' && formdata.username.length < 3) {
      errorlist.username = 'Username must be at least 3 characters long'
    }

    if (!/\S+@\S+\.\S+/.test(formdata.email)) {
      errorlist.email = 'Email is not valid'
    }

    if (formdata.password.length < 6) {
      errorlist.password = 'Password must be at least 6 characters long'
    }

    return errorlist
  }

  
  // submit
  const handlesubmit = async (e) => {
    e.preventDefault()

    const errorlist = checkerror()
    seterror(errorlist)

    const hasError = Object.values(errorlist).some(v => v !== '')

    if (!hasError) {
  
      if (currstate==='signup'){
        // console.log(formdata.email);
        //   const result = await addusedata(
        //     formdata.username,
        //     formdata.email,
        //     formdata.password
        //   )
        signup({
           username: formdata.username,
            email:formdata.email,
           password:formdata.password})

          // ✅ store logged-in user in context
          localStorage.setItem("username", formdata.username)
          // reset form
          setformdata({
            username: '',
            email: '',
            password: ''
          })
         
          navigate("/profile",{
            state:{
              editmode:true
            }
          })
      }
      else{
        console.log(formdata.email,formdata.password);
        login({
          email:formdata.email,
          password:formdata.password});
      }
    }
  }

  // toggle login/signup
  const handleloginsignup = () => {
    setcurrstate(currstate === 'signup' ? 'login' : 'signup')

    seterror({
      username: '',
      email: '',
      password: ''
    })

    setformdata({
      username: '',
      email: '',
      password: ''
    })
  }

 return (
  <div className='login'>

    <div className="login-container">

      <img src={assets.logo_big} alt="" className="logo" />

      <form className="login-form" onSubmit={handlesubmit}>

        <h2 className="title">{currstate}</h2>

        {/* USERNAME */}
        {currstate === 'signup' && (
          <div className="input-group">
            <input
              type="text"
              name="username"
              value={formdata.username}
              onChange={handleonchange}
              placeholder="Username"
              className="form-input"
              required
            />
            {error.username && <p className="error-text">{error.username}</p>}
          </div>
        )}

        {/* EMAIL */}
        <div className="input-group">
          <input
            name="email"
            value={formdata.email}
            onChange={handleonchange}
            type="email"
            placeholder="Email Address"
            className="form-input"
            required
          />
          {error.email && <p className="error-text">{error.email}</p>}
        </div>

        {/* PASSWORD */}
        <div className="password-box">

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formdata.password}
            onChange={handleonchange}
            placeholder="Password"
            className="form-input"
            required
          />

          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>

        </div>

        {error.password && (
          <p className="error-text">{error.password}</p>
        )}

        <button type="submit" className="submit-btn">
          {currstate}
        </button>

        <div className="login-term">
          <input type="checkbox" required />
          <p>Agree to terms & privacy policy</p>
        </div>

        <p className="switch-text">
          {currstate === 'signup'
            ? 'Already have an account?'
            : "Don't have an account?"}
          <span onClick={handleloginsignup}> Click Here</span>
        </p>

      </form>

    </div>

  </div>
)
}

export default Login

