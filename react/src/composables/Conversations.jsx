import {useState} from 'react'
import axiosClient from "../axios"


export default function useConversations()
{
    const [conversations, setConversations] = useState([])
    const [search, setSearch] = useState('')
    const [isSearch, setIsSearch] = useState(false)
    const [loading, setLoading] = useState(true)

    const getConversations = async () => {
        await axiosClient.get('/conversations')
            .then(({data}) => {
                setConversations(data.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }

    const searchConversation = async () => {
        setIsSearch(true)
        if(search !== '') {
            await axiosClient.get(`/conversations/search/${search}`)
            .then((res) => {
                setConversations(res.data.data)
            })
            .catch(err => console.log(err))
        } else {
            setIsSearch(false)
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
        isSearch
    }
}
