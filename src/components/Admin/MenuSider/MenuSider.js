import React from 'react';
import {Link,withRouter} from "react-router-dom";
import {Layout, Menu} from "antd";
import {HomeOutlined,UserOutlined,MenuOutlined,BookOutlined,
    MessageOutlined,TwitterOutlined,MailOutlined,PhoneOutlined,AlertOutlined} from "@ant-design/icons";

import "./MenuSider.scss";

function MenuSider(props){
    const{menuCollapsed,location}=props;
    const {Sider}=Layout;
    //console.log(location.pathname);

    return (
       <Sider
       className="admin-sider" 
       collapsed={menuCollapsed}>
           <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
               <Menu.Item key="/admin">
                   <Link to={"/admin"}>
                    <HomeOutlined/>
                    <span className="nav-text">Home</span>
                   </Link>
               </Menu.Item>
               <Menu.Item key="/admin/users">
                   <Link to={"/admin/users"}>
                    <UserOutlined/>
                    <span className="nav-text">Usuarios</span>
                   </Link>
               </Menu.Item>
               <Menu.Item key="/admin/menu">
                   <Link to={"/admin/menu"}>
                    <MenuOutlined/>
                    <span className="nav-text">Menu</span>
                   </Link>
               </Menu.Item>
               <Menu.Item key="/admin/courses">
                   <Link to={"/admin/courses"}>
                    <BookOutlined/>
                    <span className="nav-text">Cursos</span>
                   </Link>
               </Menu.Item>
               <Menu.Item key="/admin/blog">
                   <Link to={"/admin/blog"}>
                    <MessageOutlined/>
                    <span className="nav-text">Blog</span>
                   </Link>
               </Menu.Item>
               <Menu.Item key="/admin/tweet">
                   <Link to={"/admin/tweet"}>
                    <TwitterOutlined/>
                    <span className="nav-text">Tweet</span>
                   </Link>
               </Menu.Item>
               <Menu.Item key="/admin/tracking">
                   <Link to={"/admin/tracking"}>
                    <MailOutlined/>
                    <span className="nav-text">Tracking</span>
                   </Link>
               </Menu.Item>
               <Menu.Item key="/admin/calls">
                   <Link to={"/admin/calls"}>
                    <PhoneOutlined/>
                    <span className="nav-text">Llamadas</span>
                   </Link>
               </Menu.Item>
               <Menu.Item key="/admin/birthday">
                   <Link to={"/admin/birthday"}>
                    <AlertOutlined/>
                    <span className="nav-text">Birthday</span>
                   </Link>
               </Menu.Item>
           </Menu>
       </Sider>
    )
}

export default withRouter(MenuSider);