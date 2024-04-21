// Profile.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ProfileDetails from '../components/ProfileDetails';
import ListVideos from "../components/ListVideos";
import { Video } from "../Interface/Video";
import { useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const SubContainer = styled.div`
  align-self: flex-start;
  padding: 20px;
`;

const API_BASE = process.env.REACT_APP_BACKEND_BASE_API;

type UserDataType = {
    name: string;
    username: string;
    password: string;
};

type EditModeType = {
    [key in keyof UserDataType]: boolean;
};

const IndividualUserProfile: React.FC = () => {

    // const { userId } = useParams<{ id: string }>(); // Get the id parameter from route params


  // User Details
    const [user, setUser] = useState<UserDataType>({ name: '', username: '', password: '' });
    const [editMode, setEditMode] = useState<EditModeType>({ name: false, username: false, password: false });


    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get<UserDataType>(`${API_BASE}/user/details`);
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user data', error);
        }
      };
      fetchUserData();
    }, []);

    const toggleEditMode = (field: keyof UserDataType) => {
      setEditMode(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChange = (field: keyof UserDataType, value: string) => {
      setUser(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (field: keyof UserDataType, e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();  
      const value = user[field];  
      try {
        
        const updateRes = await axios.put(`${API_BASE}/user/update`, { [field]: value });
        console.log(`${field} update successful:`, updateRes.data);
        alert(`${field} updated successfully!`);
        toggleEditMode(field); 
      } catch (error) {
        console.error(`Failed to update ${field}`, error);
        alert(`Failed to update ${field}`);
      }
    };

    // Uploaded Videos 
    const [uploadedvideos, setUploadedVideos] = useState<Video[]>([]);
   
    useEffect(() => {
      const fetchWatchedVideos = async () => {
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
  
     
      setUploadedVideos(temp);   // Replace with API call
  
      };
      fetchWatchedVideos();
    }, []);


    

    return (
        <Container>
          <SubContainer>
            <ProfileDetails
              user={user}
              editMode={editMode}
              toggleEditMode={toggleEditMode}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </SubContainer>
          
          { uploadedvideos.length > 0 && (
            <SubContainer>
              <h1>Uploaded Videos</h1>
              <ListVideos videos={uploadedvideos} />
            </SubContainer>
          )}

        </Container>
    );
};

export default IndividualUserProfile;


