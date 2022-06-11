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
  const [infoMsg, setInfoMsg] = useState("")
  const { user: [user, setUser], selectedBlog: [selectedBlog, setSelectedBlog] } = useAppContext()
  const [blogName, setBlogName] = useState("")
  const [bloggerId, setBloggerId] = useState(null)

  useEffect(() => {


  }, []);

  const handleRegisterInput = (e) => {
    const key = e.target.name
    const value = e.target.value

    setUserInput(state => ({
      ...state,
      [key]: value
    }))
  }

  const handleBlogName = (e) => {
    setBlogName(e.target.value)
  }

  const handleRegister = (e) => {
    e.preventDefault();

    const userBody = {
      ...userInput,
      role: {
        id: 2
      }
    }

    mainAxios.post('/users', userBody)
      .then(res => {
        if (res.status === 201) {
          console.log({ res })
          setBloggerId(res?.data?.id)
        }
      })
  }

  const createBlog = (e) => {
    e.preventDefault();
    if (!blogName) {
      toast.error('Please enter the name of your blog.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {

      mainAxios.get(`/requests/blogName?blogName=${blogName}`)
        .then(res => {
          if (res.data.length !== 0) {
            toast.error('This blog already exists. Please select a different name.', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            let request = {
              user: {
                id: bloggerId
              },
              blogName
            }
            mainAxios.post('/requests', request)
              .then(res => {
                console.log({ res })
                if (res.status === 201) {
                  setInfoMsg("Thank you for registering. Your blog will be shortly active.")
                }
              })
          }
        })
    }
  }

  return (
    <div className="register">
      {!bloggerId ?
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
        :
        <div>
          {
            !infoMsg ?
              <>
                <span className="registerTitle">Create your blog</span>
                <form className="registerForm" onSubmit={createBlog}>
                  <label>Blog Name</label>
                  <input className="registerInput" name="blogName" type="text" placeholder="Blog Name" onChange={handleBlogName} />
                  <button className="registerButton" onClick={createBlog}>Create</button>
                </form>
              </>
              :
              <span className="infoMsg">{infoMsg}</span>
          }
        </div>
      }
    </div>
  )
}
