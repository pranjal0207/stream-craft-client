import React from "react";
import styled from "styled-components";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";


const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky; // Default position
  top: 0;

  @media (max-width: 680px) {
    position: static; // Non-sticky for screens less than 680px
  }

  @media (min-width: 681px) {
    position: sticky; // Sticky position for screens greater than 680px
  }
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
  font-size: 20px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = ({ darkMode, setDarkMode }: any) => {
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            Stream Craft
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <HomeIcon />
            Home
          </Item>
        </Link>
        <Hr />
        <Title>Categories</Title>
        <Link to="sports" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <SportsBasketballOutlinedIcon />
            Sports
          </Item>
        </Link>
        <Link to="gaming" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <SportsEsportsOutlinedIcon />
            Gaming
          </Item>
        </Link>
        <Link to="music" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <LibraryMusicOutlinedIcon />
            Music
          </Item>
        </Link>
        <Link to="movies" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <MovieOutlinedIcon />
            Movies
          </Item>
        </Link>
        <Link to="news" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ArticleOutlinedIcon />
            News
          </Item>
        </Link>
        <Hr />
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;