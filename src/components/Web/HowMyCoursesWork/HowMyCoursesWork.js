import React from 'react';
import {Row, Col, Card} from "antd";
import {ClockCircleOutlined,KeyOutlined,MessageOutlined,UserOutlined, DollarOutlined,CheckCircleOutlined} from "@ant-design/icons";

import "./HowMyCoursesWork.scss"

export default function HowMyCoursesWork() {
    return (
        <Row className="how-my-courses-work">
            <Col lg={24} className="how-my-courses-work__title">
                <h2>¿Cómo funcionan mis cursos?</h2>
                <h3>Cada curso cuenta con contendio bajo la web de Udemy, activa las 24 horas al dia los 365 dias del año</h3>
            </Col>
            <Col lg={4}></Col>
            <Col lg={16}>
                <Row className="row-cards">
                    <Col md={8}>
                        <CardInfo icon={<ClockCircleOutlined/>}
                        title="Cursos y Clases"
                        description="Cursos de entre 10 y 30 horas y cada clase del curso con duración máxima de 10 minutos, faciles de llevar en tu dia a dia de aprendizaje "/>
                    </Col>
                    <Col md={8}>
                        <CardInfo icon={<KeyOutlined/>}
                        title="Acceso 24/7"
                        description="Accede a los cursos en cualquier momento, desde cualquier lugar sin importar dia y hora"/>
                    </Col>
                    <Col md={8}>
                        <CardInfo icon={<MessageOutlined/>}
                        title="Aprendizaje Colaborativo"
                        description="Aprende de los demás dejando tus dudas para que profesores y compañeros te ayuden"/>
                    </Col>
                </Row>
                <Row className="row-cards">
                    <Col md={8}>
                        <CardInfo icon={<UserOutlined/>}
                        title="Mejora tu perfil"
                        description="Aprende y mejora tu perfil para mantenerte informado de actualizaciones "/>
                    </Col>
                    <Col md={8}>
                        <CardInfo icon={<DollarOutlined/>}
                        title="Precios bajos"
                        description="Obtén el curso que necesitas por solo 9.99 y ten acceso a el por tiempo ilimitado y soporte ilimitado"/>
                    </Col>
                    <Col md={8}>
                        <CardInfo icon={<CheckCircleOutlined/>}
                        title="Certificados de Finalización"
                        description="Al completar tu un curso recibiras una certificacion que te expedira Udemy en PDF."/>
                    </Col>
                </Row>
            </Col>
            <Col lg={4}></Col>
        </Row>
    )
}

function CardInfo(props){
    const{icon,title,description}=props;
    const {Meta}=Card;
    return(
        <Card className="how-my-courses-work__card">
        <Meta 
        avatar={icon}
        title={title} 
        description={description}/>

        </Card>
    )
}
