import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// Local imports
import Comment from "./Comment";
import { StreamCraftState } from "../store";

const Container = styled.div`
  padding: 0 20px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
  width: auto; // Changed from 10% to auto
  padding: 5px 10px; // Padding for better touch targets on mobile

  @media (max-width: 768px) {
    flex-grow: 1;
    margin-top: 10px;
  }
`;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap; // Allows the form to wrap on small screens

  @media (max-width: 768px) {
    flex-direction: column;
  }
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
  width: 80%; // Flexible width

  @media (max-width: 768px) {
    width: 100%; // Full width on mobile devices
  }
`;

const API_BASE = process.env.REACT_APP_BACKEND_BASE_API;

const Comments = ({ currentVideo } : any) => {
  const currentUserToken = useSelector((state: StreamCraftState) => state.authReducer.token);
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${API_BASE}/video/${currentVideo.message.video_id}/comment`, {
        headers: { 'Authorization': currentUserToken }
      });
      setComments(res.data.comments);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [currentVideo.message.video_id]);

  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e:any) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      await axios.post(`${API_BASE}/video/${currentVideo.message.video_id}/comment`, { text: newComment }, {
        headers: { 'Authorization': currentUserToken }
      });
      fetchComments();
      setNewComment('');
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  return (
    <Container>
      <NewComment>
        <Avatar src="/user.png" />
        <Input type="text" value={newComment} onChange={handleCommentChange} placeholder="Add a comment..." />
        <Button type="submit" onClick={handleCommentSubmit}>Comment</Button>
      </NewComment>
      {comments.map((comment : any)=> (
        <Comment key={comment.commentId} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
