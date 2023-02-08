import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { useAppDispatch, useAppSelector } from '../../hook';
import { getUsersPage } from '../../redux/users-reducer-slice';
import Users from './Users';


const UsersContainer = () => {


    let dispatch = useAppDispatch()

    const totalItemsCount = useAppSelector(store => store.usersPage.totalUsersCount)
    const pageSize = useAppSelector(store => store.usersPage.pageSize)
    const currentPage = useAppSelector(store => store.usersPage.currentPage)
    const isFetching = useAppSelector(store => store.usersPage.isFetching)
    const users = useAppSelector(store => store.usersPage.users)
    const followingInProgress = useAppSelector(store => store.usersPage.followingInProgress)
    const portionSize: number = 10
    const [pages, setPages] = useState<number[]>([])

    useEffect(() => {
        dispatch(getUsersPage({ pageSize: pageSize, pageNumber: currentPage }))
        debugger
        for (let i = 1; i <= pagesCount; i++) {
            setPages(pages => [...pages, i])
        }
    }, [totalItemsCount])

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersPage({ pageSize: pageSize, pageNumber: pageNumber }))
    }

    let pagesCount: number = 0
    if (totalItemsCount) {
        pagesCount = Math.ceil(totalItemsCount / pageSize)
    }


    let portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    useEffect(() => {
        setPortionNumber(Math.ceil(currentPage / portionSize))
    }, [currentPage]);



    return <Users
        totalItemsCount={totalItemsCount}
        pageSize={pageSize}
        currentPage={currentPage}
        isFetching={isFetching}
        users={users}
        followingInProgress={followingInProgress}
        pagesCount={pagesCount}
        portionSize={portionSize}
        pages={pages}
        portionCount={portionCount}
        leftPortionPageNumber={leftPortionPageNumber}
        rightPortionPageNumber={rightPortionPageNumber}
        portionNumber={portionNumber}
        setPortionNumber={setPortionNumber}
        onPageChanged={onPageChanged}
    />
}


export default compose(withAuthRedirect)(UsersContainer)
