import { useState } from 'react'
import axios from 'axios'
import { useAppContext } from '../../../context/context'
import "./login.css";
import { Link, useHistory } from "react-router-dom";
import { mainAxios, setAuthToken } from '../../../mainAxios'

export default function Login() {
  const [loginInput, setLoginInput] = useState({});
  const [selectedBlogOption, setSelectedBlogOption] = useState("default")
  const [error, setError] = useState("")
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false)
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

  const onBlogSelect = (e) => {
    const selectedBlogId = e.target.value
    let blog = user?.blogs.find((blog) => {
      return blog?.id === parseInt(selectedBlogId)
    }
    )
    setSelectedBlogOption(blog)
  }

  const handleLogin = (e) => {
    e.preventDefault();

    mainAxios.post('/authenticate', loginInput)
      .then(res => {
        if (res.status === 200) {
          setUser(res?.data.user)
          setUserIsLoggedIn(true)
          setAuthToken(res.data.token)

        }
        else {
          setError("Invalid Credentials")
        }
      })

  }

  const handleSelectBlog = (e) => {
    e.preventDefault()
    setSelectedBlog(selectedBlogOption)
    history.push("/");

  }

  return (
    <>
      {!userIsLoggedIn ?
        <div className="login">
          <span className="loginTitle">Login</span>
          <form className="loginForm" onSubmit={handleLogin}>
            <label>Email</label>
            <input className="loginInput" name="username" type="text" placeholder="Enter your email..." onChange={handleLoginInput} />
            <label>Password</label>
            <input className="loginInput" name="password" type="password" placeholder="Enter your password..." onChange={handleLoginInput} />
            <button className="loginButton">Login</button>
          </form>
        </div>
        :
        <div className="login">
          <span className="loginTitle">Select Blog</span>
          <form className="loginForm" onSubmit={handleSelectBlog}>
            <select
              defaultValue={selectedBlogOption}
              className={"select-control"}
              name="blogs"
              onChange={(e) => onBlogSelect(e)}
            >
              <option value="default" disabled hidden>Select your blog</option>
              {user?.blogs?.map((blog, index) => (
                <option value={blog.id} key={index}>{blog.name}</option>
              ))}
            </select>
            <button className="loginButton">Continue</button>
          </form>
        </div>
      }
    </>

  );
}
