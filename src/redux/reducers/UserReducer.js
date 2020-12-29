
import { SIGN_IN, GET_USER_INFO, SIGN_OUT, CHANGE_USER_INFO, CHANGE_PASSWORD, GET_USER_LIST, GET_USER_TYPE, SELECT_USER_EDIT, GET_COURSE_USERS_DETAIL } from '../constants/UserConstants';
import { TOKEN, USER_LOGIN } from '../../ultity/WebConfig';

let userLocal = {};
if (localStorage.getItem(USER_LOGIN)) {
    userLocal = JSON.parse(localStorage.getItem(USER_LOGIN));
}
//Nếu local storage có tồn tại userLogin => Chứng tỏ người dùng đã đăng nhập => gán làm giá trị mặc định của redux khi trang vừa load lên

const initialState = {
    searchKey:'',
    userInfo: userLocal,
    userList: [],
    userType: [],
    userEditing: {},
    courseUsersDetail:{
        haveNotJoined:[],
        haveJoined:[],
        pendingCourses:[]
      }
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN: {
            state.userInfo = { ...action.userLogin, matKhau: action.password };
            localStorage.setItem(USER_LOGIN, JSON.stringify({ ...state.userInfo }));
            localStorage.setItem(TOKEN, action.userLogin.accessToken);
            return { ...state };
        }
        case GET_USER_INFO: {
            let { chiTietKhoaHocGhiDanh, email, hoTen, maLoaiNguoiDung, soDT, taiKhoan } = action.userInfo;
            state.userInfo = { ...state.userInfo, chiTietKhoaHocGhiDanh, email, hoTen, maLoaiNguoiDung, soDT, taiKhoan }
            return { ...state };
        }
        case SIGN_OUT: {
            state.userInfo = {};
            localStorage.clear();
            return { ...state };
        }
        case CHANGE_USER_INFO: {
            let { taiKhoan, hoTen, email, soDT } = action.userInfo;
            state.userInfo = { ...state.userInfo, taiKhoan, hoTen, email, soDT };
            return { ...state };
        }
        case CHANGE_PASSWORD: {
            let matKhau = action.matKhau
            state.userInfo = { ...state.userInfo, matKhau };
            localStorage.setItem(USER_LOGIN, JSON.stringify({ ...state.userInfo }));
            return { ...state };
        }
        case GET_USER_LIST: {
            state.userList = action.userList;
            state.searchKey=action.key;
            return { ...state };
        }
        case GET_USER_TYPE: {
            state.userType = action.userType;
            return { ...state };
        }
        case SELECT_USER_EDIT: {
            state.userEditing = action.user
            return {...state};
        }
        case GET_COURSE_USERS_DETAIL: {
            state.courseUsersDetail.haveNotJoined=action.haveNotJoined;
            state.courseUsersDetail.haveJoined=action.haveJoined;
            state.courseUsersDetail.pendingCourses=action.pendingCourses;
            return { ...state };
        }
        default:
            return state
    }
}

export default UserReducer;