import React, { useState,useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import MenuTop from "../components/Admin/MenuTop/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
import AdminSignIn from "../pages/Admin/SignIn/SignIn";
import useAuth from "../hooks/useAuth";

import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
  //console.log(props)
  const { routes } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  // const [windowWidth,setWindowWidth] = useState(window.innerWidth)
  const { Header, Footer, Content } = Layout;
  const { user, isLoading } = useAuth();

  const windowWidth=window.innerWidth;

  //console.log(user);
  //console.log(isLoading)

  useEffect(()=>{
    if(windowWidth<768){
      setMenuCollapsed(true)
    }
  },[windowWidth])
  

  if (!user && !isLoading) {
    return (
      <>
        <Route path="/admin/login" component={AdminSignIn} />
        <Redirect to="/admin/login" />
      </>
    );
  }

  if (user && !isLoading) {
    return (
      <Layout>
        <MenuSider menuCollapsed={menuCollapsed} />
        <Layout
          className="layout-admin"
          style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
        >
          <Header className="layout-admin__header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className="layout-admin__content">
            <LoadRouters routes={routes} />
          </Content>
          <Footer className="layout-admin__footer">Netzwerk</Footer>
        </Layout>
      </Layout>
    );
  }

  return null;
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
  );
}
