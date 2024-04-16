import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const API_BASE = process.env.REACT_APP_BACKEND_BASE_API;

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${API_BASE}/video/getTopVideos?n=6`);
      setVideos(res.data);
    };
    fetchVideos();
  }, []);

  return (
    <Container>
      {videos.map((video:any) => (
        <Card key={video._id} video={video}/>
      ))}
    </Container>
  );
};

export default Home;