import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Navigate } from 'react-router-dom';
import { sendMessage, updateNewMessageBody } from '../../redux/dialogs-reducer-slice';
import { useDispatch, useSelector } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

// Messages Component
const Dialogs = () => {
    let dispatch = useDispatch()


    let dialosPage = useSelector(store => store.dialogsPage)

    // outputs each user
    let dialogsElements = dialosPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
    // outputs each message
    let messagesElements = dialosPage.messages.map(m => <Message message={m} key={m.id} />);

    let newMessageBody = dialosPage.newMessageBody;

    let onSendMessageClick = () => {
        dispatch(sendMessage())
    }

    // change handler textarea
    let onNewMessageChange = (e) => {
        let body = e.target.value;
        dispatch(updateNewMessageBody(body));
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>
                    <textarea
                        value={newMessageBody}
                        onChange={onNewMessageChange}
                        placeholder='Enter your message'>
                    </textarea>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
                <div>{messagesElements}</div>
            </div>
        </div>
    )
}

export default compose(withAuthRedirect)(Dialogs)

// export default Dialogs;