import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContex";
import styled from "styled-components";

const H1 = styled.h1`
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

const Autha = ({children}) => {
    const {userLogin, userLoading} = useContext(AuthContext)
    if(userLoading) return <H1>loading...</H1>
    if (!userLogin) return <Navigate to='/iniciar-sesion' />

    return ( 
       <>{children}</>
        );
}
 
export default Autha;
