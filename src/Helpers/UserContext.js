import React, { createContext, useState } from "react"

export const UserContext = createContext(null)

export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(null)

  const value = {
    users,
    setUsers,
    loggedInUser,
    setLoggedInUser,
  }

  return <UserContext.Provider value={value}> {children} </UserContext.Provider>
}
