import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useProfileContext } from "../context/ProfileContext";
import toast from "react-hot-toast";
import "../style/LoginRegis.css";
import { BsFillPersonFill, BsPerson } from "react-icons/bs";
import { BiSolidLockAlt } from "react-icons/bi";

const LoginAPI = "/api/v1/reader/login";
const LoggedCheckAPI = "/api/v1/reader/ifLoggedIn";

function Login() {
  const navigate = useNavigate();

  //Using Context
  const { login, checkLogin } = useProfileContext();

  //Setting values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Login Function
  const loginUser = async (e) => {
    e.preventDefault();
    //Checking of the data is empty
    if (email === "" || password === "") {
      toast.error("Please Fill All The Details");
      return;
    }
    //Login request
    const check = await login(LoginAPI, { email, password });
    console.log(check)
    if (check) {
      toast.error(check);
      setEmail("");
      setPassword("");
      return;
    }
    // navigate("/");
    await checkLogin(LoggedCheckAPI);
    toast.success("Login Success");
  };
  return (
    <>
      <div className="login-page">
        <div className="login-cont">
          <div className="profile-logo"><BsPerson /></div>
          <form action="">
            <div className="data-enter UserEmail">
              <div className="logo"><BsFillPersonFill /></div>
              <input className="input" type="text" placeholder="Email ID" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="data-enter Password">
              <div className="logo"><BiSolidLockAlt /></div>
              <input className="input" type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
            </div>
            <p className="forget-pass">Forget Password?</p>
          </form>
          <button className="login-btn" onClick={(e) => loginUser(e)}>Login</button>
          <div className="not-a-member">
            Not a Member?
            <NavLink to="/register"> Signup</NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
