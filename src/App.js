import './App.css';
import React from 'react';
import Login from "./Components/Login";
import PaginaInicio from './Components/PaginaInicio';
import {Routes, Route} from 'react-router-dom'

function App (){
  return (
      <Routes>
        <Route path = '/' element = {<Login/>} />
        <Route path = '/Login' element = {<Login/>} />
        <Route path = '/paginainicio' element = {<PaginaInicio/>} />
      </Routes>
  )
}

export default App;
