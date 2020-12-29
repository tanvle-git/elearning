import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.scss';
import '../Buttons/Button.scss';
import Modal from 'react-bootstrap/Modal';
import { signInAction, signUpAction } from '../../redux/actions/UserAction';
import { setModal } from '../../redux/actions/UserSettingActions';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Fragment } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector, useDispatch } from 'react-redux';


export default function HeaderGuest() {

    const signInModal = useSelector(state => state.UserSettingReducer.modal.signIn);
    const signUpModal = useSelector(state => state.UserSettingReducer.modal.signUp);

    const handleSignInClose = () => dispatch(setModal({ modal: 'signIn', value: false }));
    const handleSignInModal = () => dispatch(setModal({ modal: 'signIn', value: true }));
    const handleSignUpClose = () => dispatch(setModal({ modal: 'signUp', value: false }));
    const handleSignUpModal = () => dispatch(setModal({ modal: 'signUp', value: true }));
    const switchModal = () => {
        dispatch(setModal({ modal: 'signIn', value: !signInModal }));
        dispatch(setModal({ modal: 'signUp', value: !signUpModal }));
    }

    const dispatch = useDispatch();

    const signIn = (values) => {
        const { username, password } = values;
        dispatch(signInAction({ username, password }));
    }
    const signUp = (values) => {
        const { phoneNumber, email, username, fullName, password } = values;
        dispatch(signUpAction({
            phoneNumber, email, username, fullName, password
        }));
    }

    const signInSchema = Yup.object().shape({
        username: Yup.string()
            .min(5, 'Tối thiểu 5 ký tự!')
            .max(20, 'Tối đa 20 ký tự!')
            .required('Bắt buộc!')
            .matches(/^[a-zA-Z0-9_.-]*$/, 'Tên đăng nhập không hợp lệ!'),
        password: Yup.string()
            .required('Bắt buộc!'),
    });
    const signUpSchema = Yup.object().shape({
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
        password: Yup.string()
            .min(5, 'Tối thiểu 5 ký tự!')
            .required('Bắt buộc!'),
        termsAndConditions: Yup.boolean()
            .oneOf([true], "Bắt buộc!"),
    });

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" >
             {/* <Tooltip id="button-tooltip" {...props} > why we need do that? */}
            {props}
        </Tooltip>
    );

    return (
        <Fragment>
            <button className="brownOutlineBtn d-none d-sm-block" onClick={handleSignUpModal} >Đăng ký</button>
            <button className="brownSolidBtn  d-none d-sm-block" onClick={handleSignInModal}>Đăng nhập</button>
            <Dropdown>
                <Dropdown.Toggle className="d-block d-sm-none" variant="outline-secondary" id="dropdown-basic">
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleSignUpModal} >Đăng ký</Dropdown.Item>
                    <Dropdown.Item onClick={handleSignInModal} >Đăng nhập</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Modal show={signUpModal} onHide={handleSignUpClose} centered size="sm">
                <div className="d-flex justify-content-between mb-4"><h1 className="modal-title">Đăng ký</h1><img src="./img/close.svg" alt="close button" onClick={handleSignUpClose} /></div>
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
                                        <img src="./img/error.svg"  alt="error warning"/>
                                    </OverlayTrigger>}
                            </div>

                            <div className="inputGroup">
                                <Field type="text" style={{ color: errors.email ? '#eb5757' : 'unset' }} placeholder="Email" name="email" />
                                {errors.email
                                    && touched.email
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.email)}>
                                        <img src="./img/error.svg" alt="error warning"/>
                                    </OverlayTrigger>}
                            </div>

                            <div className="inputGroup">
                                <Field type="text" style={{ color: errors.fullName ? '#eb5757' : 'unset' }} placeholder="Họ và tên" name="fullName" />
                                {errors.fullName
                                    && touched.fullName
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.fullName)}>
                                        <img src="./img/error.svg" alt="error warning"/>
                                    </OverlayTrigger>}
                            </div>

                            <div className="inputGroup">
                                <Field type="text" style={{ color: errors.username ? '#eb5757' : 'unset' }} placeholder="Tên đăng nhập" name="username" />
                                {errors.username
                                    && touched.username
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.username)}>
                                        <img src="./img/error.svg" alt="error warning"/>
                                    </OverlayTrigger>}
                            </div>

                            <div className="inputGroup">
                                <Field type="password" placeholder="Mật khẩu" name="password" />
                                {errors.password
                                    && touched.password
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.password)}>
                                        <img src="./img/error.svg" alt="error warning"/>
                                    </OverlayTrigger>}
                            </div>

                            <div className="d-flex">
                                <Field type="checkbox" name="termsAndConditions" id="termsAndConditions" />
                                <label htmlFor="termsAndConditions" style={{ color: errors.termsAndConditions ? '#eb5757' : 'unset' }}> Tôi đồng ý với <b>điều khoản</b> và <b>điều kiện</b> sử dụng dịch vụ</label><br />
                            </div>
                            <div>
                                <button className="brownSolidBtn" style={{ width: '100%', margin: 0 }}>Đăng ký</button>
                                <p>Đã có tài khoản? <b onClick={switchModal}>Đăng nhập</b></p>
                            </div>
                        </Form>)}
                </Formik>


            </Modal>

            <Modal show={signInModal} onHide={handleSignInClose} centered size="sm">
                <div className="d-flex justify-content-between mb-4"><h1 className="modal-title">Đăng nhập</h1><img src="./img/close.svg" alt="close button" onClick={handleSignInClose} /></div>

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
                                        <img src="./img/error.svg" alt="error warning"/>
                                    </OverlayTrigger>}
                            </div>
                            <div className="inputGroup">
                                <Field name="password" type="password" placeholder="Mật khẩu" />
                                {errors.password
                                    && touched.password
                                    &&
                                    <OverlayTrigger
                                        overlay={renderTooltip(errors.password)}>
                                        <img src="./img/error.svg" alt="error warning"/>
                                    </OverlayTrigger>}
                            </div>
                            <button className="brownSolidBtn" type="submit" style={{ width: '100%', margin: 0 }}>Đăng nhập</button>
                            <p>Chưa có tài khoản? <b onClick={switchModal}>Đăng ký</b></p>
                        </Form>)}

                </Formik>

            </Modal>

        </Fragment>
    )
}
