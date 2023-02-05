import axios from "axios"
import { IMyProfileInfoThunk } from "../redux/profile-reducer-slice";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: { "API-KEY": "a11c1b6e-985d-42c3-9af2-d65c3bcf4ccb" }
});


export const usersAPI = {
    // getUsersCurrentPage(currentPage = 1) {
    //     return instance.get(`users?page=${currentPage}`)
    //         .then(response => { return response.data })
    // },

    // fetch users on single page from server
    getUsersPageSize(pageSize: number | null = 10) {
        return instance.get(`users?count=${pageSize}`)
            .then(response => { return response.data })
    },

    // fetch some page from server
    getUsersPageNumber(pageNumber: number | null) {
        return instance.get(`users?page=${pageNumber}`)
            .then(response => { return response.data })
    },

    // unsubscribe from user
    deleteUserSubscribe(uId: number | null) {
        return instance.delete(`follow/${uId}`)
            .then(response => { return response.data })
    },

    // subscribe to user
    addUserSubscribe(uId: number | null) {
        debugger
        return instance.post(`follow/${uId}`)
            .then(response => { return response.data })
    },

    // fetch autorized or not on server
    authAPIMe() {
        return instance.get(`auth/me`)
            .then(response => { return response.data })
    },

    // send data to api for authorizeing on server
    // authAPILogIn(email: any, password: any, rememberMe: boolean = false) {
    //     debugger
    //     return instance.post(`auth/login`, { email, password, rememberMe })
    //         .then(response => { return response.data })
    // }
    authAPILogIn(email: any, password: any, rememberMe: boolean = false) {
        debugger
        return instance.post(`auth/login`, { email, password, rememberMe })
            .then(response => { return response.data })
    },

    // unAuthorizeing from server
    authAPILogOut() {
        debugger
        return instance.delete(`auth/login`)
            .then(response => { return response.data })
    },

    // fetch another profile from server
    getProfile(userId: number | null) {
        return instance.get(`profile/${userId}`)
            .then(response => { return response.data })
    },

    // fetch my profile to server
    getMyProfile(myId: number | null) {
        return instance.get(`profile/${myId}`)
            .then(response => { return response.data })
    },

    // fetch profile status from server
    getStatus(userId: number | null) {
        return instance.get(`profile/status/${userId}`)
            .then(response => { return response.data })
    },

    // send my profile status to server
    updateStatus(status: string | null) {
        return instance.put(`profile/status`, { status })
            .then(response => { return response.data })
    },

    // send my Photo to server
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile)

        debugger
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => { return response.data })
    },

    // send personal info to server
    updateProfileInfo(profileInfo: IMyProfileInfoThunk | null) {
        debugger
        return instance.put(`profile/`, profileInfo)
            .then(response => { return response.data })
    },
}

// fetch captcha image from server
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
            .then(response => { return response.data })
    }
}

