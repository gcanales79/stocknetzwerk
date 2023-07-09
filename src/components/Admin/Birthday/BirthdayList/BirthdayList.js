import React from "react";
import {Button, Modal, notification, Table,Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { getAccessTokenApi } from "../../../../api/auth";
import { deleteBirthdayApi } from "../../../../api/birthday";
import moment from "moment-timezone";

import "./BirthdayList.scss";

const { confirm } = Modal;

export default function TrackingList(props) {
  const { birthdays, setReloadBirthday, editBirthday } = props;

  //console.log(birthdays)

  const deleteBirthday = (bday) => {
    const accessToken = getAccessTokenApi();
    confirm({
      title: "Eliminando Registro",
      content: `Estas seguro de eliminar el registo de ${bday.name} ${bday.lastname}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteBirthdayApi(accessToken, bday._id)
          .then((response) => {
            const typeNotification =
              response.code === "200" ? "success" : "warning";
            notification[typeNotification]({
              message: response.message,
            });
            setReloadBirthday(true);
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
    { title: "Nombre", dataIndex: "name", responsive:["md"], key: "name" },
    { title: "Apellido", dataIndex: "lastname", key: "lastname" },
    { title: "Posición", dataIndex: "position", key: "position", responsive:["md"] },
    {title:"Cumpleaños", responsive:["md"], key: "bday", render:(_,record)=>(
      <>{moment(record.birthday).format("DD-MMM-YYYY")}</>
    )},
    {title:"Accion",key:"action", render:(text,record)=>(
        <Space size="middle">
            <Button type="primary" onClick={()=>editBirthday(record)}><EditOutlined/></Button>
            <Button type="danger" onClick={() =>deleteBirthday(record)}><DeleteOutlined/></Button>
        </Space>
    )}
  ];

  return (
    <div>
      <Table columns={columns} dataSource={birthdays.docs} rowKey="_id" pagination={false} scroll={{ x: 390 }}/>
    </div>
  );
}