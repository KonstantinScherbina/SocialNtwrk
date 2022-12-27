import React, { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { authReducer, setUserData } from '../../redux/auth-reducer';
// import { initialStateAuth } from '../../redux/auth-reducer';
import { getAuthUserData } from '../../redux/auth-reducer-slice';
import Header from './Header';

const HeaderContainer = () => {

    const axios = require('axios')
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

    return <>
        <Header isAuth={authStore.isAuth} login={authStore.login} />
    </>

}


export { HeaderContainer }