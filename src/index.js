import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IniciarSesion from './componentes/IniciarSesion';
import { AuthProvider } from './componentes/AuthContex';
import Autha from './componentes/Auth'



const Index = () => {
  return ( 
    <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/iniciar-sesion' element={<IniciarSesion/>}/>
      
      <Route path='/' element={<Autha><App /></Autha> }/>
      
    
    </Routes>
    </BrowserRouter>
    </AuthProvider>
    );
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index/>);

