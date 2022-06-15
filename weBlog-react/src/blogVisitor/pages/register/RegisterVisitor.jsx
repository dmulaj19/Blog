import "./register.css"
import { Link, useHistory } from "react-router-dom";
import { mainAxios } from '../../../mainAxios'
import { useAppContext } from '../../../context/context'
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

export default function Register() {
  const [userInput, setUserInput] = useState({})
  const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()

  const [bloggerId, setBloggerId] = useState(null)
  let history = useHistory();

  const handleRegisterInput = (e) => {
    const key = e.target.name
    const value = e.target.value

    setUserInput(state => ({
      ...state,
      [key]: value
    }))
  }


  const handleRegister = (e) => {
    e.preventDefault();

    const userBody = {
      ...userInput,
      role: {
        id: 3
      }
    }

    mainAxios.post('/users', userBody)
      .then(res => {
        if (res.status === 201) {
          history.push("/weblog/login");
        }
      })
  }

  return (
    <div className="register">
      <div>
          <span className="registerTitle">Register</span>
          <form className="registerForm" onSubmit={handleRegister}>
            <label>First Name</label>
            <input className="registerInput" name="firstName" type="text" placeholder="First name" onChange={handleRegisterInput} />
            <label>Last Name</label>
            <input className="registerInput" name="lastName" type="text" placeholder="Last name" onChange={handleRegisterInput} />
            <label>Username</label>
            <input className="registerInput" name="username" type="text" placeholder="Username" onChange={handleRegisterInput} />
            <label>Email</label>
            <input className="registerInput" name="email" type="text" placeholder="Email" onChange={handleRegisterInput} />
            <label>Password</label>
            <input className="registerInput" name="password" type="password" placeholder="Password" onChange={handleRegisterInput} />
            <label>Phone</label>
            <input className="registerInput" name="phoneNumber" type="text" placeholder="Phone" onChange={handleRegisterInput} />
            <button className="registerButton">Register</button>
          </form>
        </div>
    </div>
  )
}
