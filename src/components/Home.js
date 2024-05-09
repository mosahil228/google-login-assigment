import React,{useEffect} from 'react'
import {useSelector } from 'react-redux';


const Home = ({setProgress}) => {
  const mode = useSelector((state) => {
    return state.user;
})
  useEffect((() =>{
    setProgress(40);
    setTimeout(()=>{
      setProgress(100)
    },200)
    
  }),[setProgress])
  return (
    <>
      <section className='heading'>
        <h1 style={{color:mode.darkMode.setDark?mode.darkMode.textLight:mode.darkMode.textDark}}>CloneMyTrips Assigment</h1>
        <h2 style={{color:mode.darkMode.setDark?mode.darkMode.textLight:mode.darkMode.textDark}}>CloneMyTrips revolutionizes travel planning by offering pre-designed itineraries with detailed information and cost estimates.</h2>
      </section>
      <section>
      </section>

    </>
  )
}

export default Home