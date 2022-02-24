import React from "react";
import {Button, Modal, notification, Table,Space } from "antd";
import {
  DeleteOutlined
} from "@ant-design/icons";
import { getAccessTokenApi } from "../../../api/auth";
import { deleteCallApi } from "../../../api/call";
import moment from "moment";

import "./CallList.scss";

const { confirm } = Modal;

export default function TrackingList(props) {
  const { calls, setReloadCalls} = props;

//   console.log(trackings)

  const deleteCall = (call) => {
    const accessToken = getAccessTokenApi();
    confirm({
      title: "Eliminando Registro",
      content: `Estas seguro de eliminar el registo ${call.CallSid}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteCallApi(accessToken, call._id)
          .then((response) => {
            const typeNotification =
              response.code === "200" ? "success" : "warning";
            notification[typeNotification]({
              message: response.message,
            });
            setReloadCalls(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor",
            });
          });
      },
    });
  };

  const columns = [
    { title: "ID", dataIndex: "CallSid", key: "callSid", responsive:["md"] },
    { title: "Caller", dataIndex: "Caller", key: "caller" },
    { title: "Country", dataIndex: "CallerCountry", key: "country", responsive:["md"] },
    {title:"Date",dataIndex:"RecordingStartTime", key: "date", render:text=>(moment({text}).format("DD-MMM-YYYY"))},
    {title:"Audio",dataIndex:"RecordingUrl",key:"url",render:text=>(
      <audio src={text} controls></audio>
    )
  },
    {title:"Accion",key:"action", render:(text,record)=>(
        <Space size="middle">
            <Button type="danger" onClick={() =>deleteCall(record)}><DeleteOutlined/></Button>
        </Space>
    )}
  ];

  return (
    <div>
      <Table columns={columns} dataSource={calls.docs} rowKey="_id" pagination={false} scroll={{ x: 390 }}/>
    </div>
  );
}
