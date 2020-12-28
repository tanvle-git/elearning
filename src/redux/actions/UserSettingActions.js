import { SET_LIST_SETTING, RESET_LIST_SETTING, SET_USER_LIST_SETTING, SELECT_PAGE, SET_SIGN_IN_MODAL, SET_SIGN_UP_MODAL, SET_MODAL } from '../constants/UserSettingConstants'

export const setListSetting = (key, value) => {
    return {
        type: SET_LIST_SETTING,
        data: { key, value }
    }
}
export const setUserListSetting = (key, value) => {
    return {
        type: SET_USER_LIST_SETTING,
        data: { key, value }
    }
}

export const resetListSetting = () => {
    return {
        type: RESET_LIST_SETTING,
    }
}
export const selectPage = (value) => {
    return {
        type: SELECT_PAGE,
        data: value,
    }
}
export const setModal = (data) => {
    return {
        type: SET_MODAL,
        data
    }
}
