import React from 'react'
import Slider from "react-slick";
import { NavLink } from 'react-router-dom';
import { connect, useSelector, useDispatch } from 'react-redux';
import './SlickSlider.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getCourseDetail } from '../../redux/actions/CoursesManageActions';

export default function SlickSliders(props) {
    const dispatch = useDispatch();
    const scrollToTop=(id)=>{
        window.scrollTo(0, 0);
        dispatch(getCourseDetail(id));
    }
    const settings={
        className: "slider variable-width",
        dots: false,
        rows: 1,
        infinite: true,
        speed: 500,
        // lazyLoad:'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        variableWidth: true,
        arrows: false,
        cssEase: "linear",
        draggable: false,
        swipeToSlide:true,
        // touchMove:false,
    }
    const coursesRender = () => {
        return props.courseList.filter(course => course.danhMucKhoaHoc.maDanhMucKhoahoc === (props.type === 'ALL'? course.danhMucKhoaHoc.maDanhMucKhoahoc : props.type)).map((course,index) => {
            return <NavLink className="item" key={index} to={`/detail/${course.maKhoaHoc}`} onClick={()=>{scrollToTop(course.maKhoaHoc)}}>
            <img src={course.hinhAnh} alt={course.biDanh} />
            <span className="badge">Nổi bật</span>
            <div className="itemContent">
                <p>{course.tenKhoaHoc}</p>
            </div>
            <div className="courseOverlay">
                <p>
                {course.moTa}
                </p>
                <div className="rate">
                    <img className="star" src="./img/star.svg" alt="" />
                    <img className="star" src="./img/star.svg" alt="" />
                    <img className="star" src="./img/star.svg" alt="" />
                    <img className="star" src="./img/star.svg" alt="" />
                    <img className="star" src="./img/star.svg" alt="" />
                </div>
            </div>
        </NavLink>
        })
        // console.log(props);
    }
    return (
        <Slider {...settings}>
            {coursesRender()}
        </Slider>


    )
}
