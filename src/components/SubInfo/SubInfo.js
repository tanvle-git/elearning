import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './SubInfo.scss'
import viewSvg from '../../assets/view.svg'
import peopleCheckSvg from '../../assets/peopleCheck.svg'

export default function SubInfo(props) {
    return (
        <div className="subInfo">
            <div className="subInfoItem">
                <div>
                    <img src={viewSvg} alt="view icon" />
                    <span className="subInfoText">{props.luotXem}</span>
                </div>
            </div>

            <div className="subInfoItem">
                <div>
                    <img src={peopleCheckSvg} alt="people icon" />
                    <span className="subInfoText">{props.soLuongHocVien}</span>
                </div>
            </div>

        </div>
    )
}
