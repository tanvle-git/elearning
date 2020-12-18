import { SET_LIST_SETTING, RESET_LIST_SETTING, SELECT_PAGE } from '../constants/UserSettingConstants'

const stateSetting = {
    listSetting: {
        category: "all",
        sort: "AZ",
        itemperpage: "5"
    },
    currentPage:0,
}

const UserSettingReducer = (state = stateSetting, action) => {
    switch (action.type) {
        case SET_LIST_SETTING: {
            // state.listSetting = Object.assign(state.listSetting, action.setting);
            state.listSetting[action.data.key] = action.data.value
            console.log(state);
            return { ...state}
        }
        case RESET_LIST_SETTING: {
            state.listSetting = {
                category: "all",
                sort: "AZ",
                itemperpage: "5"
            };
            return { ...state }
        }
        case SELECT_PAGE: {
            state.currentPage = action.data;
            return { ...state }
        }
        default: return { ...state };
    }
}

export default UserSettingReducer;