// Profile.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ProfileDetails from '../components/ProfileDetails';
import ListVideos from "../components/ListVideos";
import { Video } from "../Interface/Video";
import { useParams } from "react-router-dom";
import { StreamCraftState } from "../store";
import { useSelector } from "react-redux";

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
    const [editMode, setEditMode] = useState<boolean>(false); // Explicit boolean state

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
  
    const toggleEditMode = () => {
      setEditMode(prev => !prev);  // Correctly toggling boolean state
    };
  
    const handleChange = (field: keyof UserDataType, value: string) => {
      setUser(prev => ({ ...prev, [field]: value }));
    };
  
    const handleSaveAll = async () => {
      try {
        const updateRes = await axios.put(`${API_BASE}/user/update`, user);
        console.log('Update successful:', updateRes.data);
        alert('Profile updated successfully!');
        setEditMode(false);  // Exiting edit mode after saving
      } catch (error) {
        console.error('Failed to update profile', error);
        alert('Failed to update profile');
      }
    };

    const currentToken = useSelector((state: StreamCraftState) => state.authReducer.token);
    const currentUser = useSelector((state: StreamCraftState) => state.authReducer.user);

    console.log('type',currentUser.type);
    const headers = {
      'Content-Type': 'application/json',
      // 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2MzU5ZTk2LWUzNDktNDMzYS1hYWIyLTI0MzFhZjQ0NTY4YiIsImlhdCI6MTcxMzU1MDA2OX0.jvYPKQ22pN4DWaER53RgPqKJOF1LApLTE5EL8O1b2Gc'
      'Authorization': currentToken
    };
    
    const handleDeleteVideo = async ({videoId}: any) => {
        try {
          // Send a DELETE request to the server to delete the video
          const res = await axios.delete(`${API_BASE}/video/${videoId}`, { headers });
          console.log('Deleted video', videoId);
      
          // If the delete was successful, update the state to remove the video
          if (res.status === 200) {
            setUploadedVideos(currentVideos => currentVideos.filter(video => video._id !== videoId));
            
        }
        } catch (error) {
          console.error('Failed to delete video', error);
        }
      };

    // Uploaded Videos 
    const [uploadedvideos, setUploadedVideos] = useState<Video[]>([]);
   
    useEffect(() => {
      const fetchWatchedVideos = async () => {
      //   const res = await axios.get(`${API_BASE}/video/getVideo/e8374d16-63bf-4d11-9346-ad9e56a35be0`);
      //   setVideos(res.data);
  
      const temp: Video[] = [{
        // message: {
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
        // },
        // videoUrl: "https://streamcraft-video-bucket.s3.amazonaws.com/..."
    },
    {
        // message: {
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
        // },
        // videoUrl: "https://streamcraft-video-bucket.s3.amazonaws.com/..."
    },
    {
        // message: {
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
        // },
        // videoUrl: "https://streamcraft-video-bucket.s3.amazonaws.com/..."
    },
    {
        // message: {
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
        // },
        // videoUrl: "https://streamcraft-video-bucket.s3.amazonaws.com/..."
    },
    {
        // message: {
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
        // },
        // videoUrl: "https://streamcraft-video-bucket.s3.amazonaws.com/..."
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
            handleSaveAll={handleSaveAll}
          />
          </SubContainer>
          
          { uploadedvideos.length > 0 && (
            <SubContainer>
              <h1>Uploaded Videos</h1>
              <ListVideos videos={uploadedvideos} onDelete={handleDeleteVideo}
                         showDeleteButton = {false}/>
            </SubContainer>
          )}

        </Container>
    );
};

export default IndividualUserProfile;


