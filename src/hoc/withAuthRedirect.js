// export const withAuthRedirect = (Component) => {
//     const authRdrct = () => {
//         if (!props.isAuth) return <Navigate to={`/login`} />
//     }

import { useMatch } from "react-router-dom";

//     return <Component {...this.props}/>

// }


export const withAuthRedirect = (Component) => {
    let RouterComponent = (props) => {
        const match = useMatch('/profile/:userId/');
        return <Component {...props} match={match} />;
    }
    return RouterComponent;
}