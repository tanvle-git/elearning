import { SET_LIST_SETTING, SET_USER_LIST_SETTING, RESET_LIST_SETTING, SELECT_PAGE, SET_MODAL } from '../constants/UserSettingConstants'
import { SIGN_IN, SIGN_UP } from '../constants/UserConstants';

const stateSetting = {
    listSetting: {
        category: "all",
        sort: "AZ",
        itemperpage: "5"
    },
    userListSetting: {
        type: "all",
        sort: "AZ",
        itemperpage: "10"
    },
    currentPage: 0,
    modal: {
        signIn: false,
        signUp: false,
        newCourse: false,
        editCourse: false,
        newUser: false,
        editUser: false,
        filter:false,
    },
}

const UserSettingReducer = (state = stateSetting, action) => {
    switch (action.type) {
        case SET_LIST_SETTING: {
            state.listSetting[action.data.key] = action.data.value
            return { ...state }
        }
        case SET_USER_LIST_SETTING: {
            state.userListSetting[action.data.key] = action.data.value
            return { ...state }
        }
        case RESET_LIST_SETTING: {
            state.listSetting = {
                category: "all",
                sort: "AZ",
                itemperpage: "5"
            };
            state.userListSetting= {
                type: "all",
                sort: "AZ",
                itemperpage: "10"
            };
            return { ...state }
        }
        case SELECT_PAGE: {
            state.currentPage = action.data;
            return { ...state }
        }
        case SET_MODAL: {
            state.modal = { ...state.modal, [action.data.modal]: action.data.value };
            return { ...state }
        }
        case SIGN_IN: {
            state.modal = {
                signIn: false,
                signUp: false,
                newCourse: false,
                editCourse: false,
                newUser: false,
                editUser: false,
                filter:false,
            };
            return { ...state }
        }
        case SIGN_UP: {
            state.modal = {
                signIn: false,
                signUp: false,
                newCourse: false,
                editCourse: false,
                newUser: false,
                editUser: false,
                filter:false,
            };
            return { ...state }
        }
        default: return { ...state };
    }
}

export default UserSettingReducer;