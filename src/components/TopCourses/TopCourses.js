import React from 'react'
import SlickSliders from '../SlickSilder/SlickSlider';
import './TopCourses.scss'
import { useSelector } from 'react-redux';

export default function TopCourses() {

    const courseList = useSelector(state => state.CoursesReducer.courses);

    return (
        <div className="TopCourses">
            <div className="container">
                <h1 className="title" style={{ marginLeft: 23 }}>Khóa học nổi bật</h1>
                <SlickSliders courseList={courseList} type={'ALL'} />
            </div>
        </div>
    )
}
