import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { VideoInterface } from "../Interface/VideoInterface";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const API_BASE = process.env.REACT_APP_BACKEND_BASE_API;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;
  const headers = {
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkNTk3M2RjLTdhYjItNDE5Yi04Y2ViLTg4NDU0NDY2NTcxYSIsImlhdCI6MTcxMzM5NzU5Nn0.ALswHlhoSpTYPSFyzjFtVoQWbwGotPBOTkKsqJvkjXo',
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