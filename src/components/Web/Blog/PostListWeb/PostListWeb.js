import React, { useState, useEffect } from "react";
import { Spin, List, notification } from "antd";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import moment from "moment";
import queryString from "query-string";
import Pagination from "../../../Pagination";
// import { getPostsApi } from "../../../../api/post";
import { getBlogsApi } from "../../../../api/blog";
import "moment/locale/es";

import "./PostListWeb.scss";

export default function PostListWeb(props) {
  const { location, history } = props;
  const [posts, setPosts] = useState(null);
  const { page = 1 } = queryString.parse(location.search);
  // console.log(page)
  useEffect(() => {
    getBlogsApi(12, page)
      .then((response) => {
        //console.log(response)
        if (response?.code !== "200") {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setPosts(response);
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
      <Spin tip="Cargando" style={{ width: "100%", padding: "200px 200px" }}></Spin>
    );
  }

  return (
    <>
      <Helmet>
      <title>Netzwerk | Blog</title>
        <meta
          name="description"
          content="Blog donde hablo de liderazgo y trabajo en equipo. Si quieres mejorar el desempeño de tu equipo de trabajo o si buscas mejorar en tu trabajo te recomiendo que me visites regularmente."
          data-react-helmet="true"
        />
        <meta
          name="keywords"
          content="liderazgo, crisis, administración, equipo, disciplina, colaboración, persuasión, asertividad, resolución de problemas, confianza, inteligencia emocional, liderazgo participativo, proactividad"
          data-react-helmet="true"
        />
         <meta
          name="robots"
          content="index,follow"
          data-react-helmet="true"
        />
        
        {/*Twitter Tags*/}
         <meta
          name="twitter:card"
          content="summary_large_image"
          data-react-helmet="true"
        />
        <meta
          name="twitter:title"
          content="Blog acerca de temas de liderazgo y desarrollo de equipos"
          data-react-helmet="true"
        />
        <meta
          name="twitter:description"
          content="Blog donde quisiera compartir mis experiencias, lo que voy aprendiendo en el camino y me gustaria escuchar de ti."
          data-react-helmet="true"
        />
        <meta
          name="twitter:site"
          content="@netzwerk13"
          data-react-helmet="true"
        />
         <meta
          name="twitter:creator"
          content="@netzwerk13"
          data-react-helmet="true"
        />
        <meta
          name="twitter:image"
          content="https://netzwerk.mx/assets/dist/img/Logo_netzwerk.png"
          data-react-helmet="true"
        />
        {/*Og Tags*/ }
        <meta
          name="og:type"
          content="article"
          data-react-helmet="true"
        /> 
        {/* <meta
        name="og:url"
        content="article"
        data-react-helmet="true"
      /> */}
       <meta
          name="og:title"
          content="Netzwerk"
          data-react-helmet="true"
        />
        <meta
          name="og:description"
          content="Blog donde quisiera compartir mis experiencias, lo que voy aprendiendo en el camino y me gustaria escuchar de ti."
          data-react-helmet="true"
        />
        <meta
          name="article:author"
          content="@netzwerk13"
          data-react-helmet="true"
        />
        {/* <meta
          name="article:published_date"
          content="article"
          data-react-helmet="true"
        /> */}
        <meta
          name="og:image"
          content="https://netzwerk.mx/assets/dist/img/Logo_netzwerk.png"
          data-react-helmet="true"
        />
      </Helmet>
      <div className="posts-list-web">
        <h1>Blog</h1>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={posts.data}
          renderItem={(post) => <Post post={post} />}
        />
        <Pagination post={posts} location={location} history={history} />
      </div>
    </>
  );
}

function Post(props) {
  const { post } = props;
  //console.log(post.date);
  const day = moment(post.createdAt).format("LL");
  // console.log(day);
  return (
    <List.Item
      key={post.title}
      className="post"
      extra={
        <Link to={`/blog/${post.url}`}>
          <img
            width={272}
            alt={post.image_alt}
            src={`https://netzwerk.mx${post.image}`}
          />
        </Link>
      }
    >
      <div className="post__tema">
        <span>{post.tema}</span>
      </div>
      <div className="post__fecha">
        <span>{day}</span>
      </div>
      <List.Item.Meta
        title={<Link to={`/blog/${post.url}`}>{post.title}</Link>}
        description={post.Metatag.description}
      />
    </List.Item>
  );
}
