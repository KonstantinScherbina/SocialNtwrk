import React from 'react';
import { useSelector } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import Users from './Users';


const UsersContainer = () => {
    const totalUsersCount = useSelector(store => store.usersPage.totalUsersCount)
    const pageSize = useSelector(store => store.usersPage.pageSize)
    const currentPage = useSelector(store => store.usersPage.currentPage)
    const isFetching = useSelector(store => store.usersPage.isFetching)
    const users = useSelector(store => store.usersPage.users)
    const followingInProgress = useSelector(store => store.usersPage.followingInProgress)

    let pagesCount = Math.ceil(totalUsersCount / pageSize)

    return <><Users
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        isFetching={isFetching}
        users={users}
        followingInProgress={followingInProgress}
        pagesCount={pagesCount}
    /></>
}


export default compose(withAuthRedirect)(UsersContainer)
