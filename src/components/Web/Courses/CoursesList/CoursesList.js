import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Rate, notification } from "antd";
import { getDataUdemyApi } from "../../../../api/courses";

import "./CoursesList.scss";

export default function CoursesList(props) {
  const { courses } = props;

  //console.log(courses);

  return (
    <div className="course-list">
      <Row>
        {courses.map((course) => {
          return (
            <Col key={course._id} md={8} className="course-list__course">
              <Course course={course} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

function Course(props) {
  const { course } = props;
  const [courseInfo, setCourseInfo] = useState({});
  const [urlCourse,setUrlCourse]=useState("");
  //console.log(course)
  const {Meta}=Card;

  console.log(courseInfo);
  useEffect(() => {
    getDataUdemyApi(course.idCourse)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setCourseInfo(response.data);
          mountUrl(response.data.url)
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor intentelo mas tarde",
        });
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course]);

  const mountUrl=url=>{
    if(!course.link){
      const baseUrl=`https://www.udemy.com${url}`
      const finalUrl=baseUrl + (course.coupon?`?couponCode=${course.coupon}`:"");
      setUrlCourse(finalUrl)
    }else{
      setUrlCourse(course.link);
    }
  }

  return <a href={urlCourse} target="_blank" rel="noopener noreferrer">
    <Card
    cover={<img src={courseInfo.image_480x270} alt={courseInfo.title}/>}>
      <Meta
      title={courseInfo.title}
      description={courseInfo.headline}/>
      <Button>Entrar en el Curso</Button>
      <div className="course-list__course-footer">
        <span>{course.price?`$ ${course.price}`:courseInfo.price}</span>
        <div>
          <Rate disabled defaultValue="5"/>
        </div>
      </div>
    </Card>
  </a>;
}
