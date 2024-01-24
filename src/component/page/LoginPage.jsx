import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";

const Wrapper = styled.div`
    width: calc(100%-32px);
    padding:16px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`

const Container = styled.div`
    width:100%;
    max-width:720px;
    & > * {
        :not(:last-child){
            margin-bottom:16px;
        }
    }
`

function LoginPage(props){
    const navigate = useNavigate()
    const [id, setId] = useState('')
    const [pw, setPw] = useState('')

    const handleLogin = (event) => {
        // API 엔드포인트 및 요청 설정
        const apiUrl = "/api/login";
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },// postman에서 body의 raw 선택하고 데이터 형식을 json으로 설정
          body: JSON.stringify({
            id: id,
            pw: pw,
          }),
        };
        
        // fetch 함수를 사용하여 서버로 데이터 전송
        fetch(apiUrl, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if(data.count == 1){
                props.setIsLoggedIn(true)
                navigate("/"); // 로그인 후 리다이렉션 등의 처리
            } else {
                navigate("/login")
            }
          })
          .catch((error) => {
            console.error("Error during login:", error);
          });
      };

    return(
        <Wrapper>
            <Container>
                아이디: 
                <TextInput
                    height={20}
                    value={id}
                    onChange={(event) => {
                        setId(event.target.value)
                    }}
                />
                비밀번호: 
                <TextInput
                    height={20}
                    value={pw}
                    onChange={(event) => {
                        setPw(event.target.value)
                    }}
                />
                <Button
                    title="로그인"
                    onClick={() => {
                        handleLogin()
                        navigate('/')
                    }}
                />
            </Container>
        </Wrapper>
    )

}

export default LoginPage;