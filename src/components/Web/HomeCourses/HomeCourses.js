import React from "react";
import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";
import reactJsHooks from "../../../assets/img/react-js-hooks.jpg";
import reactNative from "../../../assets/img/react-native.jpg";
import javaScript from "../../../assets/img/javascript-es6.jpg";
import wordPress from "../../../assets/img/wordpress.jpg";
import prestaShop from "../../../assets/img/prestashop-1-7.jpg";
import cssGrid from "../../../assets/img/css-grid.jpg";

import "./HomeCourses.scss";

export default function HomeCourses() {
  return (
    <Row className="home-courses">
      <Col lg={24} className="home-courses__title">
        <h2>Aprende y mejora tus habilidades</h2>
      </Col>
      <Col lg={4} />
      <Col lg={16}>
          <Row classname="row-courses">
              <Col md={6}><CardCourse 
              image={reactJsHooks} 
              title="React JS Hooks"
              subtitle="Intermedio - React/Javascript"
              link="https://netzwerk.mx/"/></Col>
              <Col md={6}><CardCourse 
              image={reactNative} 
              title="React Native Expo"
              subtitle="Intermedio - React/Javascript"
              link="https://netzwerk.mx/"/></Col>
              <Col md={6}><CardCourse 
              image={javaScript} 
              title="JavaScript ES6"
              subtitle="Básico - Javascript"
              link="https://netzwerk.mx/"/></Col>
              <Col md={6}><CardCourse 
              image={wordPress} 
              title="WordPress"
              subtitle="Básico - WordPress"
              link="https://netzwerk.mx/"/></Col>
              
          </Row>
          <Row className="row-courses">
          <Col md={6}><CardCourse 
              image={prestaShop} 
              title="PrestaShop 1.7"
              subtitle="Básico - PrestaShop"
              link="https://netzwerk.mx/"/>
              </Col>
              <Col md={6}></Col>
              <Col md={6}></Col>
              <Col md={6}><CardCourse 
              image={cssGrid} 
              title="CSSGrid"
              subtitle="Intermedio - CSSt"
              link="https://netzwerk.mx/"/></Col>
          </Row>
      </Col>
      <Col lg={4} />
      <Col lg={24} className="home-courses__more">
          <Link to="/courses"><Button>Ver Mas</Button></Link>
      </Col>
    </Row>
  );
}

function CardCourse(props){
    const {image,title,subtitle,link}=props;
    const {Meta}=Card

    return(
        <a href={link} targe="_blank" rel="noopener noreferrer">
            <Card className="home-courses__card"
            cover={<img src={image} alt={title}/>}
            actions={[<Button>Ingresar</Button>]}
            hoverable={true}
            >
            <Meta title={title} description={subtitle}/>      
            </Card>
        </a>
    )
}
