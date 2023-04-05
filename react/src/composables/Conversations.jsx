import {useState} from 'react'
import axiosClient from "../axios"


export default function useConversations()
{
    const [conversations, setConversations] = useState([])
    const [search, setSearch] = useState('')
    const [isSearch, setIsSearch] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const getConversations = async () => {
        await axiosClient.get('/conversations')
            .then(({data}) => {
                setConversations(data.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }

    const searchConversation = async () => {
        setError(false)
        if(search !== '') {

            await axiosClient.get(`/conversations/search/${search}`)
            .then((res) => {
                console.log(res)
                setConversations(res.data.data)
                setIsSearch(true)
            })
            .catch(err => setError(true))
        } else {
            setIsSearch(false)
            setError(false)
            getConversations()
        }
    }
    return {
        conversations,
        setConversations,
        getConversations,
        searchConversation,
        loading,
        search, setSearch,
        isSearch,
        error
    }
}
