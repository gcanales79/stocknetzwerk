import React from "react";
import AcademyLogo from "../../../../assets/img/academy-logo.png";

import "./PresentationCourses.scss";

export default function PresentationCourses() {
  return (
    <div className="presentation-courses">
      <img src={AcademyLogo} alt="Cursos de Gustavo Canales Robles"/>
      <p>
          En la academia de Gustavo Canales vas a encontrar los mejores cursos online de
          desarrollo web en Españo. Unete a nosotros y empieza tu camino como Desarrollador Web o 
          Desarrollador de CMS. Sinceramente, estos cursos son el tipo de contenido que a mi me hubiera
          gustatado encontrarme cuando empece en el mundo del desarrollo web profesional.
      </p>
      <p>
          ¡¡Echales un vistazo y aprovecha las oferas!!
      </p>
    </div>
  );
}
