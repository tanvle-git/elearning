import React from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { cancelCourseAction, joinCourseAction_forAdmin } from '../../redux/actions/UserAction';
import './AdminTableGroup.scss'
import addSvg from '../../assets/add.svg'
import deleteSvg from '../../assets/delete.svg'
import infoSvg from '../../assets/info.svg'

export default function AdminTableGroup(props) {
    const dispatch = useDispatch();

    const joinCourse = (ID) => {
        if (props.type === "courseOfUser") {
            dispatch(joinCourseAction_forAdmin(ID, props.taiKhoan))
        } else {
            dispatch(joinCourseAction_forAdmin(props.maKhoaHoc, ID))
        }
    }
    const cancelCourse = (ID) => {
        if (props.type === "courseOfUser") {
            dispatch(cancelCourseAction(ID, props.taiKhoan))
        } else {
            dispatch(cancelCourseAction(props.maKhoaHoc, ID))
        }
    }

    const renderOptionalButton = (button, ID) => {
        if (button === 'joinButton') {
            return <button className="icon" type="submit" onClick={() => joinCourse(ID)}>
                <img src={addSvg} alt="add button" />
            </button>
        } else {
            return <button className="icon" type="submit" onClick={() => cancelCourse(ID)}>
                <img src={deleteSvg} alt="add button" />
            </button>
        }
    }
    const openNewTab = (ID) => {
        if (props.type === 'courseOfUser') {
            window.open("/detail/" + ID)
        } else {
            window.open("/user/" + ID)
        }
    };

    const ma = props.type === 'courseOfUser' ? 'maKhoaHoc' : 'taiKhoan';
    const ten = props.type === 'courseOfUser' ? 'tenKhoaHoc' : 'hoTen';

    const renderList = (list, button) => {
        if (list.length > 0) {
            return list.map((item, index) => {
                return <tr key={index}>
                    <td style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {item?.[ma]}<br />
                        {item?.[ten]}
                    </td>
                    <td className="text-center">
                        <div className="d-flex justify-content-center">
                            {renderOptionalButton(button, item?.[ma])}
                            <button className="icon" type="submit" onClick={() => openNewTab(item?.[ma])}>
                                <img src={infoSvg} alt="add button" />
                            </button>
                        </div>
                    </td>
                </tr>
            })

        } else {
            return <tr><td>Trống</td></tr>
        }
    }
    if (props.ofUser === "GV") {
        return <div style={{ margin: 30 }}>Giáo vụ không khả dụng chức năng ghi danh khóa học!</div>
    } else {
        return (
            <div className="managementPanel">
                <div className="row " >
                    <div className="col-lg-4 ">
                        <h1 className="title">{props.type === 'courseOfUser' ? 'Khóa học' : 'Học viên'} chưa đăng ký</h1>
                        <div className="tableContainer">
                            <table className="table table-hover" style={{ tableLayout: 'fixed' }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '70%' }}>{props.type === 'courseOfUser' ? 'Khóa học' : 'Học viên'}</th>
                                        <th className="text-center">...</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderList(props.haveNotJoined, 'joinButton')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-lg-4 ">
                        <h1 className="title">{props.type === 'courseOfUser' ? 'Khóa học' : 'Học viên'} đang chờ</h1>
                        <div className="tableContainer">
                            <table className="table table-hover" style={{ tableLayout: 'fixed' }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '70%' }}>{props.type === 'courseOfUser' ? 'Khóa học' : 'Học viên'}</th>
                                        <th className="text-center">...</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {renderList(props.pendingCourses, 'joinButton')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-lg-4 ">
                        <h1 className="title">{props.type === 'courseOfUser' ? 'Khóa học' : 'Học viên'} đã đăng ký</h1>
                        <div className="tableContainer">
                            <table className="table table-hover" style={{ tableLayout: 'fixed' }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '70%' }}>{props.type === 'courseOfUser' ? 'Khóa học' : 'Học viên'}</th>
                                        <th className="text-center">...</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {renderList(props.haveJoined, 'cancelButton')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
