import { createContext, useReducer } from 'react'

export const WeaponsContext = createContext()

export const weaponsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WEAPONS':
      action.payload.sort(function (a, b) {
        if (a.killAmount < b.killAmount) {
          return 1
        } if (a.killAmount > b.killAmount) {
          return -1
        }
        return 0
      })
      return {
        weapons: action.payload
      }
    case 'CREATE_WEAPON':
      console.log(action.payload)
      return {
        weapons: [action.payload, ...state.weapons]
      }
    case 'DELETE_WEAPON':
      return {
        weapons: state.weapons.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const WeaponsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weaponsReducer, {
    weapons: null
  })

  return (
    <WeaponsContext.Provider value={{...state, dispatch}}>
      { children }
    </WeaponsContext.Provider>
  )
}