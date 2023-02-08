import React, { useState } from "react";

interface paginator {
    totalItemsCount: number | null
    pageSize: number | null
    onPageChanged: (pageNumber: number) => void
    portionSize: number
}

// creating numeration of pages on Users component
let Paginator = ({ totalItemsCount, pageSize, onPageChanged, portionSize = 10 }: paginator): any => {

    let pagesCount: number | null = null

    // the result of dividing all users by the number on one page
    if (totalItemsCount && pageSize) {
        pagesCount = Math.ceil(totalItemsCount / pageSize)
    }

    let pages: number[] | null = []


    // if (pagesCount) {
    //     for (let i = 1; i <= pagesCount; i++) {
    //         pages.push(i)
    //     }
    // }

    if (pagesCount) {
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
    }

    let portionCount: number | null = null

    if (pagesCount) {
        portionCount = Math.ceil(pagesCount / portionSize)
    }
    // number of pages that are visible

    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return <div>
        {portionNumber > 1 &&
            <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}

        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map((p) => {
            return <span key={p} onClick={(e) => { onPageChanged(p) }}>{p}</span>
        })}
        {portionCount && portionCount > portionNumber && <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
    </div>

}

export default Paginator