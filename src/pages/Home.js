import { useEffect }from 'react'
// import {  useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useWeaponsContext } from '../hooks/useWeaponsContext'

// components
// import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import WeaponDetails from '../components/WeaponDetails'

const API_URL=process.env.REACT_APP_API_URL;

const Home = () => {
  // const {workouts, dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()
  const {weapons, dispatch} = useWeaponsContext()

  // useEffect(() => {
  //   const fetchWorkouts = async () => {
  //     const response = await fetch(API_URL + '/workouts/', {
  //       headers: {'Authorization': `Bearer ${user.token}`},
  //     })
  //     const json = await response.json()

  //     if (response.ok) {
  //       dispatch({type: 'SET_WORKOUTS', payload: json})
  //     }
  //   }

  //   if (user) {
  //     fetchWorkouts()
  //   }
  // }, [dispatch, user])

  useEffect(() => {
    const fetchWeapons = async () => {
      const response = await fetch(API_URL + '/weapons/', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        
        dispatch({type: 'SET_WEAPONS', payload: json})
      }
    }

    if (user) {
      fetchWeapons()
    }
  }, [dispatch, user])

  return (
    <>
      {/* <div className="home">
        <div className="workouts">
          {workouts && workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
        </div>
        <WorkoutForm />
      </div> */}
      <div className='home'>
        <WorkoutForm />
        <div className="workouts">
            <h3>Aseet</h3>
            {weapons && weapons.map((weapon) => (
              <WeaponDetails key={weapon._id} weapon={weapon} />
            ))}
        </div>
      </div>
      <footer>Pelin Hunt: Showdown ja kaikki sen oikeudet omistaa Crytek GmbH</footer>
    </>
  )
}

export default Home