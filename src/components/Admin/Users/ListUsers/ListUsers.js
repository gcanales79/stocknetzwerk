import React, { useState, useEffect } from "react";
import {
  Switch,
  List,
  Avatar,
  Button,
  notification,
  Modal as ModalAntd,
} from "antd";
import NoAvatar from "../../../../assets/img/no-avatar.png";
import {
  EditOutlined,
  StopOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";
import AddUserForm from "../AddUserForm";
import {
  getAvatarApi,
  activateUserApi,
  deleteUserApi,
} from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";

import "./ListUsers.scss";

const { confirm } = ModalAntd;

export default function LisUsers(props) {
  const { usersActive, usersInactive, setReloadUsers } = props;
  const [viewUsersActive, setViewUsersActive] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const addUserModal=()=>{
    setIsVisibleModal(true)
    setModalTitle("Creando Nuevo Usuario")
    setModalContent(
      <AddUserForm setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers}/>
    )
  }

  return (
    <div className="list-users">
      <div className="list-users__header">
        <div className="list-users__header-switch">
          <Switch
            defaultChecked
            onChange={() => setViewUsersActive(!viewUsersActive)}
          />
          <span>
            {viewUsersActive ? "Usuarios Activos" : "Usuarios Inactivos"}
          </span>
        </div>
        <Button type="primary" onClick={addUserModal}>
          Nuevo Usuario
        </Button>
      </div>

      {viewUsersActive ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
        />
      ) : (
        <UsersInactive
          usersInactive={usersInactive}
          setReloadUsers={setReloadUsers}
        />
      )}

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

function UsersActive(props) {
  const {
    usersActive,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadUsers,
  } = props;
  const editUser = (user) => {
    setIsVisibleModal(true);
    setModalTitle(
      `Edit ${user.name ? user.name : "..."} ${
        user.lastname ? user.lastname : "..."
      }`
    );
    setModalContent(
      <EditUserForm
        user={user}
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <UserActive
          user={user}
          editUser={editUser}
          setReloadUsers={setReloadUsers}
        />
      )}
    />
  );
}

function UserActive(props) {
  const { user, editUser, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const desactivateUser = () => {
    const accessToken = getAccessTokenApi();
    let status = {
      active: false,
    };
    activateUserApi(accessToken, user._id, status).then((response) => {
      //console.log(response)
      if (response.code === "200") {
        notification["success"]({ message: response.message });
        setReloadUsers(true);
      } else {
        notification["error"]({ message: response.message });
      }
    });
  };

  const showDeleteConfirm = () => {
    const accessToken = getAccessTokenApi();
    confirm({
      title: "Eliminando Usuario",
      content: `Estas seguro que quieres eliminar a ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(accessToken, user._id).then((response) => {
          if (response.code === "200") {
            notification["success"]({ message: response.message });
            setReloadUsers(true);
          } else {
            notification["error"]({ message: response.message });
          }
        });
      },
    });
  };

  return (
    <List.Item
      actions={[
        <Button
          type="primary"
          onClick={() => editUser(user)}
          icon={<EditOutlined />}
        />,
        <Button
          type="danger"
          onClick={desactivateUser}
          icon={<StopOutlined />}
        />,
        <Button
          type="danger"
          onClick={showDeleteConfirm}
          icon={<DeleteOutlined />}
        />,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`${user.name ? user.name : "..."} ${
          user.lastname ? user.lastname : "..."
        }`}
        description={user.email}
      />
    </List.Item>
  );
}

function UsersInactive(props) {
  const { usersInactive, setReloadUsers } = props;
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <UserInactive user={user} setReloadUsers={setReloadUsers} />
      )}
    />
  );
}

function UserInactive(props) {
  const { user, setUser, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const activateUser = () => {
    const accessToken = getAccessTokenApi();
    let status = {
      active: true,
    };
    activateUserApi(accessToken, user._id, status).then((response) => {
      //console.log(response)
      if (response.code === "200") {
        notification["success"]({ message: response.message });
        setReloadUsers(true);
      } else {
        notification["error"]({ message: response.message });
      }
    });
  };

  const showDeleteConfirm = () => {
    const accessToken = getAccessTokenApi();
    confirm({
      title: "Eliminando Usuario",
      content: `Estas seguro que quieres eliminar a ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(accessToken, user._id).then((response) => {
          if (response.code === "200") {
            notification["success"]({ message: response.message });
            setReloadUsers(true);
          } else {
            notification["error"]({ message: response.message });
          }
        });
      },
    });
  };

  return (
    <List.Item
      actions={[
        <Button
          type="primary"
          onClick={activateUser}
          icon={<CheckOutlined />}
        />,
        <Button
          type="danger"
          onClick={showDeleteConfirm}
          icon={<DeleteOutlined />}
        />,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`${user.name ? user.name : "..."} ${
          user.lastname ? user.lastname : "..."
        }`}
        description={user.email}
      />
    </List.Item>
  );
}
