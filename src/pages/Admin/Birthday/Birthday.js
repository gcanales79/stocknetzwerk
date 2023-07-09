import React, { useState, useEffect } from "react";
import { Button, notification, Spin, message, Upload } from "antd";
import Modal from "../../../components/Modal";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import { getBirthdaysApi } from "../../../api/birthday";
import {getAccessTokenApi} from "../../../api/auth"
import BirthdayList from "../../../components/Admin/Birthday/BirthdayList";
import Pagination from "../../../components/Pagination";
import AddEditBirthdayForm from "../../../components/Admin/Birthday/AddEditBirthdayForm";
import { UploadOutlined } from "@ant-design/icons";
import { basePath, apiVersion } from "../../../api/config";


import "./Birthday.scss";

function Birthday(props) {
  const { location, history } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [birthdays, setBirthdays] = useState(null);
  const [reloadBirthday, setReloadBirthday] = useState(false);
  const { page = 1 } = queryString.parse(location.search);

  //console.log(birthdays)

  const token=getAccessTokenApi();

  useEffect(() => {
    //El numero dice cuantos sale por pagina
    getBirthdaysApi(15, page,token)
      .then((response) => {
        if (response?.code !== "200") {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setBirthdays(response.bdays);
        }
      })
      .catch(() => {
        notification["error"] = {
          message: "Error del servidor",
        };
      });
    setReloadBirthday(false);
  }, [page, reloadBirthday,token]);

  if (!birthdays) {
    return (
      <Spin
        tip="Cargando"
        style={{ width: "100%", padding: "200px 200px" }}
      ></Spin>
    );
  }

  const addBirthday = () => {
    //console.log("Add Birthday");
    setIsVisibleModal(true);
    setModalTitle("Creando Nuevo Registro");
    setModalContent(
      <AddEditBirthdayForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadBirthday={setReloadBirthday}
        bday={null}
      />
    );
  };



  const editBirthday = (bday) => {
    // console.log("Editando Birthday");
    setIsVisibleModal(true);
    setModalTitle("Editar Registro");
    setModalContent(
      <AddEditBirthdayForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadBirthday={setReloadBirthday}
        bday={bday}
      />
    );
  };

  const url = `${basePath}/${apiVersion}/upload`;

  console.log(token)



  return (
    <div className="birthday">
      <div className="birthday__add-birthday">
        <Button type="primary" onClick={() => addBirthday()}>
          Nuevo Registro
        </Button>
        <Upload 
        action={url}
        name={"bdayFile"}
        headers={
          {"Authorization":`${token}`}
        }
        onChange={(info)=>{
          if (info.file.status !== 'uploading') {
           // console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.response.message}`);
            setReloadBirthday(true)
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        }}>
          <Button icon={<UploadOutlined />}>Subir Archivo</Button>
        </Upload>
      </div>
      <BirthdayList
        birthdays={birthdays}
        setReloadBirthday={setReloadBirthday}
        editBirthday={editBirthday}
      />
      <Pagination post={birthdays} location={location} history={history} />
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

export default withRouter(Birthday);
