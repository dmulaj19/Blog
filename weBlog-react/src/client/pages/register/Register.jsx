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
  const [errors, setErrors] = useState({})

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
    if(handleValidation()){
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
  }
  
  const handleValidation = () => {
    let fields = userInput;
    let errors = {};
    let formIsValid = true;

    //First name
    if (!fields["firstName"]) {
      formIsValid = false;
      errors["firstName"] = "First name cannot be empty!";
    }

    if (typeof fields["firstName"] !== "undefined") {
      if (!fields["firstName"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["firstName"] = "First name should contain only letters!";
      }
    }

    //Last name
    if (!fields["lastName"]) {
      formIsValid = false;
      errors["lastName"] = "Last name cannot be empty!";
    }

    if (typeof fields["lastName"] !== "undefined") {
      if (!fields["lastName"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["lastName"] = "Last name should contain only letters!";
      }
    }

    //Username
    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "Username cannot be empty!";
    }

    if (typeof fields["username"] !== "undefined") {
      if (fields["username"] < 3) {
        formIsValid = false;
        errors["username"] = "Username must have more that 3 characters!";
      }
    }

    //Email
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Email cannot be empty!";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email is not valid!";
      }
    }

    //Password
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Password cannot be empty!";
    }
    

    if (typeof fields["password"] !== "undefined") {
      if (!fields["password"].match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/)) {
        formIsValid = false;
        errors["password"] = "Password must contain 5 characters, uppercase, lowecase letters and at least a number!";
      }
    }

    //Phone number
    if (typeof fields["phoneNumber"] !== "undefined") {
      if (!fields["phoneNumber"].match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)) {
        formIsValid = false;
        errors["phoneNumber"] = "Phone number format not valid!";
      }
    }

    setErrors(errors);
    return formIsValid;
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
        <div className="registerFormWrapper">
          <span className="registerTitle">Register</span>
          <form className="registerForm" onSubmit={handleRegister}>
            <label>First Name</label>
            <input className={`registerInput ${errors["firstName"] ? 'registerInputError': '' }`} name="firstName" type="text" placeholder="First name" onChange={handleRegisterInput} />
            <span style={{ color: "red" }}>{errors["firstName"]}</span>

            <label>Last Name</label>
            <input className={`registerInput ${errors["lastName"] ? 'registerInputError': '' }`} name="lastName" type="text" placeholder="Last name" onChange={handleRegisterInput} />
            <span style={{ color: "red" }}>{errors["lastName"]}</span>

            <label>Username</label>
            <input className={`registerInput ${errors["username"] ? 'registerInputError': '' }`}  name="username" type="text" placeholder="Username" onChange={handleRegisterInput} />
            <span style={{ color: "red" }}>{errors["username"]}</span>

            <label>Email</label>
            <input className={`registerInput ${errors["email"] ? 'registerInputError': '' }`} name="email" type="text" placeholder="Email" onChange={handleRegisterInput} />
            <span style={{ color: "red" }}>{errors["email"]}</span>

            <label>Password</label>
            <input className={`registerInput ${errors["password"] ? 'registerInputError': '' }`} name="password" type="password" placeholder="Password" onChange={handleRegisterInput} />
            <span style={{ color: "red" }}>{errors["password"]}</span>

            <label>Phone</label>
            <input className={`registerInput ${errors["phoneNumber"] ? 'registerInputError': '' }`} name="phoneNumber" type="text" placeholder="Phone" onChange={handleRegisterInput} />
            <span style={{ color: "red" }}>{errors["phoneNumber"]}</span>

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
