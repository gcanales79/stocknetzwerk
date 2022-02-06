import React from 'react';
// import {ReactComponent as YouTubeIcon} from "../../../assets/img/youtube.svg";
import {ReactComponent as TwitterIcon} from "../../../assets/img/twitter.svg";
import {ReactComponent as FacebookIcon} from "../../../assets/img/facebook.svg";
import {ReactComponent as LinkedinIcon} from "../../../assets/img/linkedin.svg";

import "./SocialLinks.scss";

export default function SocialLinks(){
    return(
        <div className="social-links">
            {/* <a href="/" className="youtube" target="_blank" rel="noopener noreferrer"><YouTubeIcon/></a> */}
            <a href="https://twitter.com/Netzwerk13" className="twitter" target="_blank" rel="noopener noreferrer"><TwitterIcon/></a>
            <a href="https://www.linkedin.com/in/gustavo-canales-66a9b25/" className="linkedin" target="_blank" rel="noopener noreferrer"><LinkedinIcon/></a>
            <a href="https://www.facebook.com/netzwerkmx/" className="facebook" target="_blank" rel="noopener noreferrer"><FacebookIcon/></a>
        </div>
    )
}