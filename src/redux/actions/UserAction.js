import axios from 'axios';
import { DOMAIN, TOKEN, USER_LOGIN } from '../../ultity/WebConfig';
import { SIGN_IN, SIGN_UP, GET_USER_INFO, SIGN_OUT, CHANGE_USER_INFO, CHANGE_PASSWORD, JOIN_COURSE, CANCEL_COURSE, GET_USER_LIST, GET_USER_TYPE,SELECT_USER_EDIT } from '../constants/UserConstants';
import swal from 'sweetalert';
import { setModal } from '../../redux/actions/UserSettingActions';

export const signUpAction = (userSignUp) => {
    return async dispatch => {
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
                swal({ text: "Đăng ký thành công", icon: "success", button: false });
                dispatch({
                    type: SIGN_UP
                });
            }
        } catch (err) {
            swal({ text: err.response.data, icon: "error", button: false });
        }
    }
}

export const signInAction = (userLogin) => {
    return async dispatch => {
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
                    userLogin: data,
                    password: userLogin.password
                });
            }
        } catch (err) {
            swal({ text: err.response.data, icon: "warning", button: false });
        }
    }
}

export const getUserInfoAction = () => {
    let bearer = 'Bearer ' + localStorage.getItem('accessToken');
    // console.log(bearer);
    let username = JSON.parse(localStorage.getItem('userLogin'));
    // console.log(username);
    return dispatch => axios({
        url: DOMAIN + '/api/QuanLyNguoiDung/ThongTinTaiKhoan',
        method: 'post',
        headers: {
            Authorization: bearer
        },
        data: {
            taiKhoan: username.taiKhoan,
        }
    }).then(res => {
        if (res.status === 200) {
            console.log(res.data.chiTietKhoaHocGhiDanh);
            dispatch({
                type: GET_USER_INFO,
                userInfo: res.data
            });
        } else {
            console.log(res.status, ' ', res.statusText);
        }
    }).catch(err => {
        console.log(err);
    })
        ;
}

export const signOutAction = () => {
    return dispatch => {
        const action = {
            type: SIGN_OUT,
        };
        dispatch(action);
    }
}

export const changeUserInfo = (userInfo) => {
    let bearer = 'Bearer ' + localStorage.getItem('accessToken');
    return async dispatch => {
        try {
            let { data, status } = await axios({
                url: DOMAIN + '/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
                method: 'PUT',
                headers: {
                    Authorization: bearer
                },
                data: {
                    taiKhoan: userInfo.username,
                    hoTen: userInfo.fullName,
                    email: userInfo.email,
                    soDT: userInfo.phoneNumber,
                    maLoaiNguoiDung: "HV",
                    matKhau: userInfo.password,
                    maNhom: "GP12"
                }
            });
            if (status === 200) {
                let { taiKhoan, hoTen, email, soDt } = data;
                let soDT = soDt;
                dispatch({
                    type: CHANGE_USER_INFO,
                    userInfo: { taiKhoan, hoTen, email, soDT }
                });
                //Lưu vào localstorage
                let currentLocalUserLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
                currentLocalUserLogin = { ...currentLocalUserLogin, taiKhoan, hoTen, email, soDT }
                console.log('current', currentLocalUserLogin);
                localStorage.setItem(USER_LOGIN, JSON.stringify(currentLocalUserLogin));
                swal({ text: "Cập nhật thành công", icon: "success", button: false });
            }
        } catch (err) {
            console.log(err.response);
            swal({ text: err.response.data, icon: "warning", button: false });
        }
    }
}

export const changePasswordAction = (userInfo) => {
    let bearer = 'Bearer ' + localStorage.getItem('accessToken');
    return async dispatch => {
        try {
            let { data, status } = await axios({
                url: DOMAIN + '/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
                method: 'PUT',
                headers: {
                    Authorization: bearer
                },
                data: {
                    soDT: userInfo.phoneNumber,
                    hoTen: userInfo.fullName,
                    email: userInfo.email,
                    taiKhoan: userInfo.username,
                    matKhau: userInfo.newPassword,
                    maLoaiNguoiDung: "HV",
                    maNhom: "GP12"
                }
            });
            if (status === 200) {
                console.log(userInfo);
                swal({ text: "Cập nhật thành công", icon: "success", button: false });
                dispatch({
                    type: CHANGE_PASSWORD,
                    matKhau: userInfo.newPassword
                });
            }
        } catch (err) {
            console.log(err.response);
            swal({ text: err.response.data, icon: "warning", button: false });
        }
    }
}

export const joinCourseAction = (courseID, username) => {
    let bearer = 'Bearer ' + localStorage.getItem('accessToken');
    return async dispatch => {
        try {
            let { data, status } = await axios({
                url: DOMAIN + '/api/QuanLyKhoaHoc/DangKyKhoaHoc',
                method: 'post',
                headers: {
                    Authorization: bearer
                },
                data: {
                    taiKhoan: username,
                    maKhoaHoc: courseID
                }
            });
            console.log('data', data)
            if (status === 200) {
                swal({ text: data, icon: "success", button: false });
                dispatch({
                    type: JOIN_COURSE,
                    course: courseID
                })
            }
        } catch (err) {
            swal({ text: err.response?.data, icon: "warning", button: false });
        }
    }
}

export const cancelCourseAction = (courseID, username) => {
    let bearer = 'Bearer ' + localStorage.getItem('accessToken');
    return async dispatch => {
        try {
            let { data, status } = await axios({
                url: DOMAIN + '/api/QuanLyKhoaHoc/HuyGhiDanh',
                method: 'post',
                headers: {
                    Authorization: bearer
                },
                data: {
                    taiKhoan: username,
                    maKhoaHoc: courseID
                }
            });
            console.log('data', data)
            if (status === 200) {
                swal({ text: data, icon: "success", button: false });
                dispatch({
                    type: CANCEL_COURSE,
                    course: courseID
                })
            }
        } catch (err) {
            swal({ text: err.response?.data, icon: "warning", button: false });
        }
    }
}

export const getUserList = () => {
    return async dispatch => {
        try {
            let { data, status } = await axios({
                url: DOMAIN + '/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP12',
                method: 'GET',
            });
            console.log(data);
            if (status === 200) {
                dispatch({
                    type: GET_USER_LIST,
                    userList: data
                })
            }
        } catch (err) {
            swal({ text: err.response?.data, icon: "warning", button: false });
        }
    }
}

export const getUserType = () => {
    return async dispatch => {
        try {
            let { data, status } = await axios({
                url: DOMAIN + '/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung',
                method: 'GET',
            });
            console.log(data);
            if (status === 200) {
                dispatch({
                    type: GET_USER_TYPE,
                    userType: data
                })
            }
        } catch (err) {
            swal({ text: err.response?.data, icon: "warning", button: false });
        }
    }
}

export const createUserAction = (newUserInfo) => {
    let bearer = 'Bearer ' + localStorage.getItem('accessToken');
    let { taiKhoan, matKhau, hoTen, soDT, maLoaiNguoiDung, email } = newUserInfo
    return async dispatch => {
        try {
            let { data, status } = await axios({
                url: DOMAIN + '/api/QuanLyNguoiDung/ThemNguoiDung',
                method: 'POST',
                headers: {
                    Authorization: bearer
                },
                data: {
                    taiKhoan, matKhau, hoTen, soDT, maLoaiNguoiDung, email,
                    maNhom: 'GP12'
                }
            });
            if (status === 200) {

                swal({ text: 'Thành công', icon: "success", button: false });
                dispatch(getUserList());
                dispatch(setModal({ modal: 'newUser', value: false }));
            }
        } catch (err) {
            swal({ text: err.response?.data, icon: "warning", button: false });
        }
    }

}

export const deleteUserAction = (taiKhoan) => {
    let bearer = 'Bearer ' + localStorage.getItem('accessToken');
    return dispatch => swal({
        title: "Bạn muốn xóa tài khoản " + taiKhoan,
        text: "Thao tác này sẽ không thể hoàn lại được!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                axios({
                    url: DOMAIN + '/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=' + taiKhoan,
                    method: 'DELETE',
                    headers: {
                        Authorization: bearer
                    }
                }).then(res => {
                    console.log(res);
                    swal(res.data, {
                        icon: "success", button: false 
                    });
                    dispatch(getUserList());
                })
                .catch(err => {
                    console.log(err);
                    swal({ text: err.response?.data, icon: "error", button: false });
                })
            }
        });
}

export const selectUserEditAction = (user) => {
    console.log('action',user);
    return {
        type: SELECT_USER_EDIT,
        user,
    }
}

export const editUserAction = (newUserInfo) => {
    let bearer = 'Bearer ' + localStorage.getItem('accessToken');
    let { taiKhoan, matKhau, hoTen, soDT, maLoaiNguoiDung, email } = newUserInfo
    return async dispatch => {
        try {
            let { data, status } = await axios({
                url: DOMAIN + '/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
                method: 'PUT',
                headers: {
                    Authorization: bearer
                },
                data: {
                    taiKhoan, matKhau, hoTen, soDT, maLoaiNguoiDung, email,
                    maNhom: 'GP12'
                }
            });
            if (status === 200) {

                swal({ text: 'Thành công', icon: "success", button: false });
                dispatch(getUserList());
                dispatch(setModal({ modal: 'editUser', value: false }));
            }
        } catch (err) {
            swal({ text: err.response?.data, icon: "warning", button: false });
        }
    }

}