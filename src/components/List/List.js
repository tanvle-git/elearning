import React, { useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';
// import PageItem from 'react-bootstrap/PageItem';
import SubInfo from '../SubInfo/SubInfo';
import { selectPage } from '../../redux/actions/UserSettingActions';
import { NavLink } from 'react-router-dom';

export default function List(props) {
    const dispatch = useDispatch();
    // let currentPage = 0;
    console.log('props',props);
    const active = useSelector(state => state.UserSettingReducer.currentPage);
    // const [active, setActive] = useState(0);
    // const [currentPage, setCurrentPage] = useState(0);
    // let active = 0;
    let items = [];
    let numberOfPages = Math.ceil(props.list.length / props.itemperpage);

    const splitPages = () => {
        const pages = [];
        for (let index = 0; index < numberOfPages; index++) {
            pages.push(props.list.slice(index * props.itemperpage, (index + 1) * props.itemperpage));
        }
        return pages;
    }

    // useEffect(() => {
    //     console.log(currentPage,' - ', active);
    //     currentPage === active? setActive(0) : console.log('ko doi');
    // })
    useEffect(() => {
        console.log('Hàm gọi sau lần render đầu tiên');
        return () => {
            console.log('Hàm định nghĩa bên trong đây sẽ được gọi cuối cùng thay willUnmount');
        }
    }, [])
    useEffect(() => {
        console.log('Hàm gọi mỗi khi number (state) thay đổi sau khi render ! thay didUpdate ')
    }, [0])

    const changePage = (number) => {
        // setCurrentPage(number);
        dispatch(selectPage(number));
    }

    let pages = splitPages();

    console.log(pages[0]);

    for (let number = 1; number <= numberOfPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active + 1} onClick={() => changePage(number - 1)}>
                {number}
            </Pagination.Item>,
        );
    }
    return (
        <div>
            {
                pages[active]?.map((course, index) => {
                    return <div className="courseItem" key={index}>
                        <NavLink to={`/detail/${course.maKhoaHoc}`}>
                        <div className="d-flex  align-items-center">
                            <img className="courseImg" src={course.hinhAnh} alt={course.tenKhoaHoc} />
                            <div className="d-flex flex-column" style={{ width: '100%', marginLeft: 30 }}>
                                <h2 className="smallTitle courseName">{course.tenKhoaHoc}</h2>
                                <p className="courseDescription">{course.moTa}</p>
                                <div className='align-self-end d-none d-sm-flex justify-content-between' style={{ width: 210 }}>
                                    <SubInfo luotXem={course.luotXem} soLuongHocVien={course.soLuongHocVien} />
                                </div>
                            </div>
                        </div>
                        </NavLink>
                    </div>
                })
            }

            <div className='justify-content-center'>
                <Pagination className='justify-content-center'>{items}</Pagination>
                <br />
            </div>
        </div>
    )
}
