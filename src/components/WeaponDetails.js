import { useWeaponsContext } from '../hooks/useWeaponsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const API_URL=process.env.REACT_APP_API_URL;

const WeaponDetails = ({ weapon }) => {
  const { dispatch } = useWeaponsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    if(window.confirm("Haluatko varmasti poistaa tiedot pysyvästi?") == true) {
    const response = await fetch(API_URL  + '/weapons/' + weapon._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WEAPON', payload: json})
    }
  }
  }

  return (
    <div className="workout-details">
      <h4>{weapon.weaponName}</h4>
      <p><strong>Kills: </strong>{weapon.killAmount}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WeaponDetails