import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { VideoInterface } from "../Interface/VideoInterface";
import { useSelector } from "react-redux";
import { StreamCraftState } from "../store";

const Container = styled.div`
  margin-top:50px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const API_BASE = process.env.REACT_APP_BACKEND_BASE_API;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;


  const currentUserToken = useSelector((state: StreamCraftState) => state.authReducer.token);
  
  const headers = {
    'Authorization': currentUserToken,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${API_BASE}/video/${query}`, { headers });
      setVideos(res.data.videos);
    };
    fetchVideos();
  }, [query]);

  return (
    <Container>
      {videos && videos.map((video:any) => (
        <Card key={video.video_id} video={video}/>
      ))}
    </Container>
  );
};

export default Search;