import React from 'react';
import {FacebookShareButton,FacebookIcon,
    LinkedinShareButton,LinkedinIcon,
TwitterShareButton,TwitterIcon,
WhatsappShareButton,WhatsappIcon,
EmailShareButton,EmailIcon} from "react-share"

import "./SocialShare.scss";

export default function SocialShare(props) {
    const {url}=props;
    console.log(url)
  return <div className="social-share">
      <FacebookShareButton className="social-share__button" url={`http://104.248.125.58/blog/${url}`} >
      <FacebookIcon className="social-share"size={32} round={true} />
      </FacebookShareButton>

      <LinkedinShareButton className="social-share__button" url={`http://104.248.125.58/blog/${url}`} >
      <LinkedinIcon className="social-share__icon"size={32} round={true} />
      </LinkedinShareButton>

       <TwitterShareButton className="social-share__button" url={`http://104.248.125.58/blog/${url}`} >
      <TwitterIcon className="social-share"size={32} round={true} />
      </TwitterShareButton>

      <WhatsappShareButton className="social-share__button" url={`http://104.248.125.58/blog/${url}`} >
      <WhatsappIcon className="social-share__icon"size={32} round={true} />
      </WhatsappShareButton>

      <EmailShareButton className="social-share__button" url={`http://104.248.125.58/blog/${url}`} >
      <EmailIcon className="social-share__icon"size={32} round={true} />
      </EmailShareButton>
      
  </div>;
}
