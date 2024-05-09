import React,{useEffect} from 'react'
import EnrollCourses from './EnrollCourses';

const MyEnrollement = ({setProgress}) => {
  useEffect((() =>{
    setProgress(40);
    setTimeout(()=>{
      setProgress(100)
    },200)
    
  }),[setProgress])
  return (
    <>
      <section className='heading'>
        <h1>My Enrollments</h1>
        <h2>Hope You Will Gain Some Knowledge</h2>
      </section>
      <EnrollCourses />
    </>
  )
}

export default MyEnrollement;