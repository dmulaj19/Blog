import "./register.css"
import { Link, useHistory } from "react-router-dom";
import { mainAxios } from '../../../mainAxios'
import { useAppContext } from '../../../context/context'
import { useState } from "react";

export default function Register() {
  const [userInput, setUserInput] = useState({})
  const [infoMsg, setInfoMsg] = useState("")
  const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()

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
        id: 2
      }
    }

    console.log({ userBody })
    mainAxios.post('/users', userBody)
      .then(res => {
        console.log({ res })
        if (res.status === 201) {
          setInfoMsg("Thank you for registering. Your blog will be shortly active.")
        }
        else {
          //setError("Invalid Credentials")
        }
      })
  }

  return (
    <div className="register">    
    {!infoMsg ?
      <div>
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleRegister}>
          <label>Firstname</label>
          <input className="registerInput" name="firstName" type="text" placeholder="Enter your firstname..." onChange={handleRegisterInput} />
          <label>Lastname</label>
          <input className="registerInput" name="lastName" type="text" placeholder="Enter your lastname..." onChange={handleRegisterInput} />
          <label>Username</label>
          <input className="registerInput" name="username" type="text" placeholder="Enter your username..." onChange={handleRegisterInput} />
          <label>Email</label>
          <input className="registerInput" name="email" type="text" placeholder="Enter your email..." onChange={handleRegisterInput} />
          <label>Password</label>
          <input className="registerInput" name="password" type="password" placeholder="Enter your password..." onChange={handleRegisterInput} />
          <label>Phone</label>
          <input className="registerInput" name="phoneNumber" type="text" placeholder="Enter your phone..." onChange={handleRegisterInput} />
          <button className="registerButton">Register</button>
        </form>
      </div>
      :
      <><span className="infoMsg">{infoMsg}</span></>
  }
  </div>
  )
}
