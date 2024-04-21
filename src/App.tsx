
// import { useState } from "react";
// import styled, { ThemeProvider } from "styled-components";
// import Menu from "./components/Menu";
// import Navbar from "./components/Navbar";
// import { darkTheme, lightTheme } from "./utils/Theme";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import VideoPage from "./pages/Video";
// import Profile from "./pages/UserProfile";
// import IndividualUserProfile from "./pages/IndividualUserProfile"
// import AuthenticationPage from './pages/SignIn';
// import SignUp from "./pages/SignUp";
// import Search from "./pages/Search";
// import UploadVideo from "./pages/UploadVideo";
// import SubscribersPage from "./pages/Subscribers";
// import SubscriptionsPage from "./pages/Subscriptions";


// const Container = styled.div`
//   display: flex;
// `;

// const Main = styled.div`
//   flex: 7;
//   background-color: ${({ theme }) => theme.bg};
// `;
// const Wrapper = styled.div`
//   padding: 22px 96px;
// `;


// function App() {
//   const [darkMode, setDarkMode] = useState(true);

//   return (
//     <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
//       <Container>
//         <BrowserRouter>
//           <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
//           <Main>
//             <Navbar />
//             <Wrapper>
//               <Routes>
//                 <Route path="/">
//                   <Route index element={<Home />} />
//                   <Route path="userprofile" element={<Profile />} />
//                   <Route path="userprofile/:usertype/:userid" element={<IndividualUserProfile />} />
//                   <Route path="signin" element={<AuthenticationPage />} />
//                   <Route path="register" element={<SignUp />} />
//                   <Route path="video/new_video" element={<UploadVideo/>} />
//                   <Route index element={<Home type="latest" />} />
//                   <Route path="sports" element={<Home type="sports" />} />
//                   <Route path="gaming" element={<Home type="gaming" />} />
//                   <Route path="music" element={<Home type="music" />} />
//                   <Route path="movies" element={<Home type="movies" />} />
//                   <Route path="news" element={<Home type="news" />} />
//                   <Route path="search" element={<Search />} />
//                   <Route path="video/:id" element={<VideoPage />} />
//                   <Route path="userprofile/:user_id/subscribers" element={<SubscribersPage />} />
//                   <Route path="userprofile/subscribers" element={<SubscribersPage />} />
//                   <Route path="userprofile/:user_id/subscriptions" element={<SubscriptionsPage />} />
//                   <Route path="userprofile/subscriptions" element={<SubscriptionsPage />} />
//                 </Route>
//               </Routes>
//             </Wrapper>
//           </Main>
//         </BrowserRouter>
//       </Container>
//     </ThemeProvider>

//   );
// }

// export default App;

import { useState } from "react";
import styled, { ThemeProvider, css } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VideoPage from "./pages/Video";
import Profile from "./pages/UserProfile";
import IndividualUserProfile from "./pages/IndividualUserProfile"
import AuthenticationPage from './pages/SignIn';
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";
import UploadVideo from "./pages/UploadVideo";
import SubscribersPage from "./pages/Subscribers";
import SubscriptionsPage from "./pages/Subscriptions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Main = styled.div`
  flex: 1; // Adjust flex ratio based on your needs
  background-color: ${({ theme }) => theme.bg};

  @media (min-width: 768px) {
    flex: 7;
  }
`;

const Wrapper = styled.div`
  padding: 10px;
  @media (min-width: 600px) {
    padding: 22px 50px;
  }
  @media (min-width: 1024px) {
    padding: 22px 96px;
  }
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="userprofile" element={<Profile />} />
                  <Route path="userprofile/:usertype/:userid" element={<IndividualUserProfile />} />
                  <Route path="signin" element={<AuthenticationPage />} />
                  <Route path="register" element={<SignUp />} />
                  <Route path="video/new_video" element={<UploadVideo/>} />
                  <Route index element={<Home type="latest" />} />
                  <Route path="sports" element={<Home type="sports" />} />
                  <Route path="gaming" element={<Home type="gaming" />} />
                  <Route path="music" element={<Home type="music" />} />
                  <Route path="movies" element={<Home type="movies" />} />
                  <Route path="news" element={<Home type="news" />} />
                  <Route path="search" element={<Search />} />
                  <Route path="video/:id" element={<VideoPage />} />
                  <Route path="userprofile/:user_id/subscribers" element={<SubscribersPage />} />
                  <Route path="userprofile/subscribers" element={<SubscribersPage />} />
                  <Route path="userprofile/:user_id/subscriptions" element={<SubscriptionsPage />} />
                  <Route path="userprofile/subscriptions" element={<SubscriptionsPage />} />
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
