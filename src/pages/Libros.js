import React from "react";
import Books from "../components/Web/Books";
import { Row, Col } from "antd";



export default function Libros(props) {
  const {location,history}=props;
  return (
    <>
      <Row>
        <Col md={4} />
        <Col md={16}>
          <Books location={location} history={history} />
        </Col>
        <Col md={4} />
      </Row>
    </>
  );
}
