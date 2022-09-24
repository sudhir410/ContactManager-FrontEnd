import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import upperCircle from "./images/Ellipse-31.png";
import lowerCircle from "./images/Ellipse-32.png";
import dots from "./images/Group-695.png";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import "./login.css"

const LoginPage = () => {
    const navigate = useNavigate()

    const [view, setView] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const submitData = (e) => {
        e.preventDefault()
        // console.log(data)

        fetch("https://contactmanager-10x.herokuapp.com/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        }).then(res => res.json()).then(data => {
            if (data.message.err) console.log(data.mesaage)
            if (data.message === "Incorrect Password") {
                toast.error("Incorrect Password", { position: toast.POSITION.BOTTOM_CENTER })
            }
            if (data.message === "USER NOT REGISTERED") {
                toast.error("User not Registered", { position: toast.POSITION.TOP_CENTER })
            }
            if (data.message === "Success") {
                sessionStorage.setItem('accessToken', data.token)
                navigate('/contacts')
            }
        })
    }


    return (
        <>
            <div className="container">
                <img className="upperCornerCircle" src={upperCircle} alt="" />
                <div className="main">
                    <div className="leftContainer">
                        <img src={dots} alt="" />
                    </div>
                    <div className="middleContainer">

                        <h1 className="logo">Logo</h1>
                        <p className="para">Enter your credentials to access your account</p>
                        <form className="loginForm" onSubmit={(e) => submitData(e)}>
                            <input type="email" name="email" value={data.email} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} id="" className="user-id" placeholder="User ID" required />
                            <br />
                            <div style={{ position: "relative" }}>
                                <input type={view ? "text" : "password"} name="password" value={data.password} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} className="password" placeholder="Password" required />
                                {
                                    view ? <span onClick={() => setView(!view)} style={{ position: "absolute", right: 19, top: 6 }} ><svg style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width="19" height="19" viewBox="0 0 24 24" strokeWidth="2" stroke="lightGrey" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <circle cx="12" cy="12" r="2"></circle>
                                        <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7"></path>
                                    </svg> </span> : <span onClick={() => setView(!view)} style={{ position: "absolute", right: 19, top: 6 }}> <svg style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye-off" width="19" height="19" viewBox="0 0 24 24" strokeWidth="2" stroke="lightGrey" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <line x1="3" y1="3" x2="21" y2="21"></line>
                                        <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83"></path>
                                        <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341"></path>
                                    </svg> </span>
                                }
                            </div>
                            <button style={{ cursor: "pointer" }}>Sign In</button>
                        </form>
                        <button onClick={() => navigate('/signup')} className="sign-up" style={{ cursor: "pointer" }}>Sign Up</button>
                    </div>
                    <div className="rightContainer">
                        <img src={dots} alt="" />
                    </div>
                </div>
                <img className="lowerCornerCircle" src={lowerCircle} alt="" />
            </div>
            <ToastContainer />
        </>
    )
}

export default LoginPage;