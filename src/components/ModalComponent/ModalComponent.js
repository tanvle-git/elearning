import React, { Fragment, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { setModal } from '../../redux/actions/UserSettingActions';
import { connect, useSelector, useDispatch } from 'react-redux';
import { createCourseAction, editCourseAction } from '../../redux/actions/CoursesManageActions'
import {createUserAction,editUserAction} from '../../redux/actions/UserAction'

export default function ModalComponent(props) {

    const newCourseModal = useSelector(state => state.UserSettingReducer.modal.newCourse);
    const editCourseModal = useSelector(state => state.UserSettingReducer.modal.editCourse);

    const newUserModal = useSelector(state => state.UserSettingReducer.modal.newUser);
    const editUserModal = useSelector(state => state.UserSettingReducer.modal.editUser);

    const category = useSelector(state => state.CoursesReducer.category);
    const userType = useSelector(state => state.UserReducer.userType);
    const userInfo = useSelector(state => state.UserReducer.userInfo);
    const courseEditing = useSelector(state => state.CoursesReducer.courseEditing);
    const userEditing = useSelector(state => state.UserReducer.userEditing);
    const dispatch = useDispatch();

    const handleNewCourseClose = () => {
        dispatch(setModal({ modal: 'newCourse', value: false }));
    };
    const handleEditCourseClose = () => {
        dispatch(setModal({ modal: 'editCourse', value: false }));
    };
    const handleNewUserClose = () => {
        dispatch(setModal({ modal: 'newUser', value: false }));
    };
    const handleEditUserClose = () => {
        dispatch(setModal({ modal: 'editUser', value: false }));
    };


    const renderTooltip = (props) => {
        return <Tooltip >
            {props}
        </Tooltip>
    };
    const createCourse = (values) => {
        dispatch(createCourseAction({ ...values, maNhom: "GP12", taiKhoanNguoiTao: userInfo.taiKhoan }));
        console.log(values);
    }

    const editCourse = (values) => {
        console.log({ ...values, maNhom: "GP12", taiKhoanNguoiTao: courseEditing.nguoiTao.taiKhoan, ngayTao: courseEditing.ngayTao });
        dispatch(editCourseAction({ ...values, maNhom: "GP12", taiKhoanNguoiTao: courseEditing.nguoiTao.taiKhoan, ngayTao: courseEditing.ngayTao }))
    }

    const createUser = (values) => {
        console.log(values);
        dispatch(createUserAction(values))
    }
    const editUser = (values) => {
        console.log(values);
        dispatch(editUserAction(values))
    }

    const newCourseSchema = Yup.object().shape({
        maKhoaHoc: Yup.string()
            .min(5, 'Tối thiểu 5 ký tự!')
            .max(20, 'Tối đa 20 ký tự!')
            .required('Bắt buộc!'),
        biDanh: Yup.string()
            .min(5, 'Tối thiểu 5 ký tự!')
            .max(100, 'Tối đa 100 ký tự!')
            .required('Bắt buộc!'),
        tenKhoaHoc: Yup.string()
            .min(5, 'Tối thiểu 5 ký tự!')
            .max(100, 'Tối đa 100 ký tự!')
            .required('Bắt buộc!'),
        moTa: Yup.string()
            .min(5, 'Tối thiểu 5 ký tự!')
            .max(1000, 'Tối đa 1000 ký tự!')
            .required('Bắt buộc!'),
        luotXem: Yup.number()
            .moreThan(-1, 'Không được là số âm!')
            .integer('Phải là số nguyên!')
            .required('Bắt buộc!'),
        danhGia: Yup.number()
            .moreThan(-1, 'Không được là số âm!')
            .integer('Phải là số nguyên!')
            .required('Bắt buộc!'),
        hinhAnh: Yup.mixed()
            .required('Bắt buộc!'),
        maDanhMucKhoaHoc: Yup.string()
            .required('Bắt buộc!')
    });
    const userSchema = Yup.object().shape({
        soDT: Yup.string()
            .matches(/^[0-9]*$/, 'Số điện thoại không hợp lệ!')
            .required('Bắt buộc!'),
        email: Yup.string()
            .email('Email không hợp lệ!')
            .required('Bắt buộc!'),
        taiKhoan: Yup.string()
            .min(5, 'Tối thiểu 5 ký tự!')
            .max(20, 'Tối đa 20 ký tự!')
            .required('Bắt buộc!')
            .matches(/^[a-zA-Z0-9_.-]*$/, 'Chỉ bao gồm chữ, số, gạch dưới "_", gạch giữa "-" và dấu chấm!'),
        hoTen: Yup.string()
            .required('Bắt buộc!')
            .matches(/^[a-zA-Z]{1,}(?: [a-zA-Z]+){0,2}$/, 'Vui lòng nhập đúng họ tên của bạn (không dấu)!'),
        matKhau: Yup.string()
            .min(5, 'Tối thiểu 5 ký tự!')
            .required('Bắt buộc!'),
        maLoaiNguoiDung: Yup.string()
            .required('Bắt buộc!'),
    });

    switch (props.type) {
        case 'newCourse':
            return (<Modal show={newCourseModal} onHide={handleNewCourseClose} centered size="sm">
                <div className="d-flex justify-content-between mb-4"><h1 className="modal-title">Thêm khóa học mới</h1><img src="./img/close.svg" onClick={handleNewCourseClose} /></div>
                <Formik
                    initialValues={{
                        maKhoaHoc: '',
                        biDanh: '',
                        tenKhoaHoc: '',
                        moTa: '',
                        luotXem: 0,
                        danhGia: 0,
                        hinhAnh: null,
                        maDanhMucKhoaHoc: category[0]?.maDanhMuc
                    }}
                    validationSchema={newCourseSchema}
                    onSubmit={createCourse}>

                    {({ errors, touched, setFieldValue }) => (
                        <Form>
                            <div className="inputGroup">
                                <Field style={{ color: errors.maKhoaHoc ? '#eb5757' : 'unset' }} name="maKhoaHoc" type="text" placeholder="Mã khóa học" />
                                {errors.maKhoaHoc
                                    && touched.maKhoaHoc
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.maKhoaHoc)}>
                                        <img src="./img/error.svg" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.biDanh ? '#eb5757' : 'unset' }} name="biDanh" type="text" placeholder="Bí danh" />
                                {errors.biDanh
                                    && touched.biDanh
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.biDanh)}>
                                        <img src="./img/error.svg" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.tenKhoaHoc ? '#eb5757' : 'unset' }} name="tenKhoaHoc" type="text" placeholder="Tên khóa học" />
                                {errors.tenKhoaHoc
                                    && touched.tenKhoaHoc
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.tenKhoaHoc)}>
                                        <img src="./img/error.svg" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.moTa ? '#eb5757' : 'unset', height: "150px" }} name="moTa" type="text" placeholder="Mô tả" as={'textarea'} />
                                {errors.moTa
                                    && touched.moTa
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.moTa)}>
                                        <img src="./img/error.svg" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="row" style={{ margin: 0 }}>

                                <div className="inputGroup col-6" style={{ padding: 0 }}>
                                    <div style={{ whiteSpace: 'nowrap', margin: 0, lineHeight: '30px', marginRight: '.5rem' }} ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#645A53cc" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg></div>
                                    <Field style={{ color: errors.luotXem ? '#eb5757' : 'unset', width: '100%' }} name="luotXem" type="number" placeholder="Lượt xem" min='0' />
                                    {errors.luotXem
                                        && touched.luotXem
                                        &&
                                        <OverlayTrigger
                                            overlay={renderTooltip(errors.luotXem)}>
                                            <img src="./img/error.svg" />
                                        </OverlayTrigger>}
                                </div>

                                <div className="inputGroup col-6">
                                    <div style={{ whiteSpace: 'nowrap', margin: 0, lineHeight: '30px', marginRight: '.5rem' }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#645A53cc" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M12 20l-.86-.86c-1.18-1.18-1.17-3.1.02-4.26l.84-.82c-.39-.04-.68-.06-1-.06-2.67 0-8 1.34-8 4v2h9zm-1-8c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4"></path><path d="M16.18 19.78c-.39.39-1.03.39-1.42 0l-2.07-2.09c-.38-.39-.38-1.01 0-1.39l.01-.01c.39-.39 1.02-.39 1.4 0l1.37 1.37 4.43-4.46c.39-.39 1.02-.39 1.41 0l.01.01c.38.39.38 1.01 0 1.39l-5.14 5.18z"></path></svg></div>
                                    <Field style={{ color: errors.danhGia ? '#eb5757' : 'unset', width: '100%' }} name="danhGia" type="number" placeholder="Đánh giá" min='0' />
                                    {errors.danhGia
                                        && touched.danhGia
                                        &&
                                        <OverlayTrigger
                                            overlay={renderTooltip(errors.danhGia)}>
                                            <img src="./img/error.svg" />
                                        </OverlayTrigger>}
                                </div>
                            </div>

                            <div className="inputGroup">
                                <input style={{ color: errors.hinhAnh ? '#eb5757' : 'unset', overflow: 'hidden' }} name="hinhAnh" type="file" placeholder="Hình ảnh" accept=".png,.jpg,.jpeg" onChange={(event) => {
                                    setFieldValue("hinhAnh", event.currentTarget.files[0]);
                                }} />
                                {errors.hinhAnh
                                    && touched.hinhAnh
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.hinhAnh)}>
                                        <img src="./img/error.svg" />
                                    </OverlayTrigger>}
                            </div>

                            <div className="inputGroup">
                                <Field style={{ color: errors.maDanhMucKhoaHoc ? '#eb5757' : 'unset' }} name="maDanhMucKhoaHoc" type="text" placeholder="Mã danh mục khóa học" as="select">
                                    {errors.maDanhMucKhoaHoc
                                        && touched.maDanhMucKhoaHoc
                                        &&
                                        <OverlayTrigger
                                            overlay={renderTooltip(errors.maDanhMucKhoaHoc)}>
                                            <img src="./img/error.svg" />
                                        </OverlayTrigger>}
                                    {category.map((item, index) => {
                                        return <option value={item.maDanhMuc} key={index}>{item.maDanhMuc}</option>
                                    })}
                                </Field>
                            </div>
                            <button className="brownSolidBtn" type="submit" style={{ width: '100%', margin: 0 }}>Xác nhận</button>
                        </Form>)}

                </Formik>
            </Modal>
            )
        case 'editCourse':
            return (<Modal show={editCourseModal} onHide={handleEditCourseClose} centered size="sm">
                <div className="d-flex justify-content-between mb-4"><h1 className="modal-title">Chỉnh sửa khóa học</h1><img src="./img/close.svg" onClick={handleEditCourseClose} /></div>
                <Formik
                    initialValues={{
                        maKhoaHoc: courseEditing.maKhoaHoc,
                        biDanh: courseEditing.biDanh,
                        tenKhoaHoc: courseEditing.tenKhoaHoc,
                        moTa: courseEditing.moTa,
                        luotXem: courseEditing.luotXem,
                        danhGia: 0,
                        hinhAnh: null,
                        maDanhMucKhoaHoc: courseEditing.danhMucKhoaHoc?.maDanhMucKhoahoc,
                    }}
                    validationSchema={newCourseSchema}
                    onSubmit={editCourse}>

                    {({ errors, touched, setFieldValue }) => (
                        <Form>
                            <div className="inputGroup">
                                <Field style={{ color: '#645a5380' }} name="maKhoaHoc" type="text" placeholder="Mã khóa học" disabled={true} />
                                {errors.maKhoaHoc
                                    && touched.maKhoaHoc
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.maKhoaHoc)}>
                                        <img src="./img/error.svg" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.biDanh ? '#eb5757' : 'unset' }} name="biDanh" type="text" placeholder="Bí danh" />
                                {errors.biDanh
                                    && touched.biDanh
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.biDanh)}>
                                        <img src="./img/error.svg" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.tenKhoaHoc ? '#eb5757' : 'unset' }} name="tenKhoaHoc" type="text" placeholder="Tên khóa học" />
                                {errors.tenKhoaHoc
                                    && touched.tenKhoaHoc
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.tenKhoaHoc)}>
                                        <img src="./img/error.svg" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.moTa ? '#eb5757' : 'unset', height: "150px" }} name="moTa" type="text" placeholder="Mô tả" as={'textarea'} />
                                {errors.moTa
                                    && touched.moTa
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.moTa)}>
                                        <img src="./img/error.svg" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="row" style={{ margin: 0 }}>

                                <div className="inputGroup col-6" style={{ padding: 0 }}>
                                    <div style={{ whiteSpace: 'nowrap', margin: 0, lineHeight: '30px', marginRight: '.5rem' }} ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#645A53cc" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg></div>
                                    <Field style={{ color: errors.luotXem ? '#eb5757' : 'unset', width: '100%' }} name="luotXem" type="number" placeholder="Lượt xem" min='0' />
                                    {errors.luotXem
                                        && touched.luotXem
                                        &&
                                        <OverlayTrigger
                                            overlay={renderTooltip(errors.luotXem)}>
                                            <img src="./img/error.svg" />
                                        </OverlayTrigger>}
                                </div>

                                <div className="inputGroup col-6">
                                    <div style={{ whiteSpace: 'nowrap', margin: 0, lineHeight: '30px', marginRight: '.5rem' }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#645A53cc" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M12 20l-.86-.86c-1.18-1.18-1.17-3.1.02-4.26l.84-.82c-.39-.04-.68-.06-1-.06-2.67 0-8 1.34-8 4v2h9zm-1-8c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4"></path><path d="M16.18 19.78c-.39.39-1.03.39-1.42 0l-2.07-2.09c-.38-.39-.38-1.01 0-1.39l.01-.01c.39-.39 1.02-.39 1.4 0l1.37 1.37 4.43-4.46c.39-.39 1.02-.39 1.41 0l.01.01c.38.39.38 1.01 0 1.39l-5.14 5.18z"></path></svg></div>
                                    <Field style={{ color: errors.danhGia ? '#eb5757' : 'unset', width: '100%' }} name="danhGia" type="number" placeholder="Đánh giá" min='0' />
                                    {errors.danhGia
                                        && touched.danhGia
                                        &&
                                        <OverlayTrigger
                                            overlay={renderTooltip(errors.danhGia)}>
                                            <img src="./img/error.svg" />
                                        </OverlayTrigger>}
                                </div>
                            </div>

                            <div className="inputGroup">
                                <input style={{ color: errors.hinhAnh ? '#eb5757' : 'unset', overflow: 'hidden' }} name="hinhAnh" type="file" placeholder="Hình ảnh" accept=".png,.jpg,.jpeg" onChange={(event) => {
                                    setFieldValue("hinhAnh", event.currentTarget.files[0]);
                                }} />
                                {errors.hinhAnh
                                    && touched.hinhAnh
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.hinhAnh)}>
                                        <img src="./img/error.svg" />
                                    </OverlayTrigger>}
                            </div>

                            <div className="inputGroup">
                                <Field style={{ color: errors.maDanhMucKhoaHoc ? '#eb5757' : 'unset' }} name="maDanhMucKhoaHoc" type="text" placeholder="Mã danh mục khóa học" as="select" defaultValue={courseEditing.danhMucKhoaHoc.maDanhMucKhoaHoc}>
                                    {errors.maDanhMucKhoaHoc
                                        // && touched.maDanhMucKhoaHoc
                                        &&
                                        <OverlayTrigger
                                            overlay={renderTooltip(errors.maDanhMucKhoaHoc)}>
                                            <img src="./img/error.svg" />
                                        </OverlayTrigger>}
                                    {category.map((item, index) => {
                                        return <option value={item.maDanhMuc} key={index}>{item.maDanhMuc}</option>
                                    })}
                                </Field>
                            </div>
                            <button className="brownSolidBtn" type="submit" style={{ width: '100%', margin: 0 }}>Xác nhận</button>
                        </Form>)}

                </Formik>
            </Modal>)
        case 'newUser':
            return (<Modal show={newUserModal} onHide={handleNewUserClose} centered size="sm">
                <div className="d-flex justify-content-between mb-4"><h1 className="modal-title">Thêm người dùng mới</h1><img src="./img/close.svg" onClick={handleEditCourseClose} /></div>
                <Formik
                    initialValues={{
                        taiKhoan: '',
                        matKhau: '',
                        hoTen: '',
                        soDT: '',
                        maLoaiNguoiDung: userType[0]?.maLoaiNguoiDung,
                        email: ''
                    }}
                    validationSchema={userSchema}
                    onSubmit={createUser}>

                    {({ errors, touched }) => (
                        <Form>
                            <div className="inputGroup">
                                <Field style={{ color: errors.taiKhoan ? '#eb5757' : 'unset' }} name="taiKhoan" type="text" placeholder="Tên tài khoản" />
                                {errors.taiKhoan
                                    && touched.taiKhoan
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.taiKhoan)}>
                                        <img src="./img/error.svg" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.matKhau ? '#eb5757' : 'unset' }} name="email" type="text" placeholder="email" />
                                {errors.email
                                    && touched.email
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.email)}>
                                        <img src="./img/error.svg" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.matKhau ? '#eb5757' : 'unset' }} name="matKhau" type="password" placeholder="Mật khẩu" />
                                {errors.matKhau
                                    && touched.matKhau
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.matKhau)}>
                                        <img src="./img/error.svg" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.hoTen ? '#eb5757' : 'unset' }} name="hoTen" type="text" placeholder="Họ và Tên" />
                                {errors.hoTen
                                    && touched.hoTen
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.hoTen)}>
                                        <img src="./img/error.svg" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.soDT ? '#eb5757' : 'unset' }} name="soDT" type="text" placeholder="Số điện thoại" />
                                {errors.soDT
                                    && touched.soDT
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.soDT)}>
                                        <img src="./img/error.svg" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.maLoaiNguoiDung ? '#eb5757' : 'unset' }} name="maLoaiNguoiDung" type="text" placeholder="Mã loại người dùng" as="select">
                                    {errors.maLoaiNguoiDung
                                        // && touched.maLoaiNguoiDung
                                        &&
                                        <OverlayTrigger
                                            overlay={renderTooltip(errors.maLoaiNguoiDung)}>
                                            <img src="./img/error.svg" />
                                        </OverlayTrigger>}
                                    {userType.map((item, index) => {
                                        return <option value={item.maLoaiNguoiDung} key={index}>{item.tenLoaiNguoiDung}</option>
                                    })}
                                </Field>
                            </div>
                            <button className="brownSolidBtn" type="submit" style={{ width: '100%', margin: 0 }}>Xác nhận</button>
                        </Form>)}

                </Formik>
            </Modal>
            )
        case 'editUser':
            return (<Modal show={editUserModal} onHide={handleEditUserClose} centered size="sm">
                <div className="d-flex justify-content-between mb-4"><h1 className="modal-title">Thêm người dùng mới</h1><img src="./img/close.svg" onClick={handleEditUserClose} /></div>
                <Formik
                    initialValues={{
                        taiKhoan: userEditing.taiKhoan,
                        matKhau: userEditing.matKhau,
                        hoTen: userEditing.hoTen,
                        soDT: userEditing.soDt,
                        maLoaiNguoiDung: userEditing.maLoaiNguoiDung,
                        email: userEditing.email
                    }}
                    validationSchema={userSchema}
                    onSubmit={editUser}>

                    {({ errors, touched }) => (
                        <Form>
                            <div className="inputGroup">
                                <Field style={{ color: '#645a5380' }} name="taiKhoan" type="text" placeholder="Tên tài khoản" disabled={true} />
                                {errors.taiKhoan
                                    && touched.taiKhoan
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.taiKhoan)}>
                                        <img src="./img/error.svg" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.matKhau ? '#eb5757' : 'unset' }} name="email" type="text" placeholder="email" />
                                {errors.email
                                    && touched.email
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.email)}>
                                        <img src="./img/error.svg" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.matKhau ? '#eb5757' : 'unset' }} name="matKhau" type="password" placeholder="Mật khẩu" />
                                {errors.matKhau
                                    && touched.matKhau
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.matKhau)}>
                                        <img src="./img/error.svg" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.hoTen ? '#eb5757' : 'unset' }} name="hoTen" type="text" placeholder="Họ và Tên" />
                                {errors.hoTen
                                    && touched.hoTen
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.hoTen)}>
                                        <img src="./img/error.svg" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.soDT ? '#eb5757' : 'unset' }} name="soDT" type="text" placeholder="Số điện thoại" />
                                {errors.soDT
                                    && touched.soDT
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.soDT)}>
                                        <img src="./img/error.svg" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.maLoaiNguoiDung ? '#eb5757' : 'unset' }} name="maLoaiNguoiDung" type="text" placeholder="Mã loại người dùng" as="select">
                                    {errors.maLoaiNguoiDung
                                        // && touched.maLoaiNguoiDung
                                        &&
                                        <OverlayTrigger
                                            overlay={renderTooltip(errors.maLoaiNguoiDung)}>
                                            <img src="./img/error.svg" />
                                        </OverlayTrigger>}
                                    {userType.map((item, index) => {
                                        return <option value={item.maLoaiNguoiDung} key={index}>{item.tenLoaiNguoiDung}</option>
                                    })}
                                </Field>
                            </div>
                            <button className="brownSolidBtn" type="submit" style={{ width: '100%', margin: 0 }}>Xác nhận</button>
                        </Form>)}

                </Formik>
            </Modal>
            )
        default:
            return 'nothing';
    }

}
