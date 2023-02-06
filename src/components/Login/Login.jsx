import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../../redux/auth-reducer-slice";
// import "./styles.css";

// loginForm
const Login = () => {

    const errorCodeFromAPI = useSelector((store) => store.auth.isError)
    const errorMessageFromAPI = useSelector((store) => store.auth.errorMessage)
    const captchaFromAPI = useSelector((store) => store.auth.captcha)

    debugger

    const isAuth = useSelector((store) => store.auth.isAuth)

    debugger

    if (isAuth) {
        return <Navigate replace to="/profile" />
    } return <div>
        <h1>Login</h1>
        <LoginForm
            errorCodeFromAPI={errorCodeFromAPI}
            errorMessageFromAPI={errorMessageFromAPI}
            captchaFromAPI={captchaFromAPI} />
    </div>
}


const LoginForm = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });

    debugger
    const dispatch = useDispatch()

    console.log("errors", errors)

    const onSubmit = (data) => {
        dispatch(login(data))
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                Email:
                <input type={"email"} placeholder="Email" {...register("email", {
                    required: "Please enter your email.",
                    pattern:
                    {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address"
                    }
                })} />
                {/* error of required */}
                <div>{errors?.email?.type === "required" && errors.email.message}</div>
                {/* error of pattern */}
                <div>{errors?.email?.type === "pattern" && errors.email.message}</div>
            </div>
            <div>
                Password:
                <input type={"password"} placeholder="Password" {...register("password", { required: "Please enter your password.", minLength: { value: 4, message: "Minimal characters 4" } })} />
                {/* error of required */}
                <div>{errors?.password?.type === "required" && errors.password.message}</div>
                {/* error of minLength required */}
                <div>{errors?.password?.type === "minLength" && errors.password.message}
                </div>
            </div>
            <div>
                Remember Me
                <input type={"checkbox"} {...register("rememberMe")} />
            </div>

            <div>
                {/* error from API */}
                {props.errorCodeFromAPI && props.errorMessageFromAPI}
            </div>

            <div>{props.captchaFromAPI && <img src={props.captchaFromAPI} />}</div>

            <input type="submit" />
        </form>
    )
}




export default Login