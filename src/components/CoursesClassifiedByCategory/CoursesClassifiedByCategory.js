import React, { Fragment, useEffect } from 'react'
import SlickSliders from '../SlickSilder/SlickSlider';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { getCourseCategoryAction } from '../../redux/actions/CoursesManageActions';
import './CoursesClassifiedByCategory.scss'
import { NavLink } from 'react-router-dom';

export default function CoursesClassifiedByCategory() {

    const dispatch = useDispatch();
    useEffect(() => { dispatch(getCourseCategoryAction()) }, [dispatch])
    const category = useSelector(state => state.CoursesReducer.category);
    const courseList = useSelector(state => state.CoursesReducer.courses);

    const tabRender = () => {
        return <Tabs defaultActiveKey="0">
            {category.map((item, index) => {
                return <Tab eventKey={index} key={index} title={item.tenDanhMuc}>
                    <SlickSliders courseList={courseList} type={item.maDanhMuc} />
                </Tab>
            })}
        </Tabs>
    }
    return (
        <Fragment>
            <div className="coursesClassifiedByCategory">
                <div className="container">
                    <h1 className="title" style={{ marginLeft: 23 }}>Khóa học theo danh mục</h1>
                    {tabRender()}
                </div>
            </div>
            <div style={{ 'display': 'flex', 'justifyContent': 'space-around', 'marginTop': '30px' }} >
                <NavLink to={'/all-course'}>
                    <button className="redSolidBtn bigBtn">Xem toàn bộ {courseList.length}+ khóa học của chúng tôi!</button>
                </NavLink>
            </div>
        </Fragment>
    )
}
