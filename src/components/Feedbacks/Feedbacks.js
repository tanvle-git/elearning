import React from 'react'
import './Feedbacks.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';

export default function Feedbacks() {

    const feedbacks = useSelector(state => state.FeedbackReducer.feedback);
    const feedbacksRender = () => {
        return feedbacks.map((feedback, index) => {
            return <div className="col-lg-6" key={index}>
                <div className="feedback_item align-items-center">
                    <div className="row">
                        <div className="col-sm-6 d-flex align-items-center justify-content-center">
                            <div>
                                <img className="feedbackPicture" src={feedback.avt} alt={feedback.nguoiDung} />
                                <p className="feedbackName">{feedback.nguoiDung}<br /><span>{feedback.chucDanh}</span></p>
                            </div>
                        </div>
                        <div className="col-sm-6 d-flex align-items-center">
                            <p className="feedbackContent">{feedback.binhLuan}</p>
                        </div>
                    </div>
                </div>
            </div>
        })
    }
    return (
        <div className="feedback">
            <div className="container">
                <h1 className="title" style={{ marginLeft: 23 }}>Các học viên nghĩ gì về E-learning?</h1>
                <div className="row">
                    {feedbacksRender()}
                </div>
            </div>
        </div>
    )
}
