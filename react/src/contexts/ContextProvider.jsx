import { createContext, useContext, useState } from "react"

const StateContext = createContext({})


export const ContextProvider = ({ children }) => {
    const [currentUser, _setCurrentUser] = useState(JSON.parse(localStorage.getItem('USER')) || {})
    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || null)

    const setCurrentUser = (user) => {
        if(user) {
            localStorage.setItem('USER', JSON.stringify(user))
        } else {
            localStorage.removeItem('USER')
        }
        _setCurrentUser(user)
    }

    const setUserToken = (token) => {
        if(token) {
            localStorage.setItem('TOKEN', token)
        } else {
            localStorage.removeItem('TOKEN')
        }

        _setUserToken(token)
    }

    return (
        <StateContext.Provider value={{
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
