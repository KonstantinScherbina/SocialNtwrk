import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from './MyPosts/MyPosts';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

const Profile = () => {
    debugger
    return (
        <div>
            <ProfileInfo />
            <MyPosts />
        </div>
    )
}

export default compose(withAuthRedirect)(Profile);