import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {format} from "timeago.js";
import { StreamCraftState } from "../store";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 330px;
  margin-bottom: 45px;
  cursor: pointer;
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 202px;
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 12px;
  flex: 1;
`;

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: flex;
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ProfileName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const API_BASE = process.env.REACT_APP_BACKEND_BASE_API;

const Card = ({ video } : any) => {
  const [uploaderProfile, setUploaderProfile] = useState({
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
  
  const [thumbnail, setThumbnail] = useState("");
  const currentUserToken = useSelector((state: StreamCraftState) => state.authReducer.token);

  const headers = {
    'Authorization': currentUserToken,
    'Content-Type': 'application/json'
  };
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(`${API_BASE}/user/uploader/${video.uploaderId}`, { headers });
      setUploaderProfile(res.data.user);
    };
    fetchProfile();

    const fetchThumbnail = async () => {
      const res = await axios.get(`${API_BASE}/video/getThumbnail/${video.video_id}`, { headers });
      setThumbnail(res.data.thumbnailUrl);
    };
    fetchThumbnail();

  }, [video.video_id, video.uploaderId]);

  return (
    <Link to={`/video/${video.video_id}`} style={{ textDecoration: "none" }}>
      <Container>
        <Image
          src={thumbnail}
        />
        <Details>
          <ProfileImage
            src="user.png"
          />
          <Texts>
            <Title>{video.title}</Title>
            {uploaderProfile && <ProfileName>{uploaderProfile.firstName}</ProfileName>}
            <Info>{format(video.uploadDate)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;