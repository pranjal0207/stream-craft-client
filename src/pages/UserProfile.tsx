// Profile.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ProfileDetails from '../components/ProfileDetails';
import ListVideos from "../components/ListVideos";

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

const Profile: React.FC = () => {

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
          <SubContainer>
            <h1>Watched Videos</h1>
            <ListVideos></ListVideos>
          </SubContainer>
        </Container>
    );
};

export default Profile;
