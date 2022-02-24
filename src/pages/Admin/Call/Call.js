import React, { useState, useEffect } from "react";
import {notification, Spin } from "antd";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import { getCallsApi } from "../../../api/call";
import { getAccessTokenApi } from "../../../api/auth";
import CallList from "../../../components/Admin/CallsList";
import Pagination from "../../../components/Pagination";


import "./Call.scss";

function Call(props) {
  const { location, history } = props;
  const [calls, setCalls] = useState(null);
  const [reloadCalls, setReloadCalls] = useState(false);
  const { page = 1 } = queryString.parse(location.search);

  //console.log(calls)

  useEffect(() => {
    //El numero dice cuantos sale por pagina
    const token= getAccessTokenApi();
    getCallsApi(12, page,token)
      .then((response) => {
        if (response?.code !== "200") {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setCalls(response.calls);
        }
      })
      .catch(() => {
        notification["error"] = {
          message: "Error del servidor",
        };
      });
    setReloadCalls(false);
  }, [page, reloadCalls]);

  if (!calls) {
    return (
      <Spin
        tip="Cargando"
        style={{ width: "100%", padding: "200px 200px" }}
      ></Spin>
    );
  }



  return (
    <div className="calls">
      
      <CallList
        calls={calls}
        setReloadCalls={setReloadCalls}
      />
      <Pagination post={calls} location={location} history={history} />
    </div>
  )
}

export default withRouter(Call);
