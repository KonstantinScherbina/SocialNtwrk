import React, { useEffect } from 'react';
import styles from './users.module.css';
import userPhoto from '../../assets/images/download.png'
import { followUsers, unfollowUsers, toggleFollowingProgress, getUsersPageSize, getUsersPage } from '../../redux/users-reducer-slice'
import Preloader from '../common/Preloader/Preloader'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { usersAPI } from '../../api/api';

// Component of Users
let Users = (props) => {

    let dispatch = useDispatch()

    const [pages, setPages] = useState([])


    // useEffect(() => {
    //     dispatch(getUsersPage(props.currentPage))
    // }, [props.currentPage])

    useEffect(() => {
        dispatch(getUsersPage({ pageSize: props.pageSize, pageNumber: props.currentPage }))
        debugger
        for (let i = 1; i <= props.pagesCount; i++) {
            setPages(pages => [...pages, i])
        }
    }, [props.totalItemsCount])


    let onPageChanged = (pageNumber) => {
        dispatch(getUsersPage({ pageSize: props.pageSize, pageNumber: pageNumber }))
    }


    let portionCount = Math.ceil(props.pagesCount / props.portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1
    let rightPortionPageNumber = portionNumber * props.portionSize

    // show new portion of pages left or right
    useEffect(() => {
        setPortionNumber(Math.ceil(props.currentPage / props.portionSize))
    }, [props.currentPage]);

    if (props.isFetching) {
        return <Preloader />
    } return <div>
        <div>
            {portionNumber > 1 &&
                <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}

            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map((p) => {
                return <span key={p} onClick={(e) => { onPageChanged(p) }}>{p}</span>
            })}
            {portionCount > portionNumber && <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
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