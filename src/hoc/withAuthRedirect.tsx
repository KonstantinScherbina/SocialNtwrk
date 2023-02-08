import { useSelector } from "react-redux";
import { Navigate, useMatch } from "react-router-dom";
import React from 'react';
import { useAppSelector } from "../hook";

// export const withAuthRedirect = (Component) => {
//     const authRdrct = () => {
//         if (!props.isAuth) return <Navigate to={`/login`} />
// return <Component {...this.props}/>
//     }
// }


//-------------------------------------------------------

// ↓ with 'useMatch' (21)

// export const withAuthRedirect = (Component) => {
//     let RouterComponent = (props) => {
//         const match = useMatch('/profile/:userId/');
//         return <Component {...props} match={match} />;
//     }
//     return RouterComponent;
// }

//----------------------------------------------------------


// undefinded ???????????????????????? 
export const withAuthRedirect = (Component: (props: any) => JSX.Element) => {
    let RouterComponent = () => {
        let isAuth = useAppSelector(store => store.auth.isAuth)
        if (!isAuth) return <Navigate to={`/login`} />
        return <Component />
    }
    return RouterComponent;
}


// export const withAuthRedirect = (Component) => {
//     if (!isAuth) return <Navigate to={`/login`} />
//     return <Component />
// }

