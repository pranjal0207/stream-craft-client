// ProfileDetails.tsx
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

// Define the shape of the user data as a type to reuse
type UserDataType = {
  name: string;
  username: string;
  password: string;
};

// Props type definition
type ProfileDetailsProps = {
  user: UserDataType;
  editMode: {
    [key in keyof UserDataType]: boolean;
  };
  toggleEditMode: (field: keyof UserDataType) => void;
  handleChange: (field: keyof UserDataType, value: string) => void;
  handleSubmit: (field: keyof UserDataType, e: React.FormEvent<HTMLFormElement>) => void;
};

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  user,
  editMode,
  toggleEditMode,
  handleChange,
  handleSubmit
}) => {
  return (
    <>
      <h1>User Profile</h1>
      {Object.keys(user).map((field) => (
        <div key={field as keyof UserDataType}>
          {editMode[field as keyof UserDataType] ? (
            <Form onSubmit={(e) => handleSubmit(field as keyof UserDataType, e)}>
              New {field}:
              <Input
                type={field === 'password' ? 'password' : 'text'}
                value={user[field as keyof UserDataType]}
                onChange={(e) => handleChange(field as keyof UserDataType, e.target.value)}
              />
              <Button type="submit">Save</Button>
              <Button onClick={() => toggleEditMode(field as keyof UserDataType)} type="button">Cancel</Button>
            </Form>
          ) : (
            <TextDisplay>
              {field}: {user[field as keyof UserDataType]}
              <Button onClick={() => toggleEditMode(field as keyof UserDataType)}>Edit</Button>
            </TextDisplay>
          )}
        </div>
      ))}
    </>
  );
};

export default ProfileDetails;
