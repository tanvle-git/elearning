import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './WhyUs.scss'

export default function WhyUs() {
    return (
        <div className="whyUs">
            <div className="container">
                <div className="row">
                    <div className="d-none d-lg-block col-lg-5">
                        <img src="./img/iphoneMockup.png" alt="E-learning every where" width="100%" />
                    </div>
                    <div className="col-12 col-lg-7">
                        <h1 className="title">Tại sao E-learning?</h1>
                        <p className="text">
                            E-Learning tự hào là tổ chức giáo dục miễn phí trực tuyến số 1
                            Việt Nam. Được thành lập năm 2020 đến nay, E-learning đã tổ chức
                            thành công hàng trăm khóa học miễn phí, đồng hành cùng hàng ngàn
                            học viên trên bước đường thành công. Khi đã giành được vị trí tin
                            tưởng trong người tiêu dùng, E-learning cố gắng tiếp tục ra mắt
                            thêm nhiều khóa học, mang tri thức đến tất cả mọi người, và quan
                            trọng là <b>TẤT CẢ ĐỀU MIỄN PHÍ</b>.
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}
