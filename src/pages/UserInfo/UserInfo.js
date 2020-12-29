import React, { useEffect } from 'react';
import {  useSelector, useDispatch } from 'react-redux';
import './UserInfo.scss';
import { selectUserEditAction } from '../../redux/actions/UserAction';
import {  setModal } from '../../redux/actions/UserSettingActions';
import { getUserCoursesDetailAction } from '../../redux/actions/CoursesManageActions'
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import AdminTableGroup from '../../components/AdminTableGroup/AdminTableGroup';

export default function UserInfo(props) {

    const taiKhoan = props.match.params.id
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getUserCoursesDetailAction(taiKhoan)) }, [dispatch,taiKhoan]);
    const userList = useSelector(state => state.UserReducer.userList);
    const haveNotJoined = useSelector(state => state.CoursesReducer.userCoursesDetail.haveNotJoined);
    const pendingCourses = useSelector(state => state.CoursesReducer.userCoursesDetail.pendingCourses);
    const haveJoined = useSelector(state => state.CoursesReducer.userCoursesDetail.haveJoined);
    const userInfo = userList[userList.findIndex(a => a.taiKhoan === taiKhoan)];
    const editUser = (Obj) => {
        dispatch(setModal({ modal: 'editUser', value: true }));
        dispatch(selectUserEditAction(Obj));
    }
    return (
        <div className="container userCardProfileParent" style={{ marginTop: '80px' }}>
            <div className="userCardProfile">
                <div className="row">
                    <div className="col-lg-7 col-md-8 col-12 mainUserInfo">
                        <div className="d-flex  align-items-center">
                            <h1 className="title">Tài khoản người dùng</h1>
                            <button onClick={() => editUser(userInfo)}>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 172 172"><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}><path d="M0,172v-172h172v172z" fill="none" /><g fill="#645a53"><path d="M130.88125,17.2c-2.93403,0 -5.86843,1.12051 -8.10729,3.35938l-13.84062,13.84063l28.66667,28.66667l13.84062,-13.84063c4.47773,-4.47773 4.47773,-11.73685 0,-16.21458l-12.45208,-12.45208c-2.23887,-2.23887 -5.17326,-3.35937 -8.10729,-3.35937zM97.46667,45.86667l-67.31068,67.31067c0,0 5.26186,-0.47147 7.22266,1.48933c1.9608,1.9608 0.34669,14.792 2.75469,17.2c2.408,2.408 15.15831,0.71299 16.98724,2.54192c1.82894,1.82893 1.70209,7.43542 1.70209,7.43542l67.31067,-67.31067zM22.93333,131.86667l-5.40859,15.31875c-0.21262,0.60453 -0.32239,1.24042 -0.32474,1.88125c0,3.16643 2.5669,5.73333 5.73333,5.73333c0.64083,-0.00235 1.27672,-0.11212 1.88125,-0.32474c0.0187,-0.00737 0.03737,-0.01483 0.05599,-0.02239l0.14557,-0.04479c0.01122,-0.00743 0.02242,-0.01489 0.03359,-0.0224l15.08359,-5.31901l-8.6,-8.6z" /></g></g></svg></button>

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
                            <div className="col-7">{userInfo?.tenLoaiNguoiDung}</div>
                        </div>
                    </div>
                    <div className="col-1 d-none d-lg-block" style={{ padding: '15px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 70 306" fill="none">
                            <g clipPath="url(#clip0)">
                                <path d="M70 1.97419L70 0L0.0861053 -3.05603e-06L0.0861053 1.97419L70 1.97419Z" fill="black" />
                                <path d="M70 7.89677L70 5.92258L0.0861053 5.92257L0.0861053 7.89677L70 7.89677Z" fill="black" />
                                <path d="M70 13.8194L70 9.87097L0.0861053 9.87097L0.0861052 13.8194L70 13.8194Z" fill="black" />
                                <path d="M70 19.7419L70 15.7935L0.0861053 15.7935L0.0861052 19.7419L70 19.7419Z" fill="black" />
                                <path d="M70 23.6903L70 21.7161L0.0861053 21.7161L0.0861053 23.6903L70 23.6903Z" fill="black" />
                                <path d="M70 29.6129L70 25.6645L0.0861053 25.6645L0.0861052 29.6129L70 29.6129Z" fill="black" />
                                <path d="M70 33.5613L70 31.5871L0.0861053 31.5871L0.0861053 33.5613L70 33.5613Z" fill="black" />
                                <path d="M70 39.4839L70 35.5355L0.0861053 35.5355L0.0861052 39.4839L70 39.4839Z" fill="black" />
                                <path d="M70 45.4064L70 43.4323L0.0861053 43.4322L0.0861053 45.4064L70 45.4064Z" fill="black" />
                                <path d="M70 49.3548L70 47.3806L0.0861053 47.3806L0.0861053 49.3548L70 49.3548Z" fill="black" />
                                <path d="M70 53.3032L70 51.329L0.0861053 51.329L0.0861053 53.3032L70 53.3032Z" fill="black" />
                                <path d="M70 59.2258L70 57.2516L0.0861053 57.2516L0.0861053 59.2258L70 59.2258Z" fill="black" />
                                <path d="M70 63.1742L70 61.2L0.0861053 61.2L0.0861053 63.1742L70 63.1742Z" fill="black" />
                                <path d="M70 69.0968L70 65.1484L0.0861053 65.1484L0.0861052 69.0968L70 69.0968Z" fill="black" />
                                <path d="M70 75.0193L70 71.071L0.0860977 71.071L0.0860975 75.0193L70 75.0193Z" fill="black" />
                                <path d="M70 78.9677L70 76.9935L0.0860977 76.9935L0.0860976 78.9677L70 78.9677Z" fill="black" />
                                <path d="M70 84.8903L70 80.9419L0.0860977 80.9419L0.0860975 84.8903L70 84.8903Z" fill="black" />
                                <path d="M70 88.8387L70 86.8645L0.0860977 86.8645L0.0860976 88.8387L70 88.8387Z" fill="black" />
                                <path d="M70 92.7871L70 90.8129L0.0860977 90.8129L0.0860976 92.7871L70 92.7871Z" fill="black" />
                                <path d="M70 100.684L70 96.7355L0.0860977 96.7355L0.0860975 100.684L70 100.684Z" fill="black" />
                                <path d="M70 106.606L70 102.658L0.0860977 102.658L0.0860975 106.606L70 106.606Z" fill="black" />
                                <path d="M70 110.555L70 108.581L0.0860977 108.581L0.0860976 110.555L70 110.555Z" fill="black" />
                                <path d="M70 116.477L70 112.529L0.0860977 112.529L0.0860975 116.477L70 116.477Z" fill="black" />
                                <path d="M70 122.4L70 120.426L0.0861053 120.426L0.0861053 122.4L70 122.4Z" fill="black" />
                                <path d="M70 126.348L70 124.374L0.0861053 124.374L0.0861053 126.348L70 126.348Z" fill="black" />
                                <path d="M70 132.271L70 128.323L0.0861053 128.323L0.0861052 132.271L70 132.271Z" fill="black" />
                                <path d="M70 136.219L70 134.245L0.0861053 134.245L0.0861053 136.219L70 136.219Z" fill="black" />
                                <path d="M70 140.168L70 138.194L0.0861053 138.194L0.0861053 140.168L70 140.168Z" fill="black" />
                                <path d="M70 146.09L70 144.116L0.0861053 144.116L0.0861053 146.09L70 146.09Z" fill="black" />
                                <path d="M70 152.013L70 148.065L0.0861053 148.065L0.0861052 152.013L70 152.013Z" fill="black" />
                                <path d="M70 157.936L70 153.987L0.0861053 153.987L0.0861052 157.935L70 157.936Z" fill="black" />
                                <path d="M70 161.884L70 159.91L0.0861053 159.91L0.0861053 161.884L70 161.884Z" fill="black" />
                                <path d="M70 165.832L70 163.858L0.0861053 163.858L0.0861053 165.832L70 165.832Z" fill="black" />
                                <path d="M70 171.755L70 167.806L0.0861053 167.806L0.0861052 171.755L70 171.755Z" fill="black" />
                                <path d="M70 177.677L70 175.703L0.086113 175.703L0.0861129 177.677L70 177.677Z" fill="black" />
                                <path d="M70 181.626L70 179.652L0.086113 179.652L0.0861129 181.626L70 181.626Z" fill="black" />
                                <path d="M70 185.574L70 183.6L0.086113 183.6L0.0861129 185.574L70 185.574Z" fill="black" />
                                <path d="M70 191.497L70 187.548L0.086113 187.548L0.0861128 191.497L70 191.497Z" fill="black" />
                                <path d="M70 195.445L70 193.471L0.086113 193.471L0.0861129 195.445L70 195.445Z" fill="black" />
                                <path d="M70 203.342L70 199.394L0.086113 199.394L0.0861128 203.342L70 203.342Z" fill="black" />
                                <path d="M70 207.29L70 205.316L0.086113 205.316L0.0861129 207.29L70 207.29Z" fill="black" />
                                <path d="M70 213.213L70 209.265L0.086113 209.265L0.0861128 213.213L70 213.213Z" fill="black" />
                                <path d="M70 217.161L70 215.187L0.086113 215.187L0.0861129 217.161L70 217.161Z" fill="black" />
                                <path d="M70 225.058L70 221.11L0.0861053 221.11L0.0861052 225.058L70 225.058Z" fill="black" />
                                <path d="M70 229.006L70 227.032L0.0861053 227.032L0.0861053 229.006L70 229.006Z" fill="black" />
                                <path d="M70 232.955L70 230.981L0.0861053 230.981L0.0861053 232.955L70 232.955Z" fill="black" />
                                <path d="M70 236.903L70 234.929L0.0861053 234.929L0.0861053 236.903L70 236.903Z" fill="black" />
                                <path d="M70 242.826L70 238.877L0.0861053 238.877L0.0861052 242.826L70 242.826Z" fill="black" />
                                <path d="M70 246.774L70 244.8L0.0861053 244.8L0.0861053 246.774L70 246.774Z" fill="black" />
                                <path d="M70 254.671L70 250.723L0.0861053 250.723L0.0861052 254.671L70 254.671Z" fill="black" />
                                <path d="M70 258.619L70 256.645L0.0861053 256.645L0.0861053 258.619L70 258.619Z" fill="black" />
                                <path d="M70 262.568L70 260.594L0.0861053 260.594L0.0861053 262.568L70 262.568Z" fill="black" />
                                <path d="M70 266.516L70 264.542L0.0861053 264.542L0.0861053 266.516L70 266.516Z" fill="black" />
                                <path d="M70 274.413L70 270.464L0.0861053 270.464L0.0861052 274.413L70 274.413Z" fill="black" />
                                <path d="M70 280.335L70 276.387L0.0861053 276.387L0.0861052 280.335L70 280.335Z" fill="black" />
                                <path d="M70 284.284L70 282.31L0.0861053 282.31L0.0861053 284.284L70 284.284Z" fill="black" />
                                <path d="M70 290.206L70 288.232L0.0861053 288.232L0.0861053 290.206L70 290.206Z" fill="black" />
                                <path d="M70 296.129L70 292.181L0.0861053 292.181L0.0861052 296.129L70 296.129Z" fill="black" />
                                <path d="M70 302.052L70 298.103L0.0861053 298.103L0.0861052 302.052L70 302.052Z" fill="black" />
                                <path d="M70 306L70 304.026L0.0861053 304.026L0.0861053 306L70 306Z" fill="black" />
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="306" height="69.9139" fill="white" transform="translate(70) rotate(90)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>

                    <div className="col-4 d-none d-md-flex subUserInfo justify-content-end align-items-end" style={{ backgroundColor: userInfo?.maLoaiNguoiDung === 'GV' ? '#fd4646' : '#645a53' }}>
                        <div >
                            <div className=" d-sm-none d-md-block">
                                Loại tài khoản:
                            <br />
                                {userInfo?.tenLoaiNguoiDung}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <AdminTableGroup type="courseOfUser" haveNotJoined={haveNotJoined} pendingCourses={pendingCourses} haveJoined={haveJoined} taiKhoan={taiKhoan}/>
            <ModalComponent type='editUser' />
        </div>

    )
}
