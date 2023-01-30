import React, { useState } from 'react';
import { useEffect } from 'react';
import { getStatus, savePhoto, getAnotherProfile, getMyProfile } from '../../../redux/profile-reducer-slice';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.png'
import ProfileDataForm from '../ProfileDataForm';


const ProfileData = ({ profile, myId, goToEditMode }) => {

    return <div>
        {myId && <div><button onClick={goToEditMode}>Edit</button></div>}
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
        <div><ProfileStatusWithHooks /></div>
    </div>
}

const Contact = ({ contactTitle, contactValue }) => {

    return <div className={s.contact}><b>{contactTitle}</b>:{contactValue}</div>

}

export default ProfileData;