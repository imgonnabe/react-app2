import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import PostList from "../list/PostList";
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

function MainPage(props){
    const {} = props
    const navigate = useNavigate()
    const [data, setData] = useState([])// 받아오려는 데이터가 객체 형태

    useEffect(() => {
        fetch('/api/list')
        .then((res) => {return res.json()})
        .then(function(result){
            setData(result.board)
        })
    }, [])

    return(
        <Wrapper>
            <Container>
                
                {props.isLoggedIn === false ? (
                    <Button
                        title="로그인"
                        onClick={() => {
                        navigate(`/login`);
                        }}
                    />
                    ) : (// jsx는 하나의 부모 엘리먼트로 감싸져야 한다.
                        <React.Fragment>
                            <Button
                                title="글 작성하기"
                                onClick={() => {
                                    navigate(`/post-write`)
                                }}
                            />  
                            <Button
                                title="로그아웃"
                                onClick={() => {
                                    fetch('api/logout', {
                                        method: 'get',                               
                                    })
                                    .then((res) => res.json())
                                    .then((data) => {
                                        console.log(data.ok)
                                        if(data.ok == 1){
                                            props.setIsLoggedIn(false)
                                        }
                                    })
                                }}
                            />
                        </React.Fragment>
                    )}

                <Button
                    title="회원가입"
                    onClick={() => {
                        navigate(`/join`)
                    }}
                />

                <PostList
                    posts={data}
                    onClickItem={(item) => {
                        navigate(`/post/${item.bno}`)
                    }}
                />
            </Container>
        </Wrapper>
    )
}

export default MainPage