import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import { Route, Routes } from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Users from "./components/Users/Users";
import { HeaderContainer } from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import Dialogs from './components/Dialogs/Dialogs';
import UsersContainer from './components/Users/UsersContainer';


const App = () => {
    return (

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