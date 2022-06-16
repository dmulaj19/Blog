import { useState } from 'react'
import axios from 'axios'
import { useAppContext } from '../../../context/context'
import "./login.css";
import { Link, useHistory } from "react-router-dom";
import { mainAxios, setAuthToken } from '../../../mainAxios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

export default function Login() {
  const [loginInput, setLoginInput] = useState({});
  const [selectedBlogOption, setSelectedBlogOption] = useState("default")
  const [inputErrors, setInputErrors] = useState({})
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

  const   handleValidation = () => {
    let fields = loginInput;
    let errors = {};
    let formIsValid = true;

    //First name
    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "Fill in your username!";
    }

    //Password
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Fill in your password!";
    }

    setInputErrors(errors);
    return formIsValid;
  }


  const handleLogin = (e) => {
    e.preventDefault();
    if(handleValidation()){
      mainAxios.post('/authenticate', loginInput)
      .then(res => {
        if (res.status === 200) {
          setUser(res?.data.user)
          setUserIsLoggedIn(true)
          setAuthToken(res.data.token)

        }
        
      }).catch(err => {
        toast.error('Invalid credentials', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    )
    }

  }

  const handleSelectBlog = (e) => {
    e.preventDefault()
    setSelectedBlog(selectedBlogOption)
    history.push("/");

  }

  return (
    <>
      {!user ?
        <div className="login">
          <span className="loginTitle">Login</span>
          <form className="loginForm" onSubmit={handleLogin}>
            <label>Username</label>
            <input className={`loginInput ${inputErrors["username"] ? 'loginInputError': '' }`} name="username" type="text" placeholder="Enter your username..." onChange={handleLoginInput} />
            <span style={{ color: "red" }}>{inputErrors["username"]}</span>

            <label>Password</label>
            <input className={`loginInput ${inputErrors["password"] ? 'loginInputError': '' }`} name="password" type="password" placeholder="Enter your password..." onChange={handleLoginInput} />
            <span style={{ color: "red" }}>{inputErrors["password"]}</span>
            
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
              <option value="default" className="select-control-option" disabled hidden>Select your blog</option>
              {user?.blogs?.map((blog, index) => (
                <option value={blog.id} className="select-control-option" key={index}>{blog.name}</option>
              ))}
            </select>
            <button className="loginButton">Continue</button>
          </form>
        </div>
      }
    </>

  );
}
