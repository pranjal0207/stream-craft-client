import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import { Video } from "../Interface/VideoInterface";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const API_BASE = process.env.REACT_APP_BACKEND_BASE_API;

const Home = ({type}:any) => {
  const [videos, setVideos] = useState<any[]>([])
  const headers = {
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkNTk3M2RjLTdhYjItNDE5Yi04Y2ViLTg4NDU0NDY2NTcxYSIsImlhdCI6MTcxMzM5NzU5Nn0.ALswHlhoSpTYPSFyzjFtVoQWbwGotPBOTkKsqJvkjXo',
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    const fetchVideos = async () => {
      // const res = await axios.get(`${API_BASE}/video/${type}/getTopVideos?n=6`, { headers });
      const res = await axios.get(`${API_BASE}/video/getTopVideos?n=6`, { headers });
      setVideos(res.data.top_videos);

    };
    fetchVideos();

    
  }, []);

  return (
    <Container>
      {videos && videos.map((video:Video) => (
        <Card key={video.video_id} video={video}/>
      ))}
    </Container>
  );
};

export default Home;