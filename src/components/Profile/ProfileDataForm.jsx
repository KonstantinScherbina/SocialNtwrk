import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { myProfileInfoThunk } from '../../redux/profile-reducer-slice';
import ProfileStatusWithHooks from './ProfileInfo/ProfileStatusWithHooks';

const ProfileDataForm = () => {
    const profile = useSelector((store) => store.profilePage.profile)

    return <ProfileOwnData profile={profile} />
}


const ProfileOwnData = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur",
    });

    const dispatch = useDispatch()

    const onSubmit = (data) => {

        console.log(data)

        dispatch(myProfileInfoThunk(data))
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
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

        <input type="submit" />

        {/* <div>
            {props.isError && props.isErrorMessage}
        </div> */}
    </form>
}

export default ProfileDataForm;