import { useRef, useState, useEffect } from "react"
import { useStateContext } from "../contexts/ContextProvider"
import usePusher from "../composables/Pusher"
import axiosClient from "../axios"
import Avatar from "./fondations/Avatar"
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import Button from "./fondations/Button"
import { useParams } from "react-router-dom"
import useConversations from "../composables/Conversations"
import InViewInformations from "./InviewInformations"

export default function InviewMessage() {

    const { id } = useParams()

    const { currentUser } = useStateContext()
    const { conversation, messages, setMessages, participants, getConversation } = useConversations()

    if(!conversation) return 'Loading'

    const [message, setMessage] = useState('')
    const { newMessages, setConversationId } = usePusher()
    const [open, setOpen] = useState(false)
    const endMessageRef = useRef()

    useEffect(() => {
        getConversation(id)
        setConversationId(id)
    }, [])


    useEffect(() => console.log(messages, 'msgggs'), [messages])
    useEffect(() => {
        if(conversation) {
            const isNotEmpty = Object.keys(newMessages).length
            if(isNotEmpty) {
                setMessages([...messages, newMessages])
                scrollToBottom()
            }
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
        // .then(resp => console.log(resp))
        // .catch(err => console.log(err))
    }

    if(!messages) return 'Loading..'

    return <>
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center p-5 border-b">
                <div className="flex items-center gap-4">
                    <Avatar styles="w-12 rounded-full"/>
                    <div className="flex flex-col">
                        <b className="text-slate-500">
                            {conversation.name ? conversation.name.toUpperCase() : (participants.filter(p => p.id !== currentUser.id))
                                .map((participant, i) => `${participant.username}${i+1 !== participants.length -1 ? ', ' : ''}`)}
                        </b>
                        <span className="text-xs text-gray-500">Connecté</span>
                    </div>
                </div>
                <EllipsisHorizontalIcon
                    className="w-8 text-gray-500 cursor-pointer"
                    onClick={() => setOpen(true)}
                />
            </div>
            <div className="relative h-full">
                <div className="absolute left-0 top-0 bottom-0 right-0 flex flex-col space-y-8 p-4 overflow-y-auto pb-0">
                    {messages.length > 0 ? messages.map((msg, i) => (
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
        {conversation && <InViewInformations
            conversation={conversation}
            setMessages={setMessages}
            participants={participants}
            openInviewInformations={open}
            setOpenInviewInformations={setOpen}
        />}
    </>
}