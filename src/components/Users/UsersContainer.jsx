import React from 'react';
import { useSelector } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import Preloader from '../common/Preloader/Preloader';
import Users from './Users';


const UsersContainer = () => {
    const totalItemsCount = useSelector(store => store.usersPage.totalUsersCount)
    const pageSize = useSelector(store => store.usersPage.pageSize)
    const currentPage = useSelector(store => store.usersPage.currentPage)
    const isFetching = useSelector(store => store.usersPage.isFetching)
    const users = useSelector(store => store.usersPage.users)
    const followingInProgress = useSelector(store => store.usersPage.followingInProgress)
    const portionSize = 10

    let pagesCount = Math.ceil(totalItemsCount / pageSize)

    debugger

    // if (!isFetching) {
    //     debugger
    //     return <Preloader />
    // }
     return <Users
        totalItemsCount={totalItemsCount}
        pageSize={pageSize}
        currentPage={currentPage}
        isFetching={isFetching}
        users={users}
        followingInProgress={followingInProgress}
        pagesCount={pagesCount}
        portionSize={portionSize}
    />
}


export default compose(withAuthRedirect)(UsersContainer)
