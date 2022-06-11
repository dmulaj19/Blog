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

    return (
        <>
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
        </>

    );
}
