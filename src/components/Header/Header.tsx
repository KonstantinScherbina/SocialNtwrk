import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import { useSelector } from 'react-redux';

const Header = ({ isAuth, login, logout }: { isAuth: boolean, login: string | null, logout: () => void }) => {
    // show buttons Login or Logout from server
    return <header className={s.header}>
        <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' />
        <div className={s.loginBlock}>
            {isAuth ?
                <div>{login} <button onClick={logout}>Log Out</button></div>
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}

export default Header;