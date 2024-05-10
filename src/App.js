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


function isInstagramBrowser() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return userAgent.indexOf('Instagram') !== -1;
}

function isMobileDevice() {
  return /Mobi/i.test(navigator.userAgent);
}
const App = () => {
  const [progress, setProgress] = useState(50)
  const mode = useSelector((state) => {
    return state.user;
})

useEffect(() => {
  if (isInstagramBrowser() || isMobileDevice()) {
    // If opened in Instagram in-app browser or mobile device, open external links in default browser
    const handleExternalLinks = () => {
      document.addEventListener('click', (event) => {
        const target = event.target.closest('a');
        if (target && target.getAttribute('href') && !target.getAttribute('href').startsWith(window.location.origin)) {
          event.preventDefault();
          window.open(target.getAttribute('href'), '_system _blank download');
        }
      });
    };
    handleExternalLinks();
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
