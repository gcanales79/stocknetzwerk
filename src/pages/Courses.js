import React, { useState, useEffect } from "react";
import { Row, Col, Spin, notification } from "antd";
import {Helmet} from "react-helmet";
import { getCoursesApi } from "../api/courses";
import PresentationCourses from "../components/Web/Courses/PresentationCourses";
import CoursesList from "../components/Web/Courses/CoursesList";

export default function Courses() {
  const [courses, setCourses] = useState(null);

//console.log(courses)

  useEffect(() => {
    getCoursesApi().then(response=>{
      if(response?.code!=="200"){
        notification["warning"]({
          message: response.message
        })
      }else{
        setCourses(response.courses)
      }
    }).catch(()=>{
      notification["error"]({
        message:"Error del servidor intentelo mas tarde"
      })
    })
  }, []);
  

  return (
    <>
    <Helmet>
      <title>Cursos</title>
      <meta name="description" content="Cursos | Liderazgo" data-react-helmet="true"/>
    </Helmet>
    <Row>
      <Col md={4} />
      <Col md={16}>
        <PresentationCourses />

        {!courses?(
          <Spin 
          tip="Cargando Cursos" 
          style={({textAlign:"center",width:"100%",padding:"20px"})}/>
        ):(
          <CoursesList courses={courses} />
        )}
        
      </Col>
      <Col md={4} />
    </Row>
    </>
  );
}
