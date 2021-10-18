import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import "./Login.css";
import { auth } from "../firebase";
function Login() {
  
  const history = useHistory();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const SignIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .then(function(auth){
        history.push('/')
    })
    .catch(function(error){
        alert(error.message);
    })

    //FireBase Stuff Over here
  };
  const Register = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(function (auth) {
        console.log(auth);
        if (auth){
            history.push('/')
        }
      })
      .catch(function (error) {
        alert(error.message);
      });
    //db some fancy firebase stuff
  };
  console.log(password);
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="https://lh3.googleusercontent.com/proxy/B2bKfMSayzja3AKIymVhKYtaCT2gafJbUndSiDGZ2uH2lAOK-Jr3JtNi3_TcyiYc1_dpE0_7Oj6n5sXvGilZ6kVT_sAQZQfTSfhXOl82Fm63Ko0"
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(event) => setemail(event.target.value)}
          />
          <h5>password</h5>
          <input
            type="password"
            value={password}
            onChange={(event) => setpassword(event.target.value)}
          />
          <button
            type="submit"
            className="login__Signin__button"
            onClick={SignIn}
          >
            Sign In
          </button>
        </form>
        <p>By signing in you agree to the Terms and conditions of Use & sale</p>
        <button
          type="submit"
          className="login__Registerbutton"
          onClick={Register}
        >
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
