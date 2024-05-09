import React, { useState, useEffect } from 'react'
import { setHeight, setRotate ,setComplete,setBoolean,setCourseData,setCourseDataInfo,setUrl} from '../store/slices/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player/youtube'
import { IoVideocamOutline } from "react-icons/io5";
import { FaChevronDown, FaAngleLeft } from "react-icons/fa";
import { useNavigate ,useParams} from 'react-router-dom';
import { TbProgress } from "react-icons/tb";
import { Data } from '../apidata/Data';
const Dashboard = ({ setProgress }) => {

    let navigate = useNavigate();
    const params = useParams();
    const { name } = params;
    let sName=name.split('/');
    let newUrl=sName[0];
    // console.log(newUrl);


    const data = useSelector((state) => {
        return state.user;
    })
    const mode = useSelector((state) => {
        return state.user;
    })

    //search functionality
    const[query,setQuery]=useState("")

    const [booleanArray,setBooleanArray]=useState(data?.courseData?.map(()=>false))
   
    const dispatch = useDispatch();
    const toggleBar = () => {
        dispatch(setRotate())
        dispatch(setHeight())

    }
    // const getVideo = (url) => {
    //     setUrl({
    //         urlData: url.link,
    //         urlDescription: url.description,
    //         urlEpisode: url.episode,
    //         urlTitle: url.coursename
    //     })
    // }
    const getVideo = (url) => {
        dispatch(setUrl({
            urlData: url.link,
            urlDescription: url.description,
            urlEpisode: url.episode,
            urlTitle: url.coursename
        }))
    }

    
    const handleCheck = (isChecked, index) => {
        setBooleanArray((prevArray) => {
          const newArray = [...prevArray]; 
          newArray[index] = isChecked;
          return newArray; 
        });
      };

 


    useEffect(() => {
        const res = Data.filter((data) => {
            return data.url === newUrl;
        })
        setProgress(40);
        setTimeout(() => {
            setProgress(100)
        }, 200)
        const res2 = res.flatMap(({ syllabus }) => syllabus.filter(({ episode }) => episode));
        dispatch(setCourseData(res2));
        dispatch(setCourseDataInfo(res));
        dispatch(setComplete(booleanArray.filter((data)=> data===true)))
        dispatch(setBoolean(booleanArray.length))
       
        setProgress(40);
        setTimeout(() => {
            setProgress(100)
        }, 200)
        
    }, [setProgress,booleanArray,dispatch,newUrl])
  
    




    return (
        <>
            <div className='dashboard'>
                <div className='dashboard-content'>
                    <div className='videoFrame'>
                        <div>
                            <div className='videoNav'>
                                <p style={{color:data.darkMode.setDark?data.darkMode.textLight:""}}><span onClick={() => navigate(-1)}><FaAngleLeft /></span>{data?.url?.urlTitle}</p>
                            </div>
                            <ReactPlayer url={data?.url?.urlData} controls className="videoPlayer" />
                            <div className='video-description'>
                                <p style={{color:data.darkMode.setDark?data.darkMode.textLight:""}}>About</p>
                                <h1 style={{color:data.darkMode.setDark?data.darkMode.textLight:""}}>{data?.url?.urlEpisode}</h1>
                                <h6 style={{color:data.darkMode.setDark?data.darkMode.pColorDark:""}}>{data?.url?.urlDescription}</h6>
                            </div>
                        </div>

                       
                    </div>
                    <div className='courseInfoLeft'>
                        <div className='videoNav'>
                            <p style={{color:data.darkMode.setDark?data.darkMode.textLight:""}}><span onClick={() => navigate(-1)}><TbProgress /></span>Progress Of Course</p>
                            <div className='progressBar'>
                                <div className='progress'>
                                    <div className='innerProgress' style={{width:`${(data.complete.length*100/data.booleanBox).toFixed(0)}%`}}></div>
                                </div>
                                <p className='completion' style={{color:data.darkMode.setDark?data.darkMode.textLight:""}}>{(data.complete.length*100/data.booleanBox).toFixed(0)}% </p>

                            </div>
                            

                            <div className='inputBox' style={{backgroundColor:mode.darkMode.setDark?mode.darkMode.bgDark:""}}>
                                <input type='text' placeholder='Search here' onChange={(e)=>setQuery(e.target.value)} style={{color:mode.darkMode.setDark?mode.darkMode.textLight:"",backgroundColor:mode.darkMode.setDark?mode.darkMode.bgDark:""}}/>
                            </div>

                        </div>
                        <div className='courseBar' onClick={toggleBar}>
                            <div className='courseBarItem'>
                                <div className='courseBarItemLeft'>
                                    <p style={{color:data.darkMode.setDark?data.darkMode.textLight:""}}>01</p>
                                    <div>
                                        <h4 style={{color:data.darkMode.setDark?data.darkMode.textLight:""}}>Season 1</h4>
                                        <h6 style={{color:mode.darkMode.setDark?mode.darkMode.pColorDark:""}}>{data?.courseDataInfo?.map((course) => course.lesson)}</h6>
                                    </div>
                                </div>
                                <div className='courseBarItemLeft'>
                                    <FaChevronDown className={data.rotate} style={{color:data.darkMode.setDark?data.darkMode.textLight:""}}/>
                                </div>

                            </div>
                        </div>
                        <div className={`${data.showHeight}`}>
                            {data?.courseData?.filter(user=>user.episode.toLowerCase().includes(query)).map((data, index) => {
                                return (
                                    <div className="courseBar2" key={data.url} onClick={() => getVideo(data)} style={{backgroundColor:mode.darkMode.setDark?mode.darkMode.bgDark:""}}>
                                        <div className='courseBarItem'>
                                            <div className='courseBarItemLeft'>
                                                <IoVideocamOutline style={{color:mode.darkMode.setDark?mode.darkMode.textLight:""}}/>
                                                <div>
                                                    <h4 style={{color:mode.darkMode.setDark?mode.darkMode.textLight:""}}>{data.episode}</h4>
                                                    <h6 style={{color:mode.darkMode.setDark?mode.darkMode.pColorDark:""}}>Video - {data.duration}</h6>
                                                </div>
                                            </div>
                                            <div className='checkbox' >
                                                <input type='checkbox' onChange={(e)=>handleCheck(e.target.checked,index)} />
                                            </div>

                                        </div>
                                    </div>
                                )
                            })}</div>
                    </div>

                </div>


            </div>

        </>
    )
}

export default Dashboard