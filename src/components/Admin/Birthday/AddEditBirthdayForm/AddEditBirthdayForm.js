import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Button, notification, DatePicker } from "antd";
import { FontSizeOutlined, LaptopOutlined, CalendarOutlined } from "@ant-design/icons";
import { getAccessTokenApi } from "../../../../api/auth";
import { addBirthdayApi, updateBirthdayApi } from "../../../../api/birthday";


import "./AddEditBirthdayForm.scss";


export default function AddEditBirthdayForm(props) {
  const { setIsVisibleModal, setReloadBirthday, bday } = props;
  const [bdayData, setBdayData] = useState({});

  //console.log(moment(bday.birthday))



  useEffect(() => {
    if (bday) {
      setBdayData(bday);
    } else {
      setBdayData({});
    }
  }, [bday]);

  const processBday = () => {
    const { name, lastname, position, birthday } = bdayData;
    if (!name || !lastname || !position || !birthday) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      if (!bday) {
        // console.log("Creando Post")
        // console.log(postData)
        addBirthday();
      } else {
        // console.log("Editando post")
        // console.log(postData)
        updateBirthday();
      }
    }
  };

  const addBirthday = () => {
    const token = getAccessTokenApi();
    // console.log(bdayData);
    addBirthdayApi(token, bdayData)
      .then((response) => {
        const typeNotification =
          response.code === "200" ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setReloadBirthday(true);
        setBdayData({});
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor",
        });
      });
  };

  const updateBirthday = () => {
    const token = getAccessTokenApi();
    updateBirthdayApi(token, bday._id, bdayData)
      .then((response) => {
        //   console.log(response)
        const typeNotification =
          response.code === "200" ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setReloadBirthday(true);
        setBdayData({});
      })
      .catch((error) => {
        notification["error"]({
          message: "Error del servidor Update",
        });
      });
  };

  return (
    <div className="add-edit-post-form">
      <AddEditForm
        bdayData={bdayData}
        setBdayData={setBdayData}
        bday={bday}
        processBday={processBday}
      />
    </div>
  );
}

function AddEditForm(props) {
  const { bdayData, setBdayData, bday, processBday } = props;
  //console.log(moment(bdayData.birthday));


  return (
    <Form
      className="add-edit-birthday-form"
      layout="horizontal"
      onFinish={processBday}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Input
            prefix={<FontSizeOutlined />}
            placeholder="Nombre"
            value={bdayData.name}
            onChange={(e) =>
              setBdayData({ ...bdayData, name: e.target.value })
            }
          />
        </Col>
        <Col span={12}>
          <Input
            prefix={<FontSizeOutlined />}
            placeholder="Apellido"
            value={bdayData.lastname}
            onChange={(e) =>
              setBdayData({ ...bdayData, lastname: e.target.value })
            }
          />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Input
            prefix={<LaptopOutlined />}
            placeholder="Position"
            value={bdayData.position}
            onChange={(e) =>
              setBdayData({ ...bdayData, position: e.target.value })
            }
          />
        </Col>
        <Col span={12}>
        <DatePicker
            prefix={<CalendarOutlined />}
            placeholder="Cumpleaños"
            onChange={(e) =>
              setBdayData({ ...bdayData, birthday: e })
            }
          />
        </Col>
      </Row>

      <Button type="primary" htmlType="submit" className="btn-submit">
        {bday ? "Actualizar Registro" : "Crear Registro"}
      </Button>
    </Form>
  );
}