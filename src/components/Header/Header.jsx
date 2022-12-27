import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import { useSelector } from 'react-redux';

const Header = (children) => {

    return <header className={s.header}>
        <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' />
        <div className={s.loginBlock}>
            {children.isAuth ? children.login : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}

export default Header;