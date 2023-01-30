import React, { useState } from 'react';
import { useEffect } from 'react';
import {getStatus, savePhoto, getAnotherProfile, getMyProfile } from '../../../redux/profile-reducer-slice';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import userPhoto from '../../../assets/images/user.png'
import ProfileDataForm from '../ProfileDataForm';
import ProfileData from './ProfileData';

const ProfileInfo = () => {
    debugger
    const dispatch = useDispatch()
    let { userId } = useParams()
    const [editMode, setEditMode] = useState(false)

    

    const profile = useSelector((state) => state.profilePage.profile)
    const myId = useSelector((state) => state.auth.id)
    const profilePhoto = useSelector((state) => state.profilePage.profile.photos)

debugger

    useEffect(() => {
        if (userId) {
            dispatch(getAnotherProfile(userId))
        } else {
            dispatch(getMyProfile(myId))
        }
    }, [userId, myId])

    useEffect(() => {
        if (userId) {
            dispatch(getStatus(userId))
        } else {
            dispatch(getStatus(myId))
        }
    }, [userId, myId])

    debugger

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            dispatch(savePhoto(e.target.files[0]))
        }
    }

    if (!profile || !myId) {
        debugger
        return <Preloader />
    } return (
        
        <div>
            <div>
                <img
                    src='https://c4.wallpaperflare.com/wallpaper/39/346/426/digital-art-men-city-futuristic-night-hd-wallpaper-preview.jpg' />
            </div>
            <div className={s.descriptionBlock}>
                {/* <img src={profile.photos.large || userPhoto} className={s.mainPhoto} /> */}
                <img src={profilePhoto.large || userPhoto} className={s.mainPhoto} />
                {myId && <input type={"file"} onChange={onMainPhotoSelected} />}
                {editMode ? <ProfileDataForm /> : <ProfileData profile={profile} myId={myId} goToEditMode={() => { setEditMode(true) }} />}
            </div>
        </div>
    )

}


export default ProfileInfo;