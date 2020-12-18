import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserProfile.scss'
import { getUserInfo } from '../../redux/actions/UserAction'
import axios from 'axios';
import { DOMAIN, TOKEN, USER_LOGIN } from '../../ultity/WebConfig';
import { connect, useSelector, useDispatch } from 'react-redux';

export default function UserProfile() {
    const accessToken = useSelector(state => state.UserReducer.userLogin.accessToken);
    const username = useSelector(state => state.UserReducer.userLogin.taiKhoan);
    const dispatch = useDispatch();
    const GetUserInfo = () => {
        console.log('đã nhấn');
        let bearer = 'Bearer ' + accessToken;
        let userLocal = JSON.parse(localStorage.getItem(USER_LOGIN));
        // console.log(bearer);
        console.log(accessToken);
        console.log(bearer);
        let url= DOMAIN + '/api/QuanLyNguoiDung/ThongTinTaiKhoan';
        axios({
            url: DOMAIN + '/api/QuanLyNguoiDung/ThongTinTaiKhoan',
            method: 'POST',
            headers: {
                Authorization: bearer,
            },
            data: {
                taiKhoan: username,
            }
        }).then(res => {
            console.log('kết quả', res.data);
        }).catch(err => {
            console.log(err.response.data)
        })


    }

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <button onClick={() => { GetUserInfo() }}>get</button>
            <div className="userCardProfile">
                <div className="row">
                    <div className="col-5">
                        <h1 className="title">Tài khoản của tôi</h1>
                        <div className="row">
                            <div className="col-5">
                                <p>
                                    Tên tài khoản:
                                    <br />
                                    Họ và Tên:
                                    <br />
                                    Email:
                                    <br />
                                    Số điện thoại:
                                    <br />
                                    Mật khẩu:
                                </p>
                            </div>
                            <div className="col-5">
                                <p>
                                    Tên tài khoản:
                                    <br />
                                    Họ và Tên:
                                    <br />
                                    Email:
                                    <br />
                                    Số điện thoại:
                                    <br />
                                    Mật khẩu:
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="306" viewBox="0 0 70 306" fill="none">
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

                    <div className="col-5">
                        <h1 className="title">Tài khoản của tôi</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
