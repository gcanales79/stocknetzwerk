import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Pagination from "../../Pagination";
import queryString from "query-string";
import { Spin, List, notification,Button } from "antd";
import { Link } from "react-router-dom";
import { getBooksApi } from "../../../api/libros";

import "./Books.scss";

export default function Books(props) {
  const { location, history } = props;
  // console.log(location)
  // console.log(history)
  const [bookData, setBookData] = useState(null);
  const { page = 1 } = queryString.parse(location.search);

  // console.log(bookData)

  useEffect(() => {
    getBooksApi(12, page)
      .then((response) => {
        //console.log(response)
        if (response?.code !== "200") {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setBookData(response);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor",
        });
      });
  }, [page]);

  if (!bookData) {
    return (
      <Spin tip="Cargando" style={{ width: "100%", padding: "200px 200px"}}></Spin>
    );
  }

  return (
    <>
      <Helmet>
      <title>Netzwerk | Libros</title>
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
      <div className="libros-list-web">
        <h1>Libros</h1>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={bookData.data}
          renderItem={(book) => <Book book={book} />}
        />
        <Pagination post={bookData} location={location} history={history} />
      </div>
    </>
  );
}

function Book(props) {
  const { book } = props;
  
  return (
    <List.Item
      key={book.id}
      className="book"
      extra={
        <a href={book.url} target="_blank" rel="noopener noreferrer">
          <img
            width={200}
            alt={book.image_alt}
            src={`https://netzwerk.mx${book.image}`}
          />
        </a>
      }
    >
      <div className="book__author">
        <span>{book.author}</span>
      </div>
      <List.Item.Meta
        title={<a href={book.url} target="_blank" rel="noopener noreferrer">{book.title}</a>}
        description={book.description}
      />
      <div className="book__btn">
      <a href={book.url} target="_blank" rel="noopener noreferrer">
      <Button type="ghost">Comprar</Button>
      </a>
      </div>
    </List.Item>
  );
}
