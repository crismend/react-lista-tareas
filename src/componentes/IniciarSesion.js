import React, { useContext } from "react";
import styled from "styled-components";
import imagen from '../Img/g-logo.png'
import { AuthContext } from "./AuthContex";
import { useNavigate } from "react-router-dom";


const IniciarSesion = () => {
  const navigate = useNavigate()
  const {login} = useContext(AuthContext)
  

  const handleLogin = async() => {
    await login()
    navigate('/')
  }

  return (
    <Div>
      <H1> Lista de Tareas</H1>
      <Boton onClick={handleLogin}> <Img src={imagen} /> Iniciar Sesion </Boton>
    </Div>

  );
}


const Div = styled.div`
    width: 78vw;
    height: 78vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 1rem;
    align-items: center;
    border-style: groove;
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

/*     @media(max-width: 60rem){ 
        height: 67vh; 
    } */
`
const H1 = styled.h1`
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 4.5rem ;
    font-weight:700;
    margin-bottom: 2rem;
    color: transparent;
     letter-spacing: -0.015em; 
     background-image: linear-gradient(180deg, #7f2fa2, #385573, #77269a  );
    background-clip: text;
    -webkit-background-clip: text;

    @media(max-width: 60rem){ /* 950px */
        font-size: 2.6rem; 
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        text-align: center;
        background-image: linear-gradient(180deg, #4ea22f, #2a5b2d, #5c9a26  );
    }
`
const Boton = styled.button`
    background-color: white ;
    width:auto;
    border: none;
    border-radius: 0.625rem; /* 10px */
    color: black;
    font-family: 'Work Sans', sans-serif;
    height: 3rem; /* 60px */
    padding: 1.8rem 1.8rem; /* 20px 30px */
    margin-top: 3rem;
    font-size: 1.6rem; /* 20px */
    font-weight: 600;
    cursor: pointer;
    position: relative;
    border: 2.2px solid #555555;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    outline: none;
    transition-duration: 0.4s;
    &:hover{
        background-color: #555555; /* Green */
    color: white;
    }
    &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, rgb(133, 8, 8), rgb(6, 6, 124), rgb(133, 9, 75), rgb(7, 7, 500), red, blue, deeppink, blue);
    background-size: 800%;
    border-radius: 10px;
    filter: blur(20px);
    animation: glowing 20s linear infinite;
}

@keyframes glowing {
    0% {
        background-position: 0 0;
    }
    50% {
        background-position: 400% 0;
    }
    0% {
        background-position: 0 0;
    }
}

@media(max-width: 60rem){ /* 950px */
border-radius: 50px;
width: 11rem;
font-size: 1rem; /* 20px */
padding: 1.5rem 1.5rem; /* 20px 30px */
    }
`
const Img = styled.img`
    width: 28px;
    margin-right: 1rem;

    @media(max-width: 60rem){ /* 950px */
    margin-right: 0px;
    }
`

export default IniciarSesion;