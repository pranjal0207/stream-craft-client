import React from 'react';
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 18px;
  color: white;
  background: #333;
  border: 1px solid #fff;
`;

const Button = styled.button`
  padding: 10px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin-top: 5px;
  width: 200px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: start; // Aligns items to the start of the container
  gap: 10px;             // Adds space between the buttons
  margin-top: 5px;       // Margin above the container
`;

const TextDisplay = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

type UserDataType = {
  name: string;
  email: string;
  password: string;
};

// Props type definition
type ProfileDetailsProps = {
  user: UserDataType;
  editMode: boolean;
  toggleEditMode: () => void;
  handleChange: (field: keyof UserDataType, value: string) => void;
  handleSaveAll: () => void;
  showPassword: boolean;  
  showEditButton: boolean;  
  isUploader: boolean;
  navigateToSubscribers: () => void;
};

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  user,
  editMode,
  toggleEditMode,
  handleChange,
  handleSaveAll,
  showPassword,
  showEditButton,
  isUploader,
  navigateToSubscribers
}) => {
  return (
    <>
      <h1>User Profile</h1>
      {Object.keys(user).map((field) => (
        (!showPassword && field === 'password') ? null : (
          <div key={field as keyof UserDataType}>
            {editMode ? (
              <>
                New {field}:
                <Input
                  type={field === 'password' ? 'password' : 'text'}
                  value={user[field as keyof UserDataType]}
                  onChange={(e) => handleChange(field as keyof UserDataType, e.target.value)}
                />
              </>
            ) : (
              <TextDisplay>{field}: {user[field as keyof UserDataType]}</TextDisplay>
            )}
          </div>
        )
      ))}
      <ButtonContainer>
       {showEditButton && (<>
        <Button onClick={toggleEditMode}>{editMode ? "Cancel Edit" : "Edit Profile"}</Button>
        <Form onSubmit={(e) => {
        e.preventDefault();
        handleSaveAll();
      }}>
        {editMode && <Button type="submit">Save All Changes</Button>}
      </Form>
      </>
      )}
      <Button onClick={navigateToSubscribers}>{isUploader ? "View Subscribers" : "View Subscriptions"}</Button>
      </ButtonContainer>
    </>
  );
};

export default ProfileDetails;
