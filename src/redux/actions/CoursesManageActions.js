import axios from 'axios';
import { DOMAIN, TOKEN, USER_LOGIN } from '../../ultity/WebConfig';
import {LOAD_COURSE_LIST,LOAD_COURSE_CATEGORY,GET_COURSE_DETAIL} from '../constants/CoursesManageConstants';


export const getCourseListAction = () => {
    //Thay vì return về object => middleware thunk cho phép mình return về 1 function có tham số là hàm dispatch
    return async dispatch => {
       const {data} = await  axios({
            url: DOMAIN + '/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP12',
            method: 'GET'
        });
        //Sau khi lấy dữ liệu từ backend về sử dụng hàm dispatch đưa dữ liệu lên reducer
        const action = {
            type:LOAD_COURSE_LIST,
            courseList:data,
        };
        dispatch(action);
    }
}


export const getCourseCategoryAction = () => {
    return async dispatch => {
       const {data} = await  axios({
            url: DOMAIN + '/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc',
            method: 'GET'
        });
        const action = {
            type:LOAD_COURSE_CATEGORY,
            category:data,
        };
        dispatch(action);
    }
}

export const getCourseDetail = (id) => {
    //Thay vì return về object => middleware thunk cho phép mình return về 1 function có tham số là hàm dispatch
    return async dispatch => {
       const {data} = await  axios({
            url: DOMAIN + `/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${id}`,
            method: 'GET'
        });
        //Sau khi lấy dữ liệu từ backend về sử dụng hàm dispatch đưa dữ liệu lên reducer
        const action = {
            type:GET_COURSE_DETAIL,
            courseDetail:data
        };
        dispatch(action);
    }
}