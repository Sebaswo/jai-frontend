import { useEffect, useState } from "react"
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useWeaponsContext } from "../hooks/useWeaponsContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { weaponList } from "./Weapons"

const API_URL=process.env.REACT_APP_API_URL;

const WorkoutForm = () => {
  const { dispatch } = useWeaponsContext()
  // const { dispatch2 } = useWeaponsContext()
  const { user } = useAuthContext()

  // const [title, setTitle] = useState('')
  // const [load, setLoad] = useState('')
  // const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const [emptyFields2, setEmptyFields2] = useState([])
  const [weaponName, setWeaponName] = useState('Alert Trip Mines')
  const [killAmount, setKillAmount] = useState('')
  const [weaponId, setWeaponId] = useState('')
  const [searchText, setSearchText] = useState('')

  useEffect (() => {
    let tempWep = weaponList.filter((wep) => wep.weaponName.includes(weaponName))
    setWeaponId(tempWep[0].id)
  }, [weaponName])

  const weaponSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }
    
    const weaponStats = {weaponId, weaponName, killAmount}

    const response = await fetch(API_URL + '/weapons/', {
      method: 'POST',
      body: JSON.stringify(weaponStats),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields2(json.emptyFields2)
    }
    if (response.ok) {
      setKillAmount('')
      setSearchText('')
      setError(null)
      setEmptyFields2([])
    }

    const resp = await fetch(API_URL + '/weapons/', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json2 = await resp.json()

      if (response.ok) {
        dispatch({type: 'SET_WEAPONS', payload: json2})
      }
  }

  const searchChange = (e) => {
    setSearchText(e.target.value)
  }

  const onSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  const onSearch = (searchTerm) => {
    setSearchText(searchTerm)
    console.log("search", searchTerm)
    console.log("id", weaponId)
    setWeaponName(searchTerm)
  }
  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   if (!user) {
  //     setError('You must be logged in')
  //     return
  //   }

  //   const workout = {title, load, reps}

  //   const response = await fetch(API_URL + '/workouts/', {
  //     method: 'POST',
  //     body: JSON.stringify(workout),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${user.token}`
  //     }
  //   })
  //   const json = await response.json()

  //   if (!response.ok) {
  //     setError(json.error)
  //     setEmptyFields(json.emptyFields)
  //   }
  //   if (response.ok) {
  //     setTitle('')
  //     setLoad('')
  //     setReps('')
  //     setError(null)
  //     setEmptyFields([])
  //     dispatch({type: 'CREATE_WORKOUT', payload: json})
  //   }
  // }

  return (
    <>
      {/* <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>

        <label>Excersize Title:</label>
        <input 
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes('title') ? 'error' : ''}
        />

        <label>Load (in kg):</label>
        <input 
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyFields.includes('load') ? 'error' : ''}
        />

        <label>Reps:</label>
        <input 
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields.includes('reps') ? 'error' : ''}
        />

        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
        
      </form> */}
      <form className="create">
        <div className="search-container">
          <p>Etsi nimellä:</p>
          <div className="search">
            <input type="text" value={searchText} onChange={searchChange} />
            {/* <button onClick={() => onSearch(searchText)}> Search </button> */}
          </div>
          <div className="dropdown">
            {weaponList.filter(item => {
              const searchTerm = searchText.toLowerCase()
              const searchTerms = searchText.toLowerCase().split(" ")
              const weaponName = item.weaponName.toLowerCase()

              return (
                searchTerm &&
                searchTerms.every(term => weaponName.includes(term)) &&
                // weaponName.includes(searchTerm) &&
                weaponName !== searchTerm
              );
            }).slice(0,10)
            .map((item) => (
              <div onClick={() => onSearch(item.weaponName)}
              className="dropdown-row"
              key={item.id}>{item.weaponName}</div>
            ))}
          </div>
        </div>
        <hr/>
        <label>
          {/* <select onChange={(e) => {setWeaponName(e.target.value)}}>
            {weaponList.map((weapon) => <option key={weapon.id}>{weapon.weaponName}</option>)}
          </select> */}
          <p>Tapot:</p>
          <input value={killAmount} onChange={(e) => setKillAmount(e.target.value)}/>
          {/* <h4>{weaponName} id: {weaponId} tapot: {killAmount}</h4> */}
          <button onClick={weaponSubmit}>Tallenna</button>
        </label>
      </form>
    </>
  )
}

export default WorkoutForm