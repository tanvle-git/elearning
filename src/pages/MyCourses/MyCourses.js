import React, { Fragment, useEffect, useState } from 'react'
import './MyCourses.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import List from '../../components/List/List';
import { getUserInfoAction, signOutAction } from '../../redux/actions/UserAction'


export default function MyCourses() {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getUserInfoAction()) }, [])
    const myCourses = useSelector(state => state.CoursesReducer.joinedCourses);
    const allCourses = useSelector(state => state.CoursesReducer.courses);
    const filtered = []
    console.log(myCourses);

    for (const i in allCourses) {
        // console.log(allCourses[i].maKhoaHoc);
        for (const course of myCourses) {
            console.log(myCourses);
            if (allCourses[i].maKhoaHoc === course) {
                filtered.push(allCourses[i]);
            }
        }
    }

    // for (let course of myCourses) {
    //     console.log(course);
    // }

    console.log(filtered);

    return (
        <div className="container" style={{ paddingTop: '60px' }}>
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="title">Tất cả khóa học</h1>
                <span>{myCourses.length} kết quả</span>
            </div>
            <div style={{ padding: '30px 0', backgroundColor: 'white', borderRadius: 20 }}>
                <List type="CourseList" list={filtered} itemperpage={5} />
            </div>
        </div>
    )
}
