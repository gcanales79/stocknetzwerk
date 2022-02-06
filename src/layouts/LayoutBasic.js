import React from "react";
import { Route, Switch } from "react-router-dom";
import {Row,Col } from "antd";
import MenuTop from "../components/Web/MenuTop";
import MenuTopMobile from "../components/Web/MenuTopMobile";
import Footer from "../components/Web/Footer";

import "./LayoutBasic.scss";

export default function LayoutBasic(props) {
  const { routes } = props;
  const windowWidth=window.innerWidth;
  // console.log(windowWidth)
  

  return(
    <>
    <Row>
      <Col md={4} sm={3} xs={1}/>
      <Col md={16} sm={18} xs={22}>
       {windowWidth<=800?<MenuTopMobile/>:<MenuTop/>}
        
      </Col>
      <Col md={4} sm={3} xs={1}/>
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
