import React from 'react'
import './Rewards.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Rewards() {
    return (
        <div className="rewards">
            <div className="container">
                <h1 className="title">Các giải thưởng</h1>
                <div className="d-flex flex-wrap justify-content-around">
                    <img src="./img/image 1.png" alt='giải thưởng 1' />
                    <img src="./img/image 2.png" alt='giải thưởng 2' />
                    <img src="./img/image 3.png" alt='giải thưởng 3' />
                    <img src="./img/image 4.png" alt='giải thưởng 4' />
                    <img src="./img/image 5.png" alt='giải thưởng 5' />
                    <img src="./img/image 6.png" alt='giải thưởng 6' />
                </div>
            </div>
        </div>
    )
}
