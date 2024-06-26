import React, { useState, useEffect } from "react";
import { List, Button, Modal as ModalAntd, notification } from "antd";
import { EditOutlined,DeleteOutlined} from "@ant-design/icons";
//import DragSortableList from "react-drag-sortable";
import Modal from "../../../Modal";
import AddEditCourseForm from "../AddEditCourseForm"
import { getDataUdemyApi, deleteCourseApi, updateCourseApi} from "../../../../api/courses";
import { getAccessTokenApi } from "../../../../api/auth";


import "./CoursesList.scss";

const { confirm } = ModalAntd;

export default function CoursesList(props) {
  const { courses, setReloadCourses } = props;
  const [listCourses, setListCourses] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const onSort = (sortedList, dropEvent) => {
    const accessToken = getAccessTokenApi();
    sortedList.forEach(item=>{
      const {_id}=item.content.props.course;
      const order=item.rank
      updateCourseApi(accessToken,_id,{order})
    })
    //console.log(sortedList);
  };

  const deleteCourse=course=>{
    //console.log(course)
    const accessToken=getAccessTokenApi()
    confirm({
      title:"Eliminando Curso",
      content:`¿Estas seguro que quieres eliminar el curso ${course.idCourse}?`,
      okText:"Eliminar",
      okType:"danger",
      cancelText:"Cancelar",
      onOk(){
        deleteCourseApi(accessToken,course._id).then(response=>{
          const typeNotification=response.code==="200"?"success":"warning";
          notification[typeNotification]({
            message:response.message
          })
          setReloadCourses(true);
        }).catch(()=>{
          notification["error"]({
            message:"Error del servidor intentalo más tarde."
          })
        })
      }
    })
  }

  const addCourseModal=()=>{
    setIsVisibleModal(true);
    setModalTitle("Creando Nuevo Curso")
    setModalContent(
    <AddEditCourseForm setIsVisibleModal={setIsVisibleModal} setReloadCourses={setReloadCourses}/>
    )
  }

  const editCourseModal=(course)=>{
    setIsVisibleModal(true);
    setModalTitle("Actualizando Curso")
    setModalContent(
    <AddEditCourseForm course={course} setIsVisibleModal={setIsVisibleModal} setReloadCourses={setReloadCourses}/>
    )
  }

  useEffect(() => {
    const listCourseArray=[];
    courses.forEach(course=>{
        listCourseArray.push({
            content:(
                <Course course={course} deleteCourse={deleteCourse} editCourseModal={editCourseModal}/>
            )
        })
    });
    setListCourses(listCourseArray);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);
  

  return (
    <div className="courses-list">
      <div className="courses-list__header">
        <Button type="primary" onClick={addCourseModal}>
          Creando Curso
        </Button>
      </div>
      <div className="courses-list__items">
        {listCourses.length === 0 && (
          <h2 style={{ textAlign: "center", margin: 0 }}>
            No tienes cursos creados
          </h2>
        )}
        {/*<DragSortableList items={listCourses} onSort={onSort} type="vertical"/>*/}
      </div>
      <Modal
      title={modalTitle}
      isVisible={isVisibleModal}
      setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}


function Course(props){
    const{course, deleteCourse,editCourseModal}=props;
    const [courseData,setCourseData]=useState(null)
    useEffect(() => {
      getDataUdemyApi(course.idCourse).then(response=>{
          if(response.code!==200){
              notification["warning"]({
                  message:`El curso con el id ${course.idCourse} no se ha encontrado`
              })
          }
          setCourseData(response.data)
      })
    }, [course]);

    if(!courseData){
        return null;
    }
    
    return(
        <List.Item
        actions={[
            <Button type="primary" onClick={()=>editCourseModal(course)}>
                <EditOutlined/>
            </Button>,
            <Button type="danger" onClick={()=>deleteCourse(course)}>
            <DeleteOutlined/>
        </Button>

        ]}>
            <img src={courseData.image_480x270} alt={courseData.tile} style={{width:"100px",marginRight:"20px"}}/>
            <List.Item.Meta
            title={`${courseData.title}| ID: ${course.idCourse}`}
            description={courseData.headline}/>

        </List.Item>
    )
}