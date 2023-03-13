import { WeaponsContext } from '../context/WeaponContext'
import { useContext } from 'react'

export const useWeaponsContext = () => {
  const context = useContext(WeaponsContext)

  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}