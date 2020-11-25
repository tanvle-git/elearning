import React, { useEffect, useState } from 'react';
import Carousel from '../../components/Carousel/Carousel'
import Header from '../../components/Header/Header'
import TopCourses from '../../components/TopCourses/TopCourses'
import WhyUs from '../../components/WhyUs/WhyUs'
import './Home.scss'
import {connect,useSelector,useDispatch} from 'react-redux';
import {getCourseListAction} from '../../redux/actions/CoursesManageActions';

export default function Home(props) {
    const dispatch = useDispatch();
    useEffect(() => {dispatch(getCourseListAction())}, [])

    const courseList = useSelector(state => state.CoursesReducer.courses);
    console.log(courseList);
    return (
        <div>
            <Header/>
            <Carousel/>
            <WhyUs/>
            <TopCourses courseList={courseList} />
            <TopCourses courseList={courseList} />
        </div>
    )
}
