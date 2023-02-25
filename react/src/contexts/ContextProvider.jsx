import { createContext, useContext, useState } from "react"

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    setCurrentUser: () => {},
    setUserToken: () => {}
})

const tmpPosts = [
    {
        id: 0,
        user: 1,
        image: null,
        content: 'Lorem ipsum'
    },
    {
        id: 1,
        user: 1,
        image: null,
        content: 'Lorem ipsum'
    },
    {
        id: 2,
        user: 1,
        image: null,
        content: 'Lorem ipsum'
    }
]

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})
    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || null)
    const [posts, setPosts] = useState(tmpPosts)


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
            posts
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
