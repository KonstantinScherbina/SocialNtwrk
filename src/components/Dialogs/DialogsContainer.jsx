import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import DialogItem from './DialogItem/DialogItem';
import Dialogs from "./Dialogs";
import Message from './Message/Message';

const DialogsContainer = () => {

    // let dialosPage = useSelectortor(store => store.dialosPage)
    // let isAuth = useSelector(store => store.auth.isAuth)
    // debugger
    // let dialogsElements = dialosPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
    // let messagesElements = dialosPage.messages.map(m => <Message message={m.message} key={m.id} />);
    // let newMessageBody = dialosPage.newMessageBody;



    // let onSendMessageClick = () => {
    //     dispatch(sendMessage())
    // }

    // let onNewMessageChange = (e) => {
    //     let body = e.target.value;
    //     dispatch(updateNewMessageBody(body));
    // }

    // let AuthRedirectComponent = withAuthRedirect(Dialogs)
    // return AuthRedirectComponent

    // return <>
    //     <Dialogs
    //         isAuth={isAuth}
    //         dialogsElements={dialogsElements}
    //         messagesElements={messagesElements}
    //         newMessageBody={newMessageBody} />
    // </>

}
// export default compose()(DialogsContainer)

// export default DialogsContainer;