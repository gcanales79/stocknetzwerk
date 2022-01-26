import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { FontSizeOutlined, LinkOutlined } from "@ant-design/icons";
import { updateMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";

import "./EditMenuWebForm.scss";

export default function EditMenuWeb(props) {
  const { setIsVisibleModal, setReloadMenuWeb, menu } = props;
  const [menuWebData,setMenuWebData]=useState({menu})

  useEffect(()=>{
      setMenuWebData(menu);
  },[menu])

const editMenu=event=>{
    //console.log(menuWebData)
    if(!menuWebData.title||!menuWebData.url){
        notification["error"]({ message:"Todos los campos son obligatorios"})
    }else{
        const accessToken=getAccessTokenApi();
        updateMenuApi(accessToken, menuWebData._id,menuWebData).then(response=>{
            if(response.code === "200"){
                notification["success"]({ message: response.message})
                setReloadMenuWeb(true);
                setIsVisibleModal(false);
                setMenuWebData({});
            }else{
                notification["error"]({ message: response.message})
            }
        })
    }
}

  return (
    <div className="edit-menu-web-form">
      <EditForm setMenuWebData={setMenuWebData} menuWebData={menuWebData} editMenu={editMenu}/>
    </div>
  );
}

function EditForm(props) {
  const {menuWebData,setMenuWebData,editMenu} = props;
  return (
    <Form className="form-edit" onFinish={editMenu}>
      <Form.Item>
        <Input
          prefix={<FontSizeOutlined />}
          placeholder="Titulo"
          value={menuWebData.title}
          onChange={e=>setMenuWebData({...menuWebData,title:e.target.value})}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LinkOutlined />}
          placeholder="URL"
          value={menuWebData.url}
          onChange={e=>setMenuWebData({...menuWebData,url:e.target.value})}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar Menu
        </Button>
      </Form.Item>
    </Form>
  );
}
