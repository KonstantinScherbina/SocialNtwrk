import React from 'react';
import s from './../Dialogs.module.css';
import { NavLink } from "react-router-dom";


// penpals
const DialogItem = ({ name, id, ...props }: { name: string, id: number, props: any }) => {
    let path = "/dialogs/" + id;

    return <div className={s.dialog + ' ' + s.active}>
        <NavLink to={path}>{name}</NavLink>
    </div>
}

export default DialogItem;