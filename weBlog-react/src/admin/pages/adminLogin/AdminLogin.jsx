import { useState } from 'react'
import axios from 'axios'
import { useAppContext } from '../../../context/context'
import "./adminLogin.css";
import { Link, useHistory } from "react-router-dom";
import { mainAxios, setAuthToken } from '../../../mainAxios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

export default function Login() {
    const [loginInput, setLoginInput] = useState({});
    const [error, setError] = useState("")
    const [inputErrors, setInputErrors] = useState({})

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


    const handleValidation = () => {
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
                console.log({ res })
                if (res.status === 200) {
                    console.log({ res })
                    const role = res?.data.user.role.id === 1
                    if (role) {
                        setUser(res?.data.user)
                        setAuthToken(res.data.token)
                    }
                    history.push("/admin");
                }
                
            }).catch(err => {
                console.log({ err })
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

    return (
        <>
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
        </>

    );
}
