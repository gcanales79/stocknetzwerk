import React, { useState, useEffect } from "react";
import { Popover,Menu } from "antd";
import { Link } from "react-router-dom";
import logoBlack from "../../../assets/img/Logo_netzwerk-menu.jpg";
import { getMenuApi } from "../../../api/menu";
import SocialLinks from "../SocialLinks";
import {
  MenuOutlined,
} from "@ant-design/icons";

import "./MenuTopMobile.scss";




export default function Menutop() {
  const [menuData, setMenuData] = useState([]);
  const [popoverStatus, setPopoverStatus] = useState(false);


  //console.log(menuData)

  useEffect(() => {
    getMenuApi().then((response) => {
      //console.log(response.menu)
      const arrayMenu = [];
      response.menu.forEach((item) => {
        if (item.active) {
          arrayMenu.push(item);
        }
      });
      setMenuData(arrayMenu);
    });
  }, []);

  const clickPopover=()=>{
      console.log("Popover")
    setPopoverStatus(!popoverStatus)
  }


  return (
    <Menu className="menu-top-web-mobile" mode="horizontal">
      <Menu.Item key="logo" className="menu-top-web__logo">
        <Link to={"/"}>
          <img src={logoBlack} alt="Netzwerk Logo"></img>
        </Link>
      </Menu.Item>
      <Menu.Item key="popover" className="menu-top-web__logo">
        <Popover 
        onClick={()=>clickPopover()}
        visible={popoverStatus}
        content={
           menuData.map((item) => {
            const external = item.url.indexOf("http") > -1 ? true : false;
            if (external) {
              return (
                <p key={item._id} className="menu-top-web__item">
                  <a href={item.url} onClick={()=>clickPopover()} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </p>
              );
            }
    
            return (
              <p key={item._id} className="menu-top-web__item">
                <Link to={item.url} onClick={()=>clickPopover()}>{item.title}</Link>
              </p>
            );
          })
        }><MenuOutlined/></Popover>
      </Menu.Item>
     
      <SocialLinks />
    </Menu>
  );
}
