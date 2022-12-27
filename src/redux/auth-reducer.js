const SET_AUTH_DATA = SET_AUTH_DATA

export let initialStateAuth = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialStateAuth, action) => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return {
                ...state, ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
}


export const setUserData = (userId, email, login) => ({ type: SET_AUTH_DATA, data: { userId, email, login } })

export { authReducer }