import React, { Fragment, useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Detail.scss'
import { getCourseDetail } from '../../redux/actions/CoursesManageActions';
import { setModal } from '../../redux/actions/UserSettingActions';
import { joinCourseAction, cancelCourseAction, getUserInfoAction } from '../../redux/actions/UserAction'
import TopCourses from '../../components/TopCourses/TopCourses';
import SubInfo from '../../components/SubInfo/SubInfo';
import '../../components/Buttons/Button.scss'

export default function Detail(props) {
    const userInfo = useSelector(state => state.UserReducer.userInfo)
    const joinedCourses = useSelector(state => state.CoursesReducer.joinedCourses);
    const { courseDetail } = useSelector(state => state.CoursesReducer);
    console.log(courseDetail);

    const handleSignInModal = () => dispatch(setModal({ modal: 'signIn', value: true }));
    const dispatch = useDispatch();
    console.log(userInfo.taiKhoan ? 'đã đăng nhập' : 'chưa đăng nhập');
    useEffect(() => {
        if (courseDetail.maKhoaHoc !== props.match.params.id) {
            console.log("render");
            dispatch(getCourseDetail(props.match.params.id));
        }
    }, []);

    const joinCourse = () => {
        dispatch(joinCourseAction(props.match.params.id, userInfo.taiKhoan));
    };

    const cancelCourse = () => {
        dispatch(cancelCourseAction(props.match.params.id, userInfo.taiKhoan));
    }

    const renderRedButton = () => {
        // console.log(joinedCourses.findIndex(x => x === 'BackEnd_0001'));
        if (userInfo.taiKhoan === undefined) {
            return <button className="redSolidBtn mediumBtn" onClick={() => handleSignInModal()}>Đăng nhập</button>

        } else if (joinedCourses.findIndex(x => x === courseDetail.maKhoaHoc) !== -1) {
            console.log('render nút xóa');
            return <button className="redSolidBtn mediumBtn" onClick={() => cancelCourse()}>Hủy ghi danh</button>
        } else {
            console.log('render nút thêm');
            return <button className="redSolidBtn mediumBtn" onClick={() => joinCourse()}>Ghi danh ngay</button>
        }
    }

    const detailRender = () => {

        return <div style={{ width: '100%', overflow: 'hidden', paddingBottom: '30px' }}>
            <div className="container" style={{ paddingTop: 100 }}>
                <div className="row">
                    <div className="col-md-7 col-lg-8 col-xl-9">
                        <div className="topContent courseHeader">
                            <style dangerouslySetInnerHTML={{ __html: `.courseHeader::before{background-image: url("${courseDetail.hinhAnh}");}` }} />
                            <h1 className="title">
                                Khóa học <br />
                                {courseDetail.tenKhoaHoc}
                            </h1>
                            <p>
                                Ngày tạo: {courseDetail.ngayTao} <br />
                            Tạo bởi: {courseDetail.nguoiTao.hoTen} - {courseDetail.nguoiTao.tenLoaiNguoiDung} <br />
                            Danh mục: {courseDetail.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                            </p>
                        </div>
                        <div className="bottomContent">
                            <h1 className="title">
                                Mô tả
                        </h1>
                            <p>
                                {courseDetail.moTa}
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et mattis velit. Sed interdum pharetra nulla, at suscipit augue tincidunt vulputate. Pellentesque eget arcu in tortor tincidunt consectetur sed ut dui. Cras sit amet lectus non dui malesuada pellentesque. Pellentesque porta leo id tempor cursus. Suspendisse sed finibus orci. Donec ultrices convallis euismod. Phasellus maximus ultrices viverra. Pellentesque sodales sollicitudin turpis ac dictum. Aenean pretium porttitor lorem, nec blandit turpis commodo et. Aliquam sit amet tincidunt felis. Nunc nec interdum elit, ac dignissim nisl. Aenean quis euismod ligula, ac dictum justo. Maecenas vitae sem tellus.
                            <br /><br />
                            Mauris suscipit sapien nec lorem suscipit eleifend. Aenean elementum sagittis mi. Morbi tempus arcu eget magna hendrerit egestas. Phasellus blandit nisi eu est fringilla, id pharetra tortor varius. Donec vehicula volutpat sapien. Vivamus venenatis vel orci at lobortis. Phasellus semper sapien leo, consectetur porta lectus tristique id. Nulla eget cursus sem. Praesent ut pretium ipsum. Maecenas sed lacinia metus.
                             </p>
                        </div>
                    </div>
                    <div className="col-md-5 col-lg-4 col-xl-3">
                        <div className="cardDetail">
                            <img src={courseDetail.hinhAnh} alt={courseDetail.tenKhoaHoc} width="100%" />


                            <div className="d-flex flex-column" style={{ margin: ' 7.5px 30px 15px 30px' }}>
                                <SubInfo luotXem={courseDetail.luotXem} soLuongHocVien={courseDetail.soLuongHocVien} />
                                {renderRedButton()}
                                <button className="redOutlineBtn mediumBtn">Thêm vào yêu thích</button>
                                <button className="redOutlineBtn mediumBtn">Chia sẻ</button>

                                <hr style={{ margin: '15px 0' }} />
                                <p>
                                    E-Learning luôn miễn phí
                                <br />
                                Học trên máy tính và ứng dụng di động
                                <br />
                                Cộng đồng thảo luận luôn sẵn sàng
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    return (
        <Fragment>
            {detailRender()}
            <TopCourses />
        </Fragment>
    )
}
