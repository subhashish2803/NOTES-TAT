import ReactDOM from "react-dom";
import "./assets/css/App.css";
import "react-bootstrap";
import React, { lazy, Suspense } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./Components/Navbar";
import Footer from "./Components/Footer";
import Loader from "./Components/Loader";
import App from "./App";
const UnderConstruction = lazy(() => import("./Components/UnderConstruction"));
const Disclaimer = lazy(() => import("./Components/Disclaimer"));
const Contributions = lazy(() => import("./Components/Contributions"));
const ForgotPassword = lazy(() => import("./Components/ForgotPassword"));
const UpdateProfile = lazy(() => import("./Components/UpdateProfile"));
const Profile = lazy(() => import("./Components/Profile"));
const Chat = lazy(() => import("./Components/Chatroom"));
const Todo = lazy(() => import("./Components/Todo"));
const AboutUs = lazy(() => import("./Components/AboutUs"));
const Notes = lazy(() => import("./notes/Notes"));
const PreviewNotes = lazy(() => import("./notes/PreviewNotes"));
const Signup = lazy(() => import("./Components/Signup"));
const Login = lazy(() => import("./Components/Login"));
const PageNotFound = lazy(() => import("./Components/PageNotFound"));

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/team"
            element={
              <Suspense fallback={<Loader />}>
                <AboutUs />
              </Suspense>
            }
          />
          <Route
            path="/notes"
            element={
              <Suspense fallback={<Loader />}>
                <Notes />
              </Suspense>
            }
          />
          <Route path="/visitloader" element={<Loader />} />
          <Route
            path="/previewnotes"
            element={
              <Suspense fallback={<Loader />}>
                <PreviewNotes />
              </Suspense>
            }
          />
          <Route
            path="/under-construction"
            element={
              <Suspense fallback={<Loader />}>
                <UnderConstruction />
              </Suspense>
            }
          />
          <Route
            path="/community-guidelines"
            element={
              <Suspense fallback={<Loader />}>
                <Disclaimer />
              </Suspense>
            }
          />
          <Route
            path="/update-profile"
            element={
              <RequireAuth redirectTo="/login">
                <Suspense fallback={<Loader />}>
                  <UpdateProfile />
                </Suspense>
              </RequireAuth>
            }
          />
          <Route
            path="/community"
            element={
              <RequireAuth redirectTo="/login">
                <Suspense fallback={<Loader />}>
                  <Chat />
                </Suspense>
              </RequireAuth>
            }
          />
          <Route
            path="/taskboard"
            element={
              <RequireAuth redirectTo="/login">
                <Suspense fallback={<Loader />}>
                  <Todo />
                </Suspense>
              </RequireAuth>
            }
          />
          <Route
            path="/login"
            element={
              <IsLoggedIn redirectTo="/profile">
                <Suspense fallback={<Loader />}>
                  <Login />
                </Suspense>
              </IsLoggedIn>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth redirectTo="/login">
                <Suspense fallback={<Loader />}>
                  <Profile />
                </Suspense>
              </RequireAuth>
            }
          />

          <Route
            path="/signup"
            element={
              <IsLoggedIn redirectTo="/profile">
                <Suspense fallback={<Loader />}>
                  <Signup />
                </Suspense>
              </IsLoggedIn>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <IsLoggedIn redirectTo="/update-profile">
                <Suspense fallback={<Loader />}>
                  <ForgotPassword />
                </Suspense>
              </IsLoggedIn>
            }
          />
          <Route
            path="/contributions"
            element={
              <RequireAuth redirectTo="/login">
                <Suspense fallback={<Loader />}>
                  <Contributions />
                </Suspense>
              </RequireAuth>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loader />}>
                <PageNotFound />
              </Suspense>
            }
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
function RequireAuth({ children, redirectTo }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to={redirectTo} />;
}

function IsLoggedIn({ children, redirectTo }) {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to={redirectTo} /> : children;
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
