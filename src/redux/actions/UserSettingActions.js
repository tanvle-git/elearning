import { SET_LIST_SETTING, RESET_LIST_SETTING, SELECT_PAGE } from '../constants/UserSettingConstants'

export const setListSetting = (key, value) => {
    return dispatch => {
        const action = {
            type: SET_LIST_SETTING,
            data: {key, value}
        };
        console.log(action);
        dispatch(action);
    }
}

export const resetListSetting = () => {
    return dispatch => {
        const action = {
            type: RESET_LIST_SETTING,
        };
        dispatch(action);
    }
}
export const selectPage = (value) => {
    return dispatch => {
        const action = {
            type: SELECT_PAGE,
            data: value,
        };
        dispatch(action);
    }
}