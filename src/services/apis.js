const BASE_URL = process.env.REACT_APP_BASE_URL;


export const userEndPoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}


export const noteEndPoints = {
    CREATE_NOTE_API : BASE_URL + "/notes/createnote",
    UPDATE_NOTE_API : BASE_URL + "/notes/updatenote",
    DELETE_NOTE_API : BASE_URL + "/notes/deletenote",
    GET_USER_NOTE_API : BASE_URL + "/notes/getusernote",
}

export const profileEndPoints = {
    GET_USER_DETAILS_API: BASE_URL + '/profile/getuserdetails',
}

