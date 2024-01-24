import React from "react";
import styled from "styled-components";
import CommentListItem from "./CommentListItem";

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:center;
    & > * {
        :not(:last-child){
            margin-bottom:16px;
        }
    }
`
// & : 현재 styled component, > * : 직계 자식 요소들을 선택, & > * : 현재 styled component인 Wrapper의 자식 요소들을 선택
// :not(:last-child) -> 선택된 요소 중에서 마지막 자식 요소를 제외한 모든 요소에 스타일을 적용

function CommentList(props){
    const {comments} = props

    return(
        <Wrapper>
            {comments.map((comment, index) => {
                return <CommentListItem key={comment.cno} comment={comment}/>
            })}
        </Wrapper>
    )
}

export default CommentList;