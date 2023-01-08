import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { authReducer, setUserData } from '../../redux/auth-reducer';
// import { initialStateAuth } from '../../redux/auth-reducer';
import { getAuthUserData, logout } from '../../redux/auth-reducer-slice';
import Header from './Header';

const HeaderContainer = () => {

    let dispatch = useDispatch()
    const authStore = useSelector((store) => store.auth)


    // useEffect(() => {
    //     axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, { withCredentials: true })
    //         .then((response) => {
    //             if (response.data.resultCode === 0) {
    //                 const { id, login, email } = response.data.data
    //                 dispatch(setUserDataAction({id, login, email}))
    //             }
    //         })
    // }, [authStore])

    useEffect(() => {
        dispatch(getAuthUserData())
    }, [authStore])

    const logoutF = () => {
        debugger
        dispatch(logout())
    }


    return <>
        <Header isAuth={authStore.isAuth} login={authStore.login} logout={logoutF} />
    </>



}


export { HeaderContainer }