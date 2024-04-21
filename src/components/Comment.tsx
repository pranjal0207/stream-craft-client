
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UploaderUser } from "../Interface/UploaderUserInterface";
import { useSelector } from "react-redux";
import { StreamCraftState } from "../store";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({ comment }: any) => {
  const [uploaderProfile, setUploaderProfile] = useState<UploaderUser>({
    user_id: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    subscribers: [],
    likedVideos: [],
    dislikedVideos: [],
    uploadedVideos: [],
    type: ''
  });

  const API_BASE = process.env.REACT_APP_BACKEND_BASE_API;

  const currentUserToken = useSelector((state: StreamCraftState) => state.authReducer.token);

  const headers = {
    'Authorization': currentUserToken,
  };


  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`${API_BASE}/user/consumer/${comment.userId}`, {headers});
      setUploaderProfile(res.data)
    };
    fetchComment();
  }, [comment.userId]);

  return (
    <Container>
      <Avatar src="/user.png" />
      <Details>
        <Name>
          {uploaderProfile.firstName}
        </Name>
        <Text>{comment.text}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
