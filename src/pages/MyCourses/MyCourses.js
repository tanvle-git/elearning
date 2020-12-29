import React from 'react'
import './MyCourses.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  useSelector } from 'react-redux';
import List from '../../components/List/List';


export default function MyCourses() {
    window.scrollTo(0,0);
    const myCourses = useSelector(state => state.CoursesReducer.joinedCourses);
    const allCourses = useSelector(state => state.CoursesReducer.courses);
    const filter = []

    for (const i in allCourses) {
        for (const course of myCourses) {
            if (allCourses[i].maKhoaHoc === course.maKhoaHoc) {
                filter.push(allCourses[i]);
            }
        }
    }
    return (
        <div className="container" style={{ paddingTop: '60px' }}>
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="title">Khóa học của tôi</h1>
                <span>{myCourses.length} kết quả</span>
            </div>
            <div style={{ padding: '30px 0', backgroundColor: 'white', borderRadius: 20 }}>
                <List type="CourseList" list={filter} itemperpage={5} />
            </div>
        </div>
    )
}
