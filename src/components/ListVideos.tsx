import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
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

const ListVideos = () => {
    const [videos, setVideos] = useState<Video[]>([]); // Initialize with the correct type

  useEffect(() => {
    const fetchVideos = async () => {
    //   const res = await axios.get(`${API_BASE}/video/getVideo/e8374d16-63bf-4d11-9346-ad9e56a35be0`);
    //   setVideos(res.data);

    const temp: Video[] = [{
        message: {
            _id: "66200e24a6f4d47aea08114f",
            video_id: "e8374d16-63bf-4d11-9346-ad9e56a35be0",
            title: "Sample",
            description: "This is a sample video description",
            uploadDate: "2024-04-17T18:00:04.547Z",
            uploaderId: "4d5973dc-7ab2-419b-8ceb-88454466571a",
            views: 0,
            likes: 0,
            dislikes: 0,
            comments: [],
            coordinates: [],
            moderated: false,
            __v: 0
        },
        videoUrl: "https://streamcraft-video-bucket.s3.amazonaws.com/..."
    },
    {
        message: {
            _id: "66200e24a6f4d47aea081141",
            video_id: "e8374d16-63bf-4d11-9346-ad9e56a35be0",
            title: "Sample",
            description: "This is a sample video description",
            uploadDate: "2024-04-17T18:00:04.547Z",
            uploaderId: "4d5973dc-7ab2-419b-8ceb-88454466571a",
            views: 0,
            likes: 0,
            dislikes: 0,
            comments: [],
            coordinates: [],
            moderated: false,
            __v: 0
        },
        videoUrl: "https://streamcraft-video-bucket.s3.amazonaws.com/..."
    },
    {
        message: {
            _id: "66200e24a6f4d47aea081145",
            video_id: "e8374d16-63bf-4d11-9346-ad9e56a35be0",
            title: "Sample",
            description: "This is a sample video description",
            uploadDate: "2024-04-17T18:00:04.547Z",
            uploaderId: "4d5973dc-7ab2-419b-8ceb-88454466571a",
            views: 0,
            likes: 0,
            dislikes: 0,
            comments: [],
            coordinates: [],
            moderated: false,
            __v: 0
        },
        videoUrl: "https://streamcraft-video-bucket.s3.amazonaws.com/..."
    },
    {
        message: {
            _id: "66200e24a6f4d47aea081146",
            video_id: "e8374d16-63bf-4d11-9346-ad9e56a35be0",
            title: "Sample",
            description: "This is a sample video description",
            uploadDate: "2024-04-17T18:00:04.547Z",
            uploaderId: "4d5973dc-7ab2-419b-8ceb-88454466571a",
            views: 0,
            likes: 0,
            dislikes: 0,
            comments: [],
            coordinates: [],
            moderated: false,
            __v: 0
        },
        videoUrl: "https://streamcraft-video-bucket.s3.amazonaws.com/..."
    },
    {
        message: {
            _id: "66200e24a6f4d47aea081142",
            video_id: "e8374d16-63bf-4d11-9346-ad9e56a35be0",
            title: "Sample",
            description: "This is a sample video description",
            uploadDate: "2024-04-17T18:00:04.547Z",
            uploaderId: "4d5973dc-7ab2-419b-8ceb-88454466571a",
            views: 0,
            likes: 0,
            dislikes: 0,
            comments: [],
            coordinates: [],
            moderated: false,
            __v: 0
        },
        videoUrl: "https://streamcraft-video-bucket.s3.amazonaws.com/..."
    }];

    setVideos(temp);

    };
    fetchVideos();
  }, []);

  const [displayCount, setDisplayCount] = useState(2);  // Start with 4 videos displayed


  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 2);  // Load 4 more videos
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