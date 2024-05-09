import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Data } from '../apidata/Data';
import { FaChevronDown } from "react-icons/fa";
import { IoVideocamOutline } from "react-icons/io5";
import { setHeight, setRotate, setEnrollStatus,setCourseData,setCourseDataInfo,setEnrollCourse ,setUrl} from '../store/slices/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseInfo = ({ setProgress }) => {
    const params = useParams();
    const { name } = params;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [enroll, setEnroll] = useState("ENROLL FOR FREE");

    // styleCSs from redux
    const styleCss = useSelector((state) => {
        return state.user;
    })
    const data = useSelector((state) => {
        return state.user;
    })

    useEffect(() => {
        const res = Data.filter((data) => {
            return data.url === name;
        })
        setProgress(40);
        setTimeout(() => {
            setProgress(100)
        }, 200)
        const res2 = res.flatMap(({ syllabus }) => syllabus.filter(({ episode }) => episode));
        dispatch(setCourseData(res2));
        dispatch(setCourseDataInfo(res));
    }, [name, setProgress,dispatch,styleCss.enrollCourse])




    //toggle the rotate and the height
    const toggleBar = () => {
        dispatch(setRotate())
        dispatch(setHeight())

    }
        
    //enrolling course functionality
    const enrollHandle = () => {
        if (styleCss.setUser[0] === null) {
            navigate('/login')
            setEnroll("ENROLL FOR FREE")
        }
        if (styleCss.setUser[0] !== null) {
            dispatch(setEnrollStatus(true))     
            dispatch(setEnrollCourse(styleCss.courseDataInfo))
            if (enroll === "Go to DashBoard") {
                navigate('/'+name+'/episodes')
            } else if (enroll === "ENROLL FOR FREE") {
                dispatch(setUrl({
                    urlData: data?.courseData?.slice(0, 1).map((url) => url.link),
                    urlDescription: data?.courseData?.slice(0, 1).map((url) => url.description),
                    urlEpisode: data?.courseData?.slice(0, 1).map((url) => url.episode),
                    urlTitle: data?.courseData?.slice(0, 1).map((url) => url.coursename),
                }))
                setTimeout(() => {
                    setEnroll("Go to DashBoard")
                    toast.success('Enrolled Successfully', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        closeButton: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    
                }, 1000);

            }

        }




    }


    return (
        <>
       
            <ToastContainer
                position="top-center"
                autoClose={3000}
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                closeButton={false}
                theme="light"
                style={{ width: "100%", fontSize: "15px",display:"flex",justifyContent:"center",top:"1em" }}
            />
            <section className='infoSection'>
                <div className='courseInfoContainer'>
                    <div className='courseInfoLeft'>
                        <div className='courseTag'>
                            <p style={{color:styleCss.darkMode.setDark?styleCss.darkMode.pColorDark:""}}>COURSE &nbsp;/&nbsp; {styleCss.courseData.slice(0, 1).map((course) => course.coursename)}</p>
                        </div>
                        <div className='courseDetails'>
                            <h1 style={{color:styleCss.darkMode.setDark?styleCss.darkMode.textLight:""}}>{styleCss?.courseData?.slice(0, 1).map((course) => course.coursename)}</h1>
                            <p style={{color:styleCss.darkMode.setDark?styleCss.darkMode.textLight:""}}>{styleCss?.courseDataInfo?.map((course) => course.description)}</p>
                            <h3 style={{color:styleCss.darkMode.setDark?styleCss.darkMode.textLight:""}}>Syllabus</h3>
                        </div>
                        <div className='courseBar' onClick={toggleBar}>
                            <div className='courseBarItem'>
                                <div className='courseBarItemLeft'>
                                    <p style={{color:styleCss.darkMode.setDark?styleCss.darkMode.textLight:""}}>01</p>
                                    <div>
                                        <h4 style={{color:styleCss.darkMode.setDark?styleCss.darkMode.textLight:""}}>Season 1</h4>
                                        <h6>{styleCss?.courseDataInfo?.map((course) => course.lesson)}</h6>
                                    </div>
                                </div>
                                <div className='courseBarItemLeft'>
                                    <FaChevronDown className={styleCss.rotate} style={{color:styleCss.darkMode.setDark?styleCss.darkMode.textLight:""}}/>
                                </div>

                            </div>
                        </div>
                        <div className={`${styleCss.showHeight}`}>
                            {styleCss?.courseData?.map((data, index) => {
                                return (
                                    <div className="courseBar2" key={data.url} style={{backgroundColor:styleCss.darkMode.setDark?styleCss.darkMode.bgDark:""}}>
                                        <div className='courseBarItem'>
                                            <div className='courseBarItemLeft'>
                                                <IoVideocamOutline style={{color:styleCss.darkMode.setDark?styleCss.darkMode.textLight:""}}/>
                                                <div>
                                                    <h4 style={{color:styleCss.darkMode.setDark?styleCss.darkMode.textLight:""}}>{data.episode}</h4>
                                                    <h6 style={{color:styleCss.darkMode.setDark?styleCss.darkMode.pColorDark:""}}>Video - {data.duration}</h6>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })}</div>
                    </div>
                    <div className='courseInfoRight' style={{backgroundColor:styleCss.darkMode.setDark?styleCss.darkMode.boxDark:""}}>
                        <div className='infoRightBox'>
                            <div className='courseInfoThumbnail'>
                                <img src={styleCss?.courseDataInfo?.map((course) => course.thumbnail)} alt="thumbnail" />
                            </div>
                            <button onClick={enrollHandle}>{enroll}</button>
                            <hr></hr>

                        </div>
                        <div className='infoRightLesson'>
                            <h6 style={{color:styleCss.darkMode.setDark?styleCss.darkMode.textLight:""}}>What's Included</h6>
                            <h6 style={{color:styleCss.darkMode.setDark?styleCss.darkMode.textLight:""}}>+ <span style={{color:styleCss.darkMode.setDark?styleCss.darkMode.textLight:""}}>{styleCss?.courseDataInfo?.map((course) => course.lesson)}</span></h6>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CourseInfo