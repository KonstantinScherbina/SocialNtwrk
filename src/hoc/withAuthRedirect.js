import { useSelector } from "react-redux";
import { Navigate, useMatch } from "react-router-dom";
import React from 'react';

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



export const withAuthRedirect = (Component) => {
    let RouterComponent = () => {
        let isAuth = useSelector(store => store.auth.isAuth)
        if (!isAuth) return <Navigate to={`/login`} />
        return <Component />
    }
    return RouterComponent;
}


// export const withAuthRedirect = (Component) => {
//     if (!isAuth) return <Navigate to={`/login`} />
//     return <Component />
// }

