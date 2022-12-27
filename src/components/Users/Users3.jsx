import React, { useEffect } from 'react';
import styles from './users.module.css';
import userPhoto from '../../assets/images/download.png'
import usersReducer, { initialState, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, followAC, unfollowAC, toggleIsFetchingAC } from '../../redux/users-reducer'
import { useReducer } from 'react';
import Preloader from '../common/Preloader/Preloader'
import { NavLink } from 'react-router-dom';

let Users = () => {

    const axios = require('axios')

    const [state, dispatch] = useReducer(usersReducer, initialState)

    let totalUsersCount = state.totalUsersCount
    let pageSize = state.pageSize
    let currentPage = state.currentPage
    let pages = state.pages
    let isFetching = state.isFetching

    let pagesCount = Math.ceil(totalUsersCount / pageSize)


    useEffect(() => {
        dispatch(toggleIsFetchingAC(true))
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}`)
            .then((response) => {
                dispatch(toggleIsFetchingAC(false))
                dispatch(setUsersAC(response.data.items))
            })
        console.log('1 func')
    }, [])

    useEffect(() => {
        dispatch(toggleIsFetchingAC(true))
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${pageSize}`)
            .then((response) => {
                dispatch(toggleIsFetchingAC(false))
                dispatch(setTotalUsersCountAC(response.data.totalCount))
            })
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
            console.log('2 func for')
        }
        console.log('2 func')
    }, [totalUsersCount])


    let onPageChanged = (pageNumber) => {
        dispatch(toggleIsFetchingAC(true))
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}`)
            .then((response) => {
                dispatch(toggleIsFetchingAC(false))
                dispatch(setUsersAC(response.data.items))
            })

        dispatch(setCurrentPageAC(pageNumber))
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

        {
            state.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={`/profile/${u.id}`}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto} />
                        </NavLink>

                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                dispatch(unfollowAC(u.id))
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                dispatch(followAC(u.id))
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