import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsersById, fetchUsersPageNumber, fetchUsersPageSize } from "../../../redux/users-reducer-slice";

let Paginator = (props) => {

    // debugger

    // let portionNumber = props.portionNumber
    // let setPortionNumber = props.setPortionNumber
    // let leftPortionPageNumber = props.leftPortionPageNumber
    // let rightPortionPageNumber = props.rightPortionPageNumber
    // let portionCount = props.portionCount

    // return <div>

    //     {
    //         portionNumber > 1 &&
    //         <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>
    //     }

    //     {
    //         pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map((p) => {
    //             return <span key={p} onClick={(e) => { onPageChanged(p) }}>{p}</span>
    //         })
    //     }
    //     {portionCount > portionNumber && <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
    // </div>
}

// export default Paginator