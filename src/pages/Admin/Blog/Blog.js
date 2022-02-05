import React, { useState, useEffect } from "react";
import { Button, notification } from "antd";
import Modal from "../../../components/Modal";
import queryString from "query-string";
import {withRouter} from "react-router-dom";
import {getPostsApi} from "../../../api/post"
import PostList from "../../../components/Admin/Blog/PostList";
import Pagination from "../../../components/Pagination";
import AddEditPostForm from "../../../components/Admin/Blog/AddEditPostForm";

import "./Blog.scss";

function Blog(props) {
  const {location,history}=props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [post, setPost] = useState(null);
  const [reloadPost, setReloadPost] = useState(false);
  const{page=1}=queryString.parse(location.search)

  //console.log(post)

  useEffect(() => {
   getPostsApi(10,page).then((response)=>{
     if(response?.code!=="200"){
       notification["warning"]({
         message: response.message
       })
     }else{
      setPost(response.posts)
     }
   }).catch(()=>{
     notification["error"] =({
       message:"Error del servidor"
     })
   })
   setReloadPost(false)
  }, [page,reloadPost]);

  if(!post){
    return null;
  }

  const addPost=()=>{
    setIsVisibleModal(true);
    setModalTitle("Creando Nuevo Post");
    setModalContent(
    <AddEditPostForm
    setIsVisibleModal={setIsVisibleModal}
    setReloadPost={setReloadPost}
    post={null}
    />
    )
  }

  const editPost=(post)=>{
    setIsVisibleModal(true);
    setModalTitle("Editar Post")
    setModalContent(
      <AddEditPostForm
      setIsVisibleModal={setIsVisibleModal}
      setReloadPost={setReloadPost}
      post={post}
      />
      )
}
  

  //console.log(location);
  //console.log(queryString.parse(location.search).page)
  //console.log(page)

  return (
    <div className="blog">
      <div className="blog__add-post">
        <Button type="primary" onClick={()=>addPost()}>Nuevo Post</Button>
      </div>
      <PostList post={post} setReloadPost={setReloadPost} editPost={editPost}/>
      <Pagination post={post} location={location} history={history}/>
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        width="75%"
      >
        {modalContent}
      </Modal>
    </div>
  );
}

export default withRouter(Blog)
