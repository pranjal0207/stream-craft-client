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
};

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  user,
  editMode,
  toggleEditMode,
  handleChange,
  handleSaveAll,
  showPassword,
  showEditButton
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
    </>
  );
};

export default ProfileDetails;
