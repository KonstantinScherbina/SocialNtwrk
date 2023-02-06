import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateStatus } from "../../../redux/profile-reducer-slice"


// status of user on a page
const ProfileStatusWithHooks = () => {

    const dispatch = useDispatch()

    const userStatus = useSelector((state) => state.profilePage.status)

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(userStatus)

    debugger
    useEffect(() => {
        setStatus(status)
    }, [userStatus])

    // activate mod for editing status
    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(updateStatus(status))
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode && <div>
                <b>Status :</b> <span onDoubleClick={activateEditMode}>{userStatus || ""}</span>
            </div>
            }
            {editMode && <div>
                <input onChange={onStatusChange} value={status} autoFocus={true} onBlur={deactivateEditMode} />
            </div>}
        </div>
    )
}

export default ProfileStatusWithHooks