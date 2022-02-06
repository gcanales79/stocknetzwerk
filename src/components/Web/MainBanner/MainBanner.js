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
                    <h2>Como ser un mejor líder <br/> y fomentar el trabajo en equipo</h2>
                    <h3>Encontraras diferentes materiales que te ayudaran en tu desarrollo personal y profesional. <br/>
                    Que podemos hacer hoy para ser mejores mañana.
                    </h3>
                    </Col>
                <Col lg={4} xs={1}/>
            </Row>
        </div>
    )
}