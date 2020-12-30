import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './ModalComponent.scss'
import { Formik, Form, Field } from 'formik';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { setModal } from '../../redux/actions/UserSettingActions';
import { useSelector, useDispatch } from 'react-redux';
import { createCourseAction, editCourseAction } from '../../redux/actions/CoursesManageActions'
import { createUserAction, editUserAction, signInAction, signUpAction } from '../../redux/actions/UserAction'
import { newCourseSchema, userSchema, signInSchema, signUpSchema } from '../../ultity/Schema'
import closeSvg from '../../assets/close.svg'
import errorSvg from '../../assets/error.svg'
import viewSvg from '../../assets/view.svg'
import peopleCheckSvg from '../../assets/peopleCheck.svg'

export default function ModalComponent(props) {

    const newCourseModal = useSelector(state => state.UserSettingReducer.modal.newCourse);
    const editCourseModal = useSelector(state => state.UserSettingReducer.modal.editCourse);
    const newUserModal = useSelector(state => state.UserSettingReducer.modal.newUser);
    const editUserModal = useSelector(state => state.UserSettingReducer.modal.editUser);
    const signInModal = useSelector(state => state.UserSettingReducer.modal.signIn);
    const signUpModal = useSelector(state => state.UserSettingReducer.modal.signUp);

    const { userType, userInfo, userEditing } = useSelector(state => state.UserReducer);
    const { category, courseEditing } = useSelector(state => state.CoursesReducer);
    const dispatch = useDispatch();
    const renderTooltip = (props) => {
        return <Tooltip >
            {props}
        </Tooltip>
    };

    const handleModalClose = (modalName) => {
        dispatch(setModal({ modal: modalName, value: false }));

    }

    const switchModal = () => {
        dispatch(setModal({ modal: 'signIn', value: !signInModal }));
        dispatch(setModal({ modal: 'signUp', value: !signUpModal }));
    }

    const createCourse = (values) => {
        dispatch(createCourseAction({ ...values, maNhom: "GP12", taiKhoanNguoiTao: userInfo.taiKhoan }));
    }

    const editCourse = (values) => {
        dispatch(editCourseAction({ ...values, maNhom: "GP12", taiKhoanNguoiTao: courseEditing.nguoiTao.taiKhoan, ngayTao: courseEditing.ngayTao }))
    }

    const createUser = (values) => {
        dispatch(createUserAction(values))
    }
    const editUser = (values) => {
        dispatch(editUserAction(values))
    }

    const signIn = (values) => {
        const { username, password } = values;
        dispatch(signInAction({ username, password }));
    }
    const signUp = (values) => {
        const { phoneNumber, email, username, fullName, password } = values;
        dispatch(signUpAction({ phoneNumber, email, username, fullName, password }));
    }

    switch (props.type) {
        case 'newCourse':
            return (<Modal show={newCourseModal} onHide={() => handleModalClose('newCourse')} centered size="sm">
                <div className="modalTitleBox">
                    <h1 className="modal-title">Thêm khóa học mới</h1>
                    <img src={closeSvg} alt="close button" onClick={() => handleModalClose('newCourse')} />
                </div>
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
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.biDanh ? '#eb5757' : 'unset' }} name="biDanh" type="text" placeholder="Bí danh" />
                                {errors.biDanh
                                    && touched.biDanh
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.biDanh)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.tenKhoaHoc ? '#eb5757' : 'unset' }} name="tenKhoaHoc" type="text" placeholder="Tên khóa học" />
                                {errors.tenKhoaHoc
                                    && touched.tenKhoaHoc
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.tenKhoaHoc)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.moTa ? '#eb5757' : 'unset', height: "150px" }} name="moTa" type="text" placeholder="Mô tả" as={'textarea'} />
                                {errors.moTa
                                    && touched.moTa
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.moTa)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="row" style={{ margin: 0 }}>

                                <div className="inputGroup col-6" style={{ padding: 0 }}>
                                    <div style={{ whiteSpace: 'nowrap', margin: 0, lineHeight: '30px', marginRight: '.5rem' }} ><img src={viewSvg} alt="view icon"/></div>
                                    <Field style={{ color: errors.luotXem ? '#eb5757' : 'unset', width: '100%' }} name="luotXem" type="number" placeholder="Lượt xem" min='0' />
                                    {errors.luotXem
                                        && touched.luotXem
                                        &&
                                        <OverlayTrigger
                                            overlay={renderTooltip(errors.luotXem)}>
                                            <img src={errorSvg} alt="error warning" />
                                        </OverlayTrigger>}
                                </div>

                                <div className="inputGroup col-6">
                                    <div style={{ whiteSpace: 'nowrap', margin: 0, lineHeight: '30px', marginRight: '.5rem' }}><img src={peopleCheckSvg} alt="people icon"/></div>
                                    <Field style={{ color: errors.danhGia ? '#eb5757' : 'unset', width: '100%' }} name="danhGia" type="number" placeholder="Đánh giá" min='0' />
                                    {errors.danhGia
                                        && touched.danhGia
                                        &&
                                        <OverlayTrigger
                                            overlay={renderTooltip(errors.danhGia)}>
                                            <img src={errorSvg} alt="error warning" />
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
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>

                            <div className="inputGroup">
                                <Field style={{ color: errors.maDanhMucKhoaHoc ? '#eb5757' : 'unset' }} name="maDanhMucKhoaHoc" type="text" placeholder="Mã danh mục khóa học" as="select">
                                    {errors.maDanhMucKhoaHoc
                                        && touched.maDanhMucKhoaHoc
                                        &&
                                        <OverlayTrigger
                                            overlay={renderTooltip(errors.maDanhMucKhoaHoc)}>
                                            <img src={errorSvg} alt="error warning" />
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
            return (<Modal show={editCourseModal} onHide={() => handleModalClose('editCourse')} centered size="sm">
                <div className="modalTitleBox">
                    <h1 className="modal-title">Chỉnh sửa khóa học</h1>
                    <img className="hover" src={closeSvg} alt="close button" onClick={() => handleModalClose('editCourse')} />
                </div>
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
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.biDanh ? '#eb5757' : 'unset' }} name="biDanh" type="text" placeholder="Bí danh" />
                                {errors.biDanh
                                    && touched.biDanh
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.biDanh)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.tenKhoaHoc ? '#eb5757' : 'unset' }} name="tenKhoaHoc" type="text" placeholder="Tên khóa học" />
                                {errors.tenKhoaHoc
                                    && touched.tenKhoaHoc
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.tenKhoaHoc)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.moTa ? '#eb5757' : 'unset', height: "150px" }} name="moTa" type="text" placeholder="Mô tả" as={'textarea'} />
                                {errors.moTa
                                    && touched.moTa
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.moTa)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="row" style={{ margin: 0 }}>

                                <div className="inputGroup col-6" style={{ padding: 0 }}>
                                    <div style={{ whiteSpace: 'nowrap', margin: 0, lineHeight: '30px', marginRight: '.5rem' }} ><img src={viewSvg} alt="view icon"/></div>
                                    <Field style={{ color: errors.luotXem ? '#eb5757' : 'unset', width: '100%' }} name="luotXem" type="number" placeholder="Lượt xem" min='0' />
                                    {errors.luotXem
                                        && touched.luotXem
                                        &&
                                        <OverlayTrigger
                                            overlay={renderTooltip(errors.luotXem)}>
                                            <img src={errorSvg} alt="error warning" />
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
                                            <img src={errorSvg} alt="error warning" />
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
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>

                            <div className="inputGroup">
                                <Field style={{ color: errors.maDanhMucKhoaHoc ? '#eb5757' : 'unset' }} name="maDanhMucKhoaHoc" type="text" placeholder="Mã danh mục khóa học" as="select" defaultValue={courseEditing.danhMucKhoaHoc.maDanhMucKhoaHoc}>
                                    {errors.maDanhMucKhoaHoc
                                        // && touched.maDanhMucKhoaHoc
                                        &&
                                        <OverlayTrigger
                                            overlay={renderTooltip(errors.maDanhMucKhoaHoc)}>
                                            <img src={errorSvg} alt="error warning" />
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
        case 'newUser':
            return (<Modal show={newUserModal} onHide={() => handleModalClose('newUser')} centered size="sm">
                <div className="modalTitleBox">
                    <h1 className="modal-title">Thêm người dùng mới</h1>
                    <img className="hover" src={closeSvg} alt="close button" onClick={() => handleModalClose('newUser')} />
                </div>
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
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.email ? '#eb5757' : 'unset' }} name="email" type="text" placeholder="email" />
                                {errors.email
                                    && touched.email
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.email)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.matKhau ? '#eb5757' : 'unset' }} name="matKhau" type="password" placeholder="Mật khẩu" />
                                {errors.matKhau
                                    && touched.matKhau
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.matKhau)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.hoTen ? '#eb5757' : 'unset' }} name="hoTen" type="text" placeholder="Họ và Tên" />
                                {errors.hoTen
                                    && touched.hoTen
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.hoTen)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.soDT ? '#eb5757' : 'unset' }} name="soDT" type="text" placeholder="Số điện thoại" />
                                {errors.soDT
                                    && touched.soDT
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.soDT)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.maLoaiNguoiDung ? '#eb5757' : 'unset' }} name="maLoaiNguoiDung" type="text" placeholder="Mã loại người dùng" as="select">
                                    {errors.maLoaiNguoiDung
                                        // && touched.maLoaiNguoiDung
                                        &&
                                        <OverlayTrigger
                                            overlay={renderTooltip(errors.maLoaiNguoiDung)}>
                                            <img src={errorSvg} alt="error warning" />
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
            return (<Modal show={editUserModal} onHide={() => handleModalClose('editUser')} centered size="sm">
                <div className="modalTitleBox">
                    <h1 className="modal-title">Chỉnh sửa người dùng</h1>
                    <img className="hover" src={closeSvg} alt="close button" onClick={() => handleModalClose('editUser')} />
                </div>
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
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.email ? '#eb5757' : 'unset' }} name="email" type="text" placeholder="email" />
                                {errors.email
                                    && touched.email
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.email)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.matKhau ? '#eb5757' : 'unset' }} name="matKhau" type="password" placeholder="Mật khẩu" />
                                {errors.matKhau
                                    && touched.matKhau
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.matKhau)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.hoTen ? '#eb5757' : 'unset' }} name="hoTen" type="text" placeholder="Họ và Tên" />
                                {errors.hoTen
                                    && touched.hoTen
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.hoTen)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.soDT ? '#eb5757' : 'unset' }} name="soDT" type="text" placeholder="Số điện thoại" />
                                {errors.soDT
                                    && touched.soDT
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.soDT)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field style={{ color: errors.maLoaiNguoiDung ? '#eb5757' : 'unset' }} name="maLoaiNguoiDung" type="text" placeholder="Mã loại người dùng" as="select">
                                    {errors.maLoaiNguoiDung
                                        // && touched.maLoaiNguoiDung
                                        &&
                                        <OverlayTrigger
                                            overlay={renderTooltip(errors.maLoaiNguoiDung)}>
                                            <img src={errorSvg} alt="error warning" />
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
        case 'signIn':
            return (<Modal show={signInModal} onHide={() => handleModalClose('signIn')} centered size="sm">
                <div className="modalTitleBox">
                    <h1 className="modal-title">Đăng nhập</h1>
                    <img className="hover" src={closeSvg} alt="close button" onClick={() => handleModalClose('signIn')} />
                </div>

                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={signInSchema}
                    onSubmit={signIn}>

                    {({ errors, touched }) => (
                        <Form>
                            <div className="inputGroup">
                                <Field style={{ color: errors.username ? '#eb5757' : 'unset' }} name="username" type="text" placeholder="Tên đăng nhập" />
                                {errors.username
                                    && touched.username
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.username)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field name="password" type="password" placeholder="Mật khẩu" />
                                {errors.password
                                    && touched.password
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.password)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>
                            <button className="brownSolidBtn" type="submit" style={{ width: '100%', margin: 0 }}>Đăng nhập</button>
                            <p className="hover">Chưa có tài khoản? <b onClick={switchModal}>Đăng ký</b></p>
                        </Form>)}
                </Formik>
            </Modal>
            )
        case 'signUp':
            return (<Modal show={signUpModal} onHide={() => handleModalClose('signUp')} centered size="sm">
                <div className="modalTitleBox">
                    <h1 className="modal-title">Đăng ký</h1>
                    <img className="hover" src={closeSvg} alt="close button" onClick={() => handleModalClose('signUp')} />
                </div>
                <Formik
                    initialValues={{
                        phoneNumber: '',
                        email: '',
                        username: '',
                        fullName: '',
                        password: '',
                        termsAndConditions: false,
                    }}
                    validationSchema={signUpSchema}
                    onSubmit={signUp}>
                    {({ errors, touched }) => (
                        <Form>
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

                            <div className="inputGroup">
                                <Field type="text" style={{ color: errors.fullName ? '#eb5757' : 'unset' }} placeholder="Họ và tên" name="fullName" />
                                {errors.fullName
                                    && touched.fullName
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.fullName)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>

                            <div className="inputGroup">
                                <Field type="text" style={{ color: errors.username ? '#eb5757' : 'unset' }} placeholder="Tên đăng nhập" name="username" />
                                {errors.username
                                    && touched.username
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.username)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>

                            <div className="inputGroup">
                                <Field type="password" placeholder="Mật khẩu" name="password" />
                                {errors.password
                                    && touched.password
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.password)}>
                                        <img src={errorSvg} alt="error warning" />
                                    </OverlayTrigger>}
                            </div>

                            <div className="d-flex">
                                <Field type="checkbox" name="termsAndConditions" id="termsAndConditions" />
                                <label htmlFor="termsAndConditions" style={{ color: errors.termsAndConditions ? '#eb5757' : 'unset' }}> Tôi đồng ý với <b>điều khoản</b> và <b>điều kiện</b> sử dụng dịch vụ</label><br />
                            </div>
                            <div>
                                <button className="brownSolidBtn" style={{ width: '100%', margin: 0 }}>Đăng ký</button>
                                <p className="hover">Đã có tài khoản? <b onClick={switchModal}>Đăng nhập</b></p>
                            </div>
                        </Form>)}
                </Formik>
            </Modal>
            )
        default:
            return 'nothing';
    }
}
