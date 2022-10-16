import './App.css';
import React from 'react';
import Login from "./Components/Login";
import PaginaInicio from './Components/PaginaInicio';
import {Routes, Route} from 'react-router-dom'
import { themeReducer, initialState } from "./utils";
import { ThemeContext } from "./ThemeContext";

function App (){
  const [state, dispatch] = useReducer(themeReducer, initialState);
  return (
    <ThemeContext.Provider  value={{ state, dispatch }}>
        <Routes>
          <Route path = '/' element = {<Login/>} />
          <Route path = '/Login' element = {<Login/>} />
          <Route path = '/paginainicio' element = {<PaginaInicio/>} />
        </Routes>
      </ThemeContext.Provider>
  )
}

export default App;
