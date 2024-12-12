import React from 'react';
import { HomePage, LoginUser, ProtectedWrapper, UserRegister } from "./pages/Index.js";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<UserRegister />} />
        <Route path='/home' element={
          <ProtectedWrapper>
            <HomePage />
          </ProtectedWrapper>
        } />
        <Route path='/login' element={<LoginUser />} />
      </Routes>
    </div>
  )
}

export default App;