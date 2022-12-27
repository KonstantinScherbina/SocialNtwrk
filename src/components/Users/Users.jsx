import React, { useEffect } from 'react';
import styles from './users.module.css';
import userPhoto from '../../assets/images/download.png'
import { followUsers, unfollowUsers, toggleFollowingProgress, fetchUsersById, fetchUsersPageSize, fetchUsersPageNumber } from '../../redux/users-reducer-slice'
import Preloader from '../common/Preloader/Preloader'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { usersAPI } from '../../api/api';

let Users = () => {

    let dispatch = useDispatch()

    const totalUsersCount = useSelector(store => store.usersPage.totalUsersCount)
    const pageSize = useSelector(store => store.usersPage.pageSize)
    const currentPage = useSelector(store => store.usersPage.currentPage)
    const isFetching = useSelector(store => store.usersPage.isFetching)
    const users = useSelector(store => store.usersPage.users)
    const followingInProgress = useSelector(store => store.usersPage.followingInProgress)

    let pagesCount = Math.ceil(totalUsersCount / pageSize)

    const [pages, setPages] = useState([])


    useEffect(() => {
        dispatch(fetchUsersById(currentPage))
        console.log('1 func')
    }, [])


    useEffect(() => {
        dispatch(fetchUsersPageSize(pageSize))
        for (let i = 1; i <= pagesCount; i++) {
            setPages(pages => [...pages, i])
            console.log('2 func for')
        }
        console.log('2 func')
    }, [totalUsersCount])


    let onPageChanged = (pageNumber) => {
        dispatch(fetchUsersPageNumber(pageNumber))
        console.log('3 func')
    }


    if (isFetching) {
        return <Preloader />
    } return <div>
        <div>
            {pages.map(p => {
                return <span className={currentPage === p && styles.selectedPage}
                    onClick={() => { onPageChanged(p) }}>{p}</span>
            })}

        </div>
        {users.map(u => <div key={u.id}>
            <span>
                <div>
                    <NavLink to={`/profile/${u.id}`}>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto} />
                    </NavLink>

                </div>
                <div>
                    {u.followed
                        ? <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {

                            dispatch(toggleFollowingProgress({ isFetch: true, id: u.id }))
                            usersAPI.deleteUserSubscribe(u)
                                .then((data) => {
                                    if (data.resultCode == 0) {
                                        dispatch(unfollowUsers(u.id))
                                    }
                                    dispatch(toggleFollowingProgress({ isFetch: false, id: u.id }))
                                })
                        }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {

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