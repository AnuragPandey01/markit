import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { ProtectedRoute } from './components';
import { Footer } from "./components";

import { HomePage, SignupPage, LoginPage } from "./pages"
import { useAuthStore } from './store';

function App() {

  const navigate = useNavigate();

  const { authenticated, init } = useAuthStore()

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (authenticated) navigate("/home");
    else navigate('/');
  }, [authenticated]);

  return (
    <div className='min-h-screen w-screen flex flex-col'>
      <div className='flex-grow p-4 md:p-15'>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute isAuthenticated={authenticated}>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000} />
      <Footer />
    </div>
  )
}

export default App
