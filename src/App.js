import React, { Suspense, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from "react-router-dom";
import { HeaderContainer } from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';
import { initializApp } from './redux/app-reducer-slice';

import Profile from './components/Profile/Profile'
// import UsersContainer from './components/Users/UsersContainer'


const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'))
// const Profile = React.lazy(() => import('./components/Profile/Profile'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))

const App = () => {
    debugger
    const dispatch = useDispatch()

    const initialized = useSelector(store => store.app.initialized)

    useEffect(() => {
        dispatch(initializApp())
    }, [initialized])


    debugger
    if (!initialized) {
        debugger
        return <Preloader />
    } return (

        <div className='app-wrapper'>
            <HeaderContainer />
            <Navbar />
            <div className='app-wrapper-content'>
                <Routes>

                    <Route path='/dialogs' element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <Dialogs />
                        </Suspense>}
                    />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/profile/:userId' element={<Profile />} />
                    <Route path='/users' element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <UsersContainer />
                        </Suspense>}
                    />
                    <Route path='/login' element={<LoginPage />} />
                </Routes>
            </div>
        </div>

    )
}

export default App;