//react imports
import { Route, Routes, Navigate } from "react-router-dom";

//page imports
import HomePage from "./Pages/HomePage.jsx";
import Layout from "./components/Layout.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import SignupPage from "./Pages/SignUpPage.jsx";
import NotificationPage from "./Pages/NotificationPage.jsx";
import ChatPage from "./Pages/ChatPage.jsx";
import FriendsPage from "./Pages/FriendsPage.jsx";
import OnboardingPage from "./Pages/OnboardingPage.jsx";
import CallPage from "./Pages/CallPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
//react hot toast imports
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";

import { userAuthUser } from "./hooks/userAuthUser.js";
import userThemeStore from "./store/userThemsStore.js";

const App = () => {
  // Use the userAuthUser custom hook and extract the correct values
  const { isLoading, authData } = userAuthUser();
  const authUser = authData?.user;
  const { theme } = userThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarding;

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen text-base-content" data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout>
                <HomePage />
              </Layout>
            ) : (
              <Navigate
                to={!isAuthenticated ? "/loginpage" : "/onboardingpage"}
              />
            )
          }
        />
        <Route
          path="/signuppage"
          element={
            !isAuthenticated ? (
              <SignupPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboardingpage"} />
            )
          }
        />
        <Route
          path="/loginpage"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboardingpage"} />
            )
          }
        />
        <Route
          path="/notificationpage"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout>
                <NotificationPage />
              </Layout>
            ) : (
              <Navigate
                to={isAuthenticated ? "/loginpage" : "/onboardingpage"}
              />
            )
          }
        />
        <Route
          path="/friends"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout>
                <FriendsPage />
              </Layout>
            ) : (
              <Navigate
                to={!isAuthenticated ? "/loginpage" : "/onboardingpage"}
              />
            )
          }
        />
        <Route
          path="/chat/:id" // id is the id of the user to chat with
          element={
            isAuthenticated && isOnboarded ? (
              <Layout>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate
                to={!isAuthenticated ? "/loginpage" : "/onboardingpage"}
              />
            )
          }
        />
        <Route
          path="/onboardingpage"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/loginpage" />
            )
          }
        />
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate
                to={!isAuthenticated ? "/loginpage" : "/onboardingpage"}
              />
            )
          }
        />
        {/* Backward-compatible alias (older links) */}
        <Route
          path="/callpage/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate
                to={!isAuthenticated ? "/loginpage" : "/onboardingpage"}
              />
            )
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
