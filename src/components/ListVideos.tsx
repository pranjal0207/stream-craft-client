import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import axios from "axios";
import { Video } from "../Interface/Video";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const LoadMoreButton = styled.button`
  padding: 10px 20px;
  margin: 20px auto;
  display: block;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

const API_BASE = process.env.REACT_APP_BACKEND_BASE_API;

interface Props {
  videos: Video[]; 
}

const ListVideos: React.FC<Props> = ({videos}) => {

  const [displayCount, setDisplayCount] = useState(2);  


  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 2); 
  };


  console.log(videos);


  return (
    <Container>
      {videos.slice(0, displayCount).map(video => (
        <Card key={video.message._id} video={video} />
      ))}
      {displayCount < videos.length && (
        <LoadMoreButton onClick={handleLoadMore}>Load More</LoadMoreButton>
      )}
    </Container>
  );
};

export default ListVideos;