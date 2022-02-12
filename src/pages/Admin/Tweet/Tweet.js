import React, { useState, useEffect } from "react";
import { Button, notification, Spin } from "antd";
import Modal from "../../../components/Modal";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import { getTweetsApi } from "../../../api/tweet";
import TweetList from "../../../components/Admin/Tweet/TweetList";
import Pagination from "../../../components/Pagination";
import AddEditTweetForm from "../../../components/Admin/Tweet/AddEditTweetForm";

import "./Tweet.scss";

function Tweet(props) {
  const { location, history } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [tweets, setTweets] = useState(null);
  const [reloadTweet, setReloadTweet] = useState(false);
  const { page = 1 } = queryString.parse(location.search);

  //   console.log(tweets)

  useEffect(() => {
    //El numero dice cuantos sale por pagina
    getTweetsApi(12, page)
      .then((response) => {
        if (response?.code !== "200") {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setTweets(response.tweets);
        }
      })
      .catch(() => {
        notification["error"] = {
          message: "Error del servidor",
        };
      });
    setReloadTweet(false);
  }, [page, reloadTweet]);

  if (!tweets) {
    return (
      <Spin
        tip="Cargando"
        style={{ width: "100%", padding: "200px 200px" }}
      ></Spin>
    );
  }

  const addTweet = () => {
    //console.log("Add Tweet");
    setIsVisibleModal(true);
    setModalTitle("Creando Nuevo Tweet");
    setModalContent(
      <AddEditTweetForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadTweet={setReloadTweet}
        tweet={null}
      />
    );
  };

  const editTweet = (tweet) => {
    //console.log("Editando Tweet");
        setIsVisibleModal(true);
        setModalTitle("Editar Post")
        setModalContent(
          <AddEditTweetForm
          setIsVisibleModal={setIsVisibleModal}
          setReloadTweet={setReloadTweet}
          tweet={tweet}
          />
          )
  };

  //console.log(location);
  //console.log(queryString.parse(location.search).page)
  //console.log(page)

  return (
    <div className="tweet">
      <div className="tweet__add-tweet">
        <Button type="primary" onClick={() => addTweet()}>
          Nuevo Tweet
        </Button>
      </div>
      <TweetList
        tweets={tweets}
        setReloadTweet={setReloadTweet}
        editTweet={editTweet}
      />
      <Pagination post={tweets} location={location} history={history} />
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

export default withRouter(Tweet);
