import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './UserInfo.scss';
import { selectUserEditAction } from '../../redux/actions/UserAction';
import { setModal } from '../../redux/actions/UserSettingActions';
import { getUserCoursesDetailAction } from '../../redux/actions/CoursesManageActions'
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import AdminTableGroup from '../../components/AdminTableGroup/AdminTableGroup';
import editSvg from '../../assets/edit.svg';
import barCodeSvg from '../../assets/barCode.svg'
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

export default function UserInfo(props) {

    const taiKhoan = props.match.params.id
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getUserCoursesDetailAction(taiKhoan)) }, [dispatch, taiKhoan]);
    const userList = useSelector(state => state.UserReducer.userList);
    const haveNotJoined = useSelector(state => state.CoursesReducer.userCoursesDetail.haveNotJoined);
    const pendingCourses = useSelector(state => state.CoursesReducer.userCoursesDetail.pendingCourses);
    const haveJoined = useSelector(state => state.CoursesReducer.userCoursesDetail.haveJoined);
    const userInfo = userList[userList.findIndex(a => a.taiKhoan === taiKhoan)];
    const editUser = (Obj) => {
        dispatch(setModal({ modal: 'editUser', value: true }));
        dispatch(selectUserEditAction(Obj));
    }
    if (!localStorage.getItem('userLogin') || JSON.parse(localStorage.getItem('userLogin'))?.maLoaiNguoiDung !=="GV") {
        swal({ title: 'Không có quyền truy cập', text: 'hệ thống tự điều hướng về trang chủ', icon: "error", button: false });
        return <Redirect to='/home'/>
    }else{
    return (
        <div className="container userCardProfileParent" style={{ marginTop: '80px' }}>
            <div className="userCardProfile">
                <div className="row">
                    <div className="col-lg-7 col-md-8 col-12 mainUserInfo">
                        <div className="d-flex align-items-center">
                            <h1 className="title">Tài khoản người dùng</h1>
                            <button onClick={() => editUser(userInfo)} style={{ marginLeft: '1rem' }}>
                                <img src={editSvg} alt="edit button" />
                            </button>
                        </div>
                        <div className="row">
                            <div className="col-5 ">Tên tài khoản:</div>
                            <div className="col-7">{userInfo?.taiKhoan}</div>
                        </div>
                        <div className="row">
                            <div className="col-5">Họ và Tên:</div>
                            <div className="col-7">{userInfo?.hoTen}</div>
                        </div>
                        <div className="row">
                            <div className="col-5">Email:</div>
                            <div className="col-7">{userInfo?.email}</div>
                        </div>
                        <div className="row">
                            <div className="col-5">Số điện thoại:</div>
                            <div className="col-7">{userInfo?.soDt}</div>
                        </div>
                        <div className="row d-sm-flex d-md-none">
                            <div className="col-5">Loại tài khoản:</div>
                            <div className="col-7">{userInfo?.maLoaiNguoiDung}</div>
                        </div>
                    </div>
                    <div className="col-1 d-none d-lg-block" style={{ padding: '15px' }}>
                        <img src={barCodeSvg} alt="bar code" />
                    </div>

                    <div className="col-4 d-none d-md-flex subUserInfo justify-content-end align-items-end" style={{ backgroundColor: userInfo?.maLoaiNguoiDung === 'GV' ? '#fd4646' : '#645a53' }}>
                        <div >
                            <div className=" d-sm-none d-md-block">
                                Loại tài khoản:
                            <br />
                                {userInfo?.maLoaiNguoiDung}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AdminTableGroup ofUser={userInfo?.maLoaiNguoiDung} type="courseOfUser" haveNotJoined={haveNotJoined} pendingCourses={pendingCourses} haveJoined={haveJoined} taiKhoan={taiKhoan} />
            <ModalComponent type='editUser' />
        </div>
    )
}}
