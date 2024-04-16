import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {format} from "timeago.js";

const Container = styled.div`
  width: 360px;
  margin-bottom: 45px;
  cursor: pointer;
  display: flex;
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

const Card = ({ video }) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(`/user/${video.uploaderId}`);
      setProfile(res.data);
    };
    fetchProfile();
  }, [video.uploaderId]);

  return (
    <Link to={`/video/${video.video_id}`} style={{ textDecoration: "none" }}>
      <Container>
        <Image
          src={video.imgUrl} // need to add image url or thumbnail as an attribute
        />
        <Details>
          <ProfileImage
            src="user.png"
          />
          <Texts>
            <Title>{video.title}</Title>
            <ProfileName>{profile.username}</ProfileName>
            <Info>{video.views} views • {format(video.uploadDate)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;