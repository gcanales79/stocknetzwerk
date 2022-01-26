import React,{useState} from 'react';
import { useEffect } from 'react/cjs/react.development';
import {getMenuApi} from "../../../api/menu";
import MenuWebList from "../../../components/Admin/MenuWeb/MenuWebList"

export default function MenuWeb(){
    const[ menu,setMenu]=useState([]);
    const[reloadMenuWeb,setReloadMenuWeb]=useState(false);

    useEffect(()=>{
        getMenuApi().then(response=>{
            setMenu(response.menu)
        })
        setReloadMenuWeb(false)
    },[reloadMenuWeb])

    return (
        <MenuWebList menu={menu} setReloadMenuWeb={setReloadMenuWeb}/>
    )
}