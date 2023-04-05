import { Link, useParams } from "react-router-dom"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { StarIcon } from "@heroicons/react/24/solid"
import Button from "../components/fondations/Button"
import Avatar from "../components/fondations/Avatar"
import { useEffect, useRef, useState } from "react"
import axiosClient from "../axios"
import { useStateContext } from "../contexts/ContextProvider"

import usePusher from "../composables/Pusher"
import useConversations from "../composables/Conversations"

export default function Messages()
{
    const { id } = useParams()
    const [openCreateConversation, setOpenCreateConversation] = useState(false)
    const { loading, getConversations, conversations, search, setSearch, searchConversation, isSearch, error } = useConversations()

    useEffect(() => {
        const timeOutId = setTimeout(() => searchConversation(), 500);
        return () => clearTimeout(timeOutId)
    }, [search])

    useEffect(() => {
        getConversations()
    }, [])

    return <>
        <div className="z-30 hidden top-0 left-0 right-0 bottom-0 bg-black/75">
            <div className="absolute right-0 bottom-0 top-0 w-[200px] bg-white">
                Helloooo
            </div>
        </div>
        <div className="h-full flex flex-col xl:flex-row gap-6 bg-gray-100 rounded-2xl p-6">
                <div className="w-full xl:h-full xl:w-1/4 rounded-xl bg-white p-4">
                    <div className="flex gap-3 items-stretch">
                        <div className={`relative w-full flex gap-1 items-center bg-white rounded-lg ${error ? 'border-red-500 animate-shake' : 'border-gray-300'} border  pl-3 pr-1.5 py-1.5`}>
                            <MagnifyingGlassIcon className="w-5 text-gray-400"/>
                            <input
                                type="text"
                                name="search"
                                placeholder="Chercher un ami..."
                                value={search}
                                onChange={e => {
                                    e.preventDefault()
                                    setSearch(e.target.value)
                                }}
                                autoComplete={"off"}
                                className={`placeholder:text-sm border-none outline-none w-full text-slate-600 indent-1`}
                            />
                            
                        </div>
                        
                        <Button level="secondary" onClick={e => setOpenCreateConversation(!openCreateConversation)}>
                            <StarIcon className="w-4 text-blue-400" />
                        </Button>
                    </div>
                    {conversations && <Sidebar conversations={conversations} isSearch={isSearch} setSearch={setSearch} />}
                </div>

            <div className={`relative h-full w-full xl:w-3/4 rounded-xl bg-white`}>
                { !loading ?
                    conversations.length == 0 ?
                        <div>
                            <div className="flex justify-center items-center h-full">
                                <div className="text-center">
                                    <div className="text-2xl text-gray-500">Vous n'avez pas encore de conversation</div>
                                    <div className="text-gray-500">Commencez à discuter avec vos amis</div>
                                </div>
                            </div>
                        </div>
                    : id ?
                        conversations && <InviewMessage conversation={conversations.find(conv => conv.id == id)} />
                    :
                        <div className="w-full h-full grid place-items-center text-lg text-gray-500 ">
                            Cliquer sur une conversation
                        </div>
                    : null}
            </div>
        </div>
    </>
}

function InviewMessage({conversation}) {

    if(!conversation) return 'Loading..'

    const { currentUser } = useStateContext()
    const [messages, setMessages] = useState(conversation.messages.data)
    const [message, setMessage] = useState('')
    const [participants, setParticipants] = useState(conversation.participants.data)

    const { newMessages, fetching, setConversationId } = usePusher()
    const endMessageRef = useRef()

    useEffect(() => {
        if(conversation) {
            setMessages(conversation.messages?.data)
            setParticipants(conversation?.participants.data)
            setConversationId(conversation.id)
            scrollToBottom()
            // endMessageRef.current?.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'})
        }

    }, [conversation])

    useEffect(() => {
        const isNotEmpty = Object.keys(newMessages).length
        if(isNotEmpty) {
            setMessages([...messages, newMessages])
            scrollToBottom()
            // endMessageRef.current?.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'})
        }
    }, [newMessages])

    const scrollToBottom = () => {
        endMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const sendMessage = (e) => {
        e.preventDefault()
        setMessage('')
        axiosClient.post('/conversations/send', {
            'conversation_id': conversation.id,
            'content': message
        })
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
    }

    if(!messages) return 'Loading..'

    return <>
        <div className="h-full flex flex-col">
            <div className="flex p-5 border-b">
                <div className="flex items-center gap-4">
                    <Avatar styles="w-12 rounded-full"/>
                    <div className="flex flex-col">
                        <b className="text-slate-500">
                            {conversation.name ? conversation.name.toUpperCase() : (participants.filter(p => p.id !== currentUser.id))
                                .map((participant, i) => `${participant.username}${i+1 !== participants.length -1 ? ', ' : ''}`)}
                            {/* {console.log(conversation?.participants?.data?.filter((p) => p.id !== currentUser.id))} */}
                        </b>
                        <span className="text-xs text-gray-500">Connecté</span>
                    </div>
                </div>
            </div>
            <div className="relative h-full">
                <div className="absolute left-0 top-0 bottom-0 right-0 flex flex-col space-y-8 p-4 overflow-y-auto pb-0">
                    {messages.length > 0 ? messages?.map((msg, i) => (
                        <div key={i} className="chat-message">
                            <div className={`flex items-end ${msg?.user?.id == currentUser.id ? 'justify-end':''}`}>
                                <div className={`${msg?.user?.id == currentUser.id ? 'order-1' : 'order-2'} flex flex-col space-y-2 text-xs mx-2 items-start`}>
                                    <div className="flex flex-col relative">
                                        <span className={`p-3 rounded-lg inline-block ${msg?.user?.id == currentUser.id ? 'rounded-br-none bg-gray-200 text-gray-500' : 'rounded-bl-none bg-blue-400 text-white'}`}>
                                            {msg.content}
                                        </span>
                                        <span className={`hidden absolute bottom-[-20px] ${msg?.user?.id == currentUser.id ? 'right-0' : 'left-0'} text-gray-500`}>
                                            {msg.created_at}
                                        </span>
                                    </div>
                                </div>
                                <Avatar styles={`w-8 h-8 rounded-full ${msg?.user?.id == currentUser.id ? 'order-2': 'order-1'}`} />
                            </div>
                        </div>
                    )): null}
                    <div ref={endMessageRef} />
                </div>
            </div>
            <form className="flex p-3 gap-3" onSubmit={sendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Ecrire quelque chose..."
                    className="resize-none w-full text-sm p-2 border border-gray-200 rounded-lg outline-none"
                />
                <Button level="secondary" disabled={message == '' ? 'disabled' : ''}>
                    Send
                </Button>
            </form>
        </div>

    </>
}

function SidebarItem({item, isSearch, setSearch}) {
    const { currentUser } = useStateContext()
    return (
        <li className="items-center" onClick={e => isSearch ? setSearch('') : null}>
            <Link to={`/messages/${item.id}`} className="bg-gray-100 px-4 py-3 xl:px-2 rounded-lg flex flex-row justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                    <Avatar styles="rounded-full w-10" />
                    <div className="overflow-hidden">
                        <b className="text-slate-500">
                            { item.name ? item.name : (item.participants?.data?.find((p) => p.id !== currentUser.id))?.username}
                        </b>

                        <p className="truncate text-sm text-gray-500 hidden xl:block">
                            {item.messages.data.length > 0 ? 
                                `${item.messages?.data[item.messages.data.length - 1]?.user.id == currentUser.id ? 'Toi : ' : ''}
                                ${item.messages?.data[item.messages.data.length - 1]?.content} `
                            : 'Aucun message'}
                        </p>
                    </div>
                </div>
                <div className="text-xs text-gray-500 hidden flex-col items-end gap-1 text-right xl:flex">
                    {item.messages?.data[item.messages.data.length -1]?.created_at}
                    <StarIcon className="w-4 text-gray-300" />
                </div>
            </Link>
        </li>
    )
}

function Sidebar({conversations, isSearch, setSearch})
{
    return (
        <ul className="mt-3 xl:mt-6 flex flex-row xl:flex-col gap-3">
            {conversations.length > 0 ? <>
                {conversations.map((conv, i) =>
                    !isSearch ?
                        conv.messages.data.length > 0 ?
                            <SidebarItem item={conv} isSearch={isSearch}/>
                        : null
                    :  (
                        <SidebarItem item={conv} isSearch={isSearch} setSearch={setSearch}/>
                    )
                )}
            </> : null}

        </ul>
    )
}
