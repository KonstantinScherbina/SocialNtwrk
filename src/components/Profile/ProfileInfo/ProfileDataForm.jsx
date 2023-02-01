import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile, myProfileInfoThunk, setEditMode } from '../../../redux/profile-reducer-slice';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileDataForm = () => {
    const profile = useSelector((store) => store.profilePage.profile)

    return <ProfileOwnData profile={profile} />
}


const ProfileOwnData = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur",
    });

    const dispatch = useDispatch()

    const myid = props.profile.userId

    const onSubmit = (data) => {

        debugger
        dispatch(myProfileInfoThunk(data))
        dispatch(setEditMode(false))
        dispatch(getMyProfile(myid))
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <> <input type="submit" /> </>
        <div>
            Full Name:
            <input type={"text"} defaultValue={props.profile.fullName} {...register("fullName")} />

        </div>
        <div>
            Looking for a Job:
            <input type={"text"} defaultValue={props.profile.lookingForAJob} {...register("lookingForAjob")} />

        </div>
        <div>
            Looking for a Job Description:
            <input type={"text"} defaultValue={props.profile.lookingForAJobDescription} {...register("lookingForAJobDescription")} />

        </div>
        <div>
            About me:
            <input type={"text"} defaultValue={props.profile.aboutMe} {...register("aboutMe")} />
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
                return <div key={key}><b>{key}: <input {...register(`contacts.${key}`)} /></b></div>
            })}
        </div>
        <div>
            <ProfileStatusWithHooks />
        </div>

        {/* <div>
            {props.isError && props.isErrorMessage}
        </div> */}
    </form>
}

export default ProfileDataForm;