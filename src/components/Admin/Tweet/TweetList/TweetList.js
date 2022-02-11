import React from "react";
import { List, Button, Modal, notification } from "antd";
import { EditOutlined, DeleteOutlined,TwitterOutlined } from "@ant-design/icons";
import { getAccessTokenApi } from "../../../../api/auth";
import { deleteTweetApi } from "../../../../api/tweet";
import moment from "moment";

import "./TweetList.scss";

const { confirm } = Modal;

export default function TweetList(props) {
  const { tweets, setReloadTweet, editTweet } = props;

  const deleteTweet = (tweet) => {
    const accessToken = getAccessTokenApi();
    confirm({
      title: "Eliminando Tweet",
      content: `Estas seguro de eliminar el tweet ${tweet.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteTweetApi(accessToken, tweet._id)
          .then((response) => {
            const typeNotification =
              response.code === "200" ? "success" : "warning";
            notification[typeNotification]({
              message: response.message,
            });
            setReloadTweet(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor",
            });
          });
      },
    });
  };

  return (
    <div className="tweet-list">
      <List
        dataSource={tweets.docs}
        renderItem={(tweets) => (
          <Tweet
            tweet={tweets}
            deleteTweet={deleteTweet}
            editTweet={editTweet}
          />
        )}
      />
    </div>
  );
}

function Tweet(props) {
  const { tweet, deleteTweet, editTweet } = props;
  //console.log(tweet)
  if (!tweet.complete) {
    return (
      <List.Item
        actions={[
          <Button type="primary" onClick={() => editTweet(tweet)}>
            <EditOutlined />
          </Button>,
          <Button type="danger" onClick={() => deleteTweet(tweet)}>
            <DeleteOutlined />
          </Button>,
        ]}
      >
        <List.Item.Meta title={tweet.title} />
        <List.Item.Meta description={moment(tweet.date).format("lll")} />
      </List.Item>
    );
  }else{
    return (
        <List.Item
          actions={[
            <Button type="primary" disabled style={{background:"#84b84c", borderColor:"#84b84c"}}>
              <TwitterOutlined />
            </Button>,
            <Button type="danger" onClick={() => deleteTweet(tweet)}>
            <DeleteOutlined />
          </Button>,
           
          ]}
        >
          <List.Item.Meta title={tweet.title} />
          <List.Item.Meta description={moment(tweet.date).format("lll")} />
        </List.Item>
      );
  }
}
