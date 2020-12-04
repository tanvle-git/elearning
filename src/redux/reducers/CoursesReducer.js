import {LOAD_COURSE_LIST, LOAD_COURSE_CATEGORY, GET_COURSE_DETAIL} from '../constants/CoursesManageConstants';

const stateCourse = {
    courses:[], // courses default value
    category: [],
    courseDetail:{
        maKhoaHoc: '',
        biDanh: '',
        tenKhoaHoc: '',
        moTa: '',
        luotXem: 0,
        hinhAnh: '',
        maNhom: '',
        ngayTao: '',
        soLuongHocVien: 0,
        nguoiTao: {
          taiKhoan: '',
          hoTen: '',
          maLoaiNguoiDung: '',
          tenLoaiNguoiDung: ''
        },
        danhMucKhoaHoc: {
          maDanhMucKhoahoc: '',
          tenDanhMucKhoaHoc: ''
        }
      }
}

 const CoursesReducer = ( state = stateCourse, action) => {
    switch (action.type){
        case LOAD_COURSE_LIST:{
            state.courses=action.courseList;
            return {...state}
        }
        case LOAD_COURSE_CATEGORY:{
            state.category=action.category;
            // console.log(state.category);
            return {...state}
        }
        case GET_COURSE_DETAIL:{
            state.courseDetail = action.courseDetail;
            return {...state}
        }
        default: return {...state};
    }
    
}

export default CoursesReducer;