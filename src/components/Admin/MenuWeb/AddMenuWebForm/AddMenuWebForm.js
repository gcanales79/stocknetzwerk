import React,{useState} from 'react';
import {Form,Input,Button,Select,notification} from "antd";
import {FontSizeOutlined,} from "@ant-design/icons";
import { addMenuApi } from '../../../../api/menu';
import {getAccessTokenApi} from "../../../../api/auth"

import "./AddMenuWebForm.scss";

export default function AddMenuWebForm(props){
    const{setIsVisibleModal,setReloadMenuWeb}=props;
    const [menuWebData,setMenuWebData]=useState({});

    const addMenu=event=>{
        //console.log("Creando Menu")
        //console.log(menuWebData)
        let finalData={
            title:menuWebData.title,
            url:(menuWebData.http?menuWebData.http:"http://")+menuWebData.url
        }
        //console.log(finalData)
        if(!finalData.title||!finalData.url||!menuWebData.url){
            notification["error"]({message:"Todos los campos son obligatorios"})
        }else{
            const accessToken=getAccessTokenApi();
            finalData.active=false;
            finalData.order=1000;
            addMenuApi(accessToken,finalData).then(response=>{
                if(response.code === "200"){
                    notification["success"]({ message: response.message})
                    setReloadMenuWeb(true);
                    setIsVisibleModal(false);
                    setMenuWebData({});
                    finalData={};
                }else{
                    notification["error"]({ message: response.message})
                }
            })
        }
    }

    return(
        <div className="add-menu-web-form">
            <AddForm 
            menuWebData={menuWebData} 
            setMenuWebData={setMenuWebData}
            addMenu={addMenu}/>
        </div>
    )

}

function AddForm(props){
    const{menuWebData,setMenuWebData,addMenu}=props;
    const {Option}=Select;
    const selectBefore=(
        <Select
        defaultValue="http://"
        style={{width:90}}
        onChange={e=>setMenuWebData({...menuWebData,http:e})}
        >
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    )

    return(
        <Form className="form-add" onFinish={addMenu}>
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
                addonBefore={selectBefore}
                placeholder="URL"
                value={menuWebData.url}
                onChange={e=>setMenuWebData({...menuWebData,url:e.target.value})}
                />
            </Form.Item>
            <Form.Item>
                <Button
                type="primary"
                htmlType="Submit"
                className="btn-submit">Crear Menu</Button>
            </Form.Item>
        </Form>
    )
}