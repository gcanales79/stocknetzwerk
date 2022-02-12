import React, { useState, useEffect} from "react";
import { Row, Col, Form, Input, Button, DatePicker, notification } from "antd";
import { FontSizeOutlined,TwitterOutlined} from "@ant-design/icons";
import moment from "moment";
import { getAccessTokenApi } from "../../../../api/auth";
import { addTweetApi, updateTweetApi } from "../../../../api/tweet";

import "./AddEditTweetForm.scss";

const {TextArea}=Input;

export default function AddEditPostForm(props) {
  const { setIsVisibleModal, setReloadTweet, tweet } = props;
  const [tweetData, setTweetData] = useState({});   

  useEffect(() => {
    if (tweet) {
      setTweetData(tweet);
    } else {
      setTweetData({});
    }
  }, [tweet]);

  const processTweet = () => {
    const { title, comment, date } = tweetData;
    if (!title || !comment || !date) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      if (!tweet) {
        //console.log("Creando Post")
        // console.log(postData)
        addTweet();
      } else {
        //console.log("Editando post")
        // console.log(postData)
        updateTweet();
      }
    }
  };

  const addTweet = () => {
    const token = getAccessTokenApi();
    addTweetApi(token, tweetData)
      .then((response) => {
        const typeNotification =
          response.code === "200" ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setReloadTweet(true);
        setTweetData({});
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor",
        });
      });
  };

  const updateTweet = () => {
    const token = getAccessTokenApi();
    updateTweetApi(token, tweet._id, tweetData)
      .then((response) => {
        //   console.log(response)
        const typeNotification =
          response.code === "200" ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setReloadTweet(true);
        setTweetData({});
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
        tweetData={tweetData}
        setTweetData={setTweetData}
        tweet={tweet}
        processTweet={processTweet}
      />
    </div>
  );
}

function AddEditForm(props) {
  const { tweetData, setTweetData, tweet, processTweet } = props;
  //console.log(postData);

  return (
    <Form
      className="add-edit-tweet-form"
      layout="horizontal"
      onFinish={processTweet}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Input
            prefix={<FontSizeOutlined />}
            placeholder="Titulo"
            value={tweetData.title}
            onChange={(e) =>
              setTweetData({ ...tweetData, title: e.target.value })
            }
          />
        </Col>
        <Col span={12}>
          <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY HH:mm:ss"
            placeholder="Fecha de Publicación"
            showTime={{ defaultValue: moment("00:000:00", "HH:mm:ss") }}
            value={tweetData.date && moment(tweetData.date)}
            onChange={(e, value) =>
              setTweetData({
                ...tweetData,
                date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString(),
              })
            }
          />
        </Col>
      </Row>
      <Row>
          <Col span={24}>
          <TextArea
            prefix={<TwitterOutlined />}
            spellcheck="true"
            placeholder="Tweet"
            autosize
            value={tweetData.comment}
            onChange={(e) =>
              setTweetData({ ...tweetData, comment: e.target.value })
            }/>
          </Col>
      </Row>
    
      <Button type="primary" htmlType="submit" className="btn-submit">
        {tweet ? "Actualizar Tweet" : "Crear Tweet"}
      </Button>
    </Form>
  );
}
