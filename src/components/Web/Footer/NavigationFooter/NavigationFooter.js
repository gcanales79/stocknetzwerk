import React from 'react';
import {Row,Col} from "antd";
import {BookOutlined, CodeOutlined,DatabaseOutlined,RightOutlined,HddOutlined,
AppstoreAddOutlined,UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";


import "./NavigationFooter.scss";

export default function NavigationFooter() {
    return (
        <Row className="navigation-footer">
            <Col md={24}>
            <h3>Navegación</h3>
            </Col>
            <Col md={12}>
                <RenderListLeft/>
            </Col>
            <Col md={12}>
            <RenderListRight/>
            </Col>
        </Row>
    )
}

function RenderListLeft(){
    return(
        <ul>
            <li>
                <a href="#">
                    <BookOutlined/> Sistemas / Servidores
                </a>
            </li>
            <li>
                <a href="#">
                    <CodeOutlined/> Desarrollo Web
                </a>
            </li>
            <li>
                <a href="#">
                    <DatabaseOutlined/> Base de Datos
                </a>
            </li>
            <li>
                <a href="#">
                    <RightOutlined/> Politica de Privacidad
                </a>
            </li>
        </ul>
    )
}

function RenderListRight(){
    return(
        <ul>
            <li>
                <a href="#">
                    <HddOutlined/> Cursos Online
                </a>
            </li>
            <li>
                <a href="#">
                    <AppstoreAddOutlined/> CMS
                </a>
            </li>
            <li>
                <a href="#">
                    <UserOutlined/> Portfolio
                </a>
            </li>
            <li>
                <a href="#">
                    <RightOutlined/> Politica de Cookies
                </a>
            </li>
        </ul>
    )
}