import React from 'react';
import LogoNetzwerk from "../../../../assets/img/Logo_netzwerk-menu.jpg";
import SocialLinks from "../../SocialLinks";

import "./MyInfo.scss"

export default function MyInfo() {
    return (
        <div className="my-info">
            <img src={LogoNetzwerk} alt="Logo Netzwerk"/>
            <h4>
                Porque el aprendizaje es continuo. Como podemos ser mejores líderes y tener mejores equipos.
            </h4>
            <SocialLinks/>
        </div>
    )
}
