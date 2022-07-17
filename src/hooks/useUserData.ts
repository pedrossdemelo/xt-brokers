import UserContext from 'context/UserContext'
import React from 'react'

export default function useUserData() {
  return React.useContext(UserContext)
}
