import { SET_LIST_SETTING,SET_USER_LIST_SETTING, RESET_LIST_SETTING, SELECT_PAGE, SET_SIGN_IN_MODAL, SET_SIGN_UP_MODAL, SET_MODAL } from '../constants/UserSettingConstants'
import {SIGN_IN, SIGN_UP, GET_USER_INFO, SIGN_OUT,CHANGE_USER_INFO, JOIN_COURSE, CHANGE_PASSWORD} from '../constants/UserConstants';
import { LOAD_COURSE_LIST, LOAD_COURSE_CATEGORY, GET_COURSE_DETAIL, CREATE_COURSE,DELETE_COURSE } from '../constants/CoursesManageConstants';

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
    currentPage:0,
    modal:{
        signIn:false,
        signUp:false,
        newCourse:false,
        editCourse:false,
        newUser:false,
        editUser:false,
    },
}

const UserSettingReducer = (state = stateSetting, action) => {
    switch (action.type) {
        case SET_LIST_SETTING: {
            // state.listSetting = Object.assign(state.listSetting, action.setting);
            state.listSetting[action.data.key] = action.data.value
            // console.log(state);
            return { ...state}
        }
        case SET_USER_LIST_SETTING: {
            state.userListSetting[action.data.key] = action.data.value
            // console.log(state.userListSetting);
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
        case SET_MODAL:{
            console.log('đã lên reducer', {...state.modal, [action.data.modal]:action.data.value});

            state.modal = {...state.modal, [action.data.modal]:action.data.value};
            return { ...state }
        }
        case SIGN_IN:{
            state.modal = {
                signIn:false,
                signUp:false,
                newCourse:false,
                editCourse:false,
            };
            return { ...state }
        }
        case SIGN_UP:{
            state.modal = {
                signIn:true,
                signUp:false,
                newCourse:false,
                editCourse:false,
            };
            return { ...state }
        }
        default: return { ...state };
    }
}

export default UserSettingReducer;