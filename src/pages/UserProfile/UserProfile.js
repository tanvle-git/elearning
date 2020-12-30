import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserProfile.scss'
import { getUserInfoAction, signOutAction } from '../../redux/actions/UserAction'
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import { changeUserInfo, changePasswordAction } from '../../redux/actions/UserAction'
import editSvg from '../../assets/edit.svg';
import checkSvg from '../../assets/add.svg';
import cancelSvg from '../../assets/cancel.svg';
import barCodeSvg from '../../assets/barCode.svg'
import errorSvg from '../../assets/error.svg'
import closeSvg from '../../assets/close.svg'
import signOutSvg from '../../assets/signOut.svg'
import swal from 'sweetalert';

export default function UserProfile() {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => { dispatch(getUserInfoAction()) }, [dispatch])
    const [passwordModal, setPasswordModal] = useState(false);
    const handlePasswordClose = () => setPasswordModal(false);
    const handlePasswordModal = () => setPasswordModal(true);

    const userInfo = useSelector(state => state.UserReducer.userInfo)
    const [currentView, setCurrentView] = useState("view");

    const signOut = () => {
        if (window.screen.width >= 768) {
            dispatch(signOutAction());
            history.push("/home");

        }
    }

    const renderTooltip = (props) => {
        return <Tooltip >
            {props}
        </Tooltip>
    };
    const editUserSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .matches(/^[0-9]*$/, 'Số điện thoại không hợp lệ!')
            .required('Bắt buộc!'),
        email: Yup.string()
            .email('Email không hợp lệ!')
            .required('Bắt buộc!'),
        username: Yup.string()
            .min(5, 'Tối thiểu 5 ký tự!')
            .max(20, 'Tối đa 20 ký tự!')
            .required('Bắt buộc!')
            .matches(/^[a-zA-Z0-9_.-]*$/, 'Chỉ bao gồm chữ, số, gạch dưới "_", gạch giữa "-" và dấu chấm!'),
        fullName: Yup.string()
            .required('Bắt buộc!')
            .matches(/^[a-zA-Z]{1,}(?: [a-zA-Z]+){0,2}$/, 'Vui lòng nhập đúng họ tên của bạn (không dấu)!'),
    });

    const changePasswordSchema = Yup.object().shape({
        currentPassword: Yup.string()
            .oneOf([userInfo.matKhau, null], 'Mật khẩu không đúng!')
            .required('Bắt buộc!'),
        newPassword: Yup.string()
            .min(5, 'Tối thiểu 5 ký tự!')
            .required('Bắt buộc!'),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không khớp!')
            .required('Bắt buộc!'),
        email: Yup.string(),
        username: Yup.string(),
        phoneNumber: Yup.string(),
        fullName: Yup.string()
    });

    const change = (values) => {
        setCurrentView('view');
        dispatch(changeUserInfo({ ...values, password: userInfo.matKhau }));
    }

    const changePassword = (values) => {
        handlePasswordClose();
        dispatch(changePasswordAction(values));
    }

    const renderInfo = () => {
        if (currentView === "view") {
            return <Fragment>
                <div className="d-flex  align-items-center">
                    <h1 className="title">Tài khoản của tôi</h1>
                    <button onClick={() => setCurrentView("edit")} style={{ marginLeft: '1rem' }}>
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
                    <div className="col-7">{userInfo?.soDT}</div>
                </div>
                <div className="row">
                    <div className="col-5">Mật khẩu:</div>
                    <div className="col-7" style={{ fontWeight: 700, color: 'black' }} onClick={handlePasswordModal}>Đổi mật khẩu?</div>
                </div>
                <div className="row d-sm-flex d-md-none">
                    <div className="col-5">Loại tài khoản:</div>
                    <div className="col-7">{userInfo?.maLoaiNguoiDung}</div>
                </div>
                <div className="row d-sm-flex d-md-none">
                    <div className="col-5">Đã ghi danh:</div>
                    <div className="col-7">{userInfo?.chiTietKhoaHocGhiDanh?.length}</div>
                </div>
            </Fragment>
        }
        return <Fragment>
            <Formik
                initialValues={{
                    phoneNumber: userInfo?.soDT,
                    email: userInfo?.email,
                    username: userInfo?.taiKhoan,
                    fullName: userInfo?.hoTen,
                }}
                validationSchema={editUserSchema}
                onSubmit={change}>
                {({ errors, touched }) => (
                    <Form>
                        <div className="d-flex align-items-center">
                            <h1 className="title">Tài khoản của tôi</h1>
                            <button type="submit">
                                <img src={checkSvg} alt="check button" />
                            </button>
                            <button onClick={() => setCurrentView("view")} >
                                <img src={cancelSvg} alt="edit button" />
                            </button>
                        </div>
                        <div className="row">
                            <div className="col-5 ">Tên tài khoản:</div>
                            <div className="inputGroup">
                                <Field disabled={true} type="text" style={{ color: '#645a5380' }} placeholder="Tên tài khoản" name="username" />
                                {errors.username
                                    && touched.username
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.username)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5 ">Họ và Tên:</div>
                            <div className="inputGroup">
                                <Field type="text" style={{ color: errors.fullName ? '#eb5757' : 'unset' }} placeholder="Họ và Tên" name="fullName" />
                                {errors.fullName
                                    && touched.fullName
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.fullName)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5 ">Email:</div>
                            <div className="inputGroup">
                                <Field type="text" style={{ color: errors.email ? '#eb5757' : 'unset' }} placeholder="Email" name="email" />
                                {errors.email
                                    && touched.email
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.email)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5 ">Số điện thoại:</div>
                            <div className="inputGroup">
                                <Field type="text" style={{ color: errors.phoneNumber ? '#eb5757' : 'unset' }} placeholder="Số điện thoại" name="phoneNumber" />
                                {errors.phoneNumber
                                    && touched.phoneNumber
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.phoneNumber)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-5">Mật khẩu:</div>
                            <div className="col-7" style={{ fontWeight: 700, color: 'black' }} onClick={handlePasswordModal}>Đổi mật khẩu?</div>
                        </div>
                        <div className="row d-sm-flex d-md-none">
                            <div className="col-5">Loại tài khoản:</div>
                            <div className="col-7">{userInfo?.maLoaiNguoiDung}</div>
                        </div>
                        <div className="row d-sm-flex d-md-none">
                            <div className="col-5">Đã ghi danh:</div>
                            <div className="col-7">{userInfo?.chiTietKhoaHocGhiDanh?.length}</div>
                        </div>
                    </Form>)}
            </Formik>
        </Fragment>
    }
    if (!localStorage.getItem('userLogin')) {
        swal({ title: 'Chưa đăng nhập', text: 'hãy đăng nhập để truy cập', icon: "error", button: false });
        return <Redirect to='/home' />
    } else{
    return (
        <div className="container userCardProfileParent" style={{ marginTop: '80px' }}>
            <div className="userCardProfile">
                <div className="signOutButton d-none d-md-block" onClick={() => signOut()}>
                    <img src={signOutSvg} alt="sign out button" />
                </div>
                <div className="row">
                    <div className="col-lg-7 col-md-8 col-12 mainUserInfo">
                        {renderInfo()}
                    </div>
                    <div className="col-1 d-none d-lg-block" style={{ padding: '15px' }}>
                        <img src={barCodeSvg} alt="bar code" />
                    </div>

                    <div className="col-4 d-none d-md-flex subUserInfo justify-content-end align-items-end" style={{ backgroundColor: userInfo.maLoaiNguoiDung === 'GV' ? '#fd4646' : '#645a53' }}>
                        <div >
                            <div className=" d-sm-none d-md-block">
                                Loại tài khoản:
                                <br />
                                {userInfo?.maLoaiNguoiDung}
                                <br />
                                Đã ghi danh:
                                <br />
                                {userInfo?.chiTietKhoaHocGhiDanh?.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={passwordModal} onHide={handlePasswordClose} centered size="sm">
                <div className="d-flex justify-content-between mb-4"><h1 className="modal-title">Đổi mật khẩu</h1><img src={closeSvg} alt="close button" onClick={handlePasswordClose} /></div>

                <Formik
                    initialValues={{
                        phoneNumber: userInfo?.soDT,
                        fullName: userInfo?.hoTen,
                        email: userInfo?.email,
                        username: userInfo?.taiKhoan,
                        currentPassword: '',
                        newPassword: '',
                        passwordConfirmation: '',
                    }}
                    validationSchema={changePasswordSchema}
                    onSubmit={changePassword}>

                    {({ errors, touched }) => (
                        <Form>
                            <div className="inputGroup">
                                <Field style={{ color: errors.currentPassword ? '#eb5757' : 'unset' }} name="currentPassword" type="password" placeholder="Mật khẩu hiện tại" />
                                {errors.currentPassword
                                    && touched.currentPassword
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.currentPassword)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.newPassword ? '#eb5757' : 'unset' }} name="newPassword" type="password" placeholder="Mật khẩu mới" />
                                {errors.newPassword
                                    && touched.newPassword
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.newPassword)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field name="passwordConfirmation" type="password" placeholder="Nhập lại" />
                                {errors.passwordConfirmation
                                    && touched.passwordConfirmation
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.passwordConfirmation)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <button className="brownSolidBtn" type="submit" style={{ width: '100%', margin: 0 }}>Đổi mật khẩu</button>
                        </Form>)}

                </Formik>

            </Modal>
        </div>
    )
}}
