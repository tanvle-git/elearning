import React from 'react'
import './Footer.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import Facebook from '../../assets/Facebook-144.png'
import Linkedin from '../../assets/Linkedin-144.png'
import Youtube from '../../assets/Play-button-144.png'
import Twitter from '../../assets/Twitter-squared-144.png'

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 companyInfo">
                        <p>
                            Công ty cổ phần Công nghệ và phát triển Đào tạo E-Learning
                            <br />
                            MST: xxxxxxxxxx do Sở kế hoạch và Đầu tư thành phố Hồ Chí Minh cấp
                            ngày DD tháng MM năm YYYY
                            <br />
                            Địa chỉ: Số A đường B, Phường C, Quận D, thành phố Hồ Chí Minh
                            <br />
                            Hotline: 1800xxxx - Email: example@company.com
                            </p>
                    </div>
                    <div className="col-md-6 companyInfo" style={{display:'flex', flexDirection:'column'}}>
                        <span>Theo dõi chúng tôi tại:</span>
                        <div className="socialNetwork">
                            <img src={Facebook} alt="facebook button icon" />
                            <img src={Linkedin} alt="linkedin button icon" />
                            <img src={Youtube} alt="youtube button icon" />
                            <img src={Twitter} alt="twitter button icon" />
                        </div>
                    </div>
                </div>
                <hr />
                <p className="copyright">Copyright © 2020 Le Van Tan</p>
            </div>
        </footer>


    )
}
