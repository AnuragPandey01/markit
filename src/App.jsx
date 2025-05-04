import { useEffect } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import pb from "./lib/pb";
import { ToastContainer } from 'react-toastify';
import { ProtectedRoute } from './components';
import {Footer} from "./components";

import { HomePage, SignupPage, LoginPage } from "./pages"

function App() {

  const navigate = useNavigate();

  const isAuthenticated = pb.authStore.isValid


  useEffect(()=>{
    if(pb.authStore.isValid) navigate("/home");
  },[]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000} />
      <Footer/>
    </div>
  )
}

export default App
