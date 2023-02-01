import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { authReducer, setUserData } from '../../redux/auth-reducer';
// import { initialStateAuth } from '../../redux/auth-reducer';
import { getAuthUserData, logout } from '../../redux/auth-reducer-slice';
import Header from './Header';

// wrapper
const HeaderContainer = () => {

    let dispatch = useDispatch()
    const authStore = useSelector((store) => store.auth)

    useEffect(() => {
        dispatch(getAuthUserData())
    }, [authStore])

    // send "delete" subscription from server
    const logoutF = () => {
        debugger
        dispatch(logout())
    }

    return <>
        <Header isAuth={authStore.isAuth} login={authStore.login} logout={logoutF} />
    </>

}


export { HeaderContainer }