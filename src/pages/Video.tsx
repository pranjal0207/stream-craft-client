import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from '../pages/video/reducer';
import { format } from "timeago.js";
import { StreamCraftState } from "../store";
import { UploaderUser } from "../Interface/UploaderUserInterface";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const API_BASE = process.env.REACT_APP_BACKEND_BASE_API;

const Video = () => {
  const currentUser = useSelector((state: StreamCraftState) => state.authReducer.user);
  const currentUserToken = useSelector((state: StreamCraftState) => state.authReducer.token);
  const currentVideo = useSelector((state: StreamCraftState) => state.videoReducer.currentVideo);

  console.log(currentUserToken);
  const dispatch = useDispatch();

  const videoId = useLocation().pathname.split("/")[2];

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
  // const headers = {
  //   'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkNTk3M2RjLTdhYjItNDE5Yi04Y2ViLTg4NDU0NDY2NTcxYSIsImlhdCI6MTcxMzM5NzU5Nn0.ALswHlhoSpTYPSFyzjFtVoQWbwGotPBOTkKsqJvkjXo',
  //   'Content-Type': 'application/json'
  // };
  const headers = {
    'Authorization': currentUserToken,
  };
  console.log({headers});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`${API_BASE}/video/getVideo/${videoId}`, { headers });
        const res = await axios.get(`${API_BASE}/user/uploader/${videoRes.data.message.uploaderId}`, { headers });
        setUploaderProfile(res.data.user);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {}
    };
    fetchData();
  }, [videoId, dispatch]);

  const handleLike = async () => {
    const res = await axios.put(`${API_BASE}/video/${currentVideo.message.video_id}/like`, {}, {headers});
    dispatch(like(res.data.video));
  };
  const handleDislike = async () => {
    const res = await axios.put(`${API_BASE}/video/${currentVideo.message.video_id}/dislike`, {}, {headers});
    dispatch(dislike(res.data.video));
  };

  return (
    <Container>
      {currentVideo && 
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo.message.title}</Title>
        <Details>
          <Info>
            {currentVideo.message.views} views • {format(currentVideo.message.uploadDate)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentUser.likedVideos?.includes(currentVideo?.message.video_id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo.message.likes}
            </Button>

            <Button onClick={handleDislike}>
            {currentUser.dislikedVideos?.includes(currentVideo?.message.video_id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              {currentVideo.message.dislikes}
            </Button>

          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src='user.png' />
            <ChannelDetail>
            {uploaderProfile && <ChannelName>{uploaderProfile.firstName}</ChannelName>}
              <Description>{currentVideo.message.description}</Description>
            </ChannelDetail>
          </ChannelInfo>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo.message.video_id} />
      </Content>}
    </Container>
  );
};

export default Video;