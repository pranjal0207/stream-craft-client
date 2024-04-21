import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StreamCraftState } from "../store";
import { setLogout } from "../pages/SignIn/reducer";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end; // Maintain this as default for large screens
  height: 100%;
  padding: 0px 20px; // Default padding for larger screens
  position: relative;
  flex-wrap: wrap; // Allow items to wrap on smaller screens

  @media (max-width: 1024px) {
    justify-content: center; // Center content on smaller screens
    padding: 0px 10px; 
  }
`;

const Search = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%); // Center the search bar on large screens
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
  width: 40%; // Maintain a controlled width on large screens

  @media (max-width: 1024px) {
    position: static; // Remove absolute positioning on smaller screens
    width: 100%; // Full width to push other elements to the next line
    order: -1; // Make sure search comes first if items wrap
    transform: translateX(0%);
    margin: 10px;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; // Maintain gap for larger screens
  color: ${({ theme }) => theme.text};

  @media (max-width: 1024px) {
    justify-content: center; // Center items in the user area on smaller screens
    width: 100%; // Full width to align properly under the search bar
  }
`;  

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  z-index: 10; // Ensure the navbar stays on top
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 0 10px; // Padding inside the input
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 10px; // Smaller button padding on small screens
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 1024px) {
    padding: 5px 15px; 
    width:150px// Larger button padding on wider screens
  }
`;

  const Avatar = styled.img`
    width: 28px; // Smaller avatar on small screens
    height: 28px; // Smaller avatar on small screens
    border-radius: 50%;
    cursor: pointer;

    @media (min-width: 768px) {
      width: 32px; // Larger avatar on wider screens
      height: 32px; // Larger avatar on wider screens
    }
  `;

const Navbar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const currentToken = useSelector((state: StreamCraftState) => state.authReducer.token);
  const currentUser = useSelector((state: StreamCraftState) => state.authReducer.user);

  const signout =  () => {
    dispatch(setLogout());
  }

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value)}
            />
            <SearchOutlinedIcon onClick={()=>navigate(`/search?search=${query}`)}/>
          </Search>
          {currentUser && currentUser.firstName !== "" ? (
            <User>
              <VideoCallOutlinedIcon style={{ cursor: 'pointer' }} onClick={() => navigate(`/video/new_video`)} />
              <Avatar src="/user.png" onClick={() => navigate(`/userprofile`)}/>
              <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/userprofile`)}>{currentUser.firstName}</div>
              <Button onClick={signout}>
                  SIGN OUT
              </Button>
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

export default Navbar;
