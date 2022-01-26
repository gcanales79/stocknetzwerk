import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import logoBlack from "../../../assets/img/Logo_netzwerk.png";
import { getMenuApi } from "../../../api/menu";
import SocialLinks from "../SocialLinks";

import "./MenuTop.scss";

export default function Menutop() {
  const [menuData, setMenuData] = useState([]);

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

  return (
      <Menu className="menu-top-web" mode="horizontal">
          
        <Menu.Item key="logo" className="menu-top-web__logo">
          <Link to={"/"}>
            <img src={logoBlack} alt="Netzwerk Logo"></img>
          </Link>
        </Menu.Item>
        {menuData.map((item) => {
          const external = item.url.indexOf("http") > -1 ? true : false;
          if (external) {
            return (
              <Menu.Item key={item._id} className="menu-top-web__item">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </Menu.Item>
            );
          }

          return (
            <Menu.Item key={item._id} className="menu-top-web__item">
              <Link to={item.url}>{item.title}</Link>
            </Menu.Item>
          );
        })}
       <SocialLinks/>
      </Menu>
  );
}
