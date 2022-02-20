import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Button, notification, Select } from "antd";
import { FontSizeOutlined, NumberOutlined, PhoneOutlined } from "@ant-design/icons";
import { getAccessTokenApi } from "../../../../api/auth";
import { addTrackingApi, updateTrackingApi } from "../../../../api/track";

import "./AddEditTrackingForm.scss";

const { Option } = Select;

export default function AddEditTrackingForm(props) {
  const { setIsVisibleModal, setReloadTracking, track } = props;
  const [trackingData, setTrackingData] = useState({});

  //console.log(track)

  useEffect(() => {
    if (track) {
      setTrackingData(track);
    } else {
      setTrackingData({});
    }
  }, [track]);

  const processTracking = () => {
    const { description, tracking, phone, carrier } = trackingData;
    if (!description || !tracking || !phone || !carrier) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      if (!track) {
        // console.log("Creando Post")
        // console.log(postData)
        addTracking();
      } else {
        // console.log("Editando post")
        // console.log(postData)
        updateTracking();
      }
    }
  };

  const addTracking = () => {
    const token = getAccessTokenApi();
    // console.log(trackingData);
    addTrackingApi(token, trackingData)
      .then((response) => {
        const typeNotification =
          response.code === "200" ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setReloadTracking(true);
        setTrackingData({});
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor",
        });
      });
  };

  const updateTracking = () => {
    const token = getAccessTokenApi();
    updateTrackingApi(token, track._id, trackingData)
      .then((response) => {
        //   console.log(response)
        const typeNotification =
          response.code === "200" ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setReloadTracking(true);
        setTrackingData({});
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
        trackingData={trackingData}
        setTrackingData={setTrackingData}
        track={track}
        processTracking={processTracking}
      />
    </div>
  );
}

function AddEditForm(props) {
  const { trackingData, setTrackingData, track, processTracking } = props;
  //console.log(trackingData);

  return (
    <Form
      className="add-edit-tracking-form"
      layout="horizontal"
      onFinish={processTracking}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Input
            prefix={<FontSizeOutlined />}
            placeholder="Descripción"
            value={trackingData.description}
            onChange={(e) =>
              setTrackingData({ ...trackingData, description: e.target.value })
            }
          />
        </Col>
        <Col span={12}>
          <Input
            prefix={<NumberOutlined />}
            placeholder="Tracking"
            value={trackingData.tracking}
            onChange={(e) =>
              setTrackingData({ ...trackingData, tracking: e.target.value })
            }
          />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Input
            prefix={<PhoneOutlined />}
            placeholder="Phone"
            value={trackingData.phone}
            onChange={(e) =>
              setTrackingData({ ...trackingData, phone: e.target.value })
            }
          />
        </Col>
        <Col span={12}>
          <Select 
          showSearch
          placeholder="Selecciona un courier..."
          optionFilterProp="children"
          onChange={(e) =>
            setTrackingData({ ...trackingData, carrier: e })
          }
          value={trackingData.carrier}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          >
            <Option value="DHLExpress">DHL</Option>
            <Option value="Fedex">Fedex</Option>
            <Option value="UPS">UPS</Option>
            <Option value="Estafeta">Estafeta</Option>
          </Select>
        </Col>
      </Row>

      <Button type="primary" htmlType="submit" className="btn-submit">
        {track ? "Actualizar Tracking" : "Crear Tracking"}
      </Button>
    </Form>
  );
}
