import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hook';
// import { authReducer, setUserData } from '../../redux/auth-reducer';
// import { initialStateAuth } from '../../redux/auth-reducer';
import { getAuthUserData, logout } from '../../redux/auth-reducer-slice';
import Header from './Header';

// wrapper
const HeaderContainer = (props: any) => {

    let dispatch = useAppDispatch()
    const authStore = useAppSelector((store) => store.auth)

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