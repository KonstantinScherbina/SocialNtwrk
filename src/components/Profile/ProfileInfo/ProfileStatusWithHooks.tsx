import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../hook"
import { updateStatus } from "../../../redux/profile-reducer-slice"
// import Input from "../../input"


// status of user on a page
const ProfileStatusWithHooks = (props: any) => {

    const dispatch = useAppDispatch()

    const userStatus = useAppSelector((state) => state.profilePage.status)

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

    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode && <div>
                <b>Status :</b> <span onDoubleClick={activateEditMode}>{userStatus || "Hey! I'm your staus"}</span>
            </div>
            }
            {editMode && <div>
                <input onChange={onStatusChange} value={status} autoFocus={true} onBlur={deactivateEditMode} placeholder="Hey! I'm your staus" />
                {/* < Input value={status} onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} placeholder="Hey! I'm your staus" /> */}
            </div>}
        </div>
    )
}

export default ProfileStatusWithHooks