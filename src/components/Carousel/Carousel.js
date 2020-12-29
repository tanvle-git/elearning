import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Carousel.scss'
import {getCourseListAction} from '../../redux/actions/CoursesManageActions';
import {useHistory } from 'react-router-dom';

export default function Carousel() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [searchInput, setSearchInput] = useState('')
    const search = (e) => {
        e.preventDefault();
        console.log(searchInput);
        dispatch(getCourseListAction(searchInput));
        history.push("/all-course");
    }

    const handleChange = (e) =>{
        setSearchInput(e.target.value)
    }
    return (
        <div className="Carousel">
            <div className="container">
                <div>
                    <span className="slogan">
                        Nền tảng giáo dục miễn phí số 1 Việt Nam
                </span>
                    <form className="searchInput" onSubmit={search} onChange={handleChange}>
                        <input type="text" placeholder="Tìm kiếm khóa học" />
                        <button type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 172 172"><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}><path d="M0,172v-172h172v172z" fill="none" /><g fill="#ffffff"><path d="M74.53333,17.2c-31.59642,0 -57.33333,25.73692 -57.33333,57.33333c0,31.59642 25.73692,57.33333 57.33333,57.33333c13.73998,0 26.35834,-4.87915 36.24766,-12.97839l34.23203,34.23203c1.43802,1.49778 3.5734,2.10113 5.5826,1.57735c2.0092,-0.52378 3.57826,-2.09284 4.10204,-4.10204c0.52378,-2.0092 -0.07957,-4.14458 -1.57735,-5.5826l-34.23203,-34.23203c8.09924,-9.88932 12.97839,-22.50768 12.97839,-36.24766c0,-31.59642 -25.73692,-57.33333 -57.33333,-57.33333zM74.53333,28.66667c25.39937,0 45.86667,20.4673 45.86667,45.86667c0,25.39937 -20.46729,45.86667 -45.86667,45.86667c-25.39937,0 -45.86667,-20.46729 -45.86667,-45.86667c0,-25.39937 20.4673,-45.86667 45.86667,-45.86667z" /></g></g></svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}
