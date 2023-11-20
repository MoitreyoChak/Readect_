// import axios from 'axios';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/LoginRegis.css";
import { useProfileContext } from "../context/ProfileContext";
import toast from "react-hot-toast";
import { BsFillPersonFill, BsPerson } from "react-icons/bs";
import { BiSolidLockAlt } from "react-icons/bi";
import { IoIosPerson } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";

const RegisterAPI = "/api/v1/reader/signup";
const LoggedCheckAPI = "/api/v1/reader/ifLoggedIn";

function Registration() {
  const navigate = useNavigate();
  const { register, checkLogin } = useProfileContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const registrationUser = async (e) => {
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      toast.error("Please Fill All The Details");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Confirm Password Does Not Match");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    const check = await register(RegisterAPI, { name, email, password });
    if (check) {
      toast.error(check);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    navigate("/");
    await checkLogin(LoggedCheckAPI);
    toast.success("Registration Done");
  };
  return (
    <>
      <div className="regis-page">
        <div className="registration-cont">
          <div className="profile-logo"><BsPerson /></div>
          <form action="">
            <div className="data-enter UserEmail">
              <div className="logo"><IoIosPerson /></div>
              <input className="input" type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="data-enter UserEmail-regis">
              <div className="logo"><BsFillPersonFill /></div>
              <input className="input" type="text" placeholder="Email ID" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="data-enter Password">
              <div className="logo"><BiSolidLockAlt /></div>
              <input className="input" type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
            </div>
            <div className="data-enter Password">
              <div className="logo"><RiLockPasswordFill /></div>
              <input className="input" type="password" placeholder="Confirm Password" onChange={(e) => { setConfirmPassword(e.target.value) }} />
            </div>
          </form>
          <button className="regis-btn" onClick={(e) => registrationUser(e)}>Register</button>
        </div>
      </div>
    </>
  );
}

export default Registration;
