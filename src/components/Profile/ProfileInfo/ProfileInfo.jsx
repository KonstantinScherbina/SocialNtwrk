import React from 'react';
import { useEffect } from 'react';
import { fetchGetProfile, fetchGetMyProfile, getStatus } from '../../../redux/profile-reducer-slice';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = () => {

    const dispatch = useDispatch()
    let { userId } = useParams()


    const profile = useSelector((state) => state.profilePage.profile)
    const myId = useSelector((state) => state.auth.id)



    useEffect(() => {
        if (userId) {
            dispatch(fetchGetProfile(userId))
        } else {
            dispatch(fetchGetMyProfile(myId))
        }
    }, [userId, myId])

    useEffect(() => {
        if (userId) {
            dispatch(getStatus(userId))
        } else {
            dispatch(getStatus(myId))
        }
    }, [userId, myId])

  
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
                <div><ProfileStatusWithHooks /></div>
            </div>
        </div>
    )
}

export default ProfileInfo;