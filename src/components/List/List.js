import React, { useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';
// import PageItem from 'react-bootstrap/PageItem';
import SubInfo from '../SubInfo/SubInfo';
import { selectPage } from '../../redux/actions/UserSettingActions';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function List(props) {

    const dispatch = useDispatch();
    const active = useSelector(state => state.UserSettingReducer.currentPage);
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
    //     console.log('Hàm gọi sau lần render đầu tiên');
    //     return () => {
    //         console.log('Hàm định nghĩa bên trong đây sẽ được gọi cuối cùng thay willUnmount');
    //     }
    // }, [])
    // useEffect(() => {
    //     console.log('Hàm gọi mỗi khi number (state) thay đổi sau khi render ! thay didUpdate ')
    // }, [0])

    const changePage = (number) => {
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

    const addDefaultSrc = (ev) => {
        ev.target.src = './img/imgNotFound.jpg'
    }
    switch (props.type) {
        case "CourseList":
            return (
                <div>
                    {pages[active]?.map((course, index) => {
                        return <div className="courseItem" key={index}>

                            <div className="d-flex  align-items-center">
                                <img className="courseImg" src={course.hinhAnh} alt={course.tenKhoaHoc} onError={addDefaultSrc} />
                                <div className="d-flex flex-column" style={{ width: '100%', marginLeft: 30 }}>
                                    <NavLink to={`/detail/${course.maKhoaHoc}`}>
                                        <h2 className="smallTitle courseName">{course.tenKhoaHoc}</h2>
                                    </NavLink>
                                    <p className="courseDescription">{course.moTa}</p>
                                    <div className='align-self-end d-flex justify-content-end' style={{ width: '100%' }}>
                                        <div className="d-none d-sm-flex" style={{ maxWidth: '325px', flexGrow: 1 }}>
                                            <SubInfo luotXem={course.luotXem} soLuongHocVien={course.soLuongHocVien} />
                                        </div>
                                        {props.adminButtonRender('edit', course)}
                                        {props.adminButtonRender('delete', course.maKhoaHoc)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                    }
                    <div className=' d-flex justify-content-center'>
                        <Pagination className='justify-content-center'>{items}</Pagination>
                        <br />
                    </div>
                </div>
            )
        case "UserList":
            console.log(props.list);
            return (
                <div style={{ margin: '0 30px' }}>
                    <table className="table text-center" style={{ tableLayout: 'fixed' }}>

                        <thead>
                            <tr>
                                <th scope="col" >Tài khoản</th>
                                <th scope="col" className="d-none d-sm-table-cell"  >Họ tên</th>
                                <th scope="col" className="d-none d-md-table-cell" >Liên hệ</th>
                                <th scope="col" >...</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pages[active]?.map((user, index) => {
                                return <tr key={index} style={{ color: user.maLoaiNguoiDung === "GV" ? '#fd4646' : '#645a53' }}>
                                    <th scope="row" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.taiKhoan}</th>
                                    <td className="d-none d-sm-table-cell" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.hoTen}</td>
                                    <td className="d-none d-md-table-cell" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}<br />{user.soDt}</td>
                                    <td className="" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <div className="d-flex justify-content-center">
                                            {props.adminButtonRender('edit', user)}
                                            {props.adminButtonRender('delete', user.taiKhoan)}
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <div className='d-flex justify-content-center'>
                        <Pagination className='justify-content-center'>{items}</Pagination>
                        <br />
                    </div>
                </div>
            )
        default:
            return "Có gì đó sai sai!"
    }

}
