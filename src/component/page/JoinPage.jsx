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

function JoinPage(props){
    const navigate = useNavigate()
    const [id, setId] = useState('')
    const [pw, setPw] = useState('')
    const [name, setName] = useState('')
    const [isIdTest, setIsIdTest] = useState(false)

    const handleJoin = () => {
        // API 엔드포인트 및 요청 설정
        const apiUrl = "/api/join";
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },// postman에서 body의 raw 선택하고 데이터 형식을 json으로 설정
          body: JSON.stringify({
            id: id,
            pw: pw,
            name: name,
            isIdTest: isIdTest
          }),
        };
        
        // fetch 함수를 사용하여 서버로 데이터 전송
        fetch(apiUrl, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if(data.count == 1){
                navigate("/");
            } else {
                navigate("/join")
            }
          })
          .catch((error) => {
            console.error("Error during join:", error);
          });
      };

      const handleIdTest = () => {
        // API 엔드포인트 및 요청 설정
        const apiUrl = "/api/idTest";
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },// postman에서 body의 raw 선택하고 데이터 형식을 json으로 설정
          body: JSON.stringify({
            id: id,
          }),
        };
        
        // fetch 함수를 사용하여 서버로 데이터 전송
        fetch(apiUrl, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if(data.count == 0){
                alert('사용가능한 아이디입니다.')
                setIsIdTest(true)
            } else {
                alert('중복된 회원이 있습니다.')
                setId('')
                setIsIdTest(false);
                console.log(isIdTest)
            }
          })
          .catch((error) => {
            console.error("Error during idTest:", error);
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
                <Button
                    title="중복회원검사"
                    onClick={() => {
                        handleIdTest()
                    }}
                />
                <br/>
                비밀번호: 
                <TextInput
                    height={20}
                    value={pw}
                    onChange={(event) => {
                        setPw(event.target.value)
                    }}
                />
                이름: 
                <TextInput
                    height={20}
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value)
                    }}
                />                
                <Button
                    title="회원가입"
                    disabled={!isIdTest || !id || !pw || !name}
                    onClick={() => {
                        if(!isIdTest){
                            alert("아이디 중복 검사하세요.")
                        } else if(!id || !pw || !name) {
                            alert("모두 입력하세요.")
                        } else {
                            handleJoin()
                            navigate('/')
                        }
                    }}
                />
            </Container>
        </Wrapper>
    )
}

export default JoinPage