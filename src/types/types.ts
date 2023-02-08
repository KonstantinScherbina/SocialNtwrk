export interface IapiResponseResult {
    data: {
        id: number | null,
        login: string | null,
        email: string | null
        photos: { large: string, small: string }
    },
    resultCode: number,
    fieldsErrors?: any[],
    messages?: string[]
}
export interface IinitialStateApp {
    initialized: boolean
}

export interface ImyAuthData {
    email: string
    password: string
    rememberMe: boolean
}

export interface IinitialStateAuth {
    id: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean,
    isError: boolean,
    errorMessage?: string[] | null,
    captcha?: string | null
}

export interface IinitialStateDialogs {
    dialogs: {
        id: number
        name: string
    }[]
    messages: string[]
    newMessageBody: string
}


// export interface ImyProfileInfoThunk {
//     aboutMe: string
//     contacts: {
//         facebook: string
//         github: string
//         instagram: string
//         mainLink: string
//         twitter: string
//         vk: string
//         website: string
//         youtube: string
//     }
//     fullName: string
//     lookingForAJobDescription: string
//     lookingForAjob: boolean
// }

export interface Icomponent {
    (props: any): JSX.Element
}

export interface IpageSizAndNumber {
    error: number | null
    items: Iusers[]
    totalCount: number | null
}

export interface Iusers {
    name: string | null,
    id: number,
    uniqueUrlName: string | null,
    photos: {
        large: string | null
        small: string | null
    },
    status: string | null
    followed: boolean
}

export interface IinitialStateUsers {
    users: Iusers[]
    pageSize: number
    totalUsersCount: number | null,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[],
}

export interface IprofileInfo {
    aboutMe: string | null
    contacts: Iconstacts
    fullName: string | null
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    photos: {
        small: string | null,
        large: string | null
    }
    userId: number | null
}

export interface Iconstacts {
    facebook: string | null
    github: string | null
    instagram: string | null
    mainLink: string | null
    twitter: string | null
    vk: string | null
    website: string | null
    youtube: string | null
}

export interface IinitialStateProfile {
    isFetching: boolean
    profile: IprofileInfo
    status: string
    posts: {
        id: number | null
        message: string | null
        likesCount: number | null
    }[]
    editMode: boolean
    error: string | null
}

export interface InewPost {
    id: number | null
    message: string | null
    likesCount: number | null
}

export interface IusersProps {
    totalItemsCount: number | null
    pageSize: number
    currentPage: number
    isFetching: boolean
    users: Iusers[]
    followingInProgress: number[]
    pagesCount: number
    portionSize: number
    pages: number[]
    portionCount: number
    leftPortionPageNumber: number
    rightPortionPageNumber: number
    portionNumber: number
    setPortionNumber: React.Dispatch<React.SetStateAction<number>>
    onPageChanged: (pageNumber: number) => void
}