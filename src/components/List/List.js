import React, { useEffect } from 'react';
import './List.scss'
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';
import SubInfo from '../SubInfo/SubInfo';
import { selectPage } from '../../redux/actions/UserSettingActions';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from 'react';

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

    useEffect(() => {
        return () => {
            dispatch(selectPage(0));
        }
    }, [dispatch])

    const changePage = (number) => {
        dispatch(selectPage(number));
    }

    let pages = splitPages();

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

    const adminButton = (course) => {
        if (props.adminButtonRender) {
            return <Fragment>
                {props.adminButtonRender('edit', course)}
                {props.adminButtonRender('delete', course.maKhoaHoc)}
            </Fragment>
        }
    }

    if (props.list.length > 0) {
        switch (props.type) {
            case "CourseList":
                return (
                    <div>
                        {pages[active]?.map((course, index) => {
                            return <div className="courseItem" key={index}>
                                <img className="courseImg" src={course.hinhAnh} alt={course.tenKhoaHoc} onError={addDefaultSrc} />
                                <div className="courseText">
                                    <NavLink to={`/detail/${course.maKhoaHoc}`}>
                                        <h2 className="courseName">{course.tenKhoaHoc}</h2>
                                    </NavLink>
                                    <p className="courseDescription">{course.moTa}</p>
                                    <div className='courseMoreInfo'>
                                        <div className="d-none d-sm-flex subInfoContainer">
                                            <SubInfo luotXem={course.luotXem} soLuongHocVien={course.soLuongHocVien} />
                                        </div>
                                        {adminButton(course)}
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
                return (
                    <div className="tableContainer">
                        <table className="table table-hover">
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
                                        <th className="tdOverflow" scope="row">{user.taiKhoan}</th>
                                        <td className="d-none d-sm-table-cell tdOverflow">{user.hoTen}</td>
                                        <td className="d-none d-md-table-cell tdOverflow">{user.email}<br />{user.soDt}</td>
                                        <td className="tdOverflow">
                                            <div className="adminActionButton">
                                                {props.adminButtonRender('view', user.taiKhoan)}
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
    } else {
        return <div className="noDataList">Trống</div>
    }
}
