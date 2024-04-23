// Profile.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ProfileDetails from "../../components/ProfileDetails";
import ListVideos from "../../components/ListVideos";
import { Video } from "../../Interface/Video";
import { StreamCraftState } from "../../store";
import { useSelector } from "react-redux";
import * as client from "./client";
import { useNavigate } from 'react-router-dom'; 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch; // Changed from center to stretch to allow children to take full width
  justify-content: space-between;
  color: white;
`;

const SubContainer = styled.div`
  align-self: stretch; // Ensures it takes the full width available
  padding: 10px;
  width: 100%; // Explicitly set width to 100%
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

const Profile: React.FC = () => {

  const navigate = useNavigate();  
  const navigateToSubscribers = () => {
    // Conditionally navigate based on the isUploader flag
    if (currentUser.type === 'uploader') {
    navigate('/userprofile/subscribers');
    }
    else {
      navigate('/userprofile/subscriptions');
    }
  };
  // User Details
  const [user, setUser] = useState<UserDataType>({
    name: "",
    email: "",
    password: "",
  });
  const [editMode, setEditMode] = useState<boolean>(false); // Explicit boolean state
  const currentToken = useSelector(
    (state: StreamCraftState) => state.authReducer.token
  );
  const currentUser = useSelector(
    (state: StreamCraftState) => state.authReducer.user
  );
  const [isUploader, setIsUploader] = useState<boolean>(false);

  // if (currentUser.type === 'uploader'){
  //   setIsUploader(true);
  // }
  console.log("currentToken", currentToken);
  const headers = {
    "Content-Type": "application/json",
    Authorization: currentToken,
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/user/${currentUser.type}/${currentUser.user_id}`,
          { headers }
        );

        const newUser: UserDataType = {
          name:
            response.data.user.firstName + " " + response.data.user.lastName,
          email: response.data.user.email,
          password: "******",
        };

        setUser(newUser);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    fetchUserData();
    if (currentUser.type === 'uploader'){
    setIsUploader(true);
  }
  }, []);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev); // Correctly toggling boolean state
  };

  const handleChange = (field: keyof UserDataType, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAll = async () => {
    try {
      let body = {
        email: user.email,
        password: user.password,
      };

      const updateRes = await axios.put(
        `${API_BASE}/user/${currentUser.type}/${currentUser.user_id}`,
        body,
        { headers }
      );

      alert("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile");
    }
  };

  // Watched Videos
  const [watchedvideos, setWatchedVideos] = useState<Video[]>([]);
  const [uploadedvideos, setUploadedVideos] = useState<Video[]>([]);
  const [moderatedvideos, setModeratedVideos] = useState<Video[]>([]);

  const fetchUploadedVideos = async () => {
    const res = await axios.get(
      `${API_BASE}/user/getUploaderVideos/${currentUser.user_id}`,
      { headers }
    );
    console.log("uploaded videos", res.data);
    setUploadedVideos(res.data.videos);
  };

  const fetchWatchedVideos = async () => {
    const res = await axios.get(
      `${API_BASE}/user/getWatchedVideos/${currentUser.user_id}`,
      { headers }
    );
    console.log("watched videos", res.data.watchedVideos);
    setWatchedVideos(res.data.watchedVideos);
  };

  const fetchModeratedVideos = async () => {
    const res = await axios.get(
      `${API_BASE}/user/getModeratedVideos/${currentUser.user_id}`,
      { headers }
    );
    console.log("Moderated videos", res.data.moderatedVideos);
    setModeratedVideos(res.data.moderatedVideos);
  };

  // Fetch Uploader Videos
  useEffect(() => {
    if (currentUser.type === "uploader") {
      fetchUploadedVideos();
    }
    if (currentUser.type === "consumer") {
      fetchWatchedVideos();
    }
    if (currentUser.type === "moderator") {
      fetchModeratedVideos();
    }
  }, []);

  const handleDeleteVideo = async (videoId: any) => {
    try {
      const res = await axios.delete(`${API_BASE}/video/${videoId}`, {
        headers,
      });
      console.log("Deleted video", videoId);

      if (res.status === 200) {
        if (currentUser.type === "uploader") {
          setUploadedVideos((currentVideos) =>
            currentVideos.filter((video) => video.video_id !== videoId)
          );
        }
      }
    } catch (error) {
      console.error("Failed to delete video", error);
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
          showPassword={true}
          showEditButton={true}
          isUploader={isUploader}
          navigateToSubscribers = {navigateToSubscribers}
        />
      </SubContainer>

      {watchedvideos.length > 0 && (
        <SubContainer>
          <h1>Watched Videos</h1>
          <ListVideos
            videos={watchedvideos}
            onDelete={handleDeleteVideo}
            showDeleteButton={false}
          ></ListVideos>
        </SubContainer>
      )}

      {uploadedvideos.length > 0 && (
        <SubContainer>
          <h1>Uploaded Videos</h1>
          <ListVideos
            videos={uploadedvideos}
            onDelete={handleDeleteVideo}
            showDeleteButton={true}
          />
        </SubContainer>
      )}

      {moderatedvideos.length > 0 && (
        <SubContainer>
          <h1>Moderated Videos</h1>
          <ListVideos
            videos={moderatedvideos}
            onDelete={handleDeleteVideo}
            showDeleteButton={false}
          />
        </SubContainer>
      )}
    </Container>
  );
};

export default Profile;
