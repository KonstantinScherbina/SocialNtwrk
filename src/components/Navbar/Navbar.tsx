import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from "react-router-dom";

const Navbar = (props: any) => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" style={({ isActive }) => (isActive
                    ? { textDecoration: 'none', color: 'red' } : {})}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/dialogs" style={({ isActive }) => (isActive
                    ? { textDecoration: 'none', color: 'red' } : {})}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/users" style={({ isActive }) => (isActive
                    ? { textDecoration: 'none', color: 'red' } : {})}>Users</NavLink>
            </div>

            <div className={s.item}>
                <a>News</a>
            </div>
            <div className={s.item}>
                <a>Music</a>
            </div>
            <div className={s.item}>
                <a>Settings</a>
            </div>
        </nav>
    )
}

export default Navbar;