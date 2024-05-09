import React, { useEffect, useState } from 'react'
import logo from "../images/logo.svg"
import { IoSearch } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { RiMoonLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { setUserData, setQuery, setDarkMode } from '../store/slices/UserSlice';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { MdOutlineLightMode } from "react-icons/md";






const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [hideInfo, setHideInfo] = useState(false)
    const [dark, setDark] = useState(false)
    // hide and toggle userInfo


    //logOut user
    const logOutUser = () => {
        localStorage.removeItem("user")
        dispatch(setUserData(null))
        googleLogout();
        setTimeout(() => {
            navigate("/")
        }, 1000)

    }
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        dispatch(setUserData(items))
    }, [dispatch]);


    //getting userdata from redux
    const userData = useSelector((state) => {
        return state.user;
    })

    //darkmode

    const handleMode = () => {
        setDark(!dark)
        dispatch(setDarkMode({
            setDark: (!dark),
            bgDark: "rgb(16, 20, 38)",
            bgLight: "#fff",
            textLight: "#fff",
            textDark: "#000",
            inputHoverDark:"rgb(23 31 64)",
            pColorDark: "#F7F9FC",
            boxDark:"#222B45"
        }))

    }
    




    return (
        
            <header>
                <nav>
                    <div className="navLeft">
                        <Link to='/' ><div className='logo' style={{ cursor: "pointer"}}>
                            <img src={logo} alt="logo" />
                        </div></Link>
                        <div className="navSearch">
                            <div className="search" style={{background:userData.darkMode.setDark?userData.darkMode.bgDark:userData.darkMode.bgLight}}>
                                <input type="text" placeholder="Search" onChange={(e) => dispatch(setQuery(e.target.value))} style={{color:userData.darkMode.setDark?userData.darkMode.textLight:""}}/>
                                <IoSearch />
                            </div>
                            <button onClick={handleMode} style={{color:userData.darkMode.setDark?userData.darkMode.textLight:""}}>{dark ? <MdOutlineLightMode /> : <RiMoonLine />} {dark ? "LIGHT" : "DARK"}</button>
                        </div>
                    </div>
                    <div className="navRight">
                        <NavLink to="/" style={{color:userData.darkMode.setDark?userData.darkMode.textLight:""}}>Home</NavLink>
                        {userData.setUser[0] === null && <NavLink to="/login"><button className='sign_in' style={{ color: userData.darkMode.setDark ? userData.darkMode.textLight : "" }}>SIGN IN</button></NavLink>}
                        {userData.setUser[0] === null && <NavLink to="/signup"><button className='sign_up' style={{ color: userData.darkMode.setDark ? userData.darkMode.textLight : "" }}>SIGN UP</button></NavLink>}
                        {userData.setUser[0] !== null && <div className='userLoggedIn' onClick={() => setHideInfo(!hideInfo)}>
                            <div className='userImage'><img src={userData?.setUser[0]?.picture} alt="userImage" referrerPolicy="no-referrer" /></div>
                            {hideInfo && <div className='userMenu'>
                                <div className='userMenuItems' style={{background:userData.darkMode.setDark?userData.darkMode.bgDark:""}}>
                                    <Link to={'/profile'}><div><h3 style={{color:userData.darkMode.setDark?userData.darkMode.textLight:""}}>My Profile</h3></div></Link>
                                    <div onClick={logOutUser}><h3 style={{color:userData.darkMode.setDark?userData.darkMode.textLight:""}}>Logout</h3></div>
                                </div>

                            </div>}
                        </div>}

                    </div>
                </nav>
            </header>
        
    )
}

export default Navbar