import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(error => {
                const response = error.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login into your account</h1>
                    {errors &&
                        <div className="alert">
                            {Object.keys(errors).map(key => (<p key={key}>{errors[key][0]}</p>))}
                        </div>}
                    <input ref={emailRef} placeholder="email" type="email"/>
                    <input ref={passwordRef} placeholder="password" type="password"/>
                    <button className="btn btn-block">Login</button>
                    <p className="message">Not registered? <Link to="/signup">Create account</Link></p>
                </form>
            </div>
        </div>
    );
}
