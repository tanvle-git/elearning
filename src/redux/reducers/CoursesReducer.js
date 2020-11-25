import {LOAD_COURSE_LIST} from '../constants/CoursesManageConstants';

const stateCourse = {
    courses:[] // courses default value
}

 const CoursesReducer = ( state = stateCourse, action) => {
    switch (action.type){
        case LOAD_COURSE_LIST:{
            state.courses=action.courseList;
            return {...state}
        }
        default: return {...state};
    }
    
}

export default CoursesReducer;