import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { VideoInterface } from "../Interface/VideoInterface";
import { useSelector } from "react-redux";
import { StreamCraftState } from "../store";
import CardYt from "../components/CardYt";

const Container = styled.div`
  margin-top:50px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const YTHeading = styled.h2`
  color: ${({ theme }) => theme.text};
`;

const API_BASE = process.env.REACT_APP_BACKEND_BASE_API;
const YT_KEY = process.env.REACT_APP_YT_API_KEY;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  const[ytVideos, setYtVideos] = useState([]);


  const currentUserToken = useSelector((state: StreamCraftState) => state.authReducer.token);
  
  const headers = {
    'Authorization': currentUserToken,
    'Content-Type': 'application/json'
  };

  const headers1 = {
    'Authorization': YT_KEY,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${API_BASE}/video/${query}`, { headers });
      setVideos(res.data.videos);

      const ytres = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${YT_KEY}`);
        
      const videoData = ytres.data.items.map((item: { id: { videoId: any; }; snippet: { title: any; publishedAt: any; thumbnails: { high: { url: any; }; }; }; }) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        publishedAt: item.snippet.publishedAt,
        thumbnail: item.snippet.thumbnails.high.url
      }));

      setYtVideos(videoData);
    };
    fetchVideos();
  }, [query]);

  return (
    <>
      <Container>
        {videos && videos.map((video:any) => (
          <Card key={video.video_id} video={video}/>
        ))}
      </Container>

      <YTHeading >From YouTube:</YTHeading>
      <Container>
        {ytVideos && ytVideos.map((video:any) => (
          <CardYt video={video}/>
        ))}
      </Container>
    </>
    
  );
};

export default Search;