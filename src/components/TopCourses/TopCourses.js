import React from 'react'
import Slider from "react-slick";
import './TopCourses.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function TopCourses(props) {
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
        // draggable: false,
        swipeToSlide:true,
        // touchMove:false,
    }
    const coursesRender = () => {
        return props.courseList.map((course,index) => {
            return <div className="item" key={index}>
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
        </div>
        })
    }
    return (
        <div className="TopCourses">
            <div className="container">
                <h1 className="title" style={{ marginLeft: 23 }}>Khóa học nổi bật</h1>
                <Slider {...settings}>
                    {coursesRender()}
                </Slider>
            </div></div>


    )
}
