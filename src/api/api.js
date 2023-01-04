import axios from "axios"


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: { "API-KEY": "a11c1b6e-985d-42c3-9af2-d65c3bcf4ccb" }
});


export const usersAPI = {
    getUsersCurrentPage(currentPage = 1) {
        return instance.get(`users?page=${currentPage}`)
            .then(response => { return response.data })
    },

    getUsersPageSize(pageSize = 10) {
        return instance.get(`users?count=${pageSize}`)
            .then(response => { return response.data })
    },

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

    authAPI() {
        return instance.get(`auth/me`)
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
    }

}

