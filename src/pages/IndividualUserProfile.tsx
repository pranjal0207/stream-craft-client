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
    email: string;
    password: string;
};

type EditModeType = {
    [key in keyof UserDataType]: boolean;
};


const IndividualUserProfile: React.FC = () => {

  const { userid, usertype } = useParams<{ userid: string; usertype: string }>();

  console.log(userid);
  console.log(usertype);
  const currentToken = useSelector((state: StreamCraftState) => state.authReducer.token);
  const currentUser = useSelector((state: StreamCraftState) => state.authReducer.user);

  const headers = {
      'Content-Type': 'application/json',
      'Authorization': currentToken
    };

  // User Details
    const [user, setUser] = useState<UserDataType>({ name: '', email: '', password: '' });
    const [editMode, setEditMode] = useState<boolean>(false); // Explicit boolean state

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${API_BASE}/user/${usertype}/${userid}`
          , { headers });
         
          const newUser: UserDataType = {
            name: response.data.user.firstName + ' ' +response.data.user.lastName,
            email: response.data.user.email,
            password: "******",
          };

          setUser(newUser);
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

    // Uploaded Videos 
    const [uploadedvideos, setUploadedVideos] = useState<Video[]>([]);
   
    const fetchUploadedVideos = async () => {
      const res = await axios.get(`${API_BASE}/user/getUploaderVideos/${userid}`, { headers });
      console.log('uploaded videos',res.data);
      setUploadedVideos(res.data.videos);
    }

    // Fetch Uploader Videos
    useEffect(() => {
      if (currentUser.type == 'uploader') {
        fetchUploadedVideos();
      }
     }, []);


    const handleDeleteVideo = async ({videoId}: any) => {
      try {
        // const res = await axios.delete(`${API_BASE}/video/${videoId}`, { headers });
        console.log('Deleted video', videoId);
        // if (res.status === 200) {
        //   setUploadedVideos(currentVideos => currentVideos.filter(video => video._id !== videoId));
        // }
        if (currentUser.type == 'uploader') {
          fetchUploadedVideos();
        }
      } catch (error) {
        console.error('Failed to delete video', error);
      }
    };

    return (
        <Container>
          <SubContainer>
          <ProfileDetails
            user={user}
            editMode={editMode}
            toggleEditMode={toggleEditMode}
            handleChange={handleChange}
            handleSaveAll={handleSaveAll}
            showPassword={false}
            showEditButton={false}
          />
          </SubContainer>
          
          {usertype === 'uploader' ? (
                  uploadedvideos.length > 0 ? (
                    <SubContainer>
                      <h1>Uploaded Videos</h1>
                      <ListVideos videos={uploadedvideos} onDelete={async (videoId) => {
                        try {
                          await axios.delete(`${API_BASE}/video/${videoId}`, { headers });
                          setUploadedVideos(current => current.filter(video => video._id !== videoId));
                        } catch (error) {
                          console.error('Failed to delete video', error);
                        }
                      }} showDeleteButton={false}/>
                    </SubContainer>
                  ) : (
                    <SubContainer>
                      <h1>No videos uploaded</h1>
                    </SubContainer>
                  )
                ) : (
                  <SubContainer>
                    <h1>No videos uploaded</h1>
                  </SubContainer>
                )}

        </Container>
    );
};

export default IndividualUserProfile;


