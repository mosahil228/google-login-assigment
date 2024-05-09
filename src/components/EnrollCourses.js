import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import noItem from "../images/noItem.svg"
import { setCourseData,setUrl} from '../store/slices/UserSlice';



const EnrollCourses = () => {

    const enrolledCourse = useSelector((state) => {
        return state.user;
    })
   
   
    const dispatch = useDispatch();


    let jsonObject = enrolledCourse.enrollCourse.map(JSON.stringify);
    let uniqueSet = new Set(jsonObject);
    let uniqueArray = Array.from(uniqueSet).map(JSON.parse);

    const handleUrl = (url) => {
        const res = url.flatMap(({ syllabus }) => syllabus.filter(({ episode }) => episode));
        dispatch(setUrl({
            urlData: res.slice(0, 1).map((url) => url.link),
            urlDescription: res.slice(0, 1).map((url) => url.description),
            urlEpisode: res.slice(0, 1).map((url) => url.episode),
            urlTitle: res.slice(0, 1).map((url) => url.coursename),
        }))
        dispatch(setCourseData(res))
       
    }






    return (
        <>

            <section className='courseSection'>
                <h4 >All<span>0{uniqueArray.length}</span></h4>

                {uniqueArray.length === 0 && <div className='noItem' style={{ display: "flex", justifyContent: "center" }}>
                    <img src={noItem} alt='noitem' width={"250px"} height={"100%"} />
                </div>}

                {uniqueArray.map((data, index) => {
                    return (
                        data.map((cdata, index) => {
                            return (
                                <Link key={cdata.id} to={"/" + cdata.url + "/episodes"}><div className='courseContainer' onClick={() => handleUrl(data)}>
                                    <div className='courseDetails' >
                                        <div className='courseLeftDetail'>
                                            <div className='courseImage'>
                                                <img src={cdata.thumbnail} alt='course' />
                                            </div>
                                            <div className='courseInfo'>
                                                <h5><span>Course</span></h5>
                                                <h5>{cdata.coursename}</h5>
                                                <p>{cdata.lesson}</p>
                                            </div>
                                        </div>
                                        <div className='courseRightDetail'>
                                            <h5>{cdata.price}</h5>
                                        </div>
                                    </div>
                                </div></Link>
                            )
                        })
                    )



                })}



            </section>
        </>

    )
}

export default EnrollCourses