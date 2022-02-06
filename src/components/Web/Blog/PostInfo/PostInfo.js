import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Spin, notification, Col, Row } from "antd";
import moment from "moment";
import { getBlogApi } from "../../../../api/blog";
import "moment/locale/es";
import SocialShare from "../../SocialShare"

import "./PostInfo.scss";

export default function PostInfo(props) {
  const { url } = props;
  // console.log(url)
  const [postInfo, setPostInfo] = useState(null);

  //console.log(postInfo);
  useEffect(() => {
    getBlogApi(url)
      .then((response) => {
        if (response.code !== "200") {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setPostInfo(response.post);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor",
        });
      });
  }, [url]);

  if (!postInfo) {
    return (
      <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }}></Spin>
    );
  }

  return (
    <>
      <Helmet>
        <title>{postInfo.title} | Netzwerk</title>
      </Helmet>
      <div className="post-info">
        <h1 className="post-info__title">{postInfo.title}</h1>
        <div className="post-info__creation-date">
          {moment(postInfo.createdAt).local("es").format("LL")}
        </div>
          <Row> 
            <Col lg={6} md={4} xs={1}/>
            <Col lg={17} md={17} xs={22}>
              <img className="post-info__image"
                src={`https://netzwerk.mx/${postInfo.image}`}
                alt={postInfo.image_alt}
              />
            </Col>
            <Col lg={1} md={1} xs={1} />
          </Row>
        <Row>
          <Col md={2} xs={1}/>
          <Col md={20} xs={22}>
            <div
              className="post-info__description"
              dangerouslySetInnerHTML={{ __html: postInfo.description }}
            />
          </Col>
          <Col md={2} xs={1}/>
        </Row>
        <Row>
          <Col md={2} xs={1}/>
          <Col md={20} xs={22}>
            <SocialShare url={url}/>
          </Col>
          <Col md={2} xs={1}/>
        </Row>
      </div>
      ;
    </>
  );
}
