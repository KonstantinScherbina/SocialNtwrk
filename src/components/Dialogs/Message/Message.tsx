import React from 'react';
import s from './../Dialogs.module.css';


// messages with penpels
const Message = ({ message, ...props }: { message: string, props: any }) => {
    debugger
    return <div className={s.dialog}>{message}</div>
}

export default Message;