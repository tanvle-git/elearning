import React, { useEffect, useState } from 'react'
import SlickSliders from '../SlickSilder/SlickSlider';
import './TopCourses.scss'
import { connect, useSelector, useDispatch } from 'react-redux';
import { getCourseListAction} from '../../redux/actions/CoursesManageActions';

export default function TopCourses(props) {

    const dispatch = useDispatch();
    useEffect(() => { dispatch(getCourseListAction()) }, [])
    const courseList = useSelector(state => state.CoursesReducer.courses);
    // courseList.length=10;

    return (
        <div className="TopCourses">
            <div className="container">
                <h1 className="title" style={{ marginLeft: 23 }}>Khóa học nổi bật</h1>
                <SlickSliders courseList={courseList} type={'ALL'} />
            </div>
        </div>
    )
}
