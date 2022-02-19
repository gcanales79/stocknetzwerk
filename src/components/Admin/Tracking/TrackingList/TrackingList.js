import React from "react";
import { List, Button, Modal, notification, Table,Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { getAccessTokenApi } from "../../../../api/auth";
import { deleteTrackingApi } from "../../../../api/track";
import moment from "moment";

import "./TrackingList.scss";

const { confirm } = Modal;

export default function TrackingList(props) {
  const { trackings, setReloadTracking, editTracking } = props;

//   console.log(trackings)

  const deleteTracking = (tracking) => {
    const accessToken = getAccessTokenApi();
    confirm({
      title: "Eliminando Tracking",
      content: `Estas seguro de eliminar el tweet ${tracking.tracking}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteTrackingApi(accessToken, tracking._id)
          .then((response) => {
            const typeNotification =
              response.code === "200" ? "success" : "warning";
            notification[typeNotification]({
              message: response.message,
            });
            setReloadTracking(true);
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
    { title: "Descripción", dataIndex: "description", key: "description" },
    { title: "Tracking", dataIndex: "tracking", key: "tracking" },
    { title: "Courier", dataIndex: "carrier", key: "carrier", responsive:["md"] },
    {title:"Status",dataIndex:"status", key: "status" },
    {title:"ETA",dataIndex:"eta", key: "eta", render:text=>(moment({text}).format("DD-MMM-YYYY"))},
    {title:"Accion",key:"action", render:(text,record)=>(
        <Space size="middle">
            <Button type="primary" onClick={()=>editTracking(record)}><EditOutlined/></Button>
            <Button type="danger" onClick={() =>deleteTracking(record)}><DeleteOutlined/></Button>
        </Space>
    )}
  ];

  return (
    <div>
      <Table columns={columns} dataSource={trackings.docs} rowKey="_id" pagination={false} scroll={{ x: 900 }}/>
    </div>
  );
}
