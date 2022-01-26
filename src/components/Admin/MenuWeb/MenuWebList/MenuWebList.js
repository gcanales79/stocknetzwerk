import React,{useState,useEffect} from 'react';
import {Switch,List,Button, Modal as ModalAntd, notification} from "antd";
import {EditOutlined,DeleteOutlined} from "@ant-design/icons";
import Modal from "../../../Modal";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {arrayMoveImmutable} from "array-move";
import {updateMenuApi,activateMenuApi,deleteMenuApi} from "../../../../api/menu";
import {getAccessTokenApi} from "../../../../api/auth";
import AddMenuWebForm from '../AddMenuWebForm';
import EditMenuWebForm from '../EditMenuWebForm';


import "./MenuWebList.scss";

const {confirm}=ModalAntd;



export default function MenuWebList(props){
    const {menu,setReloadMenuWeb}=props;
    const [isVisibleModal,setIsVisibleModal]=useState(false);
    const [modalTitle,setModalTitle]=useState("");
    const [modalContent,setModalContent]=useState(null)
    const [listItems,setListItems]=useState([]);
    
    
    //console.log(listItems)

    useEffect(()=>{
        const listItemsArray=[];
        menu.forEach(item=>{
            listItemsArray.push({
                content:(
                    <MenuItem item={item} activateMenu={activateMenu} editMenuWebModal={editMenuWebModal} deleteMenuWebModal={deleteMenuWebModal}/>
                ),
                id:item._id
            })
        });
        setListItems(listItemsArray);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[menu]);

    const activateMenu=(menu,status)=>{
        const accessToken=getAccessTokenApi();
        let data={
            active:status
        }
        activateMenuApi(accessToken,menu._id,data).then(response=>{
            if(response.code === "200"){
                notification["success"]({ message: response.message})
                setReloadMenuWeb(true)
            }else{
                notification["error"]({ message: response.message})
                setReloadMenuWeb(true)
            }
        });
    }
   
    const onSortEnd=({oldIndex,newIndex})=>{
        const accessToken=getAccessTokenApi();
        let newOrder=arrayMoveImmutable(listItems,oldIndex,newIndex)
        //console.log(newOrder)
        setListItems(arrayMoveImmutable(listItems,oldIndex,newIndex))
        newOrder.forEach((item,index)=>{
            const{_id}=item.content.props.item;
            const order=index
            let data={
                order:order
            }
            //console.log(_id,order)
            updateMenuApi(accessToken,_id,data)
        })
    }

    const addMenuWebModal=()=>{
        setIsVisibleModal(true);
        setModalTitle("Creando Nuevo Menu");
        setModalContent(
            <AddMenuWebForm setIsVisibleModal={setIsVisibleModal} setReloadMenuWeb={setReloadMenuWeb}/>
        )
    }

    const editMenuWebModal=(menu)=>{
       setIsVisibleModal(true); 
       setModalTitle(`Editando menu: ${menu.title}`);
        setModalContent(
            <EditMenuWebForm setIsVisibleModal={setIsVisibleModal} setReloadMenuWeb={setReloadMenuWeb} menu={menu}/>
        )
    }

    const deleteMenuWebModal=(menu)=>{
        //console.log(menu)
        const accessToken=getAccessTokenApi();
        confirm({
            title:"Eliminando Menu",
            content:`Estas seguro de que quieres eliminar el menu ${menu.title}?`,
            okText:"Eliminar",
            okType:"danger",
            cancelText:"Cancelar",
            onOk(){
                deleteMenuApi(accessToken,menu._id).then(response=>{
                    if(response.code === "200"){
                        notification["success"]({ message: response.message})
                        setReloadMenuWeb(true);
                        
                    }else{
                        notification["error"]({ message: response.message})
                    }
                })
            }
        })
    }

    return(
        <div className="menu-web-list"> 
            <div className="menu-web-list__header">
                <Button type="primary" onClick={addMenuWebModal}>
                    Crear Menu
                </Button>
            </div>
            <div className="menu-web-list__items">
            <SortableList items={listItems} onSortEnd={onSortEnd}/>
            </div>
            <Modal
            title={modalTitle}
            isVisible={isVisibleModal}
            setIsVisible={setIsVisibleModal}>
                {modalContent}
            </Modal>
        </div>
    )
}

const SortableItem = SortableElement(({value}) => <div className="menu-web-list__items__List">{value.content}</div>);

const SortableList = SortableContainer(({items}) => {
    return (
      <div>
        {items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </div>
    );
  });

  function MenuItem(props){
      const {item,activateMenu,editMenuWebModal,deleteMenuWebModal}=props
      //console.log(item)
      return(
          <List.Item
          actions={[
              <Switch checked={item.active} onChange={e=>activateMenu(item,e)}/>,
              <Button 
              type="primary"
              icon={<EditOutlined />}
              onClick={()=>editMenuWebModal(item)}
              ></Button>,
              <Button 
              type="danger"
              icon={<DeleteOutlined />}
              onClick={()=>deleteMenuWebModal(item)}
              ></Button>
          ]}
          >
              <List.Item.Meta title={item.title} description={item.url}/>
          </List.Item>
      )
    }
