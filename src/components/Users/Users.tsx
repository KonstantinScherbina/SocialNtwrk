import React, { useEffect } from 'react';
import styles from './users.module.css';
import userPhoto from '../../assets/images/download.png'
import { followUsers, unfollowUsers, toggleFollowingProgress } from '../../redux/users-reducer-slice'
import Preloader from '../common/Preloader/Preloader'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { usersAPI } from '../../api/api';
import { IusersProps } from '../../types/types';
import { useAppDispatch } from '../../hook';

// Component of Users


let Users = (props: IusersProps) => {

    let dispatch = useAppDispatch()

    if (props.isFetching) {
        return <Preloader />
    } return <div>
        <div>
            {props.portionNumber > 1 &&
                <button onClick={() => { props.setPortionNumber(props.portionNumber - 1) }}>PREV</button>}

            {props.pages.filter(p => p >= props.leftPortionPageNumber && p <= props.rightPortionPageNumber).map((p) => {
                return <span key={p} onClick={(e) => { props.onPageChanged(p) }}>{p}</span>
            })}
            {props.portionCount > props.portionNumber && <button onClick={() => { props.setPortionNumber(props.portionNumber + 1) }}>NEXT</button>}
        </div>
        <div>
            {props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={`/profile/${u.id}`}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto} />
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {

                                dispatch(toggleFollowingProgress({ isFetch: true, id: u.id }))
                                usersAPI.deleteUserSubscribe(u.id)
                                    .then((data) => {
                                        debugger
                                        if (data.resultCode === 0) {
                                            dispatch(unfollowUsers(u.id))
                                        }
                                        dispatch(toggleFollowingProgress({ isFetch: false, id: u.id }))
                                    })
                            }}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {

                                dispatch(toggleFollowingProgress({ isFetch: true, id: u.id }))
                                usersAPI.addUserSubscribe(u.id)
                                    .then((data) => {
                                        if (data.resultCode === 0) {
                                            dispatch(followUsers(u.id))
                                        }
                                        dispatch(toggleFollowingProgress({ isFetch: false, id: u.id }))
                                    })
                            }}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>

                </span>
            </div>)
            }
        </div>
    </div>
}

export default Users;