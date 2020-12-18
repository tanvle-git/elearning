import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SubInfo(props) {
    return (
        // <div className="row justify-content-between" style={{ height: '35px', margin: '7.5px 0', width:'100%' }}>
        //     <div className="col-5 d-flex justify-content-around align-items-center" style={{ border: '.5px solid #645A5333', borderRadius: '20px', minWidth:'90px', flex:'1 1 auto' }}>
        //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#645A53cc" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>
        //         <span style={{ lineHeight: '100%', color: '#645A53cc' }}>{props.luotXem}</span>
        //     </div>

        //     <div className="col-5 d-flex justify-content-around align-items-center" style={{ border: '.5px solid #645A5333', borderRadius: '20px', minWidth:'90px' }}>
        //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#645A53cc" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 20l-.86-.86c-1.18-1.18-1.17-3.1.02-4.26l.84-.82c-.39-.04-.68-.06-1-.06-2.67 0-8 1.34-8 4v2h9zm-1-8c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4" /><path d="M16.18 19.78c-.39.39-1.03.39-1.42 0l-2.07-2.09c-.38-.39-.38-1.01 0-1.39l.01-.01c.39-.39 1.02-.39 1.4 0l1.37 1.37 4.43-4.46c.39-.39 1.02-.39 1.41 0l.01.01c.38.39.38 1.01 0 1.39l-5.14 5.18z" /></svg>
        //         <span style={{ lineHeight: '100%', color: '#645A53cc' }}>{props.soLuongHocVien}</span>
        //     </div>

        // </div>
        <div  style={{ height: '35px', padding: ' 0px 7.5px', marginBottom:7.5, gap:'10px', display:'grid',gridTemplateColumns: ' repeat(2, 1fr)', width: '100%' }}>
            <div className="d-flex justify-content-around align-items-center" style={{ border: '.5px solid #645A5333', borderRadius: '20px'}}>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#645A53cc" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>
                <span style={{ lineHeight: '100%', color: '#645A53cc', marginLeft:'15px' }}>{props.luotXem}</span>
                </div>
            </div>

            <div className="d-flex justify-content-around align-items-center" style={{ border: '.5px solid #645A5333', borderRadius: '20px'}}>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#645A53cc" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 20l-.86-.86c-1.18-1.18-1.17-3.1.02-4.26l.84-.82c-.39-.04-.68-.06-1-.06-2.67 0-8 1.34-8 4v2h9zm-1-8c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4" /><path d="M16.18 19.78c-.39.39-1.03.39-1.42 0l-2.07-2.09c-.38-.39-.38-1.01 0-1.39l.01-.01c.39-.39 1.02-.39 1.4 0l1.37 1.37 4.43-4.46c.39-.39 1.02-.39 1.41 0l.01.01c.38.39.38 1.01 0 1.39l-5.14 5.18z" /></svg>
                <span style={{ lineHeight: '100%', color: '#645A53cc', marginLeft:'15px' }}>{props.soLuongHocVien}</span>
                </div>
            </div>

        </div>
    )
}
