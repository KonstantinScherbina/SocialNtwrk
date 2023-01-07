import React, { useEffect } from 'react';
import styles from './users.module.css';
import userPhoto from '../../assets/images/download.png'
import { followUsers, unfollowUsers, toggleFollowingProgress, fetchUsersById, fetchUsersPageSize, fetchUsersPageNumber } from '../../redux/users-reducer-slice'
import Preloader from '../common/Preloader/Preloader'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { usersAPI } from '../../api/api';

let Users = (props) => {

    let dispatch = useDispatch()

    const [pages, setPages] = useState([])

    useEffect(() => {
        dispatch(fetchUsersById(props.currentPage))
    }, [props.currentPage])

    useEffect(() => {
        dispatch(fetchUsersPageSize(props.pageSize))
        for (let i = 1; i <= props.pagesCount; i++) {
            setPages(pages => [...pages, i])
        }
    }, [props.totalUsersCount])


    let onPageChanged = (pageNumber) => {
        dispatch(fetchUsersPageNumber(pageNumber))
    }


    if (props.isFetching) {
        return <Preloader />
    } return <div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p && styles.selectedPage}
                    onClick={() => { onPageChanged(p) }}>{p}</span>
            })}

        </div>
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
                            usersAPI.deleteUserSubscribe(u)
                                .then((data) => {
                                    if (data.resultCode == 0) {
                                        dispatch(unfollowUsers(u.id))
                                    }
                                    dispatch(toggleFollowingProgress({ isFetch: false, id: u.id }))
                                })
                        }}>Unfollow</button>
                        : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {

                            dispatch(toggleFollowingProgress({ isFetch: true, id: u.id }))
                            usersAPI.addUserSubscribe(u)
                                .then((data) => {
                                    if (data.resultCode == 0) {
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
}

export default Users;