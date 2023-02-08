import React from 'react';
import { setEditMode } from '../../../redux/profile-reducer-slice';
import s from './ProfileInfo.module.css';
import { useDispatch } from 'react-redux';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import { Iconstacts, IprofileInfo } from '../../../types/types';

// info about user
const ProfileData = ({ profile, myId, err, props }: { profile: IprofileInfo, myId: number, err: string | null, props: any }) => {

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
                debugger
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof Iconstacts]} />
            })}
        </div>
        <div>
            <ProfileStatusWithHooks />
        </div>
        <div>
            {err && <div>{err}</div>}
        </div>
    </div>
}

const Contact = ({ contactTitle, contactValue }: { contactTitle: string, contactValue: string | null}) => {

    return <div className={s.contact}><b>{contactTitle}</b>:{contactValue}</div>

}

export default ProfileData;