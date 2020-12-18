import axios from 'axios';
import { DOMAIN, TOKEN, USER_LOGIN } from '../../ultity/WebConfig';
import { SIGN_IN, SIGN_UP, GET_USER_INFO } from '../constants/UserConstants';
import { connect, useSelector, useDispatch } from 'react-redux';

export const signUpAction = (userSignUp) => {
    return async wait => {
        try {
            let { data, status } = await axios({
                url: DOMAIN + '/api/QuanLyNguoiDung/DangKy',
                method: 'post',
                data: {
                    taiKhoan: userSignUp.username,
                    matKhau: userSignUp.password,
                    hoTen: userSignUp.fullName,
                    soDT: userSignUp.phoneNumber,
                    maNhom: 'GP12',
                    email: userSignUp.email
                }
            });
            if (status === 200) {
                const userLogin = {
                    username: data.taiKhoan,
                    password: data.matKhau
                };
                console.log('thành công đăng KÝ');
            }
        } catch (err) {
            console.log(err.response.data);
        }
    }
}
export const signInAction = (userLogin) => {
    return async dispatch => {
        console.log('aaa');
        try {
            let { data, status } = await axios({
                url: DOMAIN + '/api/QuanLyNguoiDung/DangNhap',
                method: 'post',
                data: {
                    taiKhoan: userLogin.username,
                    matKhau: userLogin.password
                }
            });
            console.log('data', data)
            if (status === 200) {
                //Sau khi gọi api => dispatch lên redux 
                dispatch({
                    type: SIGN_IN,
                    userLogin: data
                });
                //Lưu vào localstorage
                localStorage.setItem(USER_LOGIN, JSON.stringify(data));

                localStorage.setItem(TOKEN, data.accessToken);
                console.log('thành công đăng nhập');
            }
        } catch (err) {
            console.log(err.response.data);
        }
    }
}

export const getUserInfo = () => {
    let bearer = 'Bearer ' + JSON.parse(localStorage.getItem('accessToken'));
    axios({
        url: DOMAIN + 'api/QuanLyNguoiDung/ThongTinTaiKhoan',
        method: 'post',
        header: {
            Authorization: bearer
        },
        data: {
            taiKhoan: 'testing001',
        }
    });
    //Sau khi lấy dữ liệu từ backend về sử dụng hàm dispatch đưa dữ liệu lên reducer
    // console.log(data, status);
}