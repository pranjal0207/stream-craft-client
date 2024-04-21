import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import { StreamCraftState } from "../store";
import { addComment } from "../pages/video/reducer";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const API_BASE = process.env.REACT_APP_BACKEND_BASE_API;

const Comments = ({currentVideo}: any) => {

  const currentUserToken = useSelector((state: StreamCraftState) => state.authReducer.token);

  const [comments, setComments] = useState<any[]>([]);
  const headers = {
    'Authorization': currentUserToken,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${API_BASE}/video/${currentVideo.message.video_id}/comment`, {headers});
        setComments(res.data.comments);
      } catch (err) {}
    };
    fetchComments();
  }, [currentVideo.message.video_id]);

  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e:any) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    const res = await axios.post(`${API_BASE}/video/${currentVideo.message.video_id}/comment`, {"text": newComment}, {headers});

    dispatch(addComment(newComment));
    
    setNewComment('');
  };

  return (
    <Container>
      <NewComment>
          <Avatar src="/user.png" />
          <Input type="text" value={newComment} onChange={handleCommentChange} placeholder="Add a comment..." />
          <button type="submit" onClick={handleCommentSubmit}>Comment</button>
      </NewComment>
      
      {comments && comments.map((comment, index)=>(
        <Comment key={index} comment={comment}/>
      ))}
    </Container>
  );
};

export default Comments;