import React, { useState } from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
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

function PostWritePage(props){
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleWrite = () => {
        // API 엔드포인트 및 요청 설정
        const apiUrl = "/api/postWrite";
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },// postman에서 body의 raw 선택하고 데이터 형식을 json으로 설정
          body: JSON.stringify({
            title: title,
            content: content,
          }),
        };
        
        // fetch 함수를 사용하여 서버로 데이터 전송
        fetch(apiUrl, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if(data.result == 1){
                
            } else {
                navigate("/post-write")
            }
          })
          .catch((error) => {
            console.error("Error during login:", error);
          });
      };

    return(
        <Wrapper>
            <Container>
                <TextInput
                    height={20}
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value)
                    }}
                />
                <TextInput
                    height={480}
                    value={content}
                    onChange={(event) => {
                        setContent(event.target.value)
                    }}
                />
                <Button
                    title="글 작성하기"
                    disabled={!title || !content}
                    onClick={() => {
                        if(!title || !content){
                            alert("모두 입력하세요.")
                        } else {
                            handleWrite()
                            navigate('/')
                        }
                    }}
                />
            </Container>
        </Wrapper>
    )
}

export default PostWritePage