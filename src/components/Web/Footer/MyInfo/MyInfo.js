import React from 'react';
import LogoNetzwerk from "../../../../assets/img/Logo_netzwerk.png";
import SocialLinks from "../../SocialLinks";

import "./MyInfo.scss"

export default function MyInfo() {
    return (
        <div className="my-info">
            <img src={LogoNetzwerk} alt="Logo Netzwerk"/>
            <h4>
                Entra en el mundo del desarrollo web, disfruta creando proyectos de todo tipo, deja que tu
                imaginación fluya y crea verdaderas maravillas!!!
            </h4>
            <SocialLinks/>
        </div>
    )
}
