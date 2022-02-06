import React,{useState,useEffect} from "react";
import { Row, Col, Card, Button,notification,Spin } from "antd";
import { Link } from "react-router-dom";
// import reactJsHooks from "../../../assets/img/react-js-hooks.jpg";
// import reactNative from "../../../assets/img/react-native.jpg";
// import javaScript from "../../../assets/img/javascript-es6.jpg";
// import wordPress from "../../../assets/img/wordpress.jpg";
// import prestaShop from "../../../assets/img/prestashop-1-7.jpg";
// import cssGrid from "../../../assets/img/css-grid.jpg";
import {getBlogsApi} from "../../../api/blog";

import "./HomeCourses.scss";

export default function HomeCourses() {
  const [blogData, setBlogData] = useState(null);

  //console.log(blogData);

  useEffect(() => {
    getBlogsApi(6,1).then(response=>{
      // console.log(response.data)
      setBlogData(response.data)
    }).catch(()=>{
      notification["error"]({
        message:"Error del servidor"
      })
    })
  }, []);
  
  if(!blogData){
    return (
      <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }}></Spin>
    );
  }

  return (
    <Row className="home-courses">
      <Col lg={24} className="home-courses__title">
        <h2>Hablando de liderazgo y equipos</h2>
      </Col>
      <Col lg={4} />
      <Col lg={16}>
        <Row classname="row-courses">
          {blogData.map((item)=>{
            return(
              <Col key={item.id} md={12}>
                <CardCourse
                image={`https://netzwerk.mx${item.image}`}
                title={item.title}
                subtitle={item.Metatag.description}
                link={`/blog/${item.url}`}
                />
              </Col>
            )
          })}
        </Row>
          
      </Col>
      <Col lg={4} />
      <Col lg={24} className="home-courses__more">
          <Link to="/blog"><Button>Ver Mas</Button></Link>
      </Col>
    </Row>
  );
}

function CardCourse(props){
    const {image,title,subtitle,link}=props;
    const {Meta}=Card

    return(
        <a href={link} targe="_blank" rel="noopener noreferrer">
            <Card className="home-courses__card"
            cover={<img src={image} alt={title}/>}
            actions={[<Button>Ingresar</Button>]}
            hoverable={true}
            >
            <Meta title={title} description={subtitle}/>      
            </Card>
        </a>
    )
}
