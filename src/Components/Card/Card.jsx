import React from 'react'
import './Card.css'
import { BsExclamationSquareFill } from "react-icons/bs";

const imgurl = 'https://images.pexels.com/photos/7752846/pexels-photo-7752846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

function Card() {
  return (
    <div className="card_container">
        <div className="cardHeading">
            <span className="card_id">CAM-11</span>
            <div className="user_profile">
                <img src={imgurl} alt="profile picture" className="profile_img"/>
                <div className="online_status"></div>
            </div>
        </div>

        <div className="card_title">Conduct Security Vulnerability Assessment</div>
        
        <div className="update_container">
            <div className="update_noti">
                <BsExclamationSquareFill className='update_icon'/>
            </div>
            <div className="feature_req">
                <span className='featureReqStatus'></span>
                Feature Request
            </div>
        </div>
    </div>
  )
}

export default Card