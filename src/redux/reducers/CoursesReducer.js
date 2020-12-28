import { LOAD_COURSE_LIST, LOAD_COURSE_CATEGORY, GET_COURSE_DETAIL, SELECT_COURSE_EDIT } from '../constants/CoursesManageConstants';
import { GET_USER_INFO, JOIN_COURSE, CANCEL_COURSE, SIGN_OUT } from '../constants/UserConstants';

const stateCourse = {
  courses: [], // courses default value
  category: [],
  courseDetail: {
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
  },
  joinedCourses: [],
  courseEditing: {}
}

const CoursesReducer = (state = stateCourse, action) => {
  switch (action.type) {
    case LOAD_COURSE_LIST: {
      state.courses = action.courseList;
      return { ...state }
    }
    case LOAD_COURSE_CATEGORY: {
      state.category = action.category;
      return { ...state }
    }
    case GET_USER_INFO: {
      const array = [];
      for (let i = 0; i < action.userInfo.chiTietKhoaHocGhiDanh.length; i++) {
        const item = action.userInfo.chiTietKhoaHocGhiDanh[i].maKhoaHoc;
        array.push(item)
      }
      state.joinedCourses = [...array];
      return { ...state }
    }
    case GET_COURSE_DETAIL: {
      state.courseDetail = action.courseDetail;
      return { ...state }
    }
    case JOIN_COURSE: {
      state.joinedCourses = [...state.joinedCourses, action.course];
      return { ...state }
    }
    case CANCEL_COURSE: {
      const index = state.joinedCourses.findIndex(x => x === action.course);
      state.joinedCourses.splice(index, 1);
      return { ...state }
    }
    case SIGN_OUT: {
      state.joinedCourses = [];
      return { ...state };
    }
    case SELECT_COURSE_EDIT:{
      state.courseEditing=action.course
    }
    default: return { ...state };
  }

}

export default CoursesReducer;