import React from 'react'
import Slider from "react-slick";
import { NavLink } from 'react-router-dom';
import './SlickSlider.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import starSvg from '../../assets/star.svg'

export default function SlickSliders(props) {
    const settings={
        className: "slider variable-width",
        dots: false,
        rows: 1,
        infinite: true,
        speed: 500,
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
    }

    const coursesRender = () => {
        return props.courseList.filter(course => course.danhMucKhoaHoc.maDanhMucKhoahoc === (props.type === 'ALL'? course.danhMucKhoaHoc.maDanhMucKhoahoc : props.type)).map((course,index) => {
            return <NavLink className="item" key={index} to={`/detail/${course.maKhoaHoc}`} >
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
                    <img className="star" src={starSvg} alt="star icon" />
                    <img className="star" src={starSvg} alt="star icon" />
                    <img className="star" src={starSvg} alt="star icon" />
                    <img className="star" src={starSvg} alt="star icon" />
                    <img className="star" src={starSvg} alt="star icon" />
                </div>
            </div>
        </NavLink>
        })
    }

    return (
        <Slider {...settings}>
            {coursesRender()}
        </Slider>


    )
}
