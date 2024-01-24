import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import MainPage from "./component/page/MainPage";
import PostWritePage from "./component/page/PostWritePage";
import PostViewPage from "./component/page/PostViewPage";
import LoginPage from "./component/page/LoginPage";
import JoinPage from "./component/page/JoinPage";

const MainTitleText = styled.p`
  font-size:24px;
  font-weight:bold;
  text-align:center;
`

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState('');
  

  return (
      <BrowserRouter>
        <MainTitleText>미니 블로그</MainTitleText>
        
        <Routes>
          <Route index element={<MainPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path="post-write" element={<PostWritePage/>}/>
          <Route path="post/:bno" element={<PostViewPage/>}/>
          <Route path="login" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} loginId={loginId} setLoginId={setLoginId}/>}/>
          <Route path="join" element={<JoinPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
