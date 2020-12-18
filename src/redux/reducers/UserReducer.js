import { USER_LOGIN } from "../../ultity/WebConfig";
import {SIGN_IN, SIGN_UP} from '../constants/UserConstants';

let userLocal = {};
if(localStorage.getItem(USER_LOGIN)) {
    userLocal = JSON.parse(localStorage.getItem(USER_LOGIN));
}
//Nếu local storage có tồn tại userLogin => Chứng tỏ người dùng đã đăng nhập => gán làm giá trị mặc định của redux khi trang vừa load lên

const initialState = {
    userLogin : userLocal
}

export default (state = initialState, action) => {
    switch (action.type) {
    case SIGN_IN:{
        state.userLogin = action.userLogin;
        return {...state};
    }
    default:
        return state
    }
}
