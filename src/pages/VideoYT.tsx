import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like, moderate } from './video/reducer';
import { setSubscribe } from './SignIn/reducer';
import { format } from "timeago.js";
import { StreamCraftState } from "../store";
import { UploaderUser } from "../Interface/UploaderUserInterface";
import { VideoInterface } from "../Interface/VideoInterface";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "./UploadVideo/index.css";

const Button2 = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center; // Vertically aligns the content in the center
  justify-content: center; 
  gap: 5px;
`;
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
  cursor: pointer;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Flag = styled.button`
  width: 130px;
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

const VideoYTPage = () => {
  const currentUser = useSelector((state: StreamCraftState) => state.authReducer.user);
  const currentUserToken = useSelector((state: StreamCraftState) => state.authReducer.token);

  const videoId = useLocation().pathname.split("/")[2];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`

  const navigate = useNavigate();
  
  const signin = async () => {
    navigate("/signin");
  }

  return (
    <>
    {currentUserToken !== "" ? (<Container>
      <iframe width="1120" height="630" src={embedUrl} frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
    </Container>
      ) : (
        <div className='upload-container'>
        <div className="upload-form">
            <h3> Please Sign-In to view this video</h3>
            <Link to="/signin" style={{ textDecoration: "none" }}>
            <Button2 onClick={signin}>
                <AccountCircleOutlinedIcon />
                SIGN IN
            </Button2>
            </Link>
        </div>
        Not signed IN
      </div>
    )}
    </>
  );
};

export default VideoYTPage;