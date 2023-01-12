import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../../redux/auth-reducer-slice";
// import "./styles.css";

const Login = () => {

    const isErrorSelector = useSelector((store) => store.auth.isError)
    const isErrorMessageSelector = useSelector((store) => store.auth.errorMessage)

    const [isError, setIsError] = useState(isErrorSelector)
    const [isErrorMessage, setIsErrorMessage] = useState(isErrorMessageSelector)

    const isAuth = useSelector((store) => store.auth.isAuth)

    useEffect(() => {
        setIsError(isErrorSelector)
        setIsErrorMessage(isErrorMessageSelector)
    }, [isErrorSelector])

    debugger

    if (isAuth) {
        return <Navigate replace to="/profile" />
    } return <div>
        <h1>Login</h1>
        <LoginForm isError={isError} isErrorMessage={isErrorMessage} />
    </div>
}




const LoginForm = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });

    const dispatch = useDispatch()


    const onSubmit = (data) => {
        dispatch(login(data))
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                Email:
                <input type={"email"} {...register("email", { required: true })} />
                <div>{errors.email && errors.email.message}</div>
            </div>
            <div>
                Password:
                <input type={"password"} {...register("password", { required: true })} />
                <div>{errors.password && errors.password.message}</div>
            </div>
            <div>
                Remember Me
                <input type={"checkbox"} {...register("rememberMe")} />
            </div>

            <div>
                {props.isError && props.isErrorMessage}
            </div>


            <input type="submit" />
        </form>
    )
}




export default Login