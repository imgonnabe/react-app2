import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import CommentList from "../list/CommentList";
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

const PostContainer = styled.div`
    padding:8px 16px;
    border:1px solid grey;
    border-radius:8px;
`

const TitleText = styled.p`
    font-size:20px;
    font-weight:500;
`

const ContentText = styled.p`
    font-size:20px;
    line-height:32px;
    white-space:pre-wrap;
`

const CommentLabel = styled.p`
    font-size:16px;
    font-weight:500;
`

function PostViewPage(props){
    const navigate = useNavigate()
    const {bno} = useParams()// App.js에서 파라미터 설정
    const [data, setData] = useState({})// 받아오려는 데이터가 객체 형태
    const [cdata, setCdata] = useState([])// 배열
    
    useEffect(() => {
        fetch(`/api/detail/${bno}`)
        .then((res) => {return res.json()})
        .then(function(result){
            setData(result)
            return fetch(`/api/comment/${bno}`)
        })
        .then((res) => {return res.json()})
        .then(function(result){
            setCdata(result.comment)
        })
    }, [bno])
 

    const [comment, setComment] = useState('')

    

    const handleComment = () => {
        // API 엔드포인트 및 요청 설정
        const apiUrl = "/api/commentWrite";
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },// postman에서 body의 raw 선택하고 데이터 형식을 json으로 설정
          body: JSON.stringify({
            comment:comment,
            bno:bno
          }),
        };
        
        // fetch 함수를 사용하여 서버로 데이터 전송
        fetch(apiUrl, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if(data.result == 1){
                return fetch(`/api/comment/${bno}`)                    
            } else {
                navigate(`/post/${bno}`)
            }
          })
            .then((res) => res.json())
            .then((cresult) => {
                setCdata(cresult.comment);
            })
            .catch((error) => {
                console.error("Error fetching comments:", error);
            });
      };

    return(
        <Wrapper>
            <Container>
                <Button
                    title="뒤로 가기"
                    onClick={() => {
                        navigate('/')
                    }}
                />
                
                {Object.keys(data).length > 0 && (
                    <PostContainer>
                        <TitleText>{data.btitle}</TitleText>
                        <ContentText>{data.bcontent}</ContentText>
                        <ContentText>{data.bdate}</ContentText>
                    </PostContainer>
                )}

                <CommentLabel>댓글</CommentLabel>
                <CommentList comments={cdata}/>
                
                <TextInput
                    height={40}
                    value={comment}
                    onChange={(event) => {
                        setComment(event.target.value)
                    }}
                />
                <Button
                    title="댓글 작성하기"
                    disabled={!comment}
                    onClick={() => {
                        if(!comment){
                            alert("댓글을 입력하세요.")
                        } else {
                            handleComment()
                            setComment('')
                        }
                    }}
                />
            </Container>
        </Wrapper>
    )
}

export default PostViewPage