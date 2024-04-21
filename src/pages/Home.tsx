import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import { VideoInterface } from "../Interface/VideoInterface";
import { useSelector } from "react-redux";
import { StreamCraftState } from "../store";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const API_BASE = process.env.REACT_APP_BACKEND_BASE_API;

const Home = ({type}:any) => {
  const [videos, setVideos] = useState<any[]>([])

  const currentUserToken = useSelector((state: StreamCraftState) => state.authReducer.token);

  const headers = {
    'Authorization': currentUserToken,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    const fetchVideos = async () => {
      // const res = await axios.get(`${API_BASE}/video/${type}/getTopVideos?n=6`, { headers });
      const api = type? `${API_BASE}/video/getTopVideos?n=6&tagName=${type}` : `${API_BASE}/video/getTopVideos?n=6`
      const res = await axios.get(api, {headers});
      setVideos(res.data.top_videos);
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos && videos.map((video:any) => (
        <Card key={video.video_id} video={video}/>
      ))}
    </Container>
  );
};

export default Home;