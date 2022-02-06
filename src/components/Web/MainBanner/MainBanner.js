import React from 'react';
import {Row,Col} from "antd";

import "./MainBanner.scss";

export default function MainBanner(){
    return(
        <div className="main-banner">
            <div className="main-banner__dark"/>
            <Row>
                <Col lg={4} xs={1}/>
                <Col lg={16} xs={22}>
                    <h2>Aprende nuevas <br/> tecnologias web y movil</h2>
                    <h3>Aprende a través de cursos prácticos, consiscos, actualizacdos, creado por <br/>
                    profesionales con años de experiencia.
                    </h3>
                    </Col>
                <Col lg={4} xs={1}/>
            </Row>
        </div>
    )
}