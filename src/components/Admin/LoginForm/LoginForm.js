import React, {useState} from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { signInApi } from "../../../api/user";
import {REFRESH_TOKEN,ACCESS_TOKEN} from "../../../utils/constants"

import "./LoginForm.scss";

export default function LoginForm() {
    const [inputs,setInputs]=useState({
        email:"",
        password:""
    });

    const changeForm = (e) => {
        //console.log(e.target)
          setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
          });
      };

      const login=async(e)=>{
        //console.log(inputs)
        const result = await signInApi(inputs);
        //console.log(result)
        if(result.message){
            notification["error"]({
                message:result.message
            })
        }else{
            const{accessToken,refreshToken}=result
            localStorage.setItem(ACCESS_TOKEN,accessToken)
            localStorage.setItem(REFRESH_TOKEN,refreshToken)

            notification["success"]({
                message:"Login Correcto"
            })
            window.location.href="/admin"
        }
      }

  return (
    <Form className="login-form" onFinish={login}>
      <Form.Item>
        <Input
          prefix={<UserOutlined />}
          type="email"
          name="email"
          placeholder="Correo Electronico"
          className="login-form__input"
          onChange={changeForm}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="login-form__input"
          onChange={changeForm}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="login-form__button" shape="round">
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}
