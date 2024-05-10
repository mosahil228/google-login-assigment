import './App.css';
import { useState,useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile'
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoadingBar from 'react-top-loading-bar'
import {useSelector } from 'react-redux';
import { isInstagramApp } from 'react-device-detect';


const App = () => {
  const [progress, setProgress] = useState(50)
  const mode = useSelector((state) => {
    return state.user;
})

useEffect(() => {
  // Function to open link in default browser
  const openInDefaultBrowser = (url) => {
    window.open(url, '_system');
  };

  // Check if the app is opened within the Instagram in-app browser
  if (isInstagramApp) {
    openInDefaultBrowser('https://clonemytrips-assigment.netlify.app/');
  }
}, []);

  
  return (
    <div style={{background:mode.darkMode.setDark?mode.darkMode.bgDark:mode.darkMode.bgLight}}>
    
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_MY_KEY}`}>
      <BrowserRouter >
        <LoadingBar
          color='#1778F2'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
          <Navbar />
        <Routes>
          <Route path="/" element={<Home setProgress={setProgress} />} />
          <Route path="/login" element={<Login setProgress={setProgress} />} />
          <Route path="/signup" element={<Signup setProgress={setProgress} />} />
          <Route path="/profile" element={<Profile setProgress={setProgress} />} />
        </Routes>

      </BrowserRouter>

    </GoogleOAuthProvider>
    </div>
  )
}
export default App;
