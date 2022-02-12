import React from "react";
import NetzwerkLogo from "../../../assets/img/Logo_netzwerk-menu.jpg"
import {Button} from "antd";
import {MenuFoldOutlined,MenuUnfoldOutlined,PoweroffOutlined} from "@ant-design/icons";
import {logout} from "../../../api/auth"
import "./MenuTop.scss";

export default function MenuTop(props){
    //console.log(props)
    const{menuCollapsed,setMenuCollapsed}=props
    const logoutUser=()=>{
        logout()
        window.location.reload();
    }
    return(
        <div className="menu-top">
            <div className="menu-top__left">
                <img className="menu-top__left-logo"
                src={NetzwerkLogo}
                alt="Netzwerk"
                />
            </div>
            <Button 
            type="link"
            onClick={()=>setMenuCollapsed(!menuCollapsed)}>
              {menuCollapsed?<MenuUnfoldOutlined/>:<MenuFoldOutlined/>}
                </Button>
        <div className="menu-top__right">
            <Button
            type="link"
            onClick={logoutUser}><PoweroffOutlined/></Button>
        </div>
        </div>
    )
}