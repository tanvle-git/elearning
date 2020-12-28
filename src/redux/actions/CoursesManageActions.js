import axios from 'axios';
import { DOMAIN, TOKEN, USER_LOGIN } from '../../ultity/WebConfig';
import { LOAD_COURSE_LIST, LOAD_COURSE_CATEGORY, GET_COURSE_DETAIL, CREATE_COURSE, DELETE_COURSE, SELECT_COURSE_EDIT, EDIT_COURSE } from '../constants/CoursesManageConstants';
import swal from 'sweetalert';
import { setModal } from '../../redux/actions/UserSettingActions';

export const getCourseListAction = () => {
    // Thay vì return về object => middleware thunk cho phép mình return về 1 function có tham số là hàm dispatch
    return async dispatch => {
        const { data } = await axios({
            url: DOMAIN + '/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP12',
            method: 'GET'
        });
        //Sau khi lấy dữ liệu từ backend về sử dụng hàm dispatch đưa dữ liệu lên reducer
        const action = {
            type: LOAD_COURSE_LIST,
            courseList: data,
        };
        dispatch(action);
    }
    // return dispatch => axios({
    //     url: DOMAIN + '/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP12',
    //     method: 'GET'
    // })
    //     .then(res => {
    //         console.log(res);
    //         const action = {
    //             type: LOAD_COURSE_LIST,
    //             courseList: res.data,
    //         };
    //         dispatch(action);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
}


export const getCourseCategoryAction = () => {
    return async dispatch => {
        const { data } = await axios({
            url: DOMAIN + '/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc',
            method: 'GET'
        });
        const action = {
            type: LOAD_COURSE_CATEGORY,
            category: data,
        };
        dispatch(action);
    }
}

export const getCourseDetail = (id) => {
    //Thay vì return về object => middleware thunk cho phép mình return về 1 function có tham số là hàm dispatch
    return async dispatch => {
        const { data } = await axios({
            url: DOMAIN + `/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${id}`,
            method: 'GET'
        });
        //Sau khi lấy dữ liệu từ backend về sử dụng hàm dispatch đưa dữ liệu lên reducer
        const action = {
            type: GET_COURSE_DETAIL,
            courseDetail: data
        };
        dispatch(action);
    }
}

export const createCourseAction = (newCourseInfo) => {
    let bearer = 'Bearer ' + localStorage.getItem('accessToken');
    let { biDanh, danhGia, hinhAnh, maDanhMucKhoaHoc, luotXem, maKhoaHoc, moTa, tenKhoaHoc, maNhom, taiKhoanNguoiTao } = newCourseInfo;
    let data = {
        biDanh, danhGia, hinhAnh: hinhAnh.name, maDanhMucKhoaHoc, luotXem, maKhoaHoc, moTa, tenKhoaHoc, maNhom, taiKhoanNguoiTao
    }
    let today = new Date();
    let time = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    console.log('action', data);
    let frm = new FormData();
    frm.append('file', hinhAnh);
    frm.append('tenKhoaHoc', tenKhoaHoc);
    return dispatch => axios({
        url: DOMAIN + '/api/QuanLyKhoaHoc/ThemKhoaHoc',
        method: 'POST',
        headers: {
            Authorization: bearer
        },
        data: {
            biDanh,
            danhGia,
            hinhAnh: hinhAnh.name,
            maDanhMucKhoaHoc,
            luotXem,
            maKhoaHoc,
            moTa,
            tenKhoaHoc,
            maNhom,
            taiKhoanNguoiTao,
            ngayTao: time
        }
    }).then(res => {
        axios({
            url: DOMAIN + '/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc',
            method: 'POST',
            data: frm
        }).then(res1 => {
            swal({ text: 'Khóa học thêm thành công', icon: "success", button: false });
            dispatch(getCourseListAction());
            dispatch(setModal({ modal: 'newCourse', value: false }));

        }).catch(err => {
            console.log(err);
            swal({ text: err.response?.data, icon: "error", button: false });

        })
    }).catch(err => {
        console.log(err.response.data);
        swal({ text: err.response?.data, icon: "error", button: false });
    });
}

export const deleteCourseAction = (ID) => {
    let bearer = 'Bearer ' + localStorage.getItem('accessToken');
    return dispatch => swal({
        title: "Bạn muốn xóa khóa học " + ID,
        text: "Thao tác này sẽ không thể hoàn lại được!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                axios({
                    url: DOMAIN + '/api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=' + ID,
                    method: 'DELETE',
                    headers: {
                        Authorization: bearer
                    }
                }).then(res => {
                    console.log(res);
                    swal(res.data, {
                        icon: "success", button: false 
                    });
                    const action = {
                        type: DELETE_COURSE,
                    };
                    dispatch(getCourseListAction());
                    dispatch(action);
                })
                .catch(err => {
                    console.log(err);
                    swal({ text: err.response?.data, icon: "error", button: false });
                })
            }
        });
}

export const selectCourseEditAction = (course) => {
    console.log('action',course);
    return {
        type: SELECT_COURSE_EDIT,
        course,
    }
}

export const editCourseAction = (course) => {
    let bearer = 'Bearer ' + localStorage.getItem('accessToken');
    let { biDanh, danhGia, hinhAnh, maDanhMucKhoaHoc, luotXem, maKhoaHoc, moTa, tenKhoaHoc, maNhom, taiKhoanNguoiTao ,ngayTao} = course;
    let frm = new FormData();
    frm.append('file', hinhAnh);
    frm.append('tenKhoaHoc', tenKhoaHoc);
    return dispatch => axios({
        url: DOMAIN + '/api/QuanLyKhoaHoc/CapNhatKhoaHoc',
        method: 'PUT',
        headers: {
            Authorization: bearer
        },
        data: {
            biDanh,
            danhGia,
            hinhAnh: hinhAnh.name,
            maDanhMucKhoaHoc,
            luotXem,
            maKhoaHoc,
            moTa,
            tenKhoaHoc,
            maNhom,
            taiKhoanNguoiTao,
            ngayTao
        }
    }).then(res => {
        axios({
            url: DOMAIN + '/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc',
            method: 'POST',
            data: frm
        }).then(res1 => {
            swal({ text: 'Khóa học cập nhật thành công', icon: "success", button: false });
            dispatch(getCourseListAction());
            dispatch(setModal({ modal: 'editCourse', value: false }));

        }).catch(err => {
            console.log(err);
            swal({ text: err.response?.data, icon: "error", button: false });

        })
    }).catch(err => {
        console.log(err.response.data);
        swal({ text: err.response?.data, icon: "error", button: false });
    });
}