import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import { Route, Routes } from "react-router-dom";
import { HeaderContainer } from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import Dialogs from './components/Dialogs/Dialogs';
import UsersContainer from './components/Users/UsersContainer';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';
import { initializApp } from './redux/app-reducer-slice';


const App = () => {

    const dispatch = useDispatch()

    const initialized = useSelector(store => store.app.initialized)

    useEffect(() => {
        dispatch(initializApp())
    }, [initialized])



    if (!initialized) {
        return <Preloader />
    } return (

        <div className='app-wrapper'>
            <HeaderContainer />
            <Navbar />
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path='/dialogs' element={<Dialogs />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/profile/:userId' element={<Profile />} />
                    <Route path='/users' element={<UsersContainer />} />
                    <Route path='/login' element={<LoginPage />} />
                </Routes>
            </div>
        </div>

    )
}

export default App;