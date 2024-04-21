import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { StreamCraftState } from "../store";
import { Video } from "../Interface/Video";
import axios from "axios";

// Define styles for the card
const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; // Ensure that components spread out
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1; // Allow it to take up space flexibly
  margin-right: 15px; // Space between this container and the delete button
`;

const Thumbnail = styled.img`
  width: 120px;
  height: 90px;
  border-radius: 4px;
  margin-right: 15px; // Maintain spacing to the next element
`;

const VideoInfo = styled.div`
  flex: 1; // Take remaining space after Thumbnail
  display: flex;
  flex-direction: column;
  margin-right: 10px; // Extra spacing if needed, adjust as required
`;

const Title = styled.h4`
  margin: 0;
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 14px;
  color: white;
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100px; // Fixed width for the delete button
  margin-right: 150px;
`;
// Card component expecting video props

interface Props { 
  video: Video,
  onDelete: (videoId: string) => void,
  showDeleteButton: boolean
}

const List: React.FC<Props> = ({ video, onDelete,showDeleteButton }) => {


  const API_BASE = process.env.REACT_APP_BACKEND_BASE_API;
  
  const currentToken = useSelector((state: StreamCraftState) => state.authReducer.token);
  const currentUser = useSelector((state: StreamCraftState) => state.authReducer.user);

    console.log('type',currentUser.type);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': currentToken
    };

  const handleDelete = () => {
    console.log('deleted successfully',video.video_id);
    onDelete(video.video_id);
  };

  const [thumbnail, setThumbnail] = useState("");
  
  // const fetchThumbnail = async () => {
  //   const res = await axios.get(`${API_BASE}/video/getThumbnail/${video.video_id}`, { headers });
  //   console.log('photo',res.data);
  //   setThumbnail(res.data.thumbnailUrl);
  // };

  // fetchThumbnail();

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': currentToken
        };
        const res = await axios.get(`${API_BASE}/video/getThumbnail/${video.video_id}`, { headers });
        setThumbnail(res.data.thumbnailUrl);
      } catch (error) {
        console.error('Error fetching thumbnail:', error);
      }
    };
   
      fetchThumbnail();
  }, [API_BASE, currentToken, video.video_id]); 

  return (
    <CardContainer>
      <ContentContainer>
        <Thumbnail src={thumbnail} alt="Video Thumbnail" />
        <VideoInfo>
          <Title>{video.title}</Title>
          <Description>{video.description}</Description>
        </VideoInfo>
      </ContentContainer>
      {showDeleteButton && ( 
      <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
      )}
    </CardContainer>
  );
};

export default List;
