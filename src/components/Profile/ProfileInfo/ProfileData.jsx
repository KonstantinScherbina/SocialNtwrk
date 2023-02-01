import React from 'react';
import { setEditMode } from '../../../redux/profile-reducer-slice';
import s from './ProfileInfo.module.css';
import { useDispatch } from 'react-redux';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

// info about user
const ProfileData = ({ profile, myId, err }) => {

    const dispatch = useDispatch()
    debugger

    return <div>
        {myId && <button onClick={() => dispatch(setEditMode(true))}>Edit</button>}
        <div>
            <b>Full Name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a Job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
        <div>
            <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })}
        </div>
        <div>
            <ProfileStatusWithHooks />
        </div>
        <div>
            {err && <dvi>{err}</dvi>}
        </div>
    </div>
}

const Contact = ({ contactTitle, contactValue }) => {

    return <div className={s.contact}><b>{contactTitle}</b>:{contactValue}</div>

}

export default ProfileData;