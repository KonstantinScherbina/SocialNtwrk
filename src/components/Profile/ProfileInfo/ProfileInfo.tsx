import React from 'react';
import { useEffect } from 'react';
import { getStatus, savePhoto, getAnotherProfile, getMyProfile } from '../../../redux/profile-reducer-slice';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import { useParams } from 'react-router-dom';
import userPhoto from '../../../assets/images/user.png'
import ProfileDataForm from './ProfileDataForm';
import ProfileData from './ProfileData';
import { useAppDispatch, useAppSelector } from '../../../hook';

const ProfileInfo = (props: any) => {

    const dispatch = useAppDispatch()
    let { userId } = useParams()

    const profile = useAppSelector((state) => state.profilePage.profile)
    const profileErr = useAppSelector((state) => state.profilePage.error)
    const myId = useAppSelector((state) => state.auth.id)

    // const profilePhoto = useSelector((state) => state.profilePage.profile.photos)
    const editMode = useAppSelector((state) => state.profilePage.editMode)


    // dispatch thunks for get my profile page or another
    useEffect(() => {
        if (userId) {
            dispatch(getAnotherProfile(parseInt(userId)))
        } else {
            dispatch(getMyProfile(myId))
        }
    }, [userId, myId])

    // dispatch thunks for get my profile status or another
    useEffect(() => {
        if (userId) {
            dispatch(getStatus(parseInt(userId)))
        } else {
            dispatch(getStatus(myId))
        }
    }, [userId, myId])


    // dispatch thunk with selected image file to api
    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length) {
            dispatch(savePhoto(e.target.files[0]))
        }
    }

    if (!profile || !myId) {
        return <Preloader />
    } return (

        <div>
            <div>
                <img
                    src='https://c4.wallpaperflare.com/wallpaper/39/346/426/digital-art-men-city-futuristic-night-hd-wallpaper-preview.jpg' />
            </div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos?.large || userPhoto} className={s.mainPhoto} />
                {myId && <input type={"file"} onChange={onMainPhotoSelected} />}
                {editMode ? <ProfileDataForm /> : <ProfileData profile={profile} myId={myId} err={profileErr} props={props} />}
            </div>
        </div>
    )

}


export default ProfileInfo;