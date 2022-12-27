import React from 'react';
import { useEffect } from 'react';
import { fetchGetProfile, fetchGetMyProfile } from '../../../redux/profile-reducer-slice';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ProfileInfo = () => {

    const dispatch = useDispatch()


    const profile = useSelector((state) => state.profilePage.profile)

    let { userId } = useParams()
    const myId = useSelector((state) => state.auth.id)

    useEffect(() => {
        if (userId) {
            dispatch(fetchGetProfile(userId))
        } else (dispatch(fetchGetMyProfile(myId)))
    }, [userId, myId])

    debugger
    if (!profile || !myId) {
        return <Preloader />
    } return (
        <div>
            <div>
                <img
                    src='https://c4.wallpaperflare.com/wallpaper/39/346/426/digital-art-men-city-futuristic-night-hd-wallpaper-preview.jpg' />
            </div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large} />
                <div>{profile.fullName}</div>
            </div>
        </div>
    )
}

export default ProfileInfo;