import React from 'react';
import { Link } from 'react-router-dom';

import FacebookPic from '../../images/icons/facebook.png';
import InstagramPic from '../../images/icons/ig-icon.png'
import TwitterPic from '../../images/icons/twitter.png';

//FOOTER Class for better UI


const Footer = () => (
    <div className="bg-dark" id="footer">
        <div className="container py-2"> 
            <div className="row justify-content-center border-bottom border-light py-2">
                <span><p className="h4">FOLLOW US!</p></span>
                <Facebook/>
                <Instagram/>
                <Twitter/>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <p className="h5">Contact Us</p>
                    <ul>
                        <li><a href="#">wushare@gmail.com</a></li>
                        <li><a href="#">1 Brookings Dr, Washington University in St. Louis</a></li>
                    </ul>
                </div>
                <div className="col">
                    <p className="h6">Company</p>
                    <ul>
                        <li><a href="#">Press</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">License</a></li>
                    </ul>
                </div>
                <div className="col">
                    <p className="h6">Discover</p>
                    <ul>
                        <li><a href="#">How WuShare works</a></li>
                    </ul>
                </div>
                <div className="col">
                    <p className="h6">Legal</p>
                    <ul>
                        <li><a href="#">Terms Of Use</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Payment Policy</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

const Facebook = () => (<img className="ml-2" src={FacebookPic} alt="facebook-icon" height="30px" width="30px"></img>);
const Instagram = () => (<img className="ml-2" src={InstagramPic} alt="ig-icon" height="30px" width="30px"></img>);
const Twitter = () => (<img className="ml-2" src={TwitterPic} alt="twitter-icon" height="30px" width="30px"></img>);

export default Footer;