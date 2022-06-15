import { useState } from 'react'
import axios from 'axios'
import { useAppContext } from '../../../context/context'
import "./login.css";
import { Link, useHistory } from "react-router-dom";
import { mainAxios, setAuthToken } from '../../../mainAxios'

export default function LoginVisitor() {
  const [loginInput, setLoginInput] = useState({});
  const [error, setError] = useState("")
  const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()
  let history = useHistory();

  const handleLoginInput = (e) => {
    const key = e.target.name
    const value = e.target.value

    setLoginInput(state => ({
      ...state,
      [key]: value
    }))
  }

  const handleLogin = (e) => {
    e.preventDefault();

    mainAxios.post('/authenticate', loginInput)
      .then(res => {

        if (res.status === 200) {
          setUser(res?.data.user)
          setAuthToken(res.data.token)
          history.push("/weblog")
        }
        else {
          setError("Invalid Credentials")
        }
      })

  }

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleLogin}>
        <label>Username</label>
        <input className="loginInput" name="username" type="text" placeholder="Enter your username..." onChange={handleLoginInput} />
        <label>Password</label>
        <input className="loginInput" name="password" type="password" placeholder="Enter your password..." onChange={handleLoginInput} />
        <button className="loginButton">Login</button>
      </form>
    </div>

  );
}
