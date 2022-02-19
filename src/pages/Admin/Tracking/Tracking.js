import React, { useState, useEffect } from "react";
import { Button, notification, Spin } from "antd";
import Modal from "../../../components/Modal";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import { getTrackingsApi } from "../../../api/track";
import TrackingList from "../../../components/Admin/Tracking/TrackingList";
import Pagination from "../../../components/Pagination";
import AddEditTrackingForm from "../../../components/Admin/Tracking/AddEditTrackingForm";

import "./Tracking.scss";

function Tracking(props) {
  const { location, history } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [trackings, setTrackings] = useState(null);
  const [reloadTracking, setReloadTracking] = useState(false);
  const { page = 1 } = queryString.parse(location.search);

  // console.log(trackings)

  useEffect(() => {
    //El numero dice cuantos sale por pagina
    getTrackingsApi(12, page)
      .then((response) => {
        if (response?.code !== "200") {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setTrackings(response.tracks);
        }
      })
      .catch(() => {
        notification["error"] = {
          message: "Error del servidor",
        };
      });
    setReloadTracking(false);
  }, [page, reloadTracking]);

  if (!trackings) {
    return (
      <Spin
        tip="Cargando"
        style={{ width: "100%", padding: "200px 200px" }}
      ></Spin>
    );
  }

  const addTracking = () => {
    //console.log("Add Tracking");
    setIsVisibleModal(true);
    setModalTitle("Creando Nuevo Tracking");
    setModalContent(
      <AddEditTrackingForm
        setIsVisibleModal={setIsVisibleModal}
       setReloadTracking={setReloadTracking}
         track={null}
     />
    );
  };

  const editTracking = (tracking) => {
    // console.log("Editando Tracking");
        setIsVisibleModal(true);
        setModalTitle("Editar Tracking")
        setModalContent(
          <AddEditTrackingForm
          setIsVisibleModal={setIsVisibleModal}
          setReloadTracking={setReloadTracking}
          track={tracking}
          />
          )
  };


  return (
    <div className="tracking">
      <div className="tracking__add-tracking">
        <Button type="primary" onClick={() => addTracking()}>
          Nuevo Tracking
        </Button>
      </div>
      <TrackingList
        trackings={trackings}
        setReloadTracking={setReloadTracking}
        editTracking={editTracking}
      />
      <Pagination post={trackings} location={location} history={history} />
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  )
}

export default withRouter(Tracking);
