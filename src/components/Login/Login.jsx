import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../../redux/auth-reducer-slice";
// import "./styles.css";

const Login = () => {

    const isAuth = useSelector((store) => store.auth.isAuth)
    if (isAuth) {
        return <Navigate replace to="/profile" />
    } return <div>
        <h1>Login</h1>
        <LoginForm />
    </div>
}


const LoginForm = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
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
                <input {...register("email", { required: true })} />
            </div>
            <div>{errors?.email && <p>Error!</p>}</div>
            <div>
                Password:
                <input type={"password"} {...register("password", { required: true })} />
            </div>
            <div>
                Remember Me
                <input type={"checkbox"} {...register("rememberMe")} />
            </div>
            {errors.email && <span>This field is required</span>}
            {errors.password && <span>This field is required</span>}

            <input type="submit" />
        </form>
    )
}




export default Login