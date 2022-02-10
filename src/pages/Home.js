import React from "react";
import { Helmet } from "react-helmet";
import MainBanner from "../components/Web/MainBanner";
import HomeCourses from "../components/Web/HomeCourses";
// import HowMyCoursesWork from "../components/Web/HowMyCoursesWork";
// import ReviewCourses from "../components/Web/ReviewCourses"

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Netzwerk</title>
        <meta
          name="description"
          content="Blog donde hablo de liderazgo y trabajo en equipo. Si quieres mejorar el desempeño de tu equipo de trabajo o si buscas mejorar en tu trabajo te recomiendo que me visites regularmente."
          data-react-helmet="true"
        />
        <meta
          name="keywords"
          content="liderazgo, crisis, administración, equipo, disciplina, colaboración, persuasión, asertividad, resolución de problemas, confianza, inteligencia emocional, liderazgo participativo, proactividad"
          data-react-helmet="true"
        />
         <meta
          name="robots"
          content="index,follow"
          data-react-helmet="true"
        />
        
        {/*Twitter Tags*/}
         <meta
          name="twitter:card"
          content="summary_large_image"
          data-react-helmet="true"
        />
        <meta
          name="twitter:title"
          content="Blog acerca de temas de liderazgo y desarrollo de equipos"
          data-react-helmet="true"
        />
        <meta
          name="twitter:description"
          content="Blog donde quisiera compartir mis experiencias, lo que voy aprendiendo en el camino y me gustaria escuchar de ti."
          data-react-helmet="true"
        />
        <meta
          name="twitter:site"
          content="@netzwerk13"
          data-react-helmet="true"
        />
         <meta
          name="twitter:creator"
          content="@netzwerk13"
          data-react-helmet="true"
        />
        <meta
          name="twitter:image"
          content="https://netzwerk.mx/assets/dist/img/Logo_netzwerk.png"
          data-react-helmet="true"
        />
        {/*Og Tags*/ }
        <meta
          name="og:type"
          content="article"
          data-react-helmet="true"
        /> 
        {/* <meta
        name="og:url"
        content="article"
        data-react-helmet="true"
      /> */}
       <meta
          name="og:title"
          content="Netzwerk"
          data-react-helmet="true"
        />
        <meta
          name="og:description"
          content="Blog donde quisiera compartir mis experiencias, lo que voy aprendiendo en el camino y me gustaria escuchar de ti."
          data-react-helmet="true"
        />
        <meta
          name="article:author"
          content="@netzwerk13"
          data-react-helmet="true"
        />
        {/* <meta
          name="article:published_date"
          content="article"
          data-react-helmet="true"
        /> */}
        <meta
          name="og:image"
          content="https://netzwerk.mx/assets/dist/img/Logo_netzwerk.png"
          data-react-helmet="true"
        />
      </Helmet>
      <MainBanner />
      {/* Aqui va los Blogs que se enseñan al princio */}
      <HomeCourses />
      {/* <HowMyCoursesWork/>
            <ReviewCourses/> */}
    </>
  );
}
