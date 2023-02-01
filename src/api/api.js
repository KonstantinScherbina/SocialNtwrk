import axios from "axios"


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
    getUsersPageSize(pageSize = 10) {
        return instance.get(`users?count=${pageSize}`)
            .then(response => { return response.data })
    },

    // fetch some page from server
    getUsersPageNumber(pageNumber) {
        return instance.get(`users?page=${pageNumber}`)
            .then(response => { return response.data })
    },

    // unsubscribe from user
    deleteUserSubscribe(u) {
        return instance.delete(`follow/${u.id}`)
            .then(response => { return response.data })
    },

    // subscribe to user
    addUserSubscribe(u) {
        return instance.post(`follow/${u.id}`)
            .then(response => { return response.data })
    },

    // fetch autorized or not on server
    authAPIMe() {
        return instance.get(`auth/me`)
            .then(response => { return response.data })
    },

    // send data to api for authorizeing on server
    authAPILogIn(email, password, rememberMe = false) {
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
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => { return response.data })
    },

    // fetch my profile to server
    getMyProfile(myId) {
        return instance.get(`profile/${myId}`)
            .then(response => { return response.data })
    },

    // fetch profile status from server
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
            .then(response => { return response.data })
    },

    // send my profile status to server
    updateStatus(status) {
        return instance.put(`profile/status`, { status })
            .then(response => { return response.data })
    },

    // send my Photo to server
    savePhoto(photoFile) {
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
    updateProfileInfo(profileInfo) {
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

