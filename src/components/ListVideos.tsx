import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import axios from "axios";
import { Video } from "../Interface/Video";
import List from "./List";

const Container = styled.div`
  max-height: 90vh;
  overflow-y: auto;
  margin: 20px;
  padding-right: 20px;
  width: 100%;  // Make sure it occupies full width
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
  videos: Video[],
  onDelete: (videoId: string) => void,
  showDeleteButton: boolean
}

const ListVideos: React.FC<Props> = ({ videos, onDelete, showDeleteButton }) => {

  const [displayCount, setDisplayCount] = useState(2);  


  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 2); 
  };

  return (
    <Container>
      {videos.slice(0, displayCount).map(video => (
        <List key={video._id} video={video} onDelete={onDelete} showDeleteButton={showDeleteButton}/>
      ))}
      {displayCount < videos.length && (
        <LoadMoreButton onClick={handleLoadMore}>Load More</LoadMoreButton>
      )}
    </Container>
  );
};

export default ListVideos;