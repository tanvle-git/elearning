import axios from 'axios';
import { DOMAIN } from '../../ultity/WebConfig';
import { LOAD_COURSE_CATEGORY, GET_COURSE_DETAIL, DELETE_COURSE, SELECT_COURSE_EDIT, GET_USER_COURSES_DETAIL, LOAD_COURSE_LIST } from '../constants/CoursesManageConstants';
import swal from 'sweetalert';
import { setModal } from '../../redux/actions/UserSettingActions';

export const getCourseListAction = (key) => {
    return async dispatch => axios({
        url: DOMAIN + '/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP12&tenKhoaHoc=' + key,
        method: 'GET'
    }).then(res => {
        if (res.status === 200) {
            dispatch({
                type: LOAD_COURSE_LIST,
                courseList: res.data,
                key,
            });
        }
    }).catch(err =>{
        swal({ text: err.response?.data, icon: "error", button: false });
        console.log(err.response.data);
    })
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
    return async dispatch => {
        const { data } = await axios({
            url: DOMAIN + `/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${id}`,
            method: 'GET'
        });
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
    let today = new Date();
    let time = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
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
            dispatch(getCourseListAction(''));
            dispatch(setModal({ modal: 'newCourse', value: false }));

        }).catch(err => {
            swal({ text: err.response?.data, icon: "error", button: false });

        })
    }).catch(err => {
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
                    swal(res.data, {
                        icon: "success", button: false
                    });
                    const action = {
                        type: DELETE_COURSE,
                    };
                    dispatch(getCourseListAction(''));
                    dispatch(action);
                })
                    .catch(err => {
                        swal({ text: err.response?.data, icon: "error", button: false });
                    })
            }
        });
}

export const selectCourseEditAction = (course) => {
    return {
        type: SELECT_COURSE_EDIT,
        course,
    }
}

export const editCourseAction = (course) => {
    let bearer = 'Bearer ' + localStorage.getItem('accessToken');
    let { biDanh, danhGia, hinhAnh, maDanhMucKhoaHoc, luotXem, maKhoaHoc, moTa, tenKhoaHoc, maNhom, taiKhoanNguoiTao, ngayTao } = course;
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
            dispatch(getCourseListAction(''));
            dispatch(setModal({ modal: 'editCourse', value: false }));

        }).catch(err => {
            swal({ text: err.response?.data, icon: "error", button: false });

        })
    }).catch(err => {
        swal({ text: err.response?.data, icon: "error", button: false });
    });
}

export const getUserCoursesDetailAction = (taiKhoan) => {
    let bearer = 'Bearer ' + localStorage.getItem('accessToken');
    return dispatch => axios({
        url: DOMAIN + '/api/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=' + taiKhoan,
        method: 'POST',
        headers: {
            Authorization: bearer
        },
    }).then(res => {
        const haveNotJoined = res.data;
        axios({
            url: DOMAIN + '/api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet',
            method: 'POST',
            headers: {
                Authorization: bearer
            },
            data: {
                taiKhoan: taiKhoan,
            }
        }).then(res1 => {
            const pendingCourses = res1.data;
            axios({
                url: DOMAIN + '/api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet',
                method: 'POST',
                headers: {
                    Authorization: bearer
                },
                data: {
                    taiKhoan: taiKhoan,
                }
            }).then(res2 => {
                const haveJoined = res2.data;
                dispatch({
                    type: GET_USER_COURSES_DETAIL,
                    haveNotJoined, pendingCourses, haveJoined
                })
            }).catch(err => {
                swal({ text: err.response?.data, icon: "error", button: false });
            });
        }).catch(err => {
            swal({ text: err.response?.data, icon: "error", button: false });
        });
    }).catch(err => {
        swal({ text: err.response?.data, icon: "error", button: false });
    });
}
