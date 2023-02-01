import React, { useState } from "react";


// creating numeration of pages on Users component
let Paginator = ({ totalItemsCount, pageSize, onPageChanged, portionSize = 10 }) => {

    // the result of dividing all users by the number on one page
    let pagesCount = Math.ceil(totalItemsCount / pageSize)

    let pages = []

    
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    // number of pages that are visible
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return <div>
        {portionNumber > 1 &&
            <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}

        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map((p) => {
            return <span key={p} onClick={(e) => { onPageChanged(p) }}>{p}</span>
        })}
        {portionCount > portionNumber && <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
    </div>

}

export default Paginator