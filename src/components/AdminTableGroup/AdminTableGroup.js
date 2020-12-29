import React from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { cancelCourseAction, joinCourseAction_forAdmin } from '../../redux/actions/UserAction';

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
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 172 172"><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}><path d="M0,172v-172h172v172z" fill="none" /><g fill="#645a53"><path d="M86,17.2c-37.9948,0 -68.8,30.8052 -68.8,68.8c0,37.9948 30.8052,68.8 68.8,68.8c37.9948,0 68.8,-30.8052 68.8,-68.8c0,-37.9948 -30.8052,-68.8 -68.8,-68.8zM124.45347,72.85347l-43.344,43.344c-1.07787,1.07787 -2.53413,1.67987 -4.05347,1.67987c-1.51933,0 -2.98133,-0.602 -4.05347,-1.67987l-19.7972,-19.7972c-2.24173,-2.24173 -2.24173,-5.8652 0,-8.10693c2.24173,-2.24173 5.8652,-2.24173 8.10693,0l15.74373,15.74373l39.29053,-39.29053c2.24173,-2.24173 5.8652,-2.24173 8.10693,0c2.24173,2.24173 2.24173,5.8652 0,8.10693z" /></g></g></svg>
            </button>
        } else {
            return <button className="icon" type="submit" onClick={() => cancelCourse(ID)}>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 172 172"><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}><path d="M0,172v-172h172v172z" fill="none" /><g fill="#645a53"><path d="M85.91042,14.25495c-3.16203,0.04943 -5.68705,2.6496 -5.64375,5.81172v2.86667h-31.53333c-1.53406,-0.02082 -3.01249,0.574 -4.10468,1.65146c-1.09219,1.07746 -1.70703,2.54767 -1.70704,4.08187h-8.52161c-2.06765,-0.02924 -3.99087,1.05709 -5.03322,2.843c-1.04236,1.78592 -1.04236,3.99474 0,5.78066c1.04236,1.78592 2.96558,2.87225 5.03322,2.843h103.2c2.06765,0.02924 3.99087,-1.05709 5.03322,-2.843c1.04236,-1.78592 1.04236,-3.99474 0,-5.78066c-1.04236,-1.78592 -2.96558,-2.87225 -5.03322,-2.843h-8.52161c-0.00001,-1.53421 -0.61486,-3.00442 -1.70704,-4.08187c-1.09219,-1.07746 -2.57061,-1.67228 -4.10468,-1.65146h-31.53333v-2.86667c0.02122,-1.54972 -0.58581,-3.04203 -1.68279,-4.1369c-1.09698,-1.09487 -2.59045,-1.69903 -4.14013,-1.67482zM34.4,51.6l10.27969,87.34375c0.67653,5.77347 5.56348,10.12292 11.37708,10.12292h59.88646c5.8136,0 10.69482,-4.34945 11.37708,-10.12292l10.27969,-87.34375z" /></g></g></svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 172 172"><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}><path d="M0,172v-172h172v172z" fill="none" /><g fill="#645a53"><path d="M86,17.2c-37.9948,0 -68.8,30.8052 -68.8,68.8c0,37.9948 30.8052,68.8 68.8,68.8c37.9948,0 68.8,-30.8052 68.8,-68.8c0,-37.9948 -30.8052,-68.8 -68.8,-68.8zM91.73333,120.4h-11.46667v-40.13333h11.46667zM86,65.93333c-4.7472,0 -8.6,-3.8528 -8.6,-8.6c0,-4.7472 3.8528,-8.6 8.6,-8.6c4.7472,0 8.6,3.8528 8.6,8.6c0,4.7472 -3.8528,8.6 -8.6,8.6z" /></g></g></svg>
                            </button>
                        </div>
                    </td>
                </tr>
            })

        } else {
            return <tr><td>Trống</td></tr>
        }
    }
    return (
        <div className="coursesPanel">
            <div className="row " >
                <div className="col-lg-4 ">
                    <h1 className="title">{props.type === 'courseOfUser' ? 'Khóa học' : 'Học viên'} chưa đăng ký</h1>
                    <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                        <table className="table  table-hover" style={{ tableLayout: 'fixed' }}>
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
                    <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
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
                    <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
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
    );
}
