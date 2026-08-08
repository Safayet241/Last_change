import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>Connecting varsity students with the comfort of home. Authentic district dishes, traditional root foods, and nostalgic regional flavors—delivered straight to your campus dorm.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>

        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delevery</li>
            <li>Privacy policy</li>
          </ul>

        </div>
        <div className="footer-content-right">
              <h2>GET IN TOUCH</h2>
              <ul>
                <li>01737-254414</li>
                <li>ahsafayet100@gmail.com</li>
              </ul>

        </div>
      </div>
      <hr />
      <p className="footer-copyright">© 2026 FoodLink All Rights Reserved.</p>
    </div>
  )
}

export default Footer