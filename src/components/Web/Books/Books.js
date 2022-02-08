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

  console.log(bookData)

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
        <title>Libros</title>
        <meta
          name="description"
          content="Libros | Netzwerk"
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
