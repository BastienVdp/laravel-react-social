import {useState} from 'react'
import axiosClient from "../axios"


export default function useConversations()
{
    const [conversations, setConversations] = useState([])
    const [conversation, setConversation] = useState({})
    const [messages, setMessages] = useState([])
    const [participants, setParticipants] = useState([])
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

    const getConversation = async(id) => {
        await axiosClient.get(`/conversations/${id}`)
            .then(({data}) => {
                setConversation(data)
                setMessages(data.messages.data)
                setParticipants(data.participants.data)
            })
            .catch(e => console.log(e))
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

    const setUnread = async (id) => {
        axiosClient.post('/conversations/unread', 
        {
            conversation_id: id
        })
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
    }

    const setRead = async (id) => {
        axiosClient.post('/conversations/read', 
        {
            conversation_id: id
        })
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
    }

    const deleteMsgs = async(id) => {
        axiosClient.delete(`/conversations/${id}`)
        .then(({data}) => {
           console.log(data)
        })
        .catch(e => console.log(e))
    }

    return {
        conversations,
        setConversations,
        getConversations,
        conversation,
        messages, setMessages,
        participants,
        getConversation,
        searchConversation,
        setRead, setUnread,
        loading, deleteMsgs,
        search, setSearch,
        isSearch,
        error
    }
}
