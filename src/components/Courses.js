import React from 'react'
import { Data } from '../apidata/Data'
import { Link } from 'react-router-dom';
import { setAllCourses } from '../store/slices/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Courses = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setAllCourses(Data))
    },[dispatch])

    const allCoursesData = useSelector((state) => {
        return state.user;
    })
  return (
    <>
        <section className='courseSection'>
            <h4 style={{color:allCoursesData.darkMode.setDark?allCoursesData.darkMode.textLight:""}}>Courses<span>0{Data.length}</span></h4>
            
            {allCoursesData?.allCourses?.filter(user=>(user.coursename.toLowerCase().includes(allCoursesData?.query)||user.instructor.toLowerCase().includes(allCoursesData?.query))).map((data)=>{
                return (
                    <Link key={data.id} to={"/"+data.url}><div className='courseContainer' style={{backgroundColor:allCoursesData.darkMode.setDark?allCoursesData.darkMode.bgDark:""}} >
                    <div className='courseDetails' >
                    <div className='courseLeftDetail'>
                        <div className='courseImage'>
                            <img src={data.thumbnail} alt='course' />
                        </div>
                        <div className='courseInfo' >
                            <h5 style={{color:allCoursesData.darkMode.setDark?allCoursesData.darkMode.textLight:""}}>{data.coursename}  : <span>{data.instructor}</span></h5>
                            <p style={{color:allCoursesData.darkMode.setDark?allCoursesData.darkMode.textLight:""}}>{data.lesson}</p>
                            <p style={{color:allCoursesData.darkMode.setDark?allCoursesData.darkMode.textLight:""}}>{data.description}</p>
                        </div>
                    </div>
                    <div className='courseRightDetail'>
                        <h5 style={{color:allCoursesData.darkMode.setDark?allCoursesData.darkMode.textLight:""}}>{data.price}</h5>
                    </div>
                </div>
                </div></Link>
                )
            })}
                
           
        </section>
    </>
  )
}

export default Courses