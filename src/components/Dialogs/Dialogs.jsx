import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Navigate } from 'react-router-dom';
import { sendMessage, updateNewMessageBody } from '../../redux/dialogs-reducer-slice';
import { useDispatch, useSelector } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

const Dialogs = () => {
    let dispatch = useDispatch()

    let dialosPage = useSelector(store => store.dialogsPage)
    // let isAuth = useSelector(store => store.auth.isAuth)
    debugger
    let dialogsElements = dialosPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
    let messagesElements = dialosPage.messages.map(m => <Message message={m.message} key={m.id} />);
    let newMessageBody = dialosPage.newMessageBody;



    let onSendMessageClick = () => {
        dispatch(sendMessage())
    }

    let onNewMessageChange = (e) => {
        let body = e.target.value;
        dispatch(updateNewMessageBody(body));
    }


    //----------------------

    // let state = props.dialogsPage;

    // let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
    // let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} />);
    // let newMessageBody = state.newMessageBody;

    // let onSendMessageClick = () => {
    //     props.sendMessage();
    // }

    // let onNewMessageChange = (e) => {
    //     let body = e.target.value;
    //     props.updateNewMessageBody(body);
    // }

    // let AuthRedirectComponent = (props) => {
    //     if (!props.isAuth) return <Navigate to={`/login`} />
    //     return <Dialogs {...props} />
    // }

    // let AuthRedirectComponent = withAuthRedirect(Dialogs)
    // AuthRedirectComponent()


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea value={newMessageBody}
                        onChange={onNewMessageChange}
                        placeholder='Enter your message'></textarea></div>
                    <div><button onClick={onSendMessageClick}>Send</button></div>
                </div>
            </div>
        </div>
    )
}

export default compose(withAuthRedirect)(Dialogs)

// export default Dialogs;