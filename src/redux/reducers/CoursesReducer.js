import { LOAD_COURSE_LIST, LOAD_COURSE_CATEGORY, GET_COURSE_DETAIL, SELECT_COURSE_EDIT, GET_USER_COURSES_DETAIL } from '../constants/CoursesManageConstants';
import { GET_USER_INFO, SIGN_OUT } from '../constants/UserConstants';

const stateCourse = {
  searchKey:'',
  courses: [],
  category: [],
  courseDetail: {},
  joinedCourses: [],
  courseEditing: {},
  userCoursesDetail: {
    haveNotJoined: [],
    haveJoined: [],
    pendingCourses: []
  }
}

const CoursesReducer = (state = stateCourse, action) => {
  switch (action.type) {
    // case LOAD_COURSE_LIST: {
    //   state.courses = action.courseList;
    //   return { ...state }
    // }
    case LOAD_COURSE_LIST: {
      state.searchKey=action.key;
      state.courses=action.courseList;
      return { ...state }
    }
    case LOAD_COURSE_CATEGORY: {
      state.category = action.category;
      return { ...state }
    }
    case GET_USER_INFO: {
      state.joinedCourses = action.userInfo.chiTietKhoaHocGhiDanh;
      return { ...state }
    }
    case GET_COURSE_DETAIL: {
      state.courseDetail = action.courseDetail;
      return { ...state }
    }
    case SIGN_OUT: {
      state.joinedCourses = [];
      return { ...state };
    }
    case SELECT_COURSE_EDIT: {
      state.courseEditing = action.course;
      return { ...state };
    }
    case GET_USER_COURSES_DETAIL: {
      state.userCoursesDetail.haveNotJoined = action.haveNotJoined;
      state.userCoursesDetail.haveJoined = action.haveJoined;
      state.userCoursesDetail.pendingCourses = action.pendingCourses;
      return { ...state };
    }
    default: return { ...state };
  }

}

export default CoursesReducer;