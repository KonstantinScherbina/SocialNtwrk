import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../../redux/auth-reducer-slice";
// import "./styles.css";

const Login = () => {

    const errorCodeFromAPI = useSelector((store) => store.auth.isError)
    const errorMessageFromAPI = useSelector((store) => store.auth.errorMessage)
    const captcha = useSelector((store) => store.auth.captchaObj.captcha)

    debugger

    // const [isError, setIsError] = useState(isErrorSelector)
    // const [isErrorMessage, setIsErrorMessage] = useState(isErrorMessageSelector)

    const isAuth = useSelector((store) => store.auth.isAuth)

    // useEffect(() => {
    //     setIsError(isErrorSelector)
    //     setIsErrorMessage(isErrorMessageSelector)
    // }, [isErrorSelector])

    debugger

    if (isAuth) {
        return <Navigate replace to="/profile" />
    } return <div>
        <h1>Login</h1>
        <LoginForm
            errorCodeFromAPI={errorCodeFromAPI}
            errorMessageFromAPI={errorMessageFromAPI}
            captcha={captcha} />
    </div>
}


const LoginForm = (props) => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
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
                <div>{errors?.email?.type === "required" && errors.email.message}</div>
                <div>{errors?.email?.type === "pattern" && errors.email.message}</div>
            </div>
            <div>
                Password:
                <input type={"password"} placeholder="Password" {...register("password", { required: "Please enter your password.", minLength: { value: 4, message: "Minimal characters 4" } })} />
                <div>{errors?.password?.type === "required" && errors.password.message}</div>
                <div>{errors?.password?.type === "minLength" && errors.password.message}
                </div>
            </div>
            <div>
                Remember Me
                <input type={"checkbox"} {...register("rememberMe")} />
            </div>

            <div>
                {props.errorCodeFromAPI && props.errorMessageFromAPI}
            </div>

            <div>{props.captcha && <img src={props.captcha} />}</div>

            <input type="submit" />
        </form>
    )
}




export default Login