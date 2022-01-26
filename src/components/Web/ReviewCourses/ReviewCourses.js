import React from 'react';
import {Row,Col,Card,Avatar} from "antd";
import AvatarPersona from "../../../assets/img/netzwerk-irene-robles-028.jpg"

import "./ReviewCourses.scss"

export default function ReviewCourses() {
    return (
        <Row className="review-courses">
            <Row>
                <Col lg={4}></Col>
                <Col lg={16} className="review-courses__title">
                    <h2>Forma parte de los +35 mil estudiantes que estan aprendiendo con mis cursos</h2>
                </Col>
                <Col lg={4}></Col>
            </Row>
            <Row>
                <Col lg={4}></Col>
                <Col lg={16}>
                    <Row className="row-cards">
                        <Col md={8}>
                            <CardReview 
                            name="Alonso Campos"
                            subtitle="Alumno de Udemy"
                            avatar={AvatarPersona}
                            review="Un curso excelente, el profesor explica detalladamente como funciona react native"/>
                        </Col>
                        <Col md={8}>
                            <CardReview 
                            name="David Ramiro"
                            subtitle="Alumno de Udemy"
                            avatar={AvatarPersona}
                            review="Si te gustan los cursos que profundizan en la materia, te lo recomiendo."/>
                        </Col>
                        <Col md={8}>
                            <CardReview 
                            name="Valentina Rubio"
                            subtitle="Alumna de Udemy"
                            avatar={AvatarPersona}
                            review="El contendio del curso es muy completo y de necesitar cualquier dato adicional"/>
                        </Col>
                    </Row>
                    <Row className="row-cards">
                        <Col md={8}>
                            <CardReview 
                            name="Marc Pérez"
                            subtitle="Alumno de Udemy"
                            avatar={AvatarPersona}
                            review="Empece el curso sin saber nada de React Native y creo que lo finalizo teniendo"/>
                        </Col>
                        <Col md={8}>
                            <CardReview 
                            name="Jesús Cruz"
                            subtitle="Alumno de Udemy"
                            avatar={AvatarPersona}
                            review="Me ha parecido un buen curso, las explicaciones muy claras y lo que enseña."/>
                        </Col>
                        <Col md={8}>
                            <CardReview 
                            name="Francisco Garcia"
                            subtitle="Alumno de Udemy"
                            avatar={AvatarPersona}
                            review="Aprendes todo lo que promete el video de incio y te da la capacidad para"/>
                        </Col>
                    </Row>
                </Col>
                <Col lg={4}></Col>
            </Row>
        </Row>
    )
}

function CardReview(props){
    const {name,subtitle,avatar,review}=props;
    const {Meta}=Card;
    return(
        <Card className="review-courses__card">
            <p>{review}</p>
            <Meta
            avatar={<Avatar src={avatar}/>}
            title={name}
            description={subtitle}
            />

        </Card>
    )

}