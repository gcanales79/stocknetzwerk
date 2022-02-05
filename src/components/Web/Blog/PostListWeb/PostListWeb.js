import React, { useState, useEffect } from "react";
import { Spin, List, notification } from "antd";
import { Link } from "react-router-dom";
import {Helmet} from "react-helmet"
import moment from "moment";
import queryString from "query-string";
import Pagination from "../../../Pagination";
import { getPostsApi } from "../../../../api/post";
import "moment/locale/es";

import "./PostListWeb.scss";

export default function PostListWeb(props) {
  const { location, history } = props;
  const [posts, setPosts] = useState(null);
  const { page = 1 } = queryString.parse(location.search);
  // console.log(page)
  useEffect(() => {
    getPostsApi(12, page)
      .then((response) => {
        if (response?.code !== "200") {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setPosts(response.posts);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor",
        });
      });
  }, [page]);

  // console.log(posts);

  if (!posts) {
    return (
      <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }}></Spin>
    );
  }

  return (
    <>
    <Helmet>
      <title>Blog | Netzwerk </title>
    </Helmet>
    <div className="posts-list-web">
      <h1>Blog</h1>
      <List
        itemLayout="horizontal"
        dataSource={posts.docs}
        renderItem={(post) => <Post post={post} />}
      />
      <Pagination post={posts} location={location} history={history} />
    </div>
    </>
  );
}

function Post(props) {
  const { post } = props;
  console.log(post.date);
  const day = moment(post.date).format("DD");
  const month = moment(post.date).format("MMMM");
  console.log(day);
  return (
    <List.Item className="post">
      <div className="post__date">
        <span>{day}</span>
        <span>{month}</span>
      </div>
            <List.Item.Meta 
            title={<Link to={`/blog/${post.url}`}>{post.title}</Link> }/>
    </List.Item>
  );
}
