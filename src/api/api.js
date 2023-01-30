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

    // request to api for get portional users will be returned in response
    getUsersPageSize(pageSize = 10) {
        return instance.get(`users?count=${pageSize}`)
            .then(response => { return response.data })
    },

    // request to api for get users
    getUsersPageNumber(pageNumber) {
        return instance.get(`users?page=${pageNumber}`)
            .then(response => { return response.data })
    },


    deleteUserSubscribe(u) {
        return instance.delete(`follow/${u.id}`)
            .then(response => { return response.data })
    },

    addUserSubscribe(u) {
        return instance.post(`follow/${u.id}`)
            .then(response => { return response.data })
    },

    authAPIMe() {
        return instance.get(`auth/me`)
            .then(response => { return response.data })
    },

    authAPILogIn(email, password, rememberMe = false) {
        debugger
        return instance.post(`auth/login`, { email, password, rememberMe })
            .then(response => { return response.data })
    },

    authAPILogOut() {
        debugger
        return instance.delete(`auth/login`)
            .then(response => { return response.data })
    },

    getProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => { return response.data })
    },

    getMyProfile(myId) {
        return instance.get(`profile/${myId}`)
            .then(response => { return response.data })
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
            .then(response => { return response.data })
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status })
            .then(response => { return response.data })
    },

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

    updateProfileInfo(profile_Info) {
        return instance.put(`profile/`, profile_Info)
            .then(response => { return response.data })
    },

}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
            .then(response => { return response.data })
    }
}

