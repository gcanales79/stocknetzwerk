import React, {useState,useEffect} from 'react';
import {Form,Input,Button,notification} from "antd";
import { KeyOutlined,GiftOutlined,DollarOutlined,LinkOutlined} from "@ant-design/icons";
import {getAccessTokenApi} from "../../../../api/auth";
import {addCourseApi,updateCourseApi} from "../../../../api/courses"

import "./AddEditCourseForm.scss"

export default function AddEditCourseForm(props) {
    const{setIsVisibleModal,setReloadCourses,course}=props;
    const [courseData,setCourseData]=useState({});

    useEffect(() => {
        //Si course exite lo ejecuta
      course ? setCourseData(course):setCourseData({})
    }, [course]);
    

    const addCourse=()=>{
        //console.log("Creando el curso")
        //console.log(courseData) 
        if (!courseData.idCourse){
            notification["error"]({
                message:"El id del curso es obligatorio"
            })
        }else{
            const accessToken=getAccessTokenApi();
            addCourseApi(accessToken,courseData).then(response=>{
                const typeNotification=response.code==="200"?"success":"error";
                notification[typeNotification]({
                    message:response.message
                })
                setIsVisibleModal(false)
                setReloadCourses(true)
                setCourseData({})
            }).catch(()=>{
                notification["error"]({
                    message:"Error del servidor, intentelo mas tarde"
                })
            })
        }
    }

    const updateCourse=()=>{
        //console.log("Update del curso")
        const accessToken=getAccessTokenApi();
        updateCourseApi(accessToken,course._id, courseData).then(response=>{
            const typeNotification=response.code==="200"?"success":"error";
            notification[typeNotification]({
                message:response.message
            })
            setIsVisibleModal(false)
            setReloadCourses(true)
            setCourseData({})
        }).catch(()=>{
            notification["error"]({
                message:"Error del servidor, intentelo mas tarde"
            })
        })
    }

  return (
  <div className="add-edit-course-form">
      <AddEditForm 
      course={course} 
      addCourse={addCourse} 
      updateCourse={updateCourse} 
      setCourseData={setCourseData}
      courseData={courseData}/>
      
  </div>
  );
}

function AddEditForm(props){
    const{course,addCourse,updateCourse,setCourseData,courseData} = props;
    return(
        <Form className="form-add-edit" onFinish={course?updateCourse:addCourse}>
            <Form.Item>
                <Input
                prefix={<KeyOutlined />}
                placeholder="ID del Curso"
                value={courseData.idCourse}
                onChange={e=>setCourseData({...courseData,idCourse:e.target.value})}
                disabled={course?true:false}
                />
            </Form.Item>
            <Form.Item>
                <Input
                prefix={<LinkOutlined />}
                placeholder="Url del Curso"
                value={courseData.link}
                onChange={e=>setCourseData({...courseData,link:e.target.value})}
                disable={course?true:false}
                />
            </Form.Item>
            <Form.Item>
                <Input
                prefix={<GiftOutlined />}
                placeholder="Cupon de Descuento"
                value={courseData.coupon}
                onChange={e=>setCourseData({...courseData,coupon:e.target.value})}
                disable={course?true:false}
                />
            </Form.Item>
            <Form.Item>
                <Input
                prefix={<DollarOutlined />}
                placeholder="Precio del curso"
                value={courseData.price}
                onChange={e=>setCourseData({...courseData,price:e.target.value})}
                disable={course?true:false}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit"> 
                    {course?"Actualizar Curso":"Crear Curso"}
                </Button>
            </Form.Item>
        </Form>
    )

}