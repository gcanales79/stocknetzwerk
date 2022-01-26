import React from "react";
import { Route, Switch } from "react-router-dom";
import {Row,Col } from "antd";
import MenuTop from "../components/Web/MenuTop";
import Footer from "../components/Web/Footer";

import "./LayoutBasic.scss";

export default function LayoutBasic(props) {
  const { routes } = props;
  

  return(
    <>
    <Row>
      <Col md={4}></Col>
      <Col md={16}>
        <MenuTop/>
        
      </Col>
      <Col md={4}>

      </Col>
    </Row>
    <LoadRouters routes={routes} />
    <Footer/>
    </>
  )
}

function LoadRouters(props) {
  //console.log(props)
  const { routes } = props;
  return (
    <Switch>
    {routes.map((route, index) => (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.component}
      />
    ))}
  </Switch>
  )
}
