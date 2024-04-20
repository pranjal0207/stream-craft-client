import "./index.css"; // Ensure the path is correct for CSS specific to UploadVideo

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import styled from "styled-components";

import * as client from "./client"
import { StreamCraftState } from "../../store";
import { setLogout } from "../SignIn/reducer";

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center; // Vertically aligns the content in the center
  justify-content: center; 
  gap: 5px;
`;

const UploadVideo = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const currentUserToken = useSelector((state:StreamCraftState) => state.authReducer.token);
    const currentUserType = useSelector((state: StreamCraftState) => state.authReducer.type);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!videoFile || !thumbnail) {
            setErrorMessage("All fields are required, including video and thumbnail files.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('files', videoFile);
            formData.append('files', thumbnail);
            formData.append('coordinates', "200,200");

            const response = await client.uploadVideo(formData, currentUserToken);
            navigate("/");
        } catch (error: any) {
            setErrorMessage(error.message || "An error occurred during the upload. Please try again.");
        }
    };

    const signin = async () => {
        dispatch(setLogout());
        navigate('/signin')
    };
  
    return (
        <>
        {currentUserType === "uploader" ? (
            <div className='upload-container'>
                <div className="upload-form">
                    <form onSubmit={handleSubmit}>
                        <h2 className='upload-heading'>Upload Video</h2>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        <div>
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                                placeholder="Enter a description for the video..."
                                rows={4}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="videoFile">Video File (MP4):</label>
                            <input
                                type="file"
                                id="videoFile"
                                accept="video/mp4"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setVideoFile(e.target.files ? e.target.files[0] : null)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="thumbnail">Thumbnail Image:</label>
                            <input
                                type="file"
                                id="thumbnail"
                                accept="image/*"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setThumbnail(e.target.files ? e.target.files[0] : null)}
                                required
                            />
                        </div>
                        <button type="submit">Upload Video</button>
                    </form>
                </div>
            </div>
        ) : (
            <div className='upload-container'>
                <div className="upload-form">
                    <h3> You are not Signed-In as a Video Uploader</h3>
                    {/* <h3> Signed In with email : {currentUser.email}</h3> */}
                    {/* <button type="submit">SIGN IN</button> */}
                    <Link to="/signin" style={{ textDecoration: "none" }}>
                    <Button onClick={signin}>
                        <AccountCircleOutlinedIcon />
                        SIGN IN
                    </Button>
                    </Link>
                </div>
            </div>
        )}
        </>
    );
};

export default UploadVideo;
