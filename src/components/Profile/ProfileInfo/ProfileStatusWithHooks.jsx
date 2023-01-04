import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateStatus } from "../../../redux/profile-reducer-slice"

const ProfileStatusWithHooks = () => {

    const dispatch = useDispatch()

    const userStatus = useSelector((state) => state.profilePage.status)

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(userStatus)

    useEffect(() => {
        setStatus(status)
    }, [userStatus])


    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(updateStatus(status))

        debugger
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
        debugger
    }

    return (
        <div>
            {!editMode && <div>
                <span onDoubleClick={activateEditMode}>{status || "------"}</span>
            </div>
            }
            {editMode && <div>
                <input onChange={onStatusChange} value={status} autoFocus={true} onBlur={deactivateEditMode} />
            </div>}
        </div>
    )
}

export default ProfileStatusWithHooks